# Agent Manager UI: Combined Mermaid Diagram

Below is a single Mermaid flowchart representing the entire Agent Manager UI, combining all component mockups from the provided document.

```mermaid
graph TD
    A[App] -->|Top| B[Header]
    A -->|Left| C[Sidebar]
    A -->|Right| D[Main Content Area]
    A -->|Overlay| E[CommandPalette<br>Conditional]
    A -->|Top-Right| F[Notifications<br>Conditional]

    %% Header
    B --> B1[Logo]
    B --> B2[Agent Manager]
    B --> B3[Connection Status]
    B --> B4[System Status]
    B --> B5[Active: 6/10]
    B --> B6[Queue: 15]
    B --> B7[⌘K]
    B --> B8[Sidebar Toggle]
    B --> B9[Dark Mode Toggle]

    %% Sidebar
    C --> C1[Dashboard<br>Icon]
    C --> C2[Tasks<br>Icon]
    C --> C3[Logs<br>Icon]
    C --> C4[Artifacts<br>Icon]
    C --> C5[Analytics<br>Icon]
    C --> C6[Settings<br>Icon]

    %% Main Content Area
    D -->|Conditional| D1[Dashboard Page]
    D -->|Conditional| D2[Tasks Page]
    D -->|Conditional| D3[Logs Page]
    D -->|Conditional| D4[Artifacts Page]
    D -->|Conditional| D5[Analytics Page]
    D -->|Conditional| D6[Settings Page]

    %% Dashboard Page
    D1 --> D1A[Chat/Log Feed]
    D1 --> D1B[Agents]
    D1A --> D1A1[Messages]
    D1A --> D1A2[Input]
    D1A --> D1A3[Send Button]
    D1B --> D1B1[Agent 1<br>Working]
    D1B --> D1B2[Agent 2<br>Idle]
    D1B --> D1B3[Agent 3<br>Error]

    %% Tasks Page
    D2 --> D2A[Task Monitor]
    D2A --> D2A1[Filter]
    D2A --> D2A2[Refresh]
    D2A --> D2A3[Task Table]
    D2A3 --> D2A3A[Task Name]
    D2A3 --> D2A3B[Status]
    D2A3 --> D2A3C[Agent Role]
    D2A3 --> D2A3D[Duration]
    D2A3 --> D2A3E[Sample Row<br>Scrape sites<br>Done]

    %% Logs Page
    D3 --> D3A[System Logs]
    D3A --> D3A1[Export]
    D3A --> D3A2[Log Stream<br>JSONL Entries]

    %% Artifacts Page
    D4 --> D4A[Project Artifacts]
    D4A --> D4A1[Upload]
    D4A --> D4A2[Tabs]
    D4A --> D4A3[File Tree]
    D4A2 --> D4A2A[Reqs]
    D4A2 --> D4A2B[Design]
    D4A2 --> D4A2C[Development]
    D4A2 --> D4A2D[Testing]
    D4A3 --> D4A3A[source_code/]
    D4A3A --> D4A3A1[main.py<br>Download]
    D4A3A --> D4A3A2[utils.py<br>Download]

    %% Analytics Page
    D5 --> D5A[Analytics Dashboard]
    D5A --> D5A1[Last 24 Hours]
    D5A --> D5A2[Summary Cards]
    D5A --> D5A3[Charts]
    D5A2 --> D5A2A[Total Tasks<br>1,247]
    D5A2 --> D5A2B[Success Rate<br>94.2%]
    D5A3 --> D5A3A[Task Trend Chart]
    D5A3 --> D5A3B[Agent Performance]

    %% Settings Page
    D6 --> D6A[Settings]
    D6A --> D6A1[Save]
    D6A --> D6A2[Agent Configuration]
    D6A --> D6A3[System Configuration]
    D6A2 --> D6A2A[Agent 1<br>Upload File]
    D6A2 --> D6A2B[Agent 2<br>Upload File]
    D6A3 --> D6A3A[Max Agents<br>10]
    D6A3 --> D6A3B[Health Interval<br>10000]

    %% CommandPalette
    E --> E1[Search Input]
    E --> E2[Commands]
    E2 --> E2A[Go to Dashboard<br>⌘1]
    E2 --> E2B[Toggle Dark Mode<br>⌘D]

    %% Button
    A --> G[Button]
    G --> G1[Standard Button<br>Save Changes]
    G --> G2[Icon Button<br>Refresh]

    %% Notifications
    F --> F1[Agent 1 Started]
    F --> F2[Agent 3 Error]
```