# Nastachat
The best place for Developers Community!

---

# Nastachat API Documentation

Welcome to the Nastachat API documentation! This API powers the backend functionalities of the Nastachat application, a platform for developers to connect, share posts, add friends, send messages, and more.

## Authentication

All endpoints within the Conversation API require authentication through JSON Web Tokens (JWT). To authenticate, include the JWT in the Authorization header of your requests using the Bearer token scheme.

## Endpoints

### Register User

Registers a new user in the system.

- **URL:** `/register`
- **Method:** POST

**Request:**
```json
{
  "username": "example_user",
  "password": "secretpassword",
  "email": "user@example.com",
  "fullname": "John Doe",
  "type": 1
}
```

**Response:**
```json
{
  "message": "Registered Successfully!"
}
```

### User Login

Logs in a registered user.

- **URL:** `/login`
- **Method:** POST

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secretpassword"
}
```

**Response:**
```json
{
  "token": "your_generated_token_here"
}
```

### Protected Endpoint

A protected endpoint that requires authentication to access.

- **URL:** `/protected`
- **Method:** GET
- **Headers:**
  - `Authorization`: Bearer token

**Response:**
```json
{
  "user": {
    "email": "user@example.com"
  },
  "message": "Protected data"
}
```

### Verify Token

Verifies the authenticity of a JWT.

- **URL:** `/verifyToken`
- **Method:** POST

**Request:**
```json
{
  "token": "your_generated_token_here"
}
```

**Response:**
- Success (200):
  ```json
  {
    "user": {
      "username": "example_user",
      "email": "user@example.com",
      "fullname": "John Doe",
      "type": 1,
      "verified": true,
      "profile": "profile_image_url",
      "id": "your_user_id"
    }
  }
  ```
- Invalid Token (401):
  ```json
  {
    "message": "Invalid token"
  }
  ```

### Get User Information

Retrieves user information using a valid JWT.

- **URL:** `/user`
- **Method:** POST
- **Headers:**
  - `Authorization`: Bearer token

**Response:**
- Success (200):
  ```json
  {
    "username": "example_user",
    "email": "user@example.com",
    "fullname": "John Doe",
    "type": 1,
    "verified": true,
    "profile": "profile_image_url",
    "id": "your_user_id"
  }
  ```
- Invalid Token (401):
  ```json
  {
    "message": "Error"
  }
  ```

...


Please replace placeholders such as `your_generated_token_here` and `your_user_id` with actual values as applicable in your API. Additionally, you might want to expand and modify this documentation to cover any other endpoints and functionalities specific to your application.


## Inbox API

The Inbox API provides functionalities related to managing conversations and friends in the inbox.

### List Inbox Conversations

Retrieves a list of conversations in the user's inbox.

- **URL:** `/inbox/list`
- **Method:** GET
- **Headers:**
  - `Authorization`: Bearer token

**Response:**
- Success (200):
  ```json
  {
    "inbox": [
      {
        "id": "friend_user_id",
        "username": "friend_username",
        "avatar": "friend_avatar_url",
        "fullname": "Friend Full Name",
        "bio": "Friend Bio",
        "conversation_id": "conversation_id"
      },
      // ... more conversation objects ...
    ]
  }
  ```
- Invalid Token (400):
  ```json
  {
    "message": "Invalid Token"
  }
  ```
- Unauthorized Token (401):
  ```json
  {
    "message": "Unauthorized Token"
  }
  ```

**Description:** This endpoint retrieves a list of conversations in the user's inbox. It verifies the user's JWT token and fetches the user's friends. For each friend, it checks if a conversation already exists. If not, it creates a new private conversation between the user and the friend. The response includes information about each friend, including their username, avatar, full name, bio, and the conversation ID.

## Get Conversation by ID

**URL:** `/conversation/:id`  
**Method:** GET  
**URL Parameters:**
- `id` (string, required): The ID of the conversation.

**Headers:**
- `Authorization`: Bearer token

### Response

**Success (200):**
```json
{
  "conversation": {
    "_id": "conversation_id",
    "id": "conversation_id",
    "type": "PRIVATE",
    "members": [
      {
        "id": "user_id",
        "username": "user_username",
        "avatar": "user_avatar_url",
        "fullname": "User Full Name"
      },
      {
        "id": "friend_id",
        "username": "friend_username",
        "avatar": "friend_avatar_url",
        "fullname": "Friend Full Name"
      }
    ],
    // ... other conversation properties ...
  }
}
```

### Errors

**Unauthorized Token (401):**
```json
{
  "message": "Unauthorized Token"
}
```

## Post Message to Conversation

**URL:** `/messages/:id/messages`  
**Method:** POST  
**URL Parameters:**
- `id` (string, required): The ID of the conversation.

**Headers:**
- `Authorization`: Bearer token

**Request Body:**
- `message` (object): The message object containing the message content.

### Response

**Success (200):**
- This endpoint does not return a specific response but triggers WebSocket messages to connected clients.

**Errors**

**Invalid Token (400):**
```json
{
  "message": "Invalid Token"
}
```

**Conversation Not Found (401):**
```json
{
  "message": "Conversation Not Found!"
}
```

#### Description

This endpoint allows users to post messages to a specific conversation. Users must provide a valid JWT token in the `Authorization` header for authentication. The conversation ID is included in the URL parameters. The message content is sent in the request body.

Upon successful authentication and verification of the user's membership in the conversation, the API broadcasts the message content to WebSocket connected clients who are members of the conversation. Additionally, the message is stored in the conversation's messages array.

Please note that this endpoint triggers WebSocket messages and doesn't return a traditional JSON response.

## Verify Conversation Access

Verifies the user's access to a specific conversation.

- **URL:** `/protect_conversation/verify/:id`
- **Method:** GET
- **URL Parameters:**
  - `id` (string, required): The ID of the conversation.
- **Headers:**
  - `Authorization`: Bearer token

### Response

- Success (200):
  ```json
  {
    "message": "Authorized"
  }
  ```

### Errors

- Invalid Token (400):
  ```json
  {
    "message": "Invalid Token"
  }
  ```
- Unauthorized Token (401):
  ```json
  {
    "message": "Unauthorized Token"
  }
  ```
- Unauthorized Conversation (401):
  ```json
  {
    "message": "Unauthorized Conversation"
  }
  ```

#### Description

This endpoint allows users to verify their access to a specific conversation. Users must provide a valid JWT token in the `Authorization` header for authentication. The conversation ID is included in the URL parameters.

Upon successful authentication and verification of the user's ownership of the token, the API checks if the user is a member of the specified conversation. If the user is a member, the response indicates that the user is authorized to access the conversation.

## Get Posts

Retrieves a list of posts.

- **URL:** `/post`
- **Method:** GET
- **Headers:**
  - `Authorization`: Bearer token

### Response

- Success (200):
  ```json
  {
    "posts": [
      {
        "id": "post_id",
        "title": "Post Title",
        "content": "Post Content",
        "owner": {
          "username": "user_username",
          "avatar": "user_avatar_url",
          "id": "user_id",
          "fullname": "User Full Name"
        },
        "comments": []
      },
      // ... more post objects ...
    ]
  }
  ```

### Errors

- Invalid Token (400):
  ```json
  {
    "message": "Invalid Token"
  }
  ```
- User Not Found (401):
  ```json
  {
    "message": "User Not Found"
  }
  ```
- Posts Not Found (400):
  ```json
  {
    "message": "Posts Not Found (you have no posts)"
  }
  ```

#### Description

This endpoint allows users to retrieve a list of posts. Users must provide a valid JWT token in the `Authorization` header for authentication.

Upon successful authentication and verification of the user's existence, the API fetches the user's friends and their IDs. It then retrieves posts from the database belonging to the user and their friends. Each post includes information about the owner (user), such as their username, avatar, full name, and ID.

---

## Create Post

Creates a new post.

- **URL:** `/post`
- **Method:** POST
- **Headers:**
  - `Authorization`: Bearer token
- **Request Body:**
  - `post` (object): The post object containing post details.

### Response

- Success (200):
  ```json
  {
    "post": {
      "id": "post_id",
      "title": "Post Title",
      "content": "Post Content",
      "owner": {
        "username": "user_username",
        "avatar": "user_avatar_url",
        "id": "user_id",
        "fullname": "User Full Name"
      },
      "comments": []
    }
  }
  ```

### Errors

- Invalid Token (400):
  ```json
  {
    "message": "Invalid Token"
  }
  ```
- User Not Found (401):
  ```json
  {
    "message": "User Not Found"
  }
  ```

#### Description

This endpoint allows users to create a new post. Users must provide a valid JWT token in the `Authorization` header for authentication. The post details are sent in the request body.

Upon successful authentication and verification of the user's existence, the API creates a new post using the provided details. The response includes the newly created post, including the owner's (user) information.

Sure! Here's the API documentation for the provided code:

# Likes API Documentation

The Likes API provides endpoints to manage likes for posts. It allows users to like, retrieve likes, and unlike posts. This API uses JSON Web Tokens (JWT) for authentication and interacts with a MongoDB database to store post and user data.

Replace `your-api-domain.com` with the actual domain where the API is hosted.

## Authentication

All requests to the Likes API require authentication using a JSON Web Token (JWT) provided in the `Authorization` header. The token should be in the format: `Bearer <token>`, where `<token>` is the actual JWT.

## Endpoints

### 1. Like a Post

Endpoint: `PUT /:postid/likes`

This endpoint allows users to like a specific post.

#### Request

- Method: `PUT`
- URL: `/likes/:postid/likes`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Parameters:
  - `postid`: ID of the post to be liked

#### Response

- Status Code:
  - `200 OK`: Like added successfully
  - `400 Bad Request`: Invalid token or post ID
  - `401 Unauthorized`: Invalid user token
  - `403 Forbidden`: Post not found
  - `500 Internal Server Error`: Server error

### 2. Get Likes for a Post

Endpoint: `GET /:postid/likes`

This endpoint retrieves the list of users who have liked a specific post.

#### Request

- Method: `GET`
- URL: `/likes/:postid/likes`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Parameters:
  - `postid`: ID of the post to retrieve likes for

#### Response

- Status Code:
  - `200 OK`: Likes retrieved successfully
  - `400 Bad Request`: Invalid token or post ID
  - `401 Unauthorized`: Invalid user token

### 4. Unlike a Post

Endpoint: `DELETE /:postid/likes`

This endpoint allows users to remove their like from a specific post.

#### Request

- Method: `DELETE`
- URL: `/likes/:postid/likes`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Parameters:
  - `postid`: ID of the post to be unliked

#### Response

- Status Code:
  - `200 OK`: Like removed successfully
  - `400 Bad Request`: Invalid token or post ID
  - `401 Unauthorized`: Invalid user token
  - `403 Forbidden`: Post not found
  - `500 Internal Server Error`: Server error
- Response Body: None

### Error Responses

In case of error, the API will return a JSON response with a `message` field explaining the error.

### Example Error Response


{
  "message": "Invalid Token"
}

Of course, here's the updated API documentation with smaller titles:

## User Profile API Documentation

### Introduction

The User Profile API provides an endpoint to retrieve user profile information. It uses JSON Web Tokens (JWT) for authentication and interacts with a MongoDB database to fetch user data.

Replace `your-api-domain.com` with the actual domain where the API is hosted.

### Authentication

All requests to the User Profile API require authentication using a JSON Web Token (JWT) provided in the `Authorization` header. The token should be in the format: `Bearer <token>`, where `<token>` is the actual JWT.

### Endpoint

#### Get User Profile

**Endpoint:** `GET /:id`

This endpoint retrieves user profile information for a specific user.

**Request:**
- Method: `GET`
- URL: `/profile/:id`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Parameters:
  - `id`: ID of the user whose profile information is to be retrieved

**Response:**
- Status Code:
  - `200 OK`: Profile information retrieved successfully
  - `400 Bad Request`: Invalid token or user ID
  - `401 Unauthorized`: Invalid user token
  - `402 Payment Required`: User not found
  - `500 Internal Server Error`: Server error
- Response Body: User profile information including:
  - `username`: Username of the user
  - `fullname`: Full name of the user
  - `avatar`: URL of the user's avatar
  - `bio`: User's bio

### Error Responses

In case of an error, the API will return a JSON response with a `message` field explaining the error.

**Example Error Response:**

{
  "message": "Invalid Token"
}

## Get Own User Profile

**Endpoint:** `GET /@me`

This endpoint retrieves the profile information of the authenticated user.

**Request:**
- Method: `GET`
- URL: `/@me`
- Headers:
  - `Authorization: Bearer <token>` (Required)

**Response:**
- Status Code:
  - `200 OK`: Profile information retrieved successfully
  - `400 Bad Request`: Invalid user token or user data
  - `401 Unauthorized`: Invalid user token
  - `500 Internal Server Error`: Server error
- Response Body: User profile information including:
  - `username`: Username of the user
  - `email`: Email of the user
  - `fullname`: Full name of the user
  - `type`: User type
  - `verified`: Whether the user is verified
  - `profile`: User's profile data
  - `id`: User's ID

## Get User's Friends

**Endpoint:** `GET /friends/@me`

This endpoint retrieves the friends list of the authenticated user.

**Request:**
- Method: `GET`
- URL: `/friends/@me`
- Headers:
  - `Authorization: Bearer <token>` (Required)

**Response:**
- Status Code:
  - `200 OK`: Friends list retrieved successfully
  - `400 Bad Request`: Invalid user token
  - `401 Unauthorized`: Unauthorized token
  - `500 Internal Server Error`: Server error
- Response Body: JSON object containing the user's friends list

## Update Own User Profile

**Endpoint:** `PATCH /@me`

This endpoint allows the authenticated user to update their profile information.

**Request:**
- Method: `PATCH`
- URL: `/@me`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Request Body: JSON object containing the user's updated profile data

**Response:**
- Status Code:
  - `200 OK`: Profile updated successfully
  - `400 Bad Request`: Invalid user token or user data
  - `401 Unauthorized`: Invalid user token
  - `500 Internal Server Error`: Server error

Please ensure to include the required JWT in the `Authorization` header for authenticated requests. Handle the different response codes and messages appropriately in your client application.

## Get User Avatar

**Endpoint:** `GET /:id`

This endpoint retrieves the avatar URL of a specific user.

**Request:**
- Method: `GET`
- URL: `/avatar/:id`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Parameters:
  - `id`: ID of the user whose avatar URL is to be retrieved

**Response:**
- Status Code:
  - `200 OK`: Avatar URL retrieved successfully
  - `400 Bad Request`: Invalid user token or user ID
  - `401 Unauthorized`: Unauthorized token or user not found
  - `500 Internal Server Error`: Server error
- Response Body: JSON object containing the user's avatar URL

### Error Responses

In case of error, the API will return a JSON response with a `message` field explaining the error.

**Example Error Response:**
```json
{
  "message": "Invalid Token Authorization"
}
```

## Friends API Documentation

### Get Random Friends

**Endpoint:** `GET /`

This endpoint retrieves a list of random friends' information for the authenticated user.

**Request:**
- Method: `GET`
- URL: `/friends`
- Headers:
  - `Authorization: Bearer <token>` (Required)

**Response:**
- Status Code:
  - `200 OK`: Friends retrieved successfully
  - `400 Bad Request`: Invalid user token
  - `401 Unauthorized`: Unauthorized token
  - `500 Internal Server Error`: Server error
- Response Body: JSON object containing an array of randomly selected friend profiles:
  - `friends`: An array containing objects with friend information including `username`, `fullname`, `avatar`, and `id`.

### Add Friend

**Endpoint:** `PUT /`

This endpoint allows the authenticated user to send a friend request to another user.

**Request:**
- Method: `PUT`
- URL: `/friends`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Request Body: JSON object containing the `friend` object with friend's `id`.

**Response:**
- Status Code:
  - `200 OK`: Friend request sent successfully
  - `400 Bad Request`: Invalid user token or friend data
  - `403 Forbidden`: User not found
  - `500 Internal Server Error`: Server error

### Accept Friend Request

**Endpoint:** `PUT /:userid/accept`

This endpoint allows the authenticated user to accept a friend request from another user.

**Request:**
- Method: `PUT`
- URL: `/friends/:userid/accept`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Parameters:
  - `userid`: ID of the user whose friend request is being accepted

**Response:**
- Status Code:
  - `200 OK`: Friend request accepted successfully
  - `400 Bad Request`: Invalid user token or user ID
  - `403 Forbidden`: User not found
  - `500 Internal Server Error`: Server error

### Remove Friend

**Endpoint:** `DELETE /:id`

This endpoint allows the authenticated user to remove a friend from their friends list.

**Request:**
- Method: `DELETE`
- URL: `/friends/:id`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Parameters:
  - `id`: ID of the friend to be removed

**Response:**
- Status Code:
  - `200 OK`: Friend removed successfully
  - `400 Bad Request`: Invalid user token or friend ID
  - `401 Unauthorized`: Unauthorized token
  - `402 Payment Required`: User not found
  - `500 Internal Server Error`: Server error

Please ensure to include the required JWT in the `Authorization` header for authenticated requests. Handle the different response codes and messages appropriately in your client application.

## User Profile API Documentation

### Get User Profile

**Endpoint:** `GET /:id`

This endpoint retrieves the profile information of a specific user.

**Request:**
- Method: `GET`
- URL: `/user/:id`
- Headers:
  - `Authorization: Bearer <token>` (Required)
- Parameters:
  - `id`: ID of the user whose profile information is to be retrieved

**Response:**
- Status Code:
  - `200 OK`: Profile information retrieved successfully
  - `400 Bad Request`: Invalid user token or user ID
  - `401 Unauthorized`: Invalid user token
  - `500 Internal Server Error`: Server error
- Response Body: JSON object containing user profile information including:
  - `fullname`: Full name of the user
  - `username`: Username of the user
  - `avatar`: URL of the user's avatar

### Error Responses

In case of error, the API will return a JSON response with a `message` field explaining the error.

**Example Error Response:**
```json
{
  "message": "Invalid Token User"
}
```

### Example Request

```http
GET /user/12345
Authorization: Bearer <your-token>
```

### Example Response

```json
{
  "user": {
    "fullname": "John Doe",
    "username": "johndoe",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

Please ensure to include the required JWT in the `Authorization` header for authenticated requests. Handle the different response codes and messages appropriately in your client application.

## User Notifications API Documentation

### Get User Notifications

**Endpoint:** `GET /notifications`

This endpoint retrieves the notifications for the authenticated user.

**Request:**
- Method: `GET`
- URL: `/user_notifications/notifications`
- Headers:
  - `Authorization: Bearer <token>` (Required)

**Response:**
- Status Code:
  - `200 OK`: Notifications retrieved successfully
  - `401 Unauthorized`: Unauthorized token or invalid token
  - `500 Internal Server Error`: Server error
- Response Body: JSON array containing user notifications.

### Error Responses

In case of error, the API will return a JSON response with a `message` field explaining the error.

**Example Error Response:**
```json
{
  "message": "Unauthorized Token"
}
```

### Example Request

```http
GET /user_notifications/notifications
Authorization: Bearer <your-token>
```

### Example Response

```json
[
  {
    "data": {
      "name": "Friend Request",
      "by": "Nastachat",
      "description": "John Doe sent you a friend request.",
      "user_id": "12345"
    },
    "type": "NOTIFICATION_CREATE"
  },
  {
    "data": {
      "name": "New Message",
      "by": "Nastachat",
      "description": "You have a new message from Jane Smith.",
      "user_id": "67890"
    },
    "type": "NOTIFICATION_CREATE"
  }
]
```

Please ensure to include the required JWT in the `Authorization` header for authenticated requests. Handle the different response codes and messages appropriately in your client application.
