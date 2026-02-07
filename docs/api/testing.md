# API Testing Guide - CinemAi Neo

This guide covers testing strategies for the CinemAi Neo API.

## 🧪 Testing Tools

### Recommended Tools
- **Postman**: For manual API testing
- **Jest**: For automated testing
- **Supertest**: For HTTP assertions
- **Artillery**: For load testing

## 📦 Postman Collection

Import the CinemAi Neo Postman collection from `docs/api/CinemAiNeo.postman_collection.json`.

### Collection Structure
```
CinemAi Neo API
├── Auth
│   ├── Signup
│   ├── Login
│   ├── Refresh Token
│   └── Logout
├── Users
│   ├── Get Profile
│   ├── Update Profile
│   └── Delete Account
├── Productions
│   ├── Create Production
│   ├── List Productions
│   ├── Get Production
│   └── Run Production
├── Shorts
│   ├── Create Short
│   ├── Generate Hooks
│   └── Generate Variants
├── Social
│   ├── Create Post
│   ├── List Posts
│   └── Get Analytics
└── Billing
    ├── Purchase Trips
    └── Create Subscription
```

## 🔧 Environment Setup

### Local Environment
```json
{
  "base_url": "http://localhost:3001/api",
  "access_token": "",
  "refresh_token": "",
  "user_id": ""
}
```

### Staging Environment
```json
{
  "base_url": "https://staging-api.cinemai.io/api",
  "access_token": "",
  "refresh_token": "",
  "user_id": ""
}
```

## 🧩 Test Scenarios

### 1. Authentication Flow

**Test Case**: User Signup and Login
```javascript
// 1. Signup
POST /auth/signup
{
  "email": "test@example.com",
  "password": "Test123!",
  "name": "Test User"
}

// Expected: 201 Created, tokens returned
// Save access_token to environment

// 2. Get Profile
GET /users/me
Authorization: Bearer {{access_token}}

// Expected: 200 OK, user data returned
```

### 2. Cinema Production Workflow

**Test Case**: Create and Process Production
```javascript
// 1. Create production
POST /productions
Authorization: Bearer {{access_token}}
{
  "title": "Test Production",
  "script": "A test script for validation",
  "photo_url": "https://example.com/photo.jpg",
  "style": "cinematic"
}

// Expected: 201 Created, production ID returned
// Save production_id

// 2. Run production
POST /productions/{{production_id}}/run
Authorization: Bearer {{access_token}}

// Expected: 200 OK, job queued

// 3. Check status
GET /productions/{{production_id}}
Authorization: Bearer {{access_token}}

// Expected: 200 OK, status "processing" or "completed"
```

### 3. Shorts Generation

**Test Case**: Generate Hooks and Variants
```javascript
// 1. Create short
POST /shorts
Authorization: Bearer {{access_token}}
{
  "title": "Test Short",
  "idea": "Testing hook generation",
  "format": "9:16"
}

// Save short_id

// 2. Generate hooks
POST /shorts/{{short_id}}/hooks
Authorization: Bearer {{access_token}}

// Expected: 200 OK, array of hooks returned

// 3. Generate variants
POST /shorts/{{short_id}}/variants
Authorization: Bearer {{access_token}}
{
  "selectedHook": "The first hook",
  "variantCount": 3
}

// Expected: 200 OK, variants queued
```

## ✅ Automated Tests

### Unit Tests

```typescript
// backend/src/services/auth/__tests__/auth.service.spec.ts
describe('AuthService', () => {
  it('should register a new user', async () => {
    const result = await authService.signup({
      email: 'test@example.com',
      password: 'Test123!',
      name: 'Test User'
    });
    
    expect(result.user).toBeDefined();
    expect(result.tokens.accessToken).toBeDefined();
  });
});
```

### Integration Tests

```typescript
// backend/src/api/__tests__/productions.integration.spec.ts
describe('Productions API', () => {
  it('should create a production', async () => {
    const response = await request(app)
      .post('/productions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test',
        script: 'Test script',
        photo_url: 'https://...',
        style: 'cinematic'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data.id).toBeDefined();
  });
});
```

## 🚀 Load Testing

### Artillery Configuration

```yaml
# load-test.yml
config:
  target: 'http://localhost:3001'
  phases:
    - duration: 60
      arrivalRate: 10
      name: Warm up
    - duration: 120
      arrivalRate: 50
      name: Ramp up
    - duration: 60
      arrivalRate: 100
      name: Sustained load

scenarios:
  - name: 'Create Production'
    flow:
      - post:
          url: '/api/productions'
          headers:
            Authorization: 'Bearer {{token}}'
          json:
            title: 'Load Test Production'
            script: 'Test script'
            style: 'cinematic'
```

Run load test:
```bash
artillery run load-test.yml
```

## 📊 Test Coverage

Target coverage: **>80%**

Run coverage:
```bash
cd backend
npm run test:cov
```

## 🐛 Debugging

### Enable Debug Logs
```bash
DEBUG=* npm run dev
```

### API Request Logging
All requests are logged in development mode with:
- Request method and path
- Request body
- Response status
- Response time

## 🔒 Security Testing

### Test Cases
1. **Authentication Bypass**: Try accessing protected routes without token
2. **SQL Injection**: Send malicious SQL in inputs
3. **XSS**: Send script tags in text fields
4. **Rate Limiting**: Make rapid requests to trigger rate limits
5. **Token Expiry**: Use expired tokens

## 📝 Best Practices

1. **Use Environment Variables**: Never hardcode credentials
2. **Clean Up**: Delete test data after tests
3. **Idempotency**: Tests should be repeatable
4. **Isolation**: Tests should not depend on each other
5. **Mock External Services**: Use mocks for AI APIs, Stripe, etc.

## 🆘 Troubleshooting

### Common Issues

**401 Unauthorized**
- Check if token is valid
- Verify token format: `Bearer <token>`
- Token might be expired

**404 Not Found**
- Verify the endpoint URL
- Check if resource ID exists

**500 Internal Server Error**
- Check backend logs
- Verify database connection
- Check Redis connection

---

**Last Updated**: 2026-02-07
