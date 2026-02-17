# Mobile App Build Guide

Complete guide for building CinemAi Neo mobile applications for iOS and Android.

## Quick Build Commands

### Android APK (One-Line)
```bash
cd mobile && npm run build:apk
```

### iOS IPA (One-Line)
```bash
cd mobile && npm run build:ios
```

---

## Prerequisites

### For Android
- **Node.js 24.x** or higher
- **JDK 17** or higher
- **Android Studio** with SDK 33+
- **Android SDK Build-Tools** 33.0.0+
- **ANDROID_HOME** environment variable set

### For iOS (macOS only)
- **Node.js 24.x** or higher
- **Xcode 15+** with Command Line Tools
- **CocoaPods** 1.12+
- **Ruby 2.7+** (for CocoaPods)
- **iOS Simulator** or physical iOS device

---

## Detailed Build Instructions

### Android APK Build

#### Step 1: Install Dependencies
```bash
cd mobile
npm install --legacy-peer-deps
```

#### Step 2: Clean Previous Builds
```bash
cd android
./gradlew clean
cd ..
```

#### Step 3: Build Release APK
```bash
cd android
./gradlew assembleRelease
cd ..
```

#### Step 4: Locate APK
```
mobile/android/app/build/outputs/apk/release/app-release.apk
```

#### Optional: Build Debug APK
```bash
cd android && ./gradlew assembleDebug
```

### iOS IPA Build

#### Step 1: Install Dependencies
```bash
cd mobile
npm install --legacy-peer-deps
cd ios
pod install
cd ..
```

#### Step 2: Open Xcode Project
```bash
open ios/CinemAiNeo.xcworkspace
```

#### Step 3: Configure Signing
1. Select project in Xcode
2. Go to "Signing & Capabilities"
3. Select your Apple Developer Team
4. Ensure "Automatically manage signing" is checked

#### Step 4: Build Archive
```bash
xcodebuild archive \
  -workspace ios/CinemAiNeo.xcworkspace \
  -scheme CinemAiNeo \
  -archivePath build/CinemAiNeo.xcarchive \
  -configuration Release
```

#### Step 5: Export IPA
```bash
xcodebuild -exportArchive \
  -archivePath build/CinemAiNeo.xcarchive \
  -exportPath build \
  -exportOptionsPlist ios/ExportOptions.plist
```

#### Step 6: Locate IPA
```
mobile/build/CinemAiNeo.ipa
```

---

## Automated Build Scripts

Add these scripts to `mobile/package.json`:

```json
{
  "scripts": {
    "build:apk": "cd android && ./gradlew clean && ./gradlew assembleRelease && cd .. && echo '✅ APK built at: android/app/build/outputs/apk/release/app-release.apk'",
    "build:apk:debug": "cd android && ./gradlew assembleDebug && cd ..",
    "build:ios": "cd ios && pod install && cd .. && xcodebuild -workspace ios/CinemAiNeo.xcworkspace -scheme CinemAiNeo -configuration Release -archivePath build/CinemAiNeo.xcarchive archive && echo '✅ iOS archive built'",
    "build:ios:sim": "xcodebuild -workspace ios/CinemAiNeo.xcworkspace -scheme CinemAiNeo -configuration Debug -sdk iphonesimulator -derivedDataPath build",
    "install:android": "cd android && ./gradlew installRelease && cd ..",
    "install:ios": "cd ios && pod install && cd ..",
    "clean:android": "cd android && ./gradlew clean && cd ..",
    "clean:ios": "cd ios && xcodebuild clean && cd .."
  }
}
```

---

## Code Signing

### Android Signing

