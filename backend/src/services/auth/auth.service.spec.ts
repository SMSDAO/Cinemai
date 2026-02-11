import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const result = await authService.signup('test@example.com', 'password123', 'Test User');

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe('test@example.com');
      expect(result.token).toBeDefined();
    });
  });

  describe('login', () => {
    it('should login existing user', async () => {
      const result = await authService.login('test@example.com', 'password123');

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
    });
  });

  describe('refresh', () => {
    it('should refresh token', async () => {
      const result = await authService.refresh('old_token');

      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
    });
  });

  describe('validateToken', () => {
    it('should validate token', async () => {
      const result = await authService.validateToken('valid_token');

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
    });
  });
});
