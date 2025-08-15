import { useState } from 'react';
import Header from './layout/Header.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import Logs from './pages/Logs.jsx';
import Artifacts from './pages/Artifacts.jsx';
import Settings from './pages/Settings.jsx';
import { useAgents } from '../hooks/useAgents.js';
import { useChat } from '../hooks/useChat.js';
import { useArtifacts } from '../hooks/useArtifacts.js';

export default function ModularApp() {
  const [activePage, setActivePage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { chatMessages, setChatMessages, logs, setLogs, chatEndRef, logsEndRef } = useChat();
  const { agents, toggleAgentExpand } = useAgents(setChatMessages, setLogs);
  const { activeArtifactTab, setActiveArtifactTab, expandedFolders, toggleFolder } = useArtifacts();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            agents={agents}
            chatMessages={chatMessages}
            chatEndRef={chatEndRef}
            setChatMessages={setChatMessages}
            toggleAgentExpand={toggleAgentExpand}
          />
        );
      case 'tasks':
        return <Tasks />;
      case 'logs':
        return <Logs logs={logs} logsEndRef={logsEndRef} />;
      case 'artifacts':
        return (
          <Artifacts
            activeArtifactTab={activeArtifactTab}
            setActiveArtifactTab={setActiveArtifactTab}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
          />
        );
      case 'settings':
        return <Settings agents={agents} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          agents={agents}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            sidebarCollapsed={sidebarCollapsed}
          />

          <main className="flex-1 p-6 overflow-y-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}
