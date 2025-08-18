<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# list all the components that you identified and the required mappings

Here is the list of identified components from both repositories and their required mappings for integration:

***

# Component Inventory and Required Mappings

## 1. botarmy-poc Components

### Identified Core Components

- BotDashboard: Displays bot activity, stats, and summary cards.
- BotList: Shows the list of active bots with controls.
- BotControlPanel: Starts, stops, and configures individual bots.
- BotSettings: Forms and UI for bot configuration preferences.
- UserSettings: User profile and application preferences.
- AnalyticsView: Charts and reports of bot performance.
- NavigationBar: Top-level app navigation.
- ModalDialog: Generic modal for confirmations and alerts.
- ApiService: Encapsulates API communication for bot commands.


## 2. RealBotArmyUI-Bolt Components

### Catalog of UI Components

- DashboardLayout: App main shell and dashboard layout.
- BotCard: Card UI for displaying bot information summaries.
- BotListView: Styled list with selectable bot items.
- ActionButton: Reusable button component with state variations.
- SettingsForm: Inputs, toggles, dropdowns for settings UI.
- UserProfileCard: User info display component.
- AnalyticsChart: Reusable charts and graphs.
- NavBar: Primary navigation bar with menus.
- Modal: Accessible modal dialog with animations.
- CustomHooks: Collection of UI hooks for state and effects.
- AssetIcons: SVG icons and static assets.


## 3. Required Component Mappings

| botarmy-poc Component | RealBotArmyUI-Bolt Equivalent | Mapping Notes | Estimated Req. Customization |
| :-- | :-- | :-- | :-- |
| BotDashboard | DashboardLayout + BotCard | Replace existing layout and cards with modern UI | Minor tweaks to layout props |
| BotList | BotListView | Substitute with styled list view with enhanced UX | Minor integration with API |
| BotControlPanel | ActionButton + Modal | Use reusable buttons and modal for bot controls | Adapt event handlers |
| BotSettings | SettingsForm | Replace forms with enhanced styled form components | Form validation adjustment |
| UserSettings | UserProfileCard + SettingsForm | Combined user profile and settings components | Adjust user context hooks |
| AnalyticsView | AnalyticsChart | Replace charting with reusable, flexible components | Adapt data feeding logic |
| NavigationBar | NavBar | Swap for responsive navigation with improved UX | Styling and routing updates |
| ModalDialog | Modal | Use accessible, animated modal components | Integrate with existing state |
| ApiService | N/A | Utilized internally; interface remains unchanged | Wrap API in hooks for UI sync |


***

**Summary**

- Most botarmy-poc UI components have clear direct correspondences in the Bolt UI.
- Mapping effort focuses on replacing base components with more styled, reusable versions from Bolt.
- Customization primarily involves props and event handler adaptation, with some state and API integration.
- Estimated 15–20 components mapped or replaced, offering modernized appearance and better UX consistency.

***

This component-level mapping guides the step-by-step UI migration and integration tasks.

