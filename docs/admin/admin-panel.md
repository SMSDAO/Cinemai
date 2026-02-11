# Admin Panel Documentation - CinemAi Neo

## 🔐 Admin Access

The CinemAi Neo admin panel provides system administration capabilities for managing users, monitoring system health, and configuring settings.

### Default Admin Credentials

**Email:** `admin@admin.com`  
**Password:** `admin123`

⚠️ **IMPORTANT:** You **must** change the password on first login for security.

---

## 🌐 Accessing the Admin Panel

### Backend API
The admin panel is accessible via REST API endpoints:

**Base URL:** `http://localhost:3000/admin`

### Mobile App
Admin users can access the admin panel from the mobile app after logging in with admin credentials.

---

## 📋 Admin Endpoints

### Dashboard
```http
GET /admin
```
Returns system overview with statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 0,
    "totalProductions": 0,
    "totalShorts": 0,
    "activeSubscriptions": 0,
    "systemHealth": "healthy"
  }
}
```

### User Management

#### List All Users
```http
GET /admin/users
```

#### Get Specific User
```http
GET /admin/users/:id
```

#### Update User
```http
PUT /admin/users/:id
```

#### Delete User
```http
DELETE /admin/users/:id
```

### System Settings

#### Get Settings
```http
GET /admin/settings
```

#### Update Settings
```http
PUT /admin/settings
```

### Analytics

#### Get Analytics Data
```http
GET /admin/analytics
```

---

## 🔄 Password Change Flow

### First Login (Forced Password Change)

1. User logs in with `admin@admin.com` / `admin123`
2. Backend returns `mustChangePassword: true`
3. User is redirected to Change Password screen
4. User must enter current password, new password, and confirm
5. On success, user can access the system

---

## 🚀 Setup Instructions

### 1. Run Database Migrations
```bash
cd backend
npm run migrate
```

### 2. Seed Admin User
```bash
./scripts/seed.sh
```

### 3. Start Backend Server
```bash
cd backend
npm run dev
```

Server starts on `http://localhost:3000`

---

## 🧪 Testing

```bash
cd backend
npm test
```

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-09
