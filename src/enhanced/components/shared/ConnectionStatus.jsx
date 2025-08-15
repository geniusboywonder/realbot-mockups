import { Wifi, WifiOff, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(true);
  const [lastPing, setLastPing] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate connection health check
      const connected = Math.random() > 0.05; // 95% uptime simulation
      setIsConnected(connected);
      if (connected) {
        setLastPing(Date.now());
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const timeSincePing = Math.floor((Date.now() - lastPing) / 1000);

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="flex items-center gap-1">
        {isConnected ? (
          <>
            <Circle className="w-2 h-2 fill-current text-emerald-500 animate-pulse" />
            <Wifi size={14} className="text-emerald-500" />
          </>
        ) : (
          <>
            <Circle className="w-2 h-2 fill-current text-red-500" />
            <WifiOff size={14} className="text-red-500" />
          </>
        )}
      </div>
      <span className={isConnected ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
        {isConnected ? `Connected (${timeSincePing}s ago)` : 'Disconnected'}
      </span>
    </div>
  );
}
