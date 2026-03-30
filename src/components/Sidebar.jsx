import { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({
  syllabus,
  activeTopic,
  onSelectTopic,
  onGoHome,
  onGoQuestionBank,
  completedTopics,
  isOpen,
  onToggle,
  getUnitProgress,
  isHome,
  isQuestionBank,
}) {
  const [expandedUnits, setExpandedUnits] = useState(new Set(['unit1']));

  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitId)) {
        next.delete(unitId);
      } else {
        next.add(unitId);
      }
      return next;
    });
  };

  const handleTopicClick = (unit, topic) => {
    onSelectTopic(unit, topic);
    // On mobile, close sidebar after selection
    if (window.innerWidth <= 768) {
      onToggle();
    }
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onToggle} />}
      <aside className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>☕</span>
            <span className={styles.logoText}>JavaMaster</span>
          </div>
          <button className={styles.closeBtn} onClick={onToggle} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <button
          className={`${styles.homeBtn} ${isHome ? styles.homeBtnActive : ''}`}
          onClick={() => {
            onGoHome();
            if (window.innerWidth <= 768) onToggle();
          }}
          aria-label="Go to course overview"
        >
          <span>🏠</span>
          <span>Course Overview</span>
        </button>

        <button
          className={`${styles.homeBtn} ${isQuestionBank ? styles.homeBtnActive : ''}`}
          onClick={() => {
            onGoQuestionBank();
            if (window.innerWidth <= 768) onToggle();
          }}
          aria-label="Open question banks"
        >
          <span>📚</span>
          <span>Question Bank</span>
        </button>

        <div className={styles.unitList}>
          {syllabus.map((unit) => {
            const isExpanded = expandedUnits.has(unit.id);
            const progress = getUnitProgress(unit.id);
            const allDone = progress.done === progress.total;
            const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

            return (
              <div key={unit.id} className={styles.unitSection}>
                <button
                  className={styles.unitHeader}
                  onClick={() => toggleUnit(unit.id)}
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${unit.title}`}
                  aria-expanded={isExpanded}
                >
                  <span className={styles.unitIcon}>{unit.icon}</span>
                  <span className={styles.unitTitle}>{unit.title}</span>
                  <span className={`${styles.unitCount} ${allDone ? styles.unitCountDone : ''}`}>
                    {progress.done}/{progress.total}
                  </span>
                  <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>
                    ▶
                  </span>
                </button>

                <div className={styles.unitProgressBar}>
                  <div
                    className={styles.unitProgressFill}
                    style={{ width: `${pct}%`, background: unit.color }}
                    aria-hidden
                  />
                  <span className={styles.unitProgressLabel}>{pct}%</span>
                </div>

                <div className={`${styles.topicList} ${isExpanded ? styles.topicListOpen : ''}`}>
                  {unit.topics.map((topic) => {
                    const isActive = activeTopic?.id === topic.id;
                    const isDone = completedTopics.has(topic.id);

                    return (
                      <button
                        key={topic.id}
                        className={`${styles.topicItem} ${isActive ? styles.topicItemActive : ''}`}
                        style={isActive ? { borderLeftColor: unit.color } : undefined}
                        onClick={() => handleTopicClick(unit, topic)}
                        aria-label={`${topic.title}${isDone ? ' (completed)' : ''}`}
                      >
                        <span className={`${styles.checkbox} ${isDone ? styles.checkboxDone : ''}`}>
                          {isDone ? '✓' : ''}
                        </span>
                        <span className={styles.topicText}>{topic.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.resetBtn}
            onClick={() => {
              if (window.confirm('Reset all progress? This cannot be undone.')) {
                // resetProgress is passed via App → need to wire it
                window.dispatchEvent(new CustomEvent('resetProgress'));
              }
            }}
            aria-label="Reset all progress"
          >
            ↺ Reset Progress
          </button>
        </div>
      </aside>
    </>
  );
}
