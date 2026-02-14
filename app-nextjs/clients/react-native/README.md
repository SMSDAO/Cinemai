# React Native Client for Cinemai Pro Agents

This guide shows how to integrate the Cinemai Pro Agents API into a React Native mobile app (iOS & Android).

## Prerequisites

- Node.js 20+
- React Native development environment
- Expo CLI (recommended) or React Native CLI

## Quick Start

### 1. Create a New React Native App

```bash
npx create-expo-app cinemai-mobile
cd cinemai-mobile
```

OR with React Native CLI:

```bash
npx react-native init CinemaiMobile
cd CinemaiMobile
```

### 2. Install Dependencies

```bash
npm install axios @react-native-async-storage/async-storage
```

### 3. Create API Client

Create `src/services/api.ts`:

```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://your-domain.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem('auth_token', response.data.token);
    return response.data;
  },
  
  signup: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/signup', { email, password, name });
    await AsyncStorage.setItem('auth_token', response.data.token);
    return response.data;
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
  },
};

export const scriptsApi = {
  list: async () => {
    const response = await api.get('/agents/script');
    return response.data;
  },
  
  create: async (data: {
    product: string;
    audience: string;
    tone: string;
    duration: number;
    template?: string;
  }) => {
    const response = await api.post('/agents/script', data);
    return response.data;
  },
};

export const videosApi = {
  list: async () => {
    const response = await api.get('/agents/video');
    return response.data;
  },
  
  create: async (data: {
    scriptId: string;
    avatarStyle: string;
    language: string;
    aspectRatio: string;
  }) => {
    const response = await api.post('/agents/video', data);
    return response.data;
  },
};

export const campaignsApi = {
  list: async () => {
    const response = await api.get('/agents/campaign');
    return response.data;
  },
  
  create: async (data: {
    videoId: string;
    platforms: string[];
    caption: string;
    scheduleTime?: string;
  }) => {
    const response = await api.post('/agents/campaign', data);
    return response.data;
  },
};

export default api;
```

### 4. Example: Login Screen

```typescript
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { authApi } from './services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await authApi.login(email, password);
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} disabled={loading} />
    </View>
  );
}
```

### 5. Example: Create Script Screen

```typescript
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ScrollView } from 'react-native';
import { scriptsApi } from './services/api';

export default function CreateScriptScreen({ navigation }) {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('');
  const [duration, setDuration] = useState('60');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const script = await scriptsApi.create({
        product,
        audience,
        tone,
        duration: parseInt(duration),
      });
      Alert.alert('Success', 'Script created!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create script');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        placeholder="Product Description"
        value={product}
        onChangeText={setProduct}
        multiline
      />
      <TextInput
        placeholder="Target Audience"
        value={audience}
        onChangeText={setAudience}
      />
      <TextInput
        placeholder="Tone (e.g., professional, casual)"
        value={tone}
        onChangeText={setTone}
      />
      <TextInput
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <Button title="Create Script" onPress={handleCreate} disabled={loading} />
    </ScrollView>
  );
}
```

## Authentication Flow

1. User logs in → Token stored in AsyncStorage
2. Token attached to all API requests via interceptor
3. On logout → Token removed from AsyncStorage

## Error Handling

```typescript
try {
  const result = await scriptsApi.create(data);
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
    await authApi.logout();
    navigation.navigate('Login');
  } else {
    Alert.alert('Error', error.message);
  }
}
```

## Platform-Specific Considerations

### iOS

- Info.plist: Add camera/photo library permissions if uploading images
- Keychain: Consider using react-native-keychain for secure token storage

### Android

- AndroidManifest.xml: Add INTERNET permission
- ProGuard: Configure if using code obfuscation

## Deployment

### Expo

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### React Native CLI

```bash
# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [API Reference](../docs/DEV_GUIDE.md#api-reference)

---

**Need help?** Contact support@cinemai.ai
