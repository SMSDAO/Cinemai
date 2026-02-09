// Jest setup for mobile tests
// Simple setup without React Native dependencies

global.console = {
  ...console,
  // Silence console logs in tests
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
