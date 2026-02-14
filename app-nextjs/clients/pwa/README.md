# PWA (Progressive Web App) for Cinemai Pro Agents

This guide shows how to configure the Next.js app as a Progressive Web App, enabling installation on mobile and desktop devices.

## What is a PWA?

A Progressive Web App is a web application that can be installed on devices and work offline. Benefits:
- **Installable**: Add to home screen (mobile) or desktop
- **Offline-capable**: Service worker caches assets
- **App-like**: Full-screen, no browser UI
- **Fast**: Pre-cached assets load instantly
- **Cross-platform**: Works on iOS, Android, Windows, macOS, Linux

## Quick Start

### 1. Install Dependencies

```bash
cd app-nextjs
npm install next-pwa
```

### 2. Configure Next.js

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const config: NextConfig = {
  // Your existing config
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(config);
```

### 3. Create Web App Manifest

Create `public/manifest.json`:

```json
{
  "name": "Cinemai Pro Agents",
  "short_name": "Cinemai",
  "description": "AI Agents for Pro Video Campaigns",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#05060A",
  "theme_color": "#00F0FF",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "categories": ["productivity", "business"],
  "shortcuts": [
    {
      "name": "New Script",
      "short_name": "Script",
      "description": "Create a new script",
      "url": "/scripts/new",
      "icons": [{ "src": "/icons/script-icon.png", "sizes": "192x192" }]
    },
    {
      "name": "New Video",
      "short_name": "Video",
      "description": "Generate a new video",
      "url": "/videos/new",
      "icons": [{ "src": "/icons/video-icon.png", "sizes": "192x192" }]
    }
  ]
}
```

### 4. Add Manifest to Layout

Update `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Cinemai Pro Agents",
  description: "AI Agents for Pro Video Campaigns",
  manifest: "/manifest.json",
  themeColor: "#00F0FF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Cinemai",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};
```

### 5. Generate Icons

Use a tool like [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator):

```bash
npx pwa-asset-generator public/icon.svg public/icons --manifest public/manifest.json
```

Or manually create icons in these sizes:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

Also create:
- `apple-touch-icon.png` (180x180) for iOS
- `favicon.ico` for browsers

### 6. Create Service Worker (Optional - Custom)

`next-pwa` auto-generates a service worker, but you can customize it.

Create `public/sw.js`:

```javascript
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  // Custom fetch handling
});
```

### 7. Add Install Prompt

Create a component to prompt users to install:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { NeoGlowButton } from '@/components/neo-glow/neo-glow-button';

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted install');
    }
    
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-card rounded-lg shadow-lg border">
      <p className="mb-2">Install Cinemai Pro Agents</p>
      <NeoGlowButton onClick={handleInstall}>Install App</NeoGlowButton>
    </div>
  );
}
```

### 8. Test PWA

1. Build the app:
   ```bash
   npm run build
   npm start
   ```

2. Open Chrome DevTools → Application → Manifest
3. Check "Service Workers" tab
4. Use Lighthouse to audit PWA score

## Platform-Specific Installation

### iOS (Safari)

1. Visit the web app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Tap "Add"

**Note**: iOS has limited PWA support (no service worker in home screen apps until iOS 16.4+)

### Android (Chrome)

1. Visit the web app in Chrome
2. Tap the menu (⋮)
3. Tap "Install app" or "Add to Home Screen"

OR Chrome will show an install banner automatically.

### Desktop (Chrome/Edge)

1. Visit the web app
2. Click the install icon in the address bar
3. Click "Install"

OR use the install prompt component.

## Offline Capabilities

### Caching Strategies

With `next-pwa`, you can configure caching in `next.config.ts`:

```typescript
withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/your-domain\.vercel\.app\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-images',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
})(config);
```

### Offline Page

Create `app/offline/page.tsx`:

```tsx
export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
        <p className="text-muted-foreground">
          Please check your internet connection and try again.
        </p>
      </div>
    </div>
  );
}
```

## Push Notifications (Optional)

Add push notification support:

1. Get VAPID keys
2. Request permission
3. Subscribe to push service
4. Send notifications from server

See [Web Push Docs](https://web.dev/push-notifications/) for details.

## Best Practices

- ✅ Use HTTPS (required for PWA)
- ✅ Make app responsive
- ✅ Add a 404 page
- ✅ Add offline fallback
- ✅ Optimize images
- ✅ Minimize JavaScript bundle
- ✅ Use lazy loading
- ✅ Test on multiple devices

## Troubleshooting

### Service Worker Not Registering

- Check HTTPS is enabled
- Verify `next-pwa` is installed
- Clear browser cache

### Icons Not Showing

- Verify icon paths in manifest
- Check icon file sizes
- Use PNG format

### Install Prompt Not Showing

- Check PWA criteria are met (HTTPS, manifest, service worker)
- iOS Safari doesn't show automatic prompts
- Some browsers require user interaction first

## Resources

- [Next PWA](https://github.com/shadowwalker/next-pwa)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [PWA Builder](https://www.pwabuilder.com/)

---

**Need help?** Contact support@cinemai.ai
