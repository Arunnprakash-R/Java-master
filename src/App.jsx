import { useState, useEffect, useCallback } from 'react';
import { SYLLABUS } from './data/syllabus';
import { getTopicById } from './data/knowledge';
import { useChat } from './hooks/useChat';
import { useProgress } from './hooks/useProgress';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import ChatWindow from './components/ChatWindow';
import QuestionBankView from './components/QuestionBankView';
import StaticTopicView from './components/StaticTopicView';
import styles from './App.module.css';

export default function App() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeUnit, setActiveUnit] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [initialQuestion, setInitialQuestion] = useState(null);
  const [isQuestionBank, setIsQuestionBank] = useState(false);

  const {
    toggleTopic,
    isCompleted,
    getUnitProgress,
    overallProgress,
    completedCount,
    unitsCompleted,
    resetProgress,
    completedTopics,
  } = useProgress();

  const { messages, isLoading, send, switchTopic } = useChat(activeTopic, activeUnit);

  // Listen for reset progress event from sidebar
  useEffect(() => {
    const handler = () => resetProgress();
    window.addEventListener('resetProgress', handler);
    return () => window.removeEventListener('resetProgress', handler);
  }, [resetProgress]);

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectTopic = useCallback((unit, topic, question = null) => {
    setIsQuestionBank(false);
    setActiveUnit(unit);
    setActiveTopic(topic);
    setInitialQuestion(question);
    switchTopic(topic.id);
  }, [switchTopic]);

  const handleGoHome = useCallback(() => {
    setIsQuestionBank(false);
    setActiveTopic(null);
    setActiveUnit(null);
    setInitialQuestion(null);
  }, []);

  const handleGoQuestionBank = useCallback(() => {
    setIsQuestionBank(true);
    setActiveTopic(null);
    setActiveUnit(null);
    setInitialQuestion(null);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const isHome = !activeTopic && !isQuestionBank;

  // Enrich question bank topics with their static content (syllabus topics lack `content`)
  const topicWithContent = activeTopic?.id?.toLowerCase().includes('qb')
    ? getTopicById(activeTopic.id) || activeTopic
    : activeTopic;

  return (
    <div className={styles.appLayout}>
      <Sidebar
        syllabus={SYLLABUS}
        activeTopic={activeTopic}
        onSelectTopic={handleSelectTopic}
        onGoHome={handleGoHome}
        onGoQuestionBank={handleGoQuestionBank}
        completedTopics={completedTopics}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        getUnitProgress={getUnitProgress}
        isHome={isHome}
        isQuestionBank={isQuestionBank}
      />

      <div className={styles.mainArea}>
        <div className={styles.topBar}>
          <button
            className={styles.hamburger}
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            ☰
          </button>
          <span className={styles.topBarTitle}>
            <span className={styles.topBarTitleAccent}>JavaMaster</span>
            {isQuestionBank && ' — Question Bank'}
            {activeTopic && !isQuestionBank && (
              <> — {activeUnit?.title} › {activeTopic.title}</>
            )}
          </span>
          <div className={styles.topBarBadges}>
            <span className={styles.badge}>5 Units · 36 Topics</span>
            <span className={styles.badgeSuccess}>Offline-ready</span>
          </div>
        </div>

        <div className={styles.content}>
          {isQuestionBank ? (
            <QuestionBankView />
          ) : isHome ? (
            <HomeView
              overallProgress={overallProgress}
              completedCount={completedCount}
              unitsCompleted={unitsCompleted}
              getUnitProgress={getUnitProgress}
              onSelectTopic={handleSelectTopic}
            />
          ) : activeTopic?.id?.toLowerCase().includes('qb') ? (
            <StaticTopicView
              unit={activeUnit}
              topic={topicWithContent}
              onGoHome={handleGoHome}
              onToggleComplete={toggleTopic}
              isCompleted={isCompleted(activeTopic.id)}
            />
          ) : (
            <ChatWindow
              unit={activeUnit}
              topic={activeTopic}
              messages={messages}
              isLoading={isLoading}
              onSend={send}
              isCompleted={isCompleted(activeTopic.id)}
              onToggleComplete={toggleTopic}
              getUnitProgress={getUnitProgress}
              initialQuestion={initialQuestion}
              onClearInitialQuestion={() => setInitialQuestion(null)}
              onGoHome={handleGoHome}
            />
          )}
        </div>
      </div>
    </div>
  );
}
