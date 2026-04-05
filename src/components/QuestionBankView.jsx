import styles from './QuestionBankView.module.css';

const PDF_LINKS = [
  {
    title: 'Unit 1 Question Bank',
    file: '/ban/JAVA%20unit-1%20Question%20Bank.pdf',
    description: 'Fundamentals, basics, and introductory Java questions.',
  },
  {
    title: 'Unit 2 Question Bank',
    file: '/ban/UNIT-II%20java%20QB.pdf',
    description: 'Classes, objects, inheritance, and related exercises.',
  },
  {
    title: 'Unit 3 Question Bank',
    file: '/ban/java%20QB%20unit%20-%203.pdf',
    description: 'I/O package and multithreading practice sets.',
  },
  {
    title: 'Unit 4 Question Bank',
    file: '/ban/Graphical%20User%20Interface%20unit%20-%204.pdf',
    description: 'AWT/Swing GUI, event handling, and layout questions.',
  },
  {
    title: 'Combined Question Banks',
    file: '/ban/Combined%20Question%20Banks.pdf',
    description: 'All units merged into a single PDF for quick download.',
  },
];

export default function QuestionBankView() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Quick Access</p>
          <h1 className={styles.title}>Question Banks</h1>
          <p className={styles.subtitle}>
            Download the official PDF question banks for each unit. Open in a new tab or save offline.
          </p>
        </div>
      </header>

      <div className={styles.grid}>
        {PDF_LINKS.map((pdf) => {
          // ensure the base URL and the file path merge cleanly
          const pdfPath = `${import.meta.env.BASE_URL}${pdf.file.replace(/^\//, '')}`;
          return (
            <article key={pdf.title} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardIcon}>📄</div>
                <div>
                  <h2 className={styles.cardTitle}>{pdf.title}</h2>
                  <p className={styles.cardDesc}>{pdf.description}</p>
                </div>
              </div>
              <div className={styles.cardActions}>
                <a className={styles.primaryBtn} href={pdfPath} target="_blank" rel="noreferrer">
                  Open PDF
                </a>
                <a className={styles.secondaryBtn} href={pdfPath} download>
                  Download
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
