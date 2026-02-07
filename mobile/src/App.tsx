/**
 * App Root Component
 * Main entry point with context providers and navigation
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { AppNavigator } from './navigation/AppNavigator';
import { colors } from './theme/tokens';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg.primary} />
      <ThemeProvider>
        <AppProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </AppProvider>
      </ThemeProvider>
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
