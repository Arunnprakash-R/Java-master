import type { Badge, LessonContent, QuizQuestion, Unit } from '../types/learning';

const chapter = (id: string, title: string, summary: string, estimatedMinutes: number) => ({
  id,
  title,
  summary,
  estimatedMinutes,
});

export const UNITS: Unit[] = [
  {
    id: 'unit1',
    title: 'Java Fundamentals',
    icon: '☕',
    color: '#fb923c',
    chapters: [
      chapter('u1t1', 'Features of Java & OOP Concepts', 'Why Java is platform independent and how OOP powers reuse.', 12),
      chapter('u1t2', 'Java Virtual Machine (JVM)', 'Understand the runtime engine that executes bytecode.', 10),
      chapter('u1t3', 'Bytecode & Bytecode Interpretation', 'See how source code becomes portable bytecode.', 9),
      chapter('u1t4', 'Data Types', 'Learn primitives, references, and memory-friendly choices.', 10),
      chapter('u1t5', 'Variables, Arrays & Expressions', 'Store values, build arrays, and write readable expressions.', 14),
      chapter('u1t6', 'Operators', 'Master arithmetic, logical, relational, and bitwise operators.', 11),
      chapter('u1t7', 'Control Structures', 'Use if, switch, loops, and branching with confidence.', 16),
      chapter('u1qb', 'Unit 1 Question Bank (Parts A/B/C)', 'Practice recall and exam-style reasoning for Unit 1.', 18),
    ],
  },
  {
    id: 'unit2',
    title: 'Java Classes',
    icon: '🏛️',
    color: '#2dd4bf',
    chapters: [
      chapter('u2t1', 'Abstract Classes & Static Classes', 'Separate shared contracts from implementation details.', 12),
      chapter('u2t2', 'Inner Classes & Packages', 'Organize code and scope classes cleanly.', 11),
      chapter('u2t3', 'Wrapper Classes & Interfaces', 'Bridge primitives with objects and reusable contracts.', 12),
      chapter('u2t4', 'this, super & Access Control', 'Manage inheritance, constructor flow, and visibility.', 14),
      chapter('u2t5', 'Exception Handling & Exception as Objects', 'Model errors and recover gracefully.', 13),
      chapter('u2t6', 'Exception Hierarchy', 'Understand checked vs unchecked exceptions.', 10),
      chapter('u2t7', 'try-catch-finally, throw & throws', 'Write safe, predictable error handling code.', 16),
      chapter('u2qb', 'Unit 2 Question Bank (Parts A/B/C)', 'Revise class-based concepts with exam-style prompts.', 18),
    ],
  },
  {
    id: 'unit3',
    title: 'I/O Package & Multithreading',
    icon: '📁',
    color: '#38bdf8',
    chapters: [
      chapter('u3t1', 'Input Streams & Output Streams', 'Move bytes and characters between programs and files.', 12),
      chapter('u3t2', 'Object Serialization & Deserialization', 'Persist Java objects across runs and systems.', 10),
      chapter('u3t3', 'Filter Streams & Pipe Streams', 'Process stream data through flexible pipelines.', 10),
      chapter('u3t4', 'Thread Life Cycle & Multithreading Basics', 'Learn how concurrent execution flows.', 14),
      chapter('u3t5', 'Multithreading Advantages & Issues', 'Balance speed, safety, and shared state.', 11),
      chapter('u3t6', 'Simple Thread Programs', 'Write and run your first thread examples.', 13),
      chapter('u3t7', 'Thread Synchronization', 'Prevent race conditions and coordinate access.', 16),
      chapter('u3qb', 'Unit 3 Question Bank (Parts A/B/C)', 'Practice streams and threads with confidence.', 18),
    ],
  },
  {
    id: 'unit4',
    title: 'Graphical User Interface',
    icon: '🖥️',
    color: '#a78bfa',
    chapters: [
      chapter('u4t1', 'Introduction to AWT', 'Start building desktop interfaces in Java.', 10),
      chapter('u4t2', 'Layout Managers & Components', 'Arrange forms using responsive layout logic.', 14),
      chapter('u4t3', 'Event Handling', 'React to clicks, typing, and window events.', 14),
      chapter('u4t4', 'Applet Class & Applet Lifecycle', 'Understand the classic web applet lifecycle.', 9),
      chapter('u4t5', 'Passing Parameters & HTML Embedding', 'Configure applets via markup and parameters.', 8),
      chapter('u4t6', 'Swing Components', 'Build richer UI with JFrame, JButton, JLabel, and JPanel.', 16),
      chapter('u4qb', 'Unit 4 Question Bank (Parts A/B/C)', 'Review GUI concepts with short-answer practice.', 18),
    ],
  },
  {
    id: 'unit5',
    title: 'Database Connectivity',
    icon: '🗄️',
    color: '#f43f5e',
    chapters: [
      chapter('u5t1', 'JDBC Architecture', 'Connect Java programs to databases the right way.', 12),
      chapter('u5t2', 'Establishing DB Connection & Connection Interface', 'Open and manage safe database connections.', 14),
      chapter('u5t3', 'Working with Statement & PreparedStatement', 'Run SQL securely and efficiently.', 13),
      chapter('u5t4', 'Creating & Executing SQL Queries', 'Insert, update, and query data with confidence.', 16),
      chapter('u5t5', 'Working with ResultSet', 'Read query results and map them into objects.', 12),
    ],
  },
];

