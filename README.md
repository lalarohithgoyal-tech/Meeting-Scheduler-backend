Meeting Scheduler Backend

A RESTful backend application for managing users and scheduling meetings. Built with Node.js, Express.js, TypeScript, Sequelize ORM, and MySQL.

1. Project Overview

The Meeting Scheduler Backend provides APIs to create and manage users and meetings.

Features

- Create users with name and email.
- Retrieve user details using user ID.
- Create meetings for registered users.
- Retrieve individual meeting details.
- Retrieve all meetings.
- Filter meetings by user ID and date range.
- Update existing meetings.
- Delete meetings.
- Validate incoming request data.
- Prevent overlapping meetings for the same user.
- Store application data in MySQL using Sequelize ORM.

2. Technologies Used

Technology| Purpose
Node.js| JavaScript runtime
Express.js 5| Backend web framework
TypeScript| Type-safe development
MySQL| Relational database
Sequelize 6| ORM and database operations
sequelize-cli| Database migrations
class-validator| Request validation
class-transformer| DTO transformation
dotenv| Environment configuration
CORS| Cross-origin resource sharing
tsx| TypeScript development execution

3. Installation and Setup

Prerequisites

Install the following:

- Node.js
- npm
- MySQL Server
- Visual Studio Code (recommended)
- Git

Clone the repository

git clone https://github.com/lalarohithgoyal-tech/Meeting-Scheduler-backend.git

Navigate into the project:

cd Meeting-Scheduler-backend

Install dependencies

npm install

4. Environment Setup

Create a ".env" file in the project root.

Example ".env" configuration:

PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=meeting_scheduler
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password

Replace the example values with your local MySQL credentials.

Security: Never commit ".env" to GitHub. Use ".env.example" to document required variables without exposing credentials.

The runtime database connection reads these environment variables through "src/config/database.ts".

5. Database Setup

The application uses MySQL with Sequelize ORM.

Create the database

Open MySQL Workbench or MySQL command line and execute:

CREATE DATABASE meeting_scheduler;

Database connection

The database connection is configured in:

src/config/database.ts

The application uses:

- Database name
- Database username
- Database password
- Database host
- Database port
- MySQL dialect

The server authenticates the database connection before starting the Express application.

Migration configuration: ".sequelizerc" currently points Sequelize CLI to "src/config/config.json". Configure this CLI connection to load credentials securely from environment variables before running migrations. Do not store database passwords in the committed JSON file.

6. Database Migrations and Run Commands

The project uses Sequelize CLI for database migrations.

Run database migrations

npx sequelize-cli db:migrate

Undo the latest migration

npx sequelize-cli db:migrate:undo

Build the TypeScript project

npm run build

Run in development mode

npm run dev

The development command uses:

tsx watch src/server.ts

Start command defined in package.json

npm start

The current start script executes "node server.js". Verify that the compiled JavaScript file is generated at that location before using this command.

7. Project Architecture

The backend follows a modular architecture.

Folder Structure

Meeting-Scheduler-backend/
│
├── migrations/
│
├── src/
│   ├── config/
│   │   ├── config.json
│   │   └── database.ts
│   │
│   ├── middlewares/
│   │   └── validate.ts
│   │
│   ├── modules/
│   │   ├── user/
│   │   │   ├── dto/
│   │   │   ├── index/
│   │   │   ├── model/
│   │   │   ├── routes/
│   │   │   └── service/
│   │   │
│   │   ├── meeting/
│   │   │   ├── dto/
│   │   │   ├── index/
│   │   │   ├── module/
│   │   │   ├── routes/
│   │   │   └── service/
│   │   │
│   │   └── index.ts
│   │
│   └── server.ts
│
├── .env
├── .gitignore
├── .sequelizerc
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

Architecture Explanation

Configuration Layer

Handles database connection and environment configuration.

Routes Layer

Defines HTTP endpoints for user and meeting operations.

Controller Layer

Receives HTTP requests, invokes service methods, and returns JSON responses.

Service Layer

Contains application business logic, including user creation, meeting scheduling, validation, and conflict checking.

Model Layer

Defines Sequelize models and database table structures.

DTO Layer

Defines request validation rules.

Middleware Layer

Validates incoming request data before passing it to controllers.

8. Module-wise Explanation

User Module

Responsible for user management.

Operations:

- Create a user.
- Retrieve a user by ID.
- Check whether an email already exists.

The user email must be unique.

Meeting Module

Responsible for meeting management.

Operations:

- Create a meeting.
- Retrieve a meeting by ID.
- Retrieve all meetings.
- Filter meetings.
- Update a meeting.
- Delete a meeting.
- Check overlapping meeting schedules.

Validation Middleware

Uses class-transformer and class-validator to validate incoming request bodies.

Invalid requests return HTTP 400 with validation error details.

9. Database Design

The application contains two primary Sequelize models.

Users Table

Column| Type| Constraint
id| INTEGER| Primary key, auto increment
name| STRING| NOT NULL
email| STRING| NOT NULL, UNIQUE
createdAt| DATE| Sequelize timestamp
updatedAt| DATE| Sequelize timestamp

Meetings Table

Column| Type| Constraint
id| INTEGER| Primary key, auto increment
title| STRING| NOT NULL
startTime| DATE| NOT NULL
endTime| DATE| NOT NULL
userId| INTEGER| NOT NULL, foreign key
createdAt| DATE| Sequelize timestamp
updatedAt| DATE| Sequelize timestamp

