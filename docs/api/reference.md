# API Reference - CinemAi Neo

Complete API documentation for CinemAi Neo backend services.

## 🔌 Base URL

```
Development: http://localhost:3001/api
Staging: https://staging-api.cinemai.io/api
Production: https://api.cinemai.io/api
```

## 🔐 Authentication

All API requests (except auth endpoints) require authentication using JWT tokens:

```
Authorization: Bearer <token>
```

### Token Lifecycle
- **Access Token**: Expires in 15 minutes
- **Refresh Token**: Expires in 7 days

---

## 📋 Endpoints

### Authentication

#### Register
```http
POST /auth/signup
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJ...",
      "refreshToken": "eyJhbGciOiJ..."
    }
  }
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJ..."
}
```

#### Logout
```http
POST /auth/logout
```

---

### Users

#### Get Current User
```http
GET /users/me
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar_url": "https://...",
    "subscription_type": "pro",
    "trips_remaining": 10,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

#### Update Profile
```http
PUT /users/me
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "avatar_url": "https://..."
}
```

#### Delete Account
```http
DELETE /users/me
```

---

### Billing

#### Purchase Trips
```http
POST /billing/trips/purchase
```

**Request Body:**
```json
{
  "quantity": 10,
  "paymentMethodId": "pm_123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tripsPurchased": 10,
    "totalCost": 10.00,
    "tripsRemaining": 20
  }
}
```

#### Create Pro Subscription
```http
POST /billing/subscriptions/create
```

**Request Body:**
```json
{
  "paymentMethodId": "pm_123",
  "plan": "pro"
}
```

#### Get Payment History
```http
GET /billing/payments/history
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

---

### Cinema (Productions)

#### Create Production
```http
POST /productions
```

**Request Body:**
```json
{
  "title": "My First Production",
  "script": "Once upon a time...",
  "photo_url": "https://...",
  "style": "cinematic",
  "productionPackId": "uuid" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My First Production",
    "status": "pending",
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

#### Run Production
```http
POST /productions/:id/run
```

Triggers the Cinema pipeline to process the production.

#### Get Production
```http
GET /productions/:id
```

#### List Productions
```http
GET /productions
```

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `status`: Filter by status (pending, processing, completed, failed)

---

### Assets

#### Get Production Assets
```http
GET /assets?productionId=uuid
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "video",
      "url": "https://...",
      "metadata": {
        "duration": 30,
        "resolution": "1920x1080"
      }
    }
  ]
}
```

---

### Shorts

#### Create Short
```http
POST /shorts
```

**Request Body:**
```json
{
  "title": "My Viral Short",
  "idea": "Top 5 tips for productivity",
  "format": "9:16"
}
```

#### Generate Hooks
```http
POST /shorts/:id/hooks
```

Generates 5-10 hook variants for the short.

**Response:**
```json
{
  "success": true,
  "data": {
    "hooks": [
      "Ever wondered how to 10x your productivity?",
      "The secret to productivity nobody tells you...",
      "Stop wasting time! Here's what actually works..."
    ]
  }
}
```

#### Generate Variants
```http
POST /shorts/:id/variants
```

**Request Body:**
```json
{
  "selectedHook": "Ever wondered how to 10x your productivity?",
  "variantCount": 3
}
```

#### Get Short
```http
GET /shorts/:id
```

---

### Growth (Social Media)

#### Create Social Post
```http
POST /social/posts
```

**Request Body:**
```json
{
  "contentId": "uuid",
  "contentType": "short",
  "platforms": ["tiktok", "instagram"],
  "scheduledAt": "2026-01-01T12:00:00Z",
  "caption": "Check out my new video!"
}
```

#### Get Social Posts
```http
GET /social/posts
```

**Query Parameters:**
- `platform`: Filter by platform
- `status`: Filter by status

#### Get Analytics
```http
GET /analytics/shorts/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "views": 10000,
    "likes": 500,
    "shares": 50,
    "comments": 25,
    "engagement_rate": 5.75,
    "platforms": {
      "tiktok": { "views": 6000, "likes": 300 },
      "instagram": { "views": 4000, "likes": 200 }
    }
  }
}
```

---

### Brand Kit

#### Create Brand Kit
```http
POST /brandkit
```

**Request Body:**
```json
{
  "name": "My Brand",
  "logo_url": "https://...",
  "primary_color": "#00F0FF",
  "secondary_color": "#FF2EF5",
  "font_family": "Inter"
}
```

#### Update Brand Kit
```http
PUT /brandkit/:id
```

#### Get Brand Kits
```http
GET /brandkit
```

---

### Oracle Bridge

#### Sync Data
```http
POST /oracle-bridge/sync
```

**Request Body:**
```json
{
  "entityType": "users",
  "operation": "push"
}
```

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [ ... ]
  }
}
```

## 🚨 Error Codes

- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## 📊 Rate Limits

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1000 requests/hour

## 🔗 Webhooks

CinemAi Neo supports webhooks for real-time event notifications:

### Event Types
- `production.completed`
- `production.failed`
- `short.completed`
- `social.published`

### Webhook Payload
```json
{
  "event": "production.completed",
  "timestamp": "2026-01-01T00:00:00Z",
  "data": { ... }
}
```

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-07
