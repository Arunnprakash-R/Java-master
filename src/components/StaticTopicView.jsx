import styles from './StaticTopicView.module.css';
import CodeBlock from './CodeBlock';
import { useMemo } from 'react';

function sanitizeContent(text) {
  if (!text) return '';
  // Remove C0 controls except tab/newline/CR, plus DEL + C1 controls (0x7F-0x9F).
  // This prevents odd artifacts if control characters accidentally enter template-literal content.
  return text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inlineFormat(text) {
  let result = escapeHtml(text);
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  return result;
}

function renderTextContent(text) {
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let listType = null;
  let tableRows = [];
  let inTable = false;

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === 'ol') {
        elements.push(
          <ol key={`ol-${elements.length}`}>
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`}>
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            ))}
          </ul>
        );
      }
      listItems = [];
      listType = null;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const dataRows = tableRows.slice(1).filter((r) => !r.match(/^\s*\|[\s-:|]+\|\s*$/));
      elements.push(
        <table key={`table-${elements.length}`}>
          <thead>
            <tr>
              {headerRow
                .split('|')
                .filter(Boolean)
                .map((cell, i) => (
                  <th key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(cell.trim()) }} />
                ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, ri) => (
              <tr key={ri}>
                {row
                  .split('|')
                  .filter(Boolean)
                  .map((cell, ci) => (
                    <td key={ci} dangerouslySetInnerHTML={{ __html: inlineFormat(cell.trim()) }} />
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        flushList();
        inTable = true;
      }
      tableRows.push(line.trim());
      continue;
    } else if (inTable) {
      flushTable();
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const Tag = `h${level}`;
      elements.push(
        <Tag key={`h-${elements.length}`} dangerouslySetInnerHTML={{ __html: inlineFormat(headingMatch[2]) }} />
      );
      continue;
    }

    if (line.trim().match(/^[-*_]{3,}$/)) {
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} />);
      continue;
    }

    const ulMatch = line.match(/^\s*[-*+]\s+(.+)/);
    if (ulMatch) {
      if (listType === 'ol') flushList();
      listType = 'ul';
      listItems.push(ulMatch[1]);
      continue;
    }

    const olMatch = line.match(/^\s*\d+\.\s+(.+)/);
    if (olMatch) {
      if (listType === 'ul') flushList();
      listType = 'ol';
      listItems.push(olMatch[1]);
      continue;
    }

    flushList();

    if (line.trim() === '') {
      continue;
    }

    elements.push(
      <p key={`p-${elements.length}`} dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />
    );
  }

  flushList();
  flushTable();
  return elements;
}

function parseSegments(text) {
  const segments = [];
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    segments.push({
      type: 'code',
      language: match[1] || 'java',
      content: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }
  return segments;
}

export default function StaticTopicView({ unit, topic, onGoHome, onToggleComplete, isCompleted }) {
  const safeContent = useMemo(() => sanitizeContent(topic.content || ''), [topic.content]);
  const segments = useMemo(() => parseSegments(safeContent), [safeContent]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onGoHome} aria-label="Back">
          ← Back
        </button>
        <div className={styles.meta}>
          <span className={styles.metaUnit}>{unit?.title}</span>
          <span className={styles.metaTopic}>{topic.title}</span>
        </div>
        <button
          className={`${styles.completeBtn} ${isCompleted ? styles.completeBtnDone : ''}`}
          onClick={() => onToggleComplete(topic.id)}
        >
          {isCompleted ? '✓ Completed' : 'Mark Complete'}
        </button>
      </div>

      <div className={styles.contentArea}>
        <div className={styles.hero}>
          <div>
            <p className={styles.kicker}>{unit?.title || 'Question Bank'}</p>
            <h1 className={styles.title}>{topic.title}</h1>
            <p className={styles.subtitle}>Ready-made answers, no chat needed. Scroll below to read.</p>
          </div>
        </div>

        <div className={styles.body}>
          {segments.map((seg, idx) =>
            seg.type === 'code' ? (
              <div key={idx} className={styles.codeWrap}>
                <CodeBlock code={seg.content} language={seg.language} />
              </div>
            ) : (
              <div key={idx} className={styles.richText}>
                {renderTextContent(seg.content)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
