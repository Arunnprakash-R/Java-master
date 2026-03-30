import { useState, useEffect, useCallback } from 'react';
import styles from './TopicHeader.module.css';

export default function TopicHeader({ unit, topic, isCompleted, onToggleComplete, getUnitProgress }) {
  const [showCelebration, setShowCelebration] = useState(false);

  const handleToggle = useCallback(() => {
    if (!isCompleted && getUnitProgress) {
      const progress = getUnitProgress(unit.id);
      // Will become the last one completed
      if (progress.done === progress.total - 1) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2200);
      }
    }
    onToggleComplete(topic.id);
  }, [isCompleted, getUnitProgress, unit.id, onToggleComplete, topic.id]);

  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <div className={styles.unitBadge} style={{ background: `${unit.color}20`, color: unit.color }}>
          <span>{unit.icon}</span>
          <span>{unit.title}</span>
        </div>
        <div className={styles.topicTitle}>{topic.title}</div>
        <div className={styles.tags}>
          <span className={styles.tag}>{topic.co}</span>
          <span className={styles.tag}>{topic.tlo}</span>
        </div>
      </div>
      <button
        className={`${styles.completeBtn} ${isCompleted ? styles.completeBtnDone : ''}`}
        onClick={handleToggle}
        aria-label={isCompleted ? 'Mark topic as incomplete' : 'Mark topic as complete'}
      >
        {isCompleted ? '✓' : '○'} {isCompleted ? 'Completed' : 'Mark Complete'}
      </button>

      {showCelebration && (
        <div className={styles.celebration} aria-hidden="true">
          🎉
        </div>
      )}
    </div>
  );
}
