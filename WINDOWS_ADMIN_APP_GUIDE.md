# Windows Admin App Implementation Guide

Complete guide for building the CinemAi Admin Windows 11 desktop application (`cinimaiadmin.exe`).

## Overview

The CinemAi Admin app is a modern Windows 11 Electron application for managing the CinemAi Neo platform.

### Key Features
1. **User Management & CRM**: View and manage all users, activity tracking
2. **Spam & Billing Control**: Fraud detection, payment management
3. **Analytics & System Fees**: Revenue metrics, usage statistics
4. **Contract & API Management**: API keys, rate limits, webhooks
5. **Email System Integration**: Campaigns, templates, delivery tracking

---

## Quick Start

### One-Line Build
```bash
cd admin-windows && npm install && npm run dist
```

Output: `admin-windows/release/cinimaiadmin-1.0.0.exe`

---

## Architecture

### Technology Stack
- **Electron 28**: Cross-platform desktop framework (Windows 11 optimized)
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Chart.js**: Data visualization
- **Fluent Design**: Windows 11 design system

### Project Structure
```
admin-windows/
├── src/
│   ├── main/               # Electron main process
│   │   ├── index.ts        # Entry point
│   │   ├── window.ts       # Window management
│   │   └── ipc.ts          # IPC handlers
│   ├── renderer/           # React UI
│   │   ├── App.tsx         # Main app component
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   └── services/       # API services
│   └── shared/             # Shared code
│       ├── types.ts        # Type definitions
│       └── constants.ts    # Constants
├── assets/                 # Icons, images
├── config/                 # Configuration files
└── package.json            # Dependencies
```

---

## Implementation Steps

### Step 1: Initialize Project

```bash
cd admin-windows
npm install
```

### Step 2: Main Process Implementation

Create `src/main/index.ts`:

```typescript
import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    title: 'CinemAi Admin',
    icon: path.join(__dirname, '../assets/icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#05060A',
    frame: true,
    titleBarStyle: 'default',
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```

### Step 3: Renderer Process (React UI)

Create `src/renderer/App.tsx`:

```typescript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Billing } from './pages/Billing';
import { Analytics } from './pages/Analytics';
import { API } from './pages/API';
import { Email } from './pages/Email';
import { Sidebar } from './components/Sidebar';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/api" element={<API />} />
            <Route path="/email" element={<Email />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
```

### Step 4: User Management Page

Create `src/renderer/pages/Users.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { adminAPI } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  subscriptionType: string;
  tripsRemaining: number;
  createdAt: string;
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await adminAPI.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-page">
      <header>
        <h1>User Management</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </header>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Subscription</th>
              <th>Trips</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.name || 'N/A'}</td>
                <td>
                  <span className={`badge ${user.subscriptionType.toLowerCase()}`}>
                    {user.subscriptionType}
                  </span>
                </td>
                <td>{user.tripsRemaining}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => viewUser(user.id)}>View</button>
                  <button onClick={() => suspendUser(user.id)}>Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
```

### Step 5: Analytics Dashboard

Create `src/renderer/pages/Analytics.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { adminAPI } from '../services/api';

export const Analytics: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await adminAPI.getAnalytics();
    setStats(data);
  };

  return (
    <div className="analytics-page">
      <h1>Analytics & System Fees</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats?.revenue?.total || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-value">{stats?.users?.active || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Pro Subscribers</h3>
          <p className="stat-value">{stats?.users?.pro || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Productions</h3>
          <p className="stat-value">{stats?.productions?.total || 0}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h3>Revenue Over Time</h3>
          <Line data={stats?.charts?.revenue || {}} />
        </div>
        <div className="chart-card">
          <h3>Usage Statistics</h3>
          <Bar data={stats?.charts?.usage || {}} />
        </div>
      </div>
    </div>
  );
};
```

---

## API Integration

Create `src/renderer/services/api.ts`:

