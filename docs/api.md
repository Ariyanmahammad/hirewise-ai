# API Documentation

Base URL:

http://localhost:5000/api

## Auth APIs

### Register User

Endpoint:

POST /auth/register

Request Body:

```json
{
  "name": "Ariyan",
  "email": "ariyan@gmail.com",
  "password": "123456",
  "role": "candidate",
  "phone": "9876543210"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "Ariyan",
    "email": "ariyan@gmail.com",
    "role": "candidate",
    "phone": "9876543210"
  }
}
Login User

Endpoint:

POST /auth/login

Request Body:

{
  "email": "test@gmail.com",
  "password": "123456"
}

Response:

{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@gmail.com",
    "role": "candidate",
    "phone": "9999999999"
  }
}
Get Profile

Endpoint:

GET /auth/profile

Headers:

token: jwt_token_here

Response:

{
  "success": true,
  "message": "Profile accessed successfully",
  "userId": "...",
  "role": "candidate"
}