Relationships

One user can have multiple meetings.

Each meeting belongs to one user.

Users
-----
id (Primary Key)
name
email
   |
   | One-to-Many
   |
   v
Meetings
--------
id (Primary Key)
title
startTime
endTime
userId (Foreign Key)

The foreign key connects "meetings.userId" to "users.id".

Design Reasoning

- Unique email prevents duplicate user records.
- Primary keys uniquely identify database records.
- Foreign keys connect meetings to their respective users.
- Required fields prevent incomplete records.
- Timestamps help track record creation and updates.

10. API Documentation

Base URL

http://localhost:5000

All API responses use JSON.

A. Health Check

GET /api

Checks whether the application is running.

Sample response:

{
  "success": true,
  "message": "Meeting Scheduler API is running"
}

B. User APIs

1. Create User

POST /users

Request body:

{
  "name": "Rohith",
  "email": "rohith@example.com"
}

Successful response (201):

{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "Rohith",
    "email": "rohith@example.com"
  }
}

An existing email returns HTTP 400.

2. Get User by ID

GET /users/1

Successful response (200):

{
  "success": true,
  "data": {
    "id": 1,
    "name": "Rohith",
    "email": "rohith@example.com"
  }
}

A missing user returns HTTP 404.

C. Meeting APIs

1. Create Meeting

POST /meetings

Request body:

{
  "title": "Project Discussion",
  "startTime": "2026-11-05T10:00:00.000Z",
  "endTime": "2026-11-05T11:00:00.000Z",
  "userId": 1
}

Successful response (201):

{
  "success": true,
  "message": "Meeting created successfully",
  "data": {
    "id": 1,
    "title": "Project Discussion",
    "startTime": "2026-11-05T10:00:00.000Z",
    "endTime": "2026-11-05T11:00:00.000Z",
    "userId": 1
  }
}

Possible errors:

- 400: Invalid meeting details or time range.
- 404: User not found.
- 409: User already has an overlapping meeting.

2. Get All Meetings

GET /meetings

Successful response:

{
  "success": true,
  "count": 1,
  "data": []
}

3. Get Meeting by ID

GET /meetings/1

Returns the meeting matching the supplied ID.

4. Filter Meetings

Filter by user:

GET /meetings?userId=1

Filter by date range:

GET /meetings?startDate=2026-11-01&endDate=2026-11-30

Combine filters:

GET /meetings?userId=1&startDate=2026-11-01&endDate=2026-11-30

Meetings are returned in ascending start-time order.

5. Update Meeting

PUT /meetings/1

Request body:

{
  "title": "Updated Project Discussion",
  "startTime": "2026-11-05T12:00:00.000Z",
  "endTime": "2026-11-05T13:00:00.000Z",
  "userId": 1
}

Successful response:

{
  "success": true,
  "message": "Meeting updated successfully",
  "data": {}
}

The data object contains the updated meeting record.

6. Delete Meeting

DELETE /meetings/1

Successful response:

{
  "success": true,
  "message": "Meeting deleted successfully"
}

11. Assumptions and Technical Trade-offs

Assumptions

- A user must exist before a meeting can be created.
- Every meeting belongs to one user.
- Meeting start time must be earlier than end time.
- A user cannot have overlapping meetings.
- Date-time values are supplied as valid date strings.
- Email addresses must be unique.

Technical Trade-offs

- Sequelize ORM simplifies database operations but introduces ORM-specific abstractions.
- MySQL provides relational data consistency.
- Modular architecture improves maintainability.
- DTO validation is applied to user creation and meeting creation.
- The current implementation does not include authentication or role-based authorization.
- Meeting overlap checks are performed in application service logic.

12. Bonus Features

The following additional capabilities are implemented:

1. Overlapping meeting prevention.
2. Meeting filtering by user.
3. Meeting filtering by date range.
4. Automatic chronological ordering of meeting results.
5. Request validation using DTOs.
6. Database relationship management through Sequelize.
7. Centralized database configuration.
8. JSON-based API responses.

13. Testing Instructions

The current package.json does not define an automated test suite. The following manual API checks can be performed using Postman.

Test 1: Start the application

npm run dev

Expected console output:

MySQL connected successfully!
Server running on port 5000

Test 2: Check API health

GET http://localhost:5000/api

Expected HTTP status: 200.

Test 3: Create a user

POST http://localhost:5000/users

Verify that the user is created successfully.

Test 4: Retrieve a user

GET http://localhost:5000/users/1

Verify that the correct user is returned.

Test 5: Create a meeting

POST http://localhost:5000/meetings

Verify that the meeting is stored in MySQL.

Test 6: Retrieve meetings

GET http://localhost:5000/meetings

Verify that the meeting appears in the response.

Test 7: Check overlapping meetings

Try creating another meeting for the same user with overlapping start and end times.

Expected HTTP status: 409.

Test 8: Update a meeting

PUT http://localhost:5000/meetings/1

Verify that the meeting details are updated.

Test 9: Delete a meeting

DELETE http://localhost:5000/meetings/1

Verify that the meeting is deleted successfully.

---

Author

Meeting Scheduler Backend

Repository: https://github.com/lalarohithgoyal-tech/Meeting-Scheduler-backend

License

This project currently uses the ISC license declared in package.json.
