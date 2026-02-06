# API Reference - CinemAi Neo

## 🔌 Base URL

```
Development: http://localhost:3001/api
Production: https://api.cinemai.io/api
```

## 🔐 Authentication

All API requests require authentication using JWT tokens:

```
Authorization: Bearer <token>
```

## 📋 Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh token

### Users

- `GET /users/me` - Get current user
- `PUT /users/me` - Update current user
- `DELETE /users/me` - Delete current user

### Cinema

- `POST /cinema/productions` - Create new production
- `GET /cinema/productions` - List productions
- `GET /cinema/productions/:id` - Get production details
- `PUT /cinema/productions/:id` - Update production
- `DELETE /cinema/productions/:id` - Delete production

### Shorts

- `POST /shorts` - Create new short
- `GET /shorts` - List shorts
- `GET /shorts/:id` - Get short details

## 📝 Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```
