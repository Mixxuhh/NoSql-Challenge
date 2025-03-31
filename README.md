# Social Network API

A RESTful API for a social network application built with Express.js, MongoDB, and Mongoose. This API allows users to share thoughts, react to friends' thoughts, and create a friend list.

## Features

- User Management

  - Create, read, update, and delete users
  - Add and remove friends
  - View user profiles with populated thoughts and friends

- Thought Management

  - Create, read, update, and delete thoughts
  - Reactions to thoughts
  - Automatic timestamp formatting
  - Reaction count tracking

- Data Relationships
  - Users can have many thoughts
  - Thoughts can have many reactions
  - Users can have many friends
  - Automatic cleanup of associated data when users or thoughts are deleted

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB on your local machine
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `POST /api/users/:userId/friends/:friendId` - Add a friend
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend

### Thoughts

- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:id` - Get a single thought by ID
- `POST /api/thoughts` - Create a new thought
- `PUT /api/thoughts/:id` - Update a thought
- `DELETE /api/thoughts/:id` - Delete a thought
- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction

## Data Models

### User

- Username
- Email
- Thoughts (references to Thought model)
- Friends (references to other users)

### Thought

- Thought text
- Created timestamp
- Username (reference to User model)
- Reactions (embedded Reaction schema)
- Reaction count (virtual property)

### Reaction

- Reaction body
- Username
- Created timestamp

## Development

To run the development server with hot reloading:

```bash
npm run dev
```

To build the TypeScript files:

```bash
npm run build
```

## License

MIT
