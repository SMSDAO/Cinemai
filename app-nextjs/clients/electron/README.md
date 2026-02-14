# Electron Desktop Client for Cinemai Pro Agents

This guide shows how to wrap the Cinemai Pro Agents web app in an Electron shell for desktop (Windows, macOS, Linux).

## Prerequisites

- Node.js 20+
- npm or yarn

## Quick Start

### 1. Create Electron App

```bash
mkdir cinemai-desktop
cd cinemai-desktop
npm init -y
```

### 2. Install Electron

```bash
npm install --save-dev electron electron-builder
```

### 3. Create Main Process

Create `main.js`:

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, 'assets/icon.png'),
  });

  // Load the web app
  const startUrl = process.env.ELECTRON_START_URL || 'https://your-domain.vercel.app';
  mainWindow.loadURL(startUrl);

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

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

### 4. Update package.json

```json
{
  "name": "cinemai-desktop",
  "version": "1.0.0",
  "description": "Cinemai Pro Agents Desktop App",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dev": "ELECTRON_START_URL=http://localhost:3000 electron .",
    "build": "electron-builder",
    "build:mac": "electron-builder --mac",
    "build:win": "electron-builder --win",
    "build:linux": "electron-builder --linux"
  },
  "build": {
    "appId": "com.cinemai.proagents",
    "productName": "Cinemai Pro Agents",
    "directories": {
      "output": "dist"
    },
    "files": [
      "main.js",
      "assets/**/*"
    ],
    "mac": {
      "category": "public.app-category.productivity",
      "target": ["dmg", "zip"]
    },
    "win": {
      "target": ["nsis", "portable"]
    },
    "linux": {
      "target": ["AppImage", "deb"],
      "category": "Productivity"
    }
  },
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.0.0"
  }
}
```

### 5. Add Application Icon

Place icon files in `assets/`:
- `icon.png` (512x512, for all platforms)
- `icon.icns` (macOS)
- `icon.ico` (Windows)
- `icon.png` (Linux)

### 6. Run in Development

```bash
# Start the Next.js dev server first
cd ../app-nextjs
npm run dev

# Then in another terminal
cd ../cinemai-desktop
npm run dev
```

### 7. Build for Production

```bash
# Build for your current platform
npm run build

# Or build for specific platform
npm run build:mac
npm run build:win
npm run build:linux
```

## Advanced Features

### Custom Menu Bar

Create `menu.js`:

```javascript
const { Menu } = require('electron');

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Script',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          // Navigate to /scripts/new
          mainWindow.webContents.send('navigate', '/scripts/new');
        },
      },
      { type: 'separator' },
      { role: 'quit' },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'User Guide',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://your-domain.vercel.app/guides/user');
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
```

Then in `main.js`:

```javascript
require('./menu');
```

### Auto-Updater

Install:

```bash
npm install electron-updater
```

In `main.js`:

```javascript
const { autoUpdater } = require('electron-updater');

app.on('ready', () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
```

### System Tray Icon

```javascript
const { Tray, Menu } = require('electron');
let tray = null;

app.on('ready', () => {
  createWindow();
  
  tray = new Tray(path.join(__dirname, 'assets/tray-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Cinemai', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
});
```

## Distribution

### macOS

```bash
npm run build:mac
```

Output: `dist/Cinemai Pro Agents.dmg`

**Code Signing** (for macOS Gatekeeper):

1. Get Apple Developer certificate
2. Set in `package.json`:

```json
"build": {
  "mac": {
    "identity": "Your Name (XXXXXXXXXX)"
  }
}
```

### Windows

```bash
npm run build:win
```

Output: `dist/Cinemai Pro Agents Setup.exe`

**Code Signing** (for Windows SmartScreen):

1. Get code signing certificate
2. Set in `package.json`:

```json
"build": {
  "win": {
    "certificateFile": "path/to/cert.p12",
    "certificatePassword": "password"
  }
}
```

### Linux

```bash
npm run build:linux
```

Output: 
- `dist/cinemai-pro-agents.AppImage`
- `dist/cinemai-pro-agents.deb`

## Considerations

### Offline Mode

If you want offline functionality:
1. Bundle the Next.js app as static files
2. Serve locally from Electron
3. Use service workers for caching

### Security

- Always set `nodeIntegration: false`
- Enable `contextIsolation: true`
- Validate all URLs before loading
- Don't expose Node APIs to renderer

### Updates

- Use `electron-updater` for automatic updates
- Host updates on S3 or GitHub Releases
- Sign all releases

## Resources

- [Electron Docs](https://www.electronjs.org/docs)
- [Electron Builder](https://www.electron.build/)
- [Electron Security](https://www.electronjs.org/docs/tutorial/security)

---

**Need help?** Contact support@cinemai.ai
