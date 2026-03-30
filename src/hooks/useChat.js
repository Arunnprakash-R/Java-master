import { useState, useCallback, useRef } from 'react';
import { getResponse } from '../services/localAI';

let messageIdCounter = 0;
const generateId = () => `msg_${Date.now()}_${++messageIdCounter}`;

export function useChat(activeTopic, activeUnit) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef(new Map());

  const loadChatHistory = useCallback((topicId) => {
    const history = chatHistoryRef.current.get(topicId) || [];
    setMessages(history);
  }, []);

  const saveChatHistory = useCallback((topicId, msgs) => {
    chatHistoryRef.current.set(topicId, msgs);
  }, []);

  const send = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: generateId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    if (activeTopic) {
      saveChatHistory(activeTopic.id, updatedMessages);
    }

    setIsLoading(true);

    // Small delay for natural UX feel
    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 600));

    try {
      const topicId = activeTopic ? activeTopic.id : null;
      const topicName = activeTopic ? activeTopic.title : null;
      // Pass chat history (last 10 messages) and topic name to the local responder
      const recentHistory = updatedMessages.slice(-10).map(m => ({
        role: m.role, content: m.content
      }));
      const reply = await getResponse(text.trim(), topicId, recentHistory, topicName);

      const aiMessage = {
        id: generateId(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);

      if (activeTopic) {
        saveChatHistory(activeTopic.id, finalMessages);
      }
    } catch (error) {
      const errorMessage = {
        id: generateId(),
        role: 'assistant',
        content: `⚠️ **Error:** Something went wrong. Please try rephrasing your question.`,
        timestamp: new Date(),
        isError: true,
      };

      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);

      if (activeTopic) {
        saveChatHistory(activeTopic.id, finalMessages);
      }
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, activeTopic, saveChatHistory]);

  const switchTopic = useCallback((topicId) => {
    if (activeTopic) {
      saveChatHistory(activeTopic.id, messages);
    }
    loadChatHistory(topicId);
  }, [activeTopic, messages, saveChatHistory, loadChatHistory]);

  return { messages, isLoading, send, switchTopic };
}