#### Generate Keystore
```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore cinemai-release.keystore \
  -alias cinemai-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

#### Configure Gradle
Create `android/gradle.properties`:
```properties
CINEMAI_RELEASE_STORE_FILE=cinemai-release.keystore
CINEMAI_RELEASE_KEY_ALIAS=cinemai-key
CINEMAI_RELEASE_STORE_PASSWORD=your_store_password
CINEMAI_RELEASE_KEY_PASSWORD=your_key_password
```

Add to `android/app/build.gradle`:
```gradle
signingConfigs {
    release {
        storeFile file(CINEMAI_RELEASE_STORE_FILE)
        storePassword CINEMAI_RELEASE_STORE_PASSWORD
        keyAlias CINEMAI_RELEASE_KEY_ALIAS
        keyPassword CINEMAI_RELEASE_KEY_PASSWORD
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### iOS Signing

#### Requirements
- Apple Developer Account ($99/year)
- Distribution Certificate
- Provisioning Profile

#### Create ExportOptions.plist
Create `ios/ExportOptions.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <true/>
</dict>
</plist>
```

---

## Environment Configuration

### Android
Create `android/local.properties`:
```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### iOS
No additional configuration needed if Xcode is installed.

---

## CI/CD Integration

### GitHub Actions for Android
```yaml
name: Build Android APK
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '24'
      - name: Install dependencies
        run: cd mobile && npm install --legacy-peer-deps
      - name: Build APK
        run: cd mobile && npm run build:apk
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-release
          path: mobile/android/app/build/outputs/apk/release/app-release.apk
```

### GitHub Actions for iOS
```yaml
name: Build iOS IPA
on: [push]
jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '24'
      - name: Install dependencies
        run: cd mobile && npm install --legacy-peer-deps
      - name: Install CocoaPods
        run: cd mobile/ios && pod install
      - name: Build iOS
        run: cd mobile && npm run build:ios
```

---

## Distribution

### Android
- **Google Play Store**: Upload APK via Play Console
- **Direct Distribution**: Share APK file (requires "Unknown Sources" enabled)

### iOS
- **App Store**: Upload via Xcode or Transporter app
- **TestFlight**: Beta distribution for testing
- **Enterprise**: Direct distribution with Enterprise certificate

---

## Troubleshooting

### Android

**Problem**: Gradle build fails
```bash
cd mobile/android && ./gradlew --stop
cd .. && npm run clean:android
npm run build:apk
```

**Problem**: SDK not found
```bash
echo "sdk.dir=$ANDROID_HOME" > mobile/android/local.properties
```

### iOS

**Problem**: Pod install fails
```bash
cd mobile/ios
pod cache clean --all
pod deintegrate
pod install
```

**Problem**: Code signing error
- Ensure you're logged into Apple Developer account in Xcode
- Check "Automatically manage signing" in project settings
- Verify provisioning profiles are up to date

---

## Build Optimization

### Android
- **Enable ProGuard**: Reduce APK size by 30-50%
- **Enable R8**: Further optimization
- **Split APKs**: Generate separate APKs per architecture

### iOS
- **Bitcode**: Enable for App Store optimization
- **App Thinning**: Automatic with App Store distribution
- **Symbol Stripping**: Reduce IPA size

---

## Testing Builds

### Android
```bash
# Install on connected device
adb install mobile/android/app/build/outputs/apk/release/app-release.apk

# Check logs
adb logcat | grep CinemAi
```

### iOS
```bash
# Install on simulator
xcrun simctl install booted mobile/build/CinemAiNeo.app

# Install on device (requires Apple Developer)
ios-deploy --bundle mobile/build/CinemAiNeo.app
```

---

## Production Checklist

- [ ] Update version in `package.json`
- [ ] Update Android version code in `build.gradle`
- [ ] Update iOS version in `Info.plist`
- [ ] Test on physical devices (not just emulators)
- [ ] Verify all environment variables are set
- [ ] Test push notifications
- [ ] Test in-app purchases (if applicable)
- [ ] Check crash reporting integration
- [ ] Verify analytics are working
- [ ] Test deep linking
- [ ] Review app permissions
- [ ] Update App Store/Play Store screenshots
- [ ] Write release notes

---

## Support

For issues or questions:
- Create GitHub issue: https://github.com/SMSDAO/Cinemai/issues
- Check React Native docs: https://reactnative.dev/docs/signed-apk-android
- iOS build guide: https://reactnative.dev/docs/publishing-to-app-store
