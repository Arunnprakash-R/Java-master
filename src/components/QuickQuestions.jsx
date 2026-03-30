import styles from './QuickQuestions.module.css';

const TEMPLATES = [
  { icon: '📖', template: (topic) => `Explain ${topic} with an example` },
  { icon: '⚠️', template: (topic) => `What are common mistakes in ${topic}?` },
  { icon: '💻', template: (topic) => `Show me Java code for ${topic}` },
  { icon: '🧩', template: (topic) => `Give me a practice problem on ${topic}` },
];

export default function QuickQuestions({ topicTitle, onSend }) {
  const questions = TEMPLATES.map((t) => ({
    icon: t.icon,
    text: t.template(topicTitle),
  }));

  return (
    <div className={styles.container}>
      <div className={styles.label}>Quick questions to get started:</div>
      <div className={styles.grid}>
        {questions.map((q, idx) => (
          <button
            key={idx}
            className={styles.questionBtn}
            onClick={() => onSend(q.text)}
            aria-label={q.text}
          >
            <span className={styles.icon}>{q.icon}</span>
            {q.text}
          </button>
        ))}
      </div>
    </div>
  );
}