export const ALL_CHAPTERS = UNITS.flatMap((unit) => unit.chapters.map((chapterItem) => ({
  ...chapterItem,
  unitId: unit.id,
  unitTitle: unit.title,
  unitColor: unit.color,
}))); 

export const findUnit = (unitId: string | undefined) => UNITS.find((unit) => unit.id === unitId) ?? null;

export const findChapter = (chapterId: string | undefined) => ALL_CHAPTERS.find((chapterItem) => chapterItem.id === chapterId) ?? null;

const baseSections = (title: string, unitTitle: string) => [
  {
    heading: 'Core idea',
    body: `${title} is one of the essential ideas in ${unitTitle}. Focus on the mental model first, then the syntax becomes easier to remember.`,
  },
  {
    heading: 'What to notice',
    body: `Look for the objects involved, the flow of data, and the error cases. That pattern appears again and again in Java code.`,
  },
  {
    heading: 'Exam shortcut',
    body: `If you need a quick answer, explain the purpose, show one code example, and mention one advantage or limitation.`,
  },
];

const codeByTopic = (chapterTitle: string) => {
  const lowered = chapterTitle.toLowerCase();
  if (lowered.includes('exception')) {
    return {
      title: 'Try-catch example',
      code: `public class Demo {\n  public static void main(String[] args) {\n    try {\n      int value = 10 / 0;\n    } catch (ArithmeticException ex) {\n      System.out.println("Handled: " + ex.getMessage());\n    }\n  }\n}`,
      explanation: 'This shows how Java catches runtime errors and keeps the program alive.',
    };
  }

  if (lowered.includes('thread')) {
    return {
      title: 'Thread example',
      code: `class DemoThread extends Thread {\n  public void run() {\n    System.out.println("Running in parallel");\n  }\n}\n\npublic class Demo {\n  public static void main(String[] args) {\n    new DemoThread().start();\n  }\n}`,
      explanation: 'Starting a thread calls run() asynchronously and enables concurrent execution.',
    };
  }

  if (lowered.includes('jdbc') || lowered.includes('database')) {
    return {
      title: 'JDBC connection sketch',
      code: `Connection connection = DriverManager.getConnection(url, user, password);\nPreparedStatement statement = connection.prepareStatement("SELECT * FROM students");\nResultSet resultSet = statement.executeQuery();`,
      explanation: 'JDBC uses a Connection, a Statement, and a ResultSet to move data between Java and the database.',
    };
  }

  if (lowered.includes('control') || lowered.includes('loop')) {
    return {
      title: 'Control flow example',
      code: `for (int i = 1; i <= 5; i++) {\n  if (i % 2 == 0) {\n    System.out.println(i + " is even");\n  } else {\n    System.out.println(i + " is odd");\n  }\n}`,
      explanation: 'Loops repeat work and conditionals decide which branch to execute.',
    };
  }

  return {
    title: 'Hello Java',
    code: `public class Demo {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`,
    explanation: 'A minimal Java class is a good first checkpoint for syntax and structure.',
  };
};

