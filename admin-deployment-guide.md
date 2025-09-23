# Admin Authentication - Deployment Guide

## 🚀 Deploy Updated Backend with Admin Authentication

### Step 1: Deploy to Render
1. **Commit your changes:**
   ```bash
   cd Backend
   git add .
   git commit -m "Add admin authentication endpoints"
   git push origin main
   ```

2. **Render will automatically redeploy** your server at:
   - URL: https://crypto-pay-api-server.onrender.com

### Step 2: Test Admin Authentication

#### **Admin Login Test:**
```bash
curl -X POST https://crypto-pay-api-server.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "vaibhav.admin@gmail.com",
    "password": "Vaibhav1234"
  }'
```

#### **Expected Response:**
```json
{
  "success": true,
  "message": "Admin login successful",
  "admin": {
    "uid": "zgtQXvwBhMbHR4FcdduoNF7sbhl1",
    "email": "vaibhav.admin@gmail.com",
    "token": "admin-token-zgtQXvwBhMbHR4FcdduoNF7sbhl1"
  },
  "timestamp": "2024-01-XX..."
}
```

### Step 3: Test Admin Endpoints

#### **Get Admin Stats:**
```bash
curl -X GET https://crypto-pay-api-server.onrender.com/api/admin/stats \
  -H "Authorization: Bearer admin-token-zgtQXvwBhMbHR4FcdduoNF7sbhl1"
```

#### **Get Pending Withdrawals:**
```bash
curl -X GET https://crypto-pay-api-server.onrender.com/api/admin/withdrawals \
  -H "Authorization: Bearer admin-token-zgtQXvwBhMbHR4FcdduoNF7sbhl1"
```

#### **Get All Users:**
```bash
curl -X GET https://crypto-pay-api-server.onrender.com/api/admin/users \
  -H "Authorization: Bearer admin-token-zgtQXvwBhMbHR4FcdduoNF7sbhl1"
```

### Step 4: Available Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/admin/login` | Admin login | No |
| GET | `/api/admin/stats` | Dashboard statistics | Yes |
| GET | `/api/admin/withdrawals` | Pending withdrawals | Yes |
| GET | `/api/admin/users` | All users list | Yes |
| GET | `/api/admin/transactions` | All transactions | Yes |
| POST | `/api/admin/withdrawals/:id/execute` | Execute withdrawal | Yes |
| POST | `/api/admin/withdrawals/:id/reject` | Reject withdrawal | Yes |

### Step 5: Frontend Integration

Update your frontend to use the new admin endpoints:

```javascript
// Admin login
const loginResponse = await fetch('https://crypto-pay-api-server.onrender.com/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'vaibhav.admin@gmail.com',
    password: 'Vaibhav1234'
  })
});

const { admin } = await loginResponse.json();
const adminToken = admin.token;

// Use token for protected requests
const statsResponse = await fetch('https://crypto-pay-api-server.onrender.com/api/admin/stats', {
  headers: { 'Authorization': `Bearer ${adminToken}` }
});
```

### Step 6: Security Notes

- **Current Implementation:** Simple token-based authentication
- **Production Recommendation:** Implement JWT tokens with expiration
- **Admin Credentials:** Hardcoded for now, consider environment variables
- **Rate Limiting:** Consider adding rate limiting for admin endpoints

### Step 7: Monitoring

Monitor your admin endpoints:
- Check Render logs for authentication attempts
- Monitor failed login attempts
- Track admin actions for audit purposes

## ✅ Success Indicators

- ✅ Admin login returns success with token
- ✅ Protected endpoints require valid token
- ✅ Invalid credentials return 401 error
- ✅ All admin endpoints return proper JSON responses
- ✅ Server health endpoint shows admin routes
