import { useState, useRef, useEffect } from 'react';
import { Send, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import Button from './Button.jsx';

const commandSuggestions = [
  'restart all agents',
  'clear agent queue',
  'export logs to file',
  'pause agent simulation',
  'resume agent simulation',
  'reset agent status',
  'show system health',
  'generate report'
];

export default function CommandInput({ onCommand, className = '' }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (input.length > 1) {
      const filtered = commandSuggestions.filter(cmd => 
        cmd.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestion(-1);
    } else {
      setShowSuggestions(false);
    }
  }, [input]);

  const handleSubmit = async (command = input) => {
    if (!command.trim()) return;
    
    setLoading(true);
    setHistory(prev => [command, ...prev.slice(0, 19)]); // Keep last 20
    setInput('');
    setShowSuggestions(false);
    setHistoryIndex(-1);
    
    // Simulate command processing
    setTimeout(() => {
      onCommand({
        id: Date.now(),
        text: `Command: ${command}`,
        type: 'user'
      });
      setLoading(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestion >= 0) {
        handleSubmit(suggestions[selectedSuggestion]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions) {
        setSelectedSuggestion(prev => 
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions) {
        setSelectedSuggestion(prev => 
          prev >= suggestions.length - 1 ? 0 : prev + 1
        );
      } else if (historyIndex >= 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(newIndex >= 0 ? history[newIndex] : '');
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command... (try 'restart' or 'clear')"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            disabled={loading}
          />
          
          {history.length > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400">
              <ChevronUp size={12} />
              <ChevronDown size={12} />
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => handleSubmit()}
          loading={loading}
          disabled={!input.trim()}
          className="px-4"
        >
          <Send size={16} />
        </Button>
      </div>

      {/* Command Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSubmit(suggestion)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                index === selectedSuggestion ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-gray-400" />
                <span className="text-sm">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
