# E-commerce API Endpoints Documentation

**Base URL**: `http://localhost:3000/api/v1`

---

## 🏥 Health Check

### Get Health Status
```
GET /health
```
**Auth Required**: No

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-01-12T14:30:00.000Z"
}
```

---

## 🔐 Authentication

### Register
```
POST /api/v1/auth/register
```
**Auth Required**: No  
**Rate Limit**: 5 requests per 15 minutes

**Request Body**:
```json
{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Validation Rules**:
- Username: 3-50 characters, alphanumeric + underscores only
- Password: 8-100 characters, must contain uppercase, lowercase, and number

**Success Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:
- `400` - Username already taken
- `400` - Validation failed

---

### Login
```
POST /api/v1/auth/login
```
**Auth Required**: No  
**Rate Limit**: 5 requests per 15 minutes

**Request Body**:
```json
{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Success Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:
- `404` - No such username
- `401` - Wrong password

---

## 🛍️ Products

### Create Product
```
POST /api/v1/product/make
```
**Auth Required**: No (should be admin in production)

**Request Body**:
```json
{
  "name": "Laptop",
  "category": "Electronics",
  "price": 999
}
```

**Validation Rules**:
- Name: 1-255 characters
- Category: 1-100 characters
- Price: Positive number, max 999999.99

**Success Response** (200):
```json
{
  "message": "Laptop is added"
}
```

---

### Update Product
```
POST /api/v1/product/update
```
**Auth Required**: No (should be admin in production)

**Request Body**:
```json
{
  "id": 1,
  "name": "Gaming Laptop",
  "category": "Electronics",
  "price": 1299
}
```

**Success Response** (200):
```json
{
  "message": "Gaming Laptop has been updated"
}
```

---

### Get Products
```
GET /api/v1/product/get
```
**Auth Required**: No

**Response** (200):
```json
{
  "items": [
    {
      "id": 1,
      "name": "Laptop",
      "category": "Electronics",
      "price": 999,
      "available": true,
      "created_at": "2026-01-12T14:30:00.000Z"
    }
  ]
}
```
**Note**: Returns 15 most recent products

---

### Get Product by ID
```
GET /api/v1/product/:id
```
**Auth Required**: No

**Example**: `GET /api/v1/product/1`

**Success Response** (200):
```json
{
  "product": {
    "id": 1,
    "name": "Laptop",
    "category": "Electronics",
    "price": 999,
    "available": true,
    "created_at": "2026-01-12T14:30:00.000Z"
  }
}
```

**Error Response**:
- `404` - Product not found

---

### Search Products
```
GET /api/v1/product/search?search=laptop
```
**Auth Required**: No

**Query Parameters**:
- `search` (string, required): Search term

**Success Response** (200):
```json
{
  "items": [
    {
      "id": 1,
      "name": "Gaming Laptop",
      "category": "Electronics",
      "price": 1299,
      "available": true,
      "created_at": "2026-01-12T14:30:00.000Z"
    }
  ]
}
```
**Note**: Returns up to 15 results

---

### Search by Category
```
GET /api/v1/product/searchCategory?category=Electronics
```
**Auth Required**: No

**Query Parameters**:
- `category` (string, required): Category name

**Success Response** (200):
```json
{
  "items": [...]
}
```
**Note**: Returns up to 10 results

---

## 🛒 Cart

### View Cart
```
GET /api/v1/cart
```
**Auth Required**: Yes  
**Headers**: `Authorization: Bearer {token}`

**Success Response** (200):
```json
{
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "productId": 1,
      "cartId": 1,
      "product": {
        "id": 1,
        "name": "Laptop",
        "category": "Electronics",
        "price": 999,
        "available": true
      }
    }
  ]
}
```

**Empty Cart Response** (200):
```json
{
  "items": []
}
```

---

### Add Item to Cart
```
POST /api/v1/cart/add
```
**Auth Required**: Yes  
**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "id": 1,
  "quantity": 2
}
```

