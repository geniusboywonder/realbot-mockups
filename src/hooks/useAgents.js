import { useState, useEffect } from 'react';
import { initialAgents } from '../data/mockData.js';

export const useAgents = (setChatMessages, setLogs) => {
  const [agents, setAgents] = useState(initialAgents);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => {
        const next = prev.map(agent => {
          let updated = { ...agent };
          const roll = Math.random();

          if (roll < 0.02) {
            const newStatus = ['working', 'idle', 'error'][Math.floor(Math.random() * 3)];
            updated.status = newStatus;

            if (newStatus === 'working') {
              const tasks = ['Research topic', 'Write draft', 'Review content', 'Format output', 'Verify sources'];
              updated.currentTask = tasks[Math.floor(Math.random() * tasks.length)];
              updated.queue.inProgress = 1;
              updated.queue.todo = Math.max(0, updated.queue.todo - 1);

              setChatMessages(m => [...m, {
                id: Date.now(),
                text: `Agent ${agent.id} started: "${updated.currentTask}"`,
                type: 'agent',
              }]);
              setLogs(l => [...l, 
                `{"agent":"Agent${agent.id}","task":"start","level":"info","msg":"Started task: ${updated.currentTask}","ts":"${new Date().toISOString()}"}`
              ]);
            }

            if (newStatus === 'error') {
              updated.queue.failed += 1;
              updated.queue.inProgress = 0;
              const errorMsg = ['Auth failed', 'Rate limited', 'Timeout', 'Missing data'][Math.floor(Math.random() * 4)];
              updated.currentTask = null;

              setChatMessages(m => [...m, {
                id: Date.now(),
                text: `Agent ${agent.id} failed: ${errorMsg}`,
                type: 'error',
              }]);
              setLogs(l => [...l,
                `{"agent":"Agent${agent.id}","task":"error","level":"error","msg":"${errorMsg}","ts":"${new Date().toISOString()}"}`
              ]);
            }

            if (newStatus === 'idle') {
              if (agent.currentTask) {
                updated.queue.done += 1;
                updated.queue.inProgress = 0;
                setChatMessages(m => [...m, {
                  id: Date.now(),
                  text: `Agent ${agent.id} completed: "${agent.currentTask}"`,
                  type: 'success',
                }]);
              }
              updated.currentTask = null;
            }
          }

          if (roll < 0.01 && agent.status === 'working' && !agent.handoff) {
            const otherAgent = Math.floor(Math.random() * 6) + 1;
            if (otherAgent !== agent.id) {
              updated.handoff = `Agent ${otherAgent}`;
              setChatMessages(m => [...m, {
                id: Date.now(),
                text: `Agent ${agent.id} handing off to ${otherAgent}`,
                type: 'handoff',
              }]);
            }
          }

          return updated;
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [setChatMessages, setLogs]);

  const toggleAgentExpand = (id) =>
    setAgents(prev =>
      prev.map(a => (a.id === id ? { ...a, expanded: !a.expanded } : a))
    );

  return { agents, toggleAgentExpand };
};
