import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress } from '../types/learning';

type LearningState = UserProgress & {
  markChapterComplete: (chapterId: string) => void;
  submitQuizScore: (chapterId: string, score: number) => void;
  addPoints: (points: number) => void;
  unlockBadge: (badgeId: string) => void;
  setStudentName: (name: string) => void;
  resetProgress: () => void;
};

const todayIso = () => new Date().toISOString().slice(0, 10);

const touchStreak = (lastActiveDate: string | null, streak: number) => {
  const today = todayIso();
  if (lastActiveDate === today) {
    return { streak, lastActiveDate: today };
  }

  if (!lastActiveDate) {
    return { streak: 1, lastActiveDate: today };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayIso = yesterday.toISOString().slice(0, 10);

  return {
    streak: lastActiveDate === yesterdayIso ? streak + 1 : 1,
    lastActiveDate: today,
  };
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      completedChapterIds: [],
      quizScores: {},
      points: 0,
      streak: 0,
      badges: [],
      studentName: 'Study Hub Learner',
      lastActiveDate: null,

      markChapterComplete: (chapterId) =>
        set((state) => {
          if (state.completedChapterIds.includes(chapterId)) {
            return state;
          }

          const streakData = touchStreak(state.lastActiveDate, state.streak);
          return {
            completedChapterIds: [...state.completedChapterIds, chapterId],
            points: state.points + 20,
            ...streakData,
          };
        }),

      submitQuizScore: (chapterId, score) =>
        set((state) => {
          const streakData = touchStreak(state.lastActiveDate, state.streak);
          return {
            quizScores: { ...state.quizScores, [chapterId]: score },
            points: state.points + score * 2,
            ...streakData,
          };
        }),

      addPoints: (points) => set((state) => ({ points: state.points + points })),

      unlockBadge: (badgeId) =>
        set((state) =>
          state.badges.includes(badgeId) ? state : { badges: [...state.badges, badgeId] }
        ),

      setStudentName: (name) => set({ studentName: name }),

      resetProgress: () =>
        set({
          completedChapterIds: [],
          quizScores: {},
          points: 0,
          streak: 0,
          badges: [],
          studentName: 'Study Hub Learner',
          lastActiveDate: null,
        }),
    }),
    { name: 'study-hub-learning-progress' }
  )
);