```typescript
import axios from 'axios';

const API_URL = process.env.CINEMAI_API_URL || 'https://api.cinemai.network';
const API_KEY = process.env.CINEMAI_ADMIN_KEY || '';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Admin-Key': API_KEY,
  },
});

export const adminAPI = {
  // User Management
  getUsers: async () => {
    const res = await client.get('/admin/users');
    return res.data;
  },

  getUser: async (id: string) => {
    const res = await client.get(`/admin/users/${id}`);
    return res.data;
  },

  suspendUser: async (id: string) => {
    const res = await client.post(`/admin/users/${id}/suspend`);
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await client.delete(`/admin/users/${id}`);
    return res.data;
  },

  // Analytics
  getAnalytics: async () => {
    const res = await client.get('/admin/analytics');
    return res.data;
  },

  getRevenue: async (period: string) => {
    const res = await client.get(`/admin/revenue?period=${period}`);
    return res.data;
  },

  // Billing
  getPayments: async () => {
    const res = await client.get('/admin/payments');
    return res.data;
  },

  refundPayment: async (id: string) => {
    const res = await client.post(`/admin/payments/${id}/refund`);
    return res.data;
  },

  // API Management
  generateAPIKey: async (name: string) => {
    const res = await client.post('/admin/api-keys', { name });
    return res.data;
  },

  revokeAPIKey: async (id: string) => {
    const res = await client.delete(`/admin/api-keys/${id}`);
    return res.data;
  },

  // Email
  sendEmail: async (campaign: any) => {
    const res = await client.post('/admin/email/send', campaign);
    return res.data;
  },
};
```

---

## Building for Production

### Build EXE

```bash
cd admin-windows
npm run dist
```

This creates:
- `admin-windows/release/cinimaiadmin-1.0.0.exe` (installer)
- `admin-windows/release/win-unpacked/` (portable app)

### Configuration

Create `electron-builder.yml`:

```yaml
appId: com.cinemai.admin
productName: CinemAi Admin
directories:
  output: release
  buildResources: assets
win:
  target:
    - nsis
  icon: assets/icon.ico
  artifactName: cinimaiadmin-${version}.${ext}
nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  createStartMenuShortcut: true
  installerIcon: assets/icon.ico
  uninstallerIcon: assets/icon.ico
```

---

## Styling (Windows 11 Fluent Design)

Create `src/renderer/styles/app.css`:

```css
:root {
  --bg-primary: #05060A;
  --bg-secondary: #0A0C12;
  --bg-tertiary: #14161D;
  --text-primary: #FFFFFF;
  --text-secondary: #8A8F98;
  --accent-cyan: #00F0FF;
  --accent-magenta: #FF2EF5;
  --accent-purple: #6B4CFF;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
}

.app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background: var(--bg-secondary);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 16px;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

/* Acrylic effect (Windows 11 style) */
.card {
  background: var(--bg-secondary);
  backdrop-filter: blur(40px) saturate(150%);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

button {
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 240, 255, 0.4);
}
```

---

## Security Considerations

### Admin Authentication
```typescript
// Add to main process
import Store from 'electron-store';

const store = new Store({
  encryptionKey: 'your-encryption-key',
});

function validateAdminToken(token: string): boolean {
  // Verify with backend
  return true;
}
```

### Role-Based Access
```typescript
enum AdminRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  SUPPORT = 'SUPPORT',
}

function hasPermission(role: AdminRole, action: string): boolean {
  const permissions = {
    ADMIN: ['all'],
    DEVELOPER: ['users', 'api', 'analytics'],
    SUPPORT: ['users', 'email'],
  };
  return permissions[role].includes(action) || permissions[role].includes('all');
}
```

---

## Testing

```bash
# Run in development mode
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build and test
npm run build
npm start
```

---

## Distribution

### NSIS Installer
- Creates Windows installer with setup wizard
- Desktop and Start Menu shortcuts
- Uninstaller included
- Registry entries for file associations

### Auto-Update
```typescript
import { autoUpdater } from 'electron-updater';

autoUpdater.checkForUpdatesAndNotify();
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
npm run clean
rm -rf node_modules
npm install
npm run dist
```

### Icon Not Showing
- Ensure `assets/icon.ico` is 256x256 px
- Use proper ICO format (not PNG renamed)

### Slow Performance
- Enable hardware acceleration
- Optimize React renders with `React.memo`
- Use virtual scrolling for large lists

---

## Roadmap

- [ ] Real-time dashboard updates (WebSockets)
- [ ] Advanced CRM features
- [ ] AI-powered spam detection
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Custom report generation
- [ ] Export data to CSV/Excel
- [ ] Backup and restore functionality

---

## Support

- GitHub Issues: https://github.com/SMSDAO/Cinemai/issues
- Documentation: See `/docs/admin-app/` for detailed docs
