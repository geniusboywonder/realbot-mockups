# Mermaid Diagrams for Agent Manager UI Components

Below are the Mermaid flowchart diagrams representing the Markdown mockups from the Agent Manager UI component analysis.

## 1. `App` (Root Component)

```mermaid
graph TD
    A[App] --> B[Header]
    A --> C[Sidebar]
    A --> D[Main Content Area]
    A --> E[Command Palette<br>(Conditional)]
    B -->|Top| B1[Title, Status, Controls]
    C -->|Left| C1[Navigation]
    D -->|Right| D1[Active Page Content]
    E -->|Overlay| E1[Command Palette Content]
```

## 2. `Header`

```mermaid
graph TD
    A[Header] --> B[Logo]
    A --> C[Agent Manager]
    A --> D[Connection Status]
    A --> E[System Status]
    A --> F[Active: 6/10]
    A --> G[Queue: 15]
    A --> H[Command Palette Toggle<br>⌘K]
    A --> I[Sidebar Toggle<br><-]
    A --> J[Dark Mode Toggle<br>🌙]
```

## 3. `Sidebar` (Expanded)

```mermaid
graph TD
    A[Sidebar] --> B[Dashboard<br>[Icon]]
    A --> C[Tasks<br>[Icon]]
    A --> D[Logs<br>[Icon]]
    A --> E[Artifacts<br>[Icon]]
    A --> F[Analytics<br>[Icon]]
    A --> G[Settings<br>[Icon]]
```

## 4. `Main Content Area`

```mermaid
graph TD
    A[Main Content Area] --> B[Active Page Content]
```

## 5. `Dashboard Page`

```mermaid
graph TD
    A[Dashboard Page] --> B[Dashboard]
    B --> C[Chat/Log Feed]
    B --> D[Agents]
    C --> C1[Messages]
    C --> C2[Input]
    C --> C3[Send Button]
    D --> D1[Agent 1<br>Working]
    D --> D2[Agent 2<br>Idle]
    D --> D3[Agent 3<br>Error]
```

## 6. `Tasks Page`

```mermaid
graph TD
    A[Tasks Page] --> B[Task Monitor]
    B --> C[Filter]
    B --> D[Refresh]
    B --> E[Task Table]
    E --> E1[Task Name]
    E --> E2[Status]
    E --> E3[Agent Role]
    E --> E4[Duration]
    E --> E5[Scrape sites<br>Done<br>Researcher<br>2m 10s]
    E --> E6[Draft post<br>WIP<br>Writer<br>-]
```

## 7. `Logs Page`

```mermaid
graph TD
    A[Logs Page] --> B[System Logs]
    B --> C[Export]
    B --> D[Log Stream]
    D --> D1[Log Entry 1<br>JSONL]
    D --> D2[Log Entry 2<br>JSONL]
```

## 8. `Artifacts Page`

```mermaid
graph TD
    A[Artifacts Page] --> B[Project Artifacts]
    B --> C[Upload]
    B --> D[Tabs]
    B --> E[File Tree]
    D --> D1[Reqs]
    D --> D2[Design]
    D --> D3[Development]
    D --> D4[Testing]
    E --> E1[source_code/]
    E1 --> E2[main.py<br>Download]
    E1 --> E3[utils.py<br>Download]
```

## 9. `Analytics Page`

```mermaid
graph TD
    A[Analytics Page] --> B[Analytics Dashboard]
    B --> C[Last 24 Hours]
    B --> D[Summary Cards]
    B --> E[Charts]
    D --> D1[Total Tasks<br>1,247 +12%]
    D --> D2[Success Rate<br>94.2% +2.1%]
    E --> E1[Task Trend Chart]
    E --> E2[Agent Performance<br>Agent 1: 15]
```

## 10. `Settings Page`

```mermaid
graph TD
    A[Settings Page] --> B[Settings]
    B --> C[Save]
    B --> D[Agent Configuration]
    B --> E[System Configuration]
    D --> D1[Agent 1<br>Upload File]
    D --> D2[Agent 2<br>Upload File]
    E --> E1[Max Agents<br>10]
    E --> E2[Health Interval<br>10000]
```

## 11. `CommandPalette`

```mermaid
graph TD
    A[Command Palette] --> B[Search Input<br>Type a command...]
    A --> C[Commands]
    C --> C1[Go to Dashboard<br>⌘1]
    C --> C2[Toggle Dark Mode<br>⌘D]
```

## 12. `Button`

```mermaid
graph TD
    A[Button] --> B[Standard Button<br>Save Changes]
    A --> C[Icon Button<br>Icon + Refresh]
```

## 13. `Notifications`

```mermaid
graph TD
    A[Notifications<br>Top-Right] --> B[Notification 1<br>Agent 1 started working]
    A --> C[Notification 2<br>Agent 3 encountered an error]
```