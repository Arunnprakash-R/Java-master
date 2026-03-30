import { SYLLABUS, getTotalTopics } from '../data/syllabus';
import { ProgressRing } from './ProgressBar';
import styles from './HomeView.module.css';

const QUICK_START_ITEMS = [
  { label: 'What is OOP?', unitIdx: 0, topicIdx: 0, question: 'Explain OOP concepts in Java with examples' },
  { label: 'Java Data Types', unitIdx: 0, topicIdx: 3, question: 'Explain all Java data types with examples' },
  { label: 'Hello World Program', unitIdx: 0, topicIdx: 0, question: 'Show me a Hello World program in Java and explain each part' },
  { label: 'Arrays in Java', unitIdx: 0, topicIdx: 4, question: 'Explain arrays in Java with code examples' },
  { label: 'Exception Handling', unitIdx: 1, topicIdx: 4, question: 'Explain exception handling in Java with examples' },
  { label: 'Multithreading Basics', unitIdx: 2, topicIdx: 3, question: 'Explain multithreading basics in Java' },
  { label: 'What is JDBC?', unitIdx: 4, topicIdx: 0, question: 'Explain JDBC architecture with a real-world analogy' },
  { label: 'Swing GUI', unitIdx: 3, topicIdx: 5, question: 'Show me how to create a simple Swing GUI in Java' },
];

export default function HomeView({ overallProgress, completedCount, unitsCompleted, getUnitProgress, onSelectTopic }) {
  const totalTopics = getTotalTopics();

  const handleQuickStart = (item) => {
    const unit = SYLLABUS[item.unitIdx];
    const topic = unit.topics[item.topicIdx];
    onSelectTopic(unit, topic, item.question);
  };

  return (
    <div className={styles.homeView}>
      <div className={styles.hero}>
        <span className={styles.heroIcon}>☕</span>
        <h1 className={styles.heroTitle}>JavaMaster</h1>
        <p className={styles.heroSubtitle}>Your adaptive Java coach — instant, offline answers.</p>
        <p className={styles.heroDescription}>
          Learn Java with concise explanations, code-first answers, and targeted practice prompts.
          Follow the structured 5-unit syllabus, track your momentum, and jump into any topic with
          curated quick-start questions.
        </p>
      </div>

      <div className={styles.progressSection}>
        <ProgressRing percentage={overallProgress} size={120} strokeWidth={8} />
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{totalTopics}</div>
            <div className={styles.statLabel}>Total Topics</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue} style={{ color: 'var(--accent-teal)' }}>
              {completedCount}
            </div>
            <div className={styles.statLabel}>Completed</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue} style={{ color: 'var(--accent-orange)' }}>
              {unitsCompleted}/5
            </div>
            <div className={styles.statLabel}>Units Done</div>
          </div>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>📚 Course Units</h2>
      <div className={styles.unitGrid}>
        {SYLLABUS.map((unit, idx) => {
          const progress = getUnitProgress(unit.id);
          const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

          return (
            <button
              key={unit.id}
              className={styles.unitCard}
              style={{ '--card-color': unit.color }}
              onClick={() => onSelectTopic(unit, unit.topics[0])}
              aria-label={`Open ${unit.title}`}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: unit.color,
              }} />
              <span className={styles.cardIcon}>{unit.icon}</span>
              <div className={styles.cardTitle}>
                Unit {idx + 1}: {unit.title}
              </div>
              <div className={styles.cardTopicCount}>{unit.topics.length} topics</div>
              <div className={styles.cardProgress}>
                <div
                  className={styles.cardProgressFill}
                  style={{ width: `${pct}%`, background: unit.color }}
                />
              </div>
              <div className={styles.cardProgressLabel}>
                {progress.done}/{progress.total} completed
              </div>
            </button>
          );
        })}
      </div>

      <div className={styles.quickStart}>
        <h2 className={styles.sectionTitle}>⚡ Quick Start</h2>
        <div className={styles.quickGrid}>
          {QUICK_START_ITEMS.map((item, idx) => (
            <button
              key={idx}
              className={styles.quickBtn}
              onClick={() => handleQuickStart(item)}
              aria-label={item.label}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
