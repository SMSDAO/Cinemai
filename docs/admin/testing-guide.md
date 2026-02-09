# Testing Guide - CinemAi Neo

## 🧪 Running Tests

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run specific test file
npm test -- auth.service.spec.ts
```

### Mobile Tests

```bash
cd mobile

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test
npm test -- NeoGlowButton.test.tsx
```

---

## 📋 Test Structure

### Backend Tests
Located in: `backend/src/**/*.spec.ts`

Example test files:
- `services/auth/auth.service.spec.ts`
- `services/user/user.service.spec.ts`
- `api/auth/auth.controller.spec.ts`

### Mobile Tests
Located in: `mobile/src/**/*.test.tsx`

Example test files:
- `components/NeoGlowButton/NeoGlowButton.test.tsx`
- `screens/Home/HomeScreen.test.tsx`
- `services/auth.service.test.ts`

---

## ✅ Test Checklist

### Authentication Tests
- [ ] User signup
- [ ] User login
- [ ] Admin login
- [ ] Password change
- [ ] Token refresh
- [ ] Logout

### Admin Panel Tests
- [ ] Access dashboard
- [ ] List users
- [ ] Update user
- [ ] Delete user
- [ ] View analytics

### Frontend/Backend Integration
- [ ] API base URL matches (localhost:3000)
- [ ] Authentication flow works end-to-end
- [ ] Password change prompt on first login
- [ ] Admin panel accessible

---

## 🔧 Test Configuration

### Jest Configuration
- Backend: `backend/jest.config.js`
- Mobile: `mobile/jest.config.js`

### Environment Variables
Create `.env.test` files for test environments.

---

## 📊 Coverage Goals

Target: **>80% code coverage**

Check coverage:
```bash
cd backend
npm run test:cov

cd mobile
npm test -- --coverage
```

---

**Last Updated**: 2026-02-09
