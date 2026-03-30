import styles from './ProgressBar.module.css';

export function ProgressBar({ percentage, label = 'Progress' }) {
  return (
    <div>
      <div className={styles.barLabel}>
        <span className={styles.barLabelText}>{label}</span>
        <span className={styles.barPercent}>{percentage}%</span>
      </div>
      <div className={styles.barContainer} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.barFill} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export function ProgressRing({ percentage, size = 120, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.ringContainer} style={{ width: size, height: size }}>
      <svg className={styles.ringSvg} width={size} height={size}>
        <circle
          className={styles.ringBg}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.ringFill}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="url(#progressGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#4ECDC4" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.ringText}>
        <span className={styles.ringPercent}>{percentage}%</span>
        <span className={styles.ringLabel}>complete</span>
      </div>
    </div>
  );
}

export default ProgressBar;
