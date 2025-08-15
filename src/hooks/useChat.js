import { useState, useEffect, useRef } from 'react';
import { initialChatMessages, initialLogs } from '../data/mockData.js';

export const useChat = () => {
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [logs, setLogs] = useState(initialLogs);
  const chatEndRef = useRef(null);
  const logsEndRef = useRef(null);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const msgs = [
        { text: 'All agents responsive.', type: 'system' },
        { text: 'Health check passed.', type: 'system' },
        { text: 'Task queue optimized.', type: 'system' },
      ];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setChatMessages(m => [...m, { id: Date.now(), ...msg }]);
    }, 8000);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [logs]);

  return {
    chatMessages,
    setChatMessages,
    logs,
    setLogs,
    chatEndRef,
    logsEndRef,
  };
};
