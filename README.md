# Startup Guide for Running Server and Web Applications

This guide will walk you through the steps to start up your server and web applications using npm and Vite. It will also cover building your web application and using the `cd` command to navigate to the appropriate directories. Let's get started!

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: Make sure you have Node.js installed on your system. You can download it from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

## Starting the Server Application

1. Open a terminal window.

2. Navigate to the directory where your server application is located using the `cd` command:

   ```bash
   cd server
   ```

3. Install the required dependencies for the server application by running:

   ```bash
   npm install
   ```

4. Once the dependencies are installed, you can start the server application using the following command:

   ```bash
   npm start
   ```

   This command will launch your server application and make it accessible at the specified port.

## Starting the Web Application with Vite

1. Open a new terminal window.

2. Navigate to the directory where your web application is located using the `cd` command:

   ```bash
   cd web
   ```

3. Install the required dependencies for the web application by running:

   ```bash
   npm install
   ```

4. After the dependencies are installed, you can start the web application using the following command:

   ```bash
   npm start
   ```

   This command will launch your web application using Vite's development server. You can access the application in your browser at the specified URL.

## Building the Web Application

Before deploying your web application to production, it's a good practice to build it for optimized performance.

1. Open a terminal window.

2. Navigate to the directory of your web application using the `cd` command:

   ```bash
   cd web
   ```

3. To build your web application, use the following command:

   ```bash
   npm run build
   ```

   This command will generate a build of your web application in the `dist` directory.
   
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

## User Data Management Documentation

This comprehensive documentation outlines the various data structures and types used in the user data management system. This system is designed to manage user profiles, posts, comments, notifications, conversations, and other related functionalities within your application.

### User Types

The `UserType` enum defines the different roles or types of users within the system.

- `Staff (0)`: Represents junior moderators who have limited moderation capabilities.
- `Member (1)`: The default type for any registered user.
- `Premium (2)`: Provides special features to members who have purchased premium access.
- `Admin (3)`: Grants full administrative privileges, including access to the admin panel.

### User Data Structure

The `UserData` type encapsulates various details about a user.

- `username`: The unique username chosen by the user during registration.
- `email`: The email address associated with the user's account.
- `fullname`: The user's full name as provided during registration.
- `profile`: An object containing user profile details, including avatar, bio, friends, and notifications.
- `verified`: A boolean indicating whether the user's account has been verified.
- `type`: The user's role type based on the `UserType` enum.
- `id`: A unique identifier assigned to the user.

### Member Information

The `MemberInfo` type provides summarized information about a user.

- `username`: The username of the user.
- `fullname`: The full name of the user.
- `avatar`: The URL to the user's profile avatar image.
- `id`: A unique identifier associated with the user.
- `bio`: A brief biography or description provided by the user.

### Reference and Comment Information

The `ReferenceInfo` type contains information about references in posts or comments.

- `post_id`: The unique identifier of the referenced post, if applicable.
- `mentioned`: A boolean indicating whether the reference is a mention.

The `CommentInfo` type holds details about comments made by users.

- `by`: An object containing the comment author's information, including username, ID, and optionally avatar URL.
- `content`: The content of the comment.
- `id`: A unique identifier assigned to the comment.

### Post Information

The `PostInfo` type defines the structure of a post.

- `title`: The title of the post.
- `img`: The URL to an image associated with the post, if applicable.
- `description`: A description of the post.
- `owner`: An object containing details about the post's owner, including username, avatar URL, ID, and full name.
- `comments`: An array of `CommentInfo` objects representing comments on the post.
- `id`: A unique identifier assigned to the post.
- `likes`: An array of user IDs representing users who have liked the post.
- `createdAt`: A timestamp indicating when the post was created.
- `reference`: An object of type `ReferenceInfo` representing post references.

### Friend and Notification Information

The `FriendInfo` type holds data about a user's friends.

- `fullname`: The full name of the friend.
- `username`: The username of the friend.
- `avatar`: The URL to the friend's profile avatar image, if available.
- `accepted`: A boolean indicating whether a friend request has been accepted.
- `id`: A unique identifier associated with the friend.
- `requested`: A boolean indicating whether a friend request has been sent.

The `NotificationsInfo` type contains information about notifications.

- `name`: The name of the notification.
- `by`: The username of the user who triggered the notification, if applicable.
- `description`: A description of the notification.
- `user_id`: The user ID associated with the notification, if applicable.

### Error Types

The `ErrorTypes` enum lists different error types that can occur.

- `Invalid_Token (0)`: Denotes an invalid authentication token.
- `Expired_Token (1)`: Indicates an expired authentication token.

### Message Information

The `MessageInfo` type represents a message within a conversation.

- `content`: The content of the message.
- `author`: An object containing information about the message author, including username, full name, avatar URL, and ID.
- `createdAt`: A timestamp indicating when the message was created.

### Conversation Types

The `ConversationType` enum defines the different types of conversations.

- `PRIVATE`: Denotes a private one-on-one conversation.
- `GROUP`: Denotes a group conversation.
- `PUBLIC`: Denotes a public conversation.

### Conversation Information

The `ConversationsInfo` type stores information about conversations.

- `type`: The type of the conversation, as defined by the `ConversationType` enum.
- `members`: An array of `MemberInfo` objects representing the members of the conversation.
- `messages`: An array of `MessageInfo` objects representing the messages within the conversation.
- `id`: A unique identifier assigned to the conversation.

### Profile Information

The `ProfileInfo` type holds summarized profile information for a user.

- `username`: The username of the user.
- `fullname`: The full name of the user.
- `bio`: A brief biography or description provided by the user.
- `avatar`: The URL to the user's profile avatar image.

### Inbox List

The `InboxList` type contains information for displaying user inboxes.

- `username`: The username of the user.
- `fullname`: The full name of the user.
- `avatar`: The URL to the user's profile avatar image.
- `id`: A unique identifier associated with the user.
- `bio`: A brief biography or description provided by the user.
- `conversation_id`: The unique identifier of the associated conversation.

### Event Types

The `EventType` enum lists different event types that can occur.

- `NotificationCreate`: Denotes the creation of a new notification.
- `MessageCreate`: Denotes the creation of a new message.
