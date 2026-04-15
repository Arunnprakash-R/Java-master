export interface Chapter {
  id: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
}

export interface Unit {
  id: string;
  title: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface LessonSection {
  heading: string;
  body: string;
}

export interface CodeExample {
  title: string;
  code: string;
  explanation: string;
}

export interface LessonContent {
  title: string;
  summary: string;
  sections: LessonSection[];
  codeExample: CodeExample;
  videoTitle: string;
  videoUrl: string;
}

export interface QuizQuestion {
  id: string;
  chapterId: string;
  type: 'mcq' | 'coding';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  starterCode?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface UserProgress {
  completedChapterIds: string[];
  quizScores: Record<string, number>;
  points: number;
  streak: number;
  badges: string[];
  studentName: string;
  lastActiveDate: string | null;
}