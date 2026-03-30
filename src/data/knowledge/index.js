// Knowledge Base Index — Combines all units and provides search utilities
import unit1Knowledge from './unit1.js';
import unit2Knowledge from './unit2.js';
import unit3Knowledge from './unit3.js';
import unit4Knowledge from './unit4.js';
import unit5Knowledge from './unit5.js';

// All topics combined
export const allTopics = [
  ...unit1Knowledge,
  ...unit2Knowledge,
  ...unit3Knowledge,
  ...unit4Knowledge,
  ...unit5Knowledge,
];

// Find topic by ID
export function getTopicById(topicId) {
  return allTopics.find(t => t.topicId === topicId) || null;
}

// Find topics matching a search query (keyword-based)
export function searchTopics(query) {
  if (!query || query.trim().length === 0) return [];

  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 1);

  if (words.length === 0) return [];

  const scored = allTopics.map(topic => {
    let score = 0;

    // Check title match
    const titleLower = topic.title.toLowerCase();
    words.forEach(word => {
      if (titleLower.includes(word)) score += 10;
    });

    // Check keyword match
    topic.keywords.forEach(kw => {
      const kwLower = kw.toLowerCase();
      words.forEach(word => {
        if (kwLower === word) score += 8;
        else if (kwLower.includes(word)) score += 4;
        else if (word.includes(kwLower)) score += 3;
      });
    });

    return { topic, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.topic);
}

// Find matching common question for a given topic
export function findMatchingQuestion(topic, userQuery) {
  if (!topic || !topic.commonQuestions) return null;

  const queryLower = userQuery.toLowerCase();

  for (const cq of topic.commonQuestions) {
    for (const pattern of cq.patterns) {
      if (queryLower.includes(pattern.toLowerCase())) {
        return cq.answer;
      }
    }
  }
  return null;
}

// Search across all topics' common questions
export function searchAllQuestions(userQuery) {
  if (!userQuery || userQuery.trim().length < 3) return null;

  const queryLower = userQuery.toLowerCase();

  for (const topic of allTopics) {
    if (!topic.commonQuestions) continue;
    for (const cq of topic.commonQuestions) {
      for (const pattern of cq.patterns) {
        if (queryLower.includes(pattern.toLowerCase())) {
          return { answer: cq.answer, topic };
        }
      }
    }
  }
  return null;
}

export default allTopics;
