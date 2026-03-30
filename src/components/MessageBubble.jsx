import CodeBlock from './CodeBlock';
import styles from './MessageBubble.module.css';

function formatTime(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function parseMarkdown(text) {
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

function renderTextContent(text) {
  // Split by lines for processing
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
              {headerRow.split('|').filter(Boolean).map((cell, i) => (
                <th key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(cell.trim()) }} />
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, ri) => (
              <tr key={ri}>
                {row.split('|').filter(Boolean).map((cell, ci) => (
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

    // Table detection
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

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const Tag = `h${level}`;
      elements.push(
        <Tag key={`h-${elements.length}`} dangerouslySetInnerHTML={{ __html: inlineFormat(headingMatch[2]) }} />
      );
      continue;
    }

    // Horizontal rule
    if (line.trim().match(/^[-*_]{3,}$/)) {
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} />);
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^\s*[-*+]\s+(.+)/);
    if (ulMatch) {
      if (listType === 'ol') flushList();
      listType = 'ul';
      listItems.push(ulMatch[1]);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\s*\d+\.\s+(.+)/);
    if (olMatch) {
      if (listType === 'ul') flushList();
      listType = 'ol';
      listItems.push(olMatch[1]);
      continue;
    }

    // Regular paragraph
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

function inlineFormat(text) {
  let result = escapeHtml(text);
  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Inline code
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Italic
  result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  return result;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default function MessageBubble({ message }) {
  const { role, content, timestamp, isError } = message;
  const isUser = role === 'user';
  const segments = parseMarkdown(content);

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.wrapperUser : ''}`}>
      <div className={`${styles.avatar} ${isUser ? styles.avatarUser : ''}`}>
        {isUser ? '👤' : '☕'}
      </div>
      <div
        className={`${styles.bubble} ${
          isUser ? styles.bubbleUser : isError ? styles.bubbleError : styles.bubbleAi
        }`}
      >
        <div className={styles.content}>
          {segments.map((seg, idx) =>
            seg.type === 'code' ? (
              <CodeBlock key={idx} code={seg.content} language={seg.language} />
            ) : (
              <div key={idx}>{renderTextContent(seg.content)}</div>
            )
          )}
        </div>
        <div className={styles.timestamp} aria-label={role === 'assistant' ? 'Assistant message time' : 'User message time'}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
}
