import { useState, useEffect, useCallback } from 'react';
import { SYLLABUS, getTotalTopics } from '../data/syllabus';

const STORAGE_KEY = 'java_progress';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      return new Set(arr);
    }
  } catch {
    // ignore corrupted data
  }
  return new Set();
}

function saveToStorage(completedSet) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSet]));
}

export function useProgress() {
  const [completed, setCompleted] = useState(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(completed);
  }, [completed]);

  const toggleTopic = useCallback((topicId) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, []);

  const isCompleted = useCallback((topicId) => {
    return completed.has(topicId);
  }, [completed]);

  const getUnitProgress = useCallback((unitId) => {
    const unit = SYLLABUS.find((u) => u.id === unitId);
    if (!unit) return { done: 0, total: 0 };
    const done = unit.topics.filter((t) => completed.has(t.id)).length;
    return { done, total: unit.topics.length };
  }, [completed]);

  const overallProgress = (() => {
    const total = getTotalTopics();
    if (total === 0) return 0;
    return Math.round((completed.size / total) * 100);
  })();

  const completedCount = completed.size;

  const unitsCompleted = SYLLABUS.filter((unit) =>
    unit.topics.every((t) => completed.has(t.id))
  ).length;

  const resetProgress = useCallback(() => {
    setCompleted(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    toggleTopic,
    isCompleted,
    getUnitProgress,
    overallProgress,
    completedCount,
    unitsCompleted,
    resetProgress,
    completedTopics: completed,
  };
}
