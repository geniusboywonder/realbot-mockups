export const initialAgents = () => 
  Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    role: i % 3 === 0 ? 'Researcher' : i % 3 === 1 ? 'Writer' : 'Editor',
    status: 'idle',
    queue: {
      todo: Math.floor(Math.random() * 3),
      inProgress: 0,
      done: Math.floor(Math.random() * 5),
      failed: 0,
    },
    currentTask: null,
    chat: [],
    handoff: null,
    expanded: false,
  }));

export const initialChatMessages = [
  { id: 1, text: 'Agent Manager initialized.', type: 'system' }
];

export const initialLogs = [
  `{"agent":"System","task":"boot","level":"info","msg":"Agent Manager initialized","ts":"${new Date().toISOString()}"}`
];

export const mockTasks = [
  {
    name: 'Scrape news sites',
    status: 'Done',
    role: 'Researcher',
    time: '2m 10s',
    feedback: '—',
  },
  {
    name: 'Draft blog post',
    status: 'WIP',
    role: 'Writer',
    time: '—',
    feedback: 'Waiting on stats',
  },
  {
    name: 'Review content',
    status: 'Waiting',
    role: 'Editor',
    time: '—',
    feedback: 'Awaiting approval',
  },
  {
    name: 'Publish article',
    status: 'To Do',
    role: 'Publisher',
    time: '—',
    feedback: '—',
  },
  {
    name: 'Update metadata',
    status: 'Error',
    role: 'Publisher',
    time: '15s',
    feedback: 'Auth token expired',
  },
];

export const artifactsData = {
  requirements: [
    { name: 'requirements.md', type: 'Requirements Document', url: 'https://yourserver.com/artifacts/requirements/requirements.md' },
    { name: 'use_cases.md', type: 'Use Cases', url: 'https://yourserver.com/artifacts/requirements/use_cases.md' },
    { name: 'user_stories.md', type: 'User Stories', url: 'https://yourserver.com/artifacts/requirements/user_stories.md' },
  ],
  design: [
    { name: 'architecture_diagram.png', type: 'Architecture Diagram', url: 'https://yourserver.com/artifacts/design/architecture_diagram.png' },
    { name: 'system_design.md', type: 'System Design', url: 'https://yourserver.com/artifacts/design/system_design.md' },
    { name: 'ui_mockups.pdf', type: 'UI Mockups', url: 'https://yourserver.com/artifacts/design/ui_mockups.pdf' },
  ],
  development: {
    source_code: [
      { name: 'main.py', type: 'file', url: 'https://yourserver.com/artifacts/development/source_code/main.py' },
      { name: 'utils.py', type: 'file', url: 'https://yourserver.com/artifacts/development/source_code/utils.py' },
      { name: 'components/', type: 'folder', children: [
        { name: 'Button.jsx', type: 'file', url: 'https://yourserver.com/artifacts/development/source_code/components/Button.jsx' },
        { name: 'Modal.jsx', type: 'file', url: 'https://yourserver.com/artifacts/development/source_code/components/Modal.jsx' },
      ]},
    ],
    documentation: [
      { name: 'api_docs.md', type: 'file', url: 'https://yourserver.com/artifacts/development/documentation/api_docs.md' },
      { name: 'setup_guide.md', type: 'file', url: 'https://yourserver.com/artifacts/development/documentation/setup_guide.md' },
    ],
  },
  testing: [
    { name: 'test_plan.md', type: 'Test Plan', url: 'https://yourserver.com/artifacts/testing/test_plan.md' },
    { name: 'test_cases.xlsx', type: 'Test Cases', url: 'https://yourserver.com/artifacts/testing/test_cases.xlsx' },
    { name: 'test_script.sh', type: 'Test Script', url: 'https://yourserver.com/artifacts/testing/test_script.sh' },
  ],
  deployment: [
    { name: 'deploy_script.sh', type: 'Deployment Script', url: 'https://yourserver.com/artifacts/deployment/deploy_script.sh' },
    { name: 'config.json', type: 'Configuration', url: 'https://yourserver.com/artifacts/deployment/config.json' },
    { name: 'docker-compose.yml', type: 'Docker Config', url: 'https://yourserver.com/artifacts/deployment/docker-compose.yml' },
  ],
  maintenance: [
    { name: 'monitoring_report.md', type: 'Monitoring Report', url: 'https://yourserver.com/artifacts/maintenance/monitoring_report.md' },
    { name: 'error_logs.txt', type: 'Error Logs', url: 'https://yourserver.com/artifacts/maintenance/error_logs.txt' },
    { name: 'performance_metrics.json', type: 'Performance Metrics', url: 'https://yourserver.com/artifacts/maintenance/performance_metrics.json' },
  ],
};

export const systemConfigFields = [
  { label: 'Max Agents Allowed', value: '10' },
  { label: 'Health Check Interval (ms)', value: '10000' },
  { label: 'Max Retries', value: '3' },
  { label: 'Queue Size', value: '3' },
  { label: 'Process Interval (ms)', value: '1000' },
  { label: 'Priority Levels', value: '10' },
];
