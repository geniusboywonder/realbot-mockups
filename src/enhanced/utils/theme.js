export const theme = {
  primary: { 
    50: '#eff6ff', 
    100: '#dbeafe',
    500: '#3b82f6', 
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a' 
  },
  status: {
    success: { 
      bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
      text: 'text-emerald-700 dark:text-emerald-300', 
      border: 'border-emerald-200 dark:border-emerald-700',
      indicator: 'bg-emerald-500'
    },
    error: { 
      bg: 'bg-red-50 dark:bg-red-900/20', 
      text: 'text-red-700 dark:text-red-300', 
      border: 'border-red-200 dark:border-red-700',
      indicator: 'bg-red-500'
    },
    warning: { 
      bg: 'bg-amber-50 dark:bg-amber-900/20', 
      text: 'text-amber-700 dark:text-amber-300', 
      border: 'border-amber-200 dark:border-amber-700',
      indicator: 'bg-amber-500'
    },
    working: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-700',
      indicator: 'bg-blue-500'
    },
    idle: {
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      text: 'text-gray-600 dark:text-gray-400',
      border: 'border-gray-200 dark:border-gray-700',
      indicator: 'bg-gray-400'
    }
  },
  surfaces: {
    elevated: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
    primary: 'bg-white dark:bg-gray-800',
    secondary: 'bg-gray-50 dark:bg-gray-900',
    tertiary: 'bg-gray-100 dark:bg-gray-700'
  },
  transitions: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-200',
    slow: 'transition-all duration-300'
  },
  animations: {
    fadeIn: 'animate-in fade-in duration-200',
    slideIn: 'animate-in slide-in-from-left duration-300',
    scaleIn: 'animate-in zoom-in duration-150',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse'
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'working':
      return theme.status.working.indicator;
    case 'error':
      return theme.status.error.indicator;
    case 'success':
      return theme.status.success.indicator;
    case 'warning':
      return theme.status.warning.indicator;
    default:
      return theme.status.idle.indicator;
  }
};

export const getStatusTheme = (status) => {
  return theme.status[status] || theme.status.idle;
};

export const getRoleColor = (role) => {
  switch (role) {
    case 'Researcher':
      return 'text-blue-600 dark:text-blue-400';
    case 'Writer':
      return 'text-purple-600 dark:text-purple-400';
    default:
      return 'text-amber-600 dark:text-amber-400';
  }
};
