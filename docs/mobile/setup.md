# Mobile App Setup - CinemAi Neo

## 🚀 Getting Started

### Prerequisites

- Node.js >= 24
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Install dependencies
cd mobile
npm install

# iOS setup
cd ios
pod install
cd ..

# Run iOS
npm run ios

# Run Android
npm run android
```

## 🎨 Development

### Hot Reload

The app supports hot reload for faster development:

```bash
npm start
```

### Debugging

Use React Native Debugger or Chrome DevTools for debugging.

## 📦 Building

### iOS

```bash
cd ios
xcodebuild -workspace CinemAi.xcworkspace -scheme CinemAi -configuration Release
```

### Android

```bash
cd android
./gradlew assembleRelease
```
