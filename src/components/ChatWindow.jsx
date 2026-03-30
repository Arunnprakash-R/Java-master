import { useState, useRef, useEffect, useCallback } from 'react';
import TopicHeader from './TopicHeader';
import MessageBubble from './MessageBubble';
import QuickQuestions from './QuickQuestions';
import styles from './ChatWindow.module.css';

export default function ChatWindow({
  unit,
  topic,
  messages,
  isLoading,
  onSend,
  isCompleted,
  onToggleComplete,
  getUnitProgress,
  initialQuestion,
  onClearInitialQuestion,
  onGoHome,
}) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const didSendInitialRef = useRef(false);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-focus textarea on topic change
  useEffect(() => {
    textareaRef.current?.focus();
    didSendInitialRef.current = false;
  }, [topic?.id]);

  // Send initial question from Quick Start
  useEffect(() => {
    if (initialQuestion && !didSendInitialRef.current) {
      didSendInitialRef.current = true;
      onSend(initialQuestion);
      if (onClearInitialQuestion) onClearInitialQuestion();
    }
  }, [initialQuestion, onSend, onClearInitialQuestion]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isLoading) return;
    onSend(text);
    setInput('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [input, isLoading, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    // Auto-grow
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
  };

  const handleQuickQuestion = (text) => {
    onSend(text);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.headerRow}>
        {onGoHome && (
          <button
            className={styles.backBtn}
            onClick={onGoHome}
            aria-label="Go back to topics"
            type="button"
          >
            ← Back
          </button>
        )}
        <div className={styles.headerGrow}>
          <TopicHeader
            unit={unit}
            topic={topic}
            isCompleted={isCompleted}
            onToggleComplete={onToggleComplete}
            getUnitProgress={getUnitProgress}
          />
        </div>
      </div>

      <div className={styles.messagesArea} role="log" aria-label="Chat messages">
        {messages.length === 0 && (
          <>
            <div className={styles.welcomeMessage}>
              <span className={styles.welcomeIcon}>{unit.icon}</span>
              <h2 className={styles.welcomeTitle}>Let&apos;s learn {topic.title}</h2>
              <p className={styles.welcomeSubtitle}>
                Ask me anything about this topic! I&apos;ll explain with real-world analogies,
                working code, and practice problems.
              </p>
            </div>
            <QuickQuestions topicTitle={topic.title} onSend={handleQuickQuestion} />
          </>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <div className={styles.typingIndicator} aria-live="polite" aria-label="AI is typing">
            <div className={styles.typingAvatar}>☕</div>
            <div className={styles.typingBubble}>
              <div className={styles.typingDot} />
              <div className={styles.typingDot} />
              <div className={styles.typingDot} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputBar}>
        <div className={styles.inputWrapper}>
          <textarea
            ref={textareaRef}
            className={`${styles.textarea} ${isLoading ? styles.textareaDisabled : ''}`}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${topic.title}...`}
            disabled={isLoading}
            rows={1}
            aria-label="Type your message"
          />
          <div className={styles.inputHint}>Press Enter to send · Shift+Enter for new line</div>
        </div>
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