**Validation Rules**:
- id: Positive integer (product ID)
- quantity: Positive integer, max 100

**Success Response** (200):
```json
{
  "message": "added to cart"
}
```

**Note**: If item already exists, quantity is incremented

---

### Remove Item from Cart
```
POST /api/v1/cart/remove
```
**Auth Required**: Yes  
**Headers**: `Authorization: Bearer {token}`

**Request Body**:
```json
{
  "id": 1
}
```

**Success Response** (200):
```json
{
  "message": "removed from cart"
}
```

**Error Response**:
- `404` - No cart found

---

## 📦 Orders

### Checkout (Create Order)
```
POST /api/v1/order/make
```
**Auth Required**: Yes  
**Headers**: `Authorization: Bearer {token}`

**Request Body**: None (uses current cart)

**Success Response** (200):
```json
{
  "message": "order created",
  "order": {
    "id": 1,
    "userId": 1,
    "status": "pending",
    "created_at": "2026-01-12T14:30:00.000Z"
  }
}
```

**Error Response**:
- `400` - Cart is empty

**Note**: Cart is cleared after successful checkout

---

### Get Orders
```
GET /api/v1/order/get
```
**Auth Required**: Yes  
**Headers**: `Authorization: Bearer {token}`

**Success Response** (200):
```json
{
  "orders": [
    {
      "id": 1,
      "userId": 1,
      "status": "pending",
      "created_at": "2026-01-12T14:30:00.000Z",
      "items": [
        {
          "id": 1,
          "quantity": 2,
          "price": 999,
          "productId": 1,
          "orderId": 1,
          "product": {
            "id": 1,
            "name": "Laptop",
            "category": "Electronics",
            "price": 999,
            "available": true
          }
        }
      ]
    }
  ]
}
```

---

### Update Order Status
```
PATCH /api/v1/order/:id/status
```
**Auth Required**: Yes  
**Headers**: `Authorization: Bearer {token}`

**Example**: `PATCH /api/v1/order/1/status`

**Request Body**:
```json
{
  "status": "shipped"
}
```

**Status Options**:
- `pending`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

**Success Response** (200):
```json
{
  "message": "Order status updated",
  "order": {
    "id": 1,
    "userId": 1,
    "status": "shipped",
    "created_at": "2026-01-12T14:30:00.000Z"
  }
}
```

**Error Responses**:
- `404` - Order not found or unauthorized
- `400` - Invalid status

---

## 🔑 Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Expiry**: 7 days

**Error Responses**:
- `401` - No token provided
- `401` - Invalid or expired token

---

## ⚠️ Rate Limiting

- **Auth endpoints** (`/auth/login`, `/auth/register`): 5 requests per 15 minutes
- **All other endpoints**: 100 requests per minute

**Rate Limit Response** (429):
```json
{
  "message": "Too many requests, please try again later"
}
```

---

## 📋 Common Error Responses

### Validation Error (400)
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "message": "Invalid or expired token"
}
```

### Not Found (404)
```json
{
  "message": "Product not found"
}
```

### Server Error (500)
```json
{
  "message": "Internal server error"
}
```

---

## 🧪 Testing Examples

### Using cURL

**Register**:
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"SecurePass123"}'
```

**Login**:
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"SecurePass123"}'
```

**Add to Cart** (authenticated):
```bash
curl -X POST http://localhost:3000/api/v1/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"id":1,"quantity":2}'
```

**View Cart** (authenticated):
```bash
curl -X GET http://localhost:3000/api/v1/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📝 Notes

1. All endpoints return JSON
2. All POST/PATCH requests require `Content-Type: application/json`
3. Timestamps are in ISO 8601 format
4. IDs are integers
5. Prices are currently integers (will be Decimal in future migration)
6. All routes are prefixed with `/api/v1` for versioning
