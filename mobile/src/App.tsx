/**
 * App Root Component
 * Main entry point with context providers and navigation
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast/ToastContext';
import { RootNavigator } from './navigation/RootNavigator';
import { colors } from './theme/tokens';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg.primary} />
      <AuthProvider>
        <ToastProvider>
          <NavigationContainer
            theme={{
              dark: true,
              colors: {
                primary: colors.glow.primary,
                background: colors.bg.primary,
                card: colors.bg.secondary,
                text: colors.text.primary,
                border: colors.glow.primary,
                notification: colors.semantic.info,
              },
            }}
          >
            <RootNavigator />
          </NavigationContainer>
        </ToastProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
});

export default App;