export const LESSONS: Record<string, LessonContent> = Object.fromEntries(
  ALL_CHAPTERS.map((chapterItem) => {
    const codeExample = codeByTopic(chapterItem.title);
    return [chapterItem.id, {
      title: chapterItem.title,
      summary: chapterItem.summary,
      sections: baseSections(chapterItem.title, chapterItem.unitTitle),
      codeExample,
      videoTitle: `Watch: ${chapterItem.title}`,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    } satisfies LessonContent];
  })
);

const quizCorrectAnswer = (title: string) => {
  const lowered = title.toLowerCase();
  if (lowered.includes('exception')) return 'catch';
  if (lowered.includes('thread')) return 'start';
  if (lowered.includes('jdbc')) return 'connection';
  if (lowered.includes('data types')) return 'primitive';
  if (lowered.includes('control')) return 'branching';
  return 'class';
};

export const QUIZZES: Record<string, QuizQuestion[]> = Object.fromEntries(
  ALL_CHAPTERS.map((chapterItem) => {
    const answer = quizCorrectAnswer(chapterItem.title);
    return [chapterItem.id, [
      {
        id: `${chapterItem.id}-mcq`,
        chapterId: chapterItem.id,
        type: 'mcq',
        prompt: `Which keyword best matches the main idea of ${chapterItem.title}?`,
        options: ['class', answer, 'interface', 'static'],
        correctAnswer: answer,
        explanation: `The correct answer is "${answer}" because it captures the core Java concept for this chapter.`,
        points: 10,
      },
      {
        id: `${chapterItem.id}-code`,
        chapterId: chapterItem.id,
        type: 'coding',
        prompt: `Write a short Java snippet that demonstrates ${chapterItem.title}.`,
        correctAnswer: answer,
        explanation: `A strong answer should mention ${answer} or show the related syntax clearly.`,
        points: 15,
        starterCode: `public class Demo {\n  public static void main(String[] args) {\n    // try the chapter concept here\n  }\n}`,
      },
    ] satisfies QuizQuestion[]];
  })
);

export const BADGES: Badge[] = [
  { id: 'starter', title: 'Starter', description: 'Complete your first chapter.', icon: '🌟' },
  { id: 'momentum', title: 'Momentum', description: 'Reach 25% course completion.', icon: '⚡' },
  { id: 'quiz-ace', title: 'Quiz Ace', description: 'Score 80% or higher on a quiz.', icon: '🏆' },
  { id: 'java-master', title: 'Java Master', description: 'Finish the full path.', icon: '🎓' },
];

export const LEADERBOARD = [
  { name: 'Aarav', points: 1480, streak: 24 },
  { name: 'Isha', points: 1325, streak: 18 },
  { name: 'Riya', points: 1210, streak: 16 },
  { name: 'You', points: 0, streak: 0 },
];

export const getTotalChapters = () => ALL_CHAPTERS.length;

export const getUnitCompletion = (completedChapterIds: string[], unitId: string) => {
  const unit = findUnit(unitId);
  if (!unit) {
    return { done: 0, total: 0, percent: 0 };
  }

  const done = unit.chapters.filter((chapterItem) => completedChapterIds.includes(chapterItem.id)).length;
  const total = unit.chapters.length;
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
};

export const getNextChapter = (completedChapterIds: string[]) =>
  ALL_CHAPTERS.find((chapterItem) => !completedChapterIds.includes(chapterItem.id)) ?? ALL_CHAPTERS[0];
