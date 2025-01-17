# API Documentation

**Brainwave** is a virtual lab platform designed to support students in mastering Computational Thinking concepts. It provides an interactive, flexible, and structured learning environment that includes features such as personalized study roadmaps, real-time progress tracking, and hands-on simulations. Brainwave aims to enhance students' understanding of abstract concepts while fostering a more engaging and effective learning experience.

## Brainwave Project

[II3140_Laporan UAS PAWM_18222021_18222091](./II3140_Laporan%20UAS%20PAWM_18222021_18222091.pdf)

## Deployment and Repository Links

| Description                   | Link                                                    |
|-------------------------------|--------------------------------------------------------|
| Link deployment               | [xxxxxx.web.id](https://xxxxxx) |
| Link deployment frontend      | [xxxxxx](https://xxxxx.vercel.app/) |
| Link deployment backend       | [brainwavebe-production.up.railway.app](https://brainwavebe-production.up.railway.app/)         |
| Link GitHub frontend          | [BrainwaveFE](https://github.com/tvaldig/BrainwaveFE.git) |
| Link GitHub backend           | [BrainwaveBE](https://github.com/nasywaanaa/BrainwaveBE.git) |



## Table of Contents
- [Endpoints Table](#endpoints-table)
- [Detailed Endpoints](#detailed-endpoints)
  - [Subject](#subject)
  - [Material](#material)
  - [Quiz](#quiz)
  - [Progress](#progress)
  - [Tracker](#tracker)

---

## Deployment Instructions

## Running the Application Locally

### Frontend
To start the frontend, run the following command:
```bash
npx expo start
```

### Backend
To start the backend, run the following command:
```bash
npm run start
```

---

## Notes

- Ensure all dependencies are installed before running the commands:
  ```bash
  npm install
  ```

- For production, consider setting environment variables or a `.env` file for secure configuration.

---

## Endpoints Table

| Method | Endpoint                                       | Description                                  |
|--------|-----------------------------------------------|----------------------------------------------|
| POST   | /register                                      | Register a new user                          |
| POST   | /login                                         | Login a user and retrieve a token            |
| GET    | /login/verify                                  | Verify user login using a bearer token       |
| POST   | /logout                                        | Log out a user by invalidating their token   |
| GET    | /subjects                                      | Retrieve a list of all subjects              |
| GET    | /subjects/:idSubject                           | Retrieve details for a specific subject by ID|
| POST   | /subjects                                      | Create a new subject                         |
| PUT    | /subjects/:idSubject                           | Update a subject's details by ID             |
| DELETE | /subjects/:idSubject                           | Delete a specific subject by ID              |
| POST   | /subjects/:idSubject/materials                 | Add materials to a specific subject by ID    |
| POST   | /subjects/:idSubject/materials/:indexMaterial/quiz | Add a quiz to a material in a subject       |
| GET    | /progress/:idUser                              | Retrieve user progress by ID                 |
| POST   | /tracker/:idUser                               | Add a tracking log for a specific user by ID |
| GET    | /tracker/:idUser/:date                         | Retrieve tracker details for a user by ID and date |
| GET    | /progress/:idUser                              | Retrieve progress details for a user by ID   |
| GET    | /tracker/:userId/:date         | Retrieve tracker details for a specific user by ID and date |
| POST   | /tracker/:userId               | Add a new task for a specific user           |
| PUT    | /tracker/:userId/:taskId       | Update a specific task for a user            |
| DELETE | /tracker/:userId/:taskId       | Delete a specific task for a user            |
| GET    | /progress/:idUser              | Retrieve progress details for a specific user by ID |

---

## Detailed Endpoints

### POST `/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
      "name": "coba1",
      "email": "coba1@gmail.com",
      "password": "12345678"
  }
  ```
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "message": "User registered successfully"
  }
  ```
- **Error Response (400)**:
  ```json
  {
      "status": "error",
      "message": "Invalid input or user already exists"
  }
  ```
- **URL**: `http://localhost:8080/register`

---

### POST `/login`
- **Description**: Login a user and retrieve a token.
- **Request Body**:
  ```json
  {
      "email": "coba1@gmail.com",
      "password": "12345678"
  }
  ```
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "token": "your_token_here",
      "message": "Login successful"
  }
  ```
- **Error Response (401)**:
  ```json
  {
      "status": "error",
      "message": "Invalid email or password"
  }
  ```
- **URL**: `http://localhost:8080/login`

---

### GET `/login/verify`
- **Description**: Verify user login using a bearer token.
- **Authorization**: Bearer Token
- **Request Body**: No body required.
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "message": "Token is valid"
  }
  ```
- **Error Response (401)**:
  ```json
  {
      "status": "error",
      "message": "Token is invalid or expired"
  }
  ```
- **URL**: `http://localhost:8080/login/verify`

---

### POST `/logout`
- **Description**: Log out a user by invalidating their token.
- **Authorization**: Bearer Token
- **Request Body**: No body required.
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "message": "Logout successful"
  }
  ```
- **Error Response (400)**:
  ```json
  {
      "status": "error",
      "message": "Logout failed"
  }
  ```
- **URL**: `http://localhost:8080/logout`

---
# Subject


### GET `/subjects`
- **Description**: Retrieve a list of all subjects.
- **Authorization**: Bearer Token
- **Request Body**: No body required.
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "subjects": [...]
  }
  ```
- **Error Response (404)**:
  ```json
  {
      "status": "error",
      "message": "Subjects not found"
  }
  ```
- **URL**: `http://localhost:8080/subjects`

---

### GET `/subjects/:idSubject`
- **Description**: Retrieve details for a specific subject by ID.
- **Authorization**: No authorization required.
- **Request Body**: No body required.
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "subject": {...}
  }
  ```
- **Error Response (404)**:
  ```json
  {
      "status": "error",
      "message": "Subject not found"
  }
  ```
- **URL**: `http://localhost:8080/subjects/:idSubject`

---

### POST `/subjects`
- **Description**: Create a new subject.
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
      "name": "Computational Thinking and Python Introduction",
      "totalModules": 6,
      "estimatedTime": "4 hours",
      "description": "An introductory course on computational thinking and Python programming.",
      "duration": "4 hours",
      "viewers": 1500,
      "rating": 4.9,
      "totalQuestions": 20
  }
  ```
- **Success Response (201)**:
  ```json
  {
      "status": "success",
      "message": "Subject created successfully"
  }
  ```
- **Error Response (400)**:
  ```json
  {
      "status": "error",
      "message": "Failed to create subject"
  }
  ```
- **URL**: `http://localhost:8080/subjects`

---

### PUT `/subjects/:idSubject`
- **Description**: Update a subject's details by ID.
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
      "name": "Computational Thinking and Python Advanced PUT",
      "totalModules": 8,
      "estimatedTime": "5 hours",
      "description": "An advanced exploration of computational thinking and Python programming."
  }
  ```
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "message": "Subject updated successfully"
  }
  ```
- **Error Response (404)**:
  ```json
  {
      "status": "error",
      "message": "Subject not found"
  }
  ```
- **URL**: `http://localhost:8080/subjects/:idSubject`

---

### DELETE `/subjects/:idSubject`
- **Description**: Delete a specific subject by ID.
- **Authorization**: No authorization required.
- **Request Body**: No body required.
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "message": "Subject deleted successfully"
  }
  ```
- **Error Response (404)**:
  ```json
  {
      "status": "error",
      "message": "Subject not found"
  }
  ```
- **URL**: `http://localhost:8080/subjects/:idSubject`

---

### Material

### POST `/subjects/:idSubject/materials`
- **Description**: Add materials to a specific subject by ID.
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
      "title": "Loops in Python",
      "duration": "45 minutes",
      "content": "Learn about for and while loops in Python.",
      "description": "Understand how to use loops to iterate over data."
  }
  ```
- **Success Response (201)**:
  ```json
  {
      "status": "success",
      "message": "Material added successfully"
  }
  ```
- **Error Response (400)**:
  ```json
  {
      "status": "error",
      "message": "Failed to add material"
  }
  ```
- **URL**: `http://localhost:8080/subjects/:idSubject/materials`

---

# Quiz

### POST `/subjects/:idSubject/materials/:indexMaterial/quiz`
- **Description**: Add a quiz to a material in a subject.
- **Authorization**: Bearer Token
- **Request Body**:
  ```json
  {
      "title": "Quiz on Loops",
      "duration": "15 minutes",
      "content": "Test your knowledge of loops in Python.",
      "description": "Evaluate your understanding of for and while loops."
  }
  ```
- **Success Response (201)**:
  ```json
  {
      "status": "success",
      "message": "Quiz added successfully"
  }
  ```
- **Error Response (400)**:
  ```json
  {
      "status": "error",
      "message": "Failed to add quiz"
  }
  ```
- **URL**: `http://localhost:8080/subjects/:idSubject/materials/:indexMaterial/quiz`

---

# Progress

### GET `/progress/:idUser`
- **Description**: Retrieve user progress by ID.
- **Authorization**: Bearer Token
- **Request Body**: No body required.
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "progress": {...}
  }
  ```
- **Error Response (404)**:
  ```json
  {
      "status": "error",
      "message": "Progress not found"
  }
  ```
- **URL**: `http://localhost:8080/progress/:idUser`

---

# Tracker

### GET `/tracker/:userId/:date`
- **Description**: Retrieve tasks for a specific user by date.
- **Authorization**: Bearer Token
- **Request Parameters**:
  - `userId`: ID of the user whose tasks are to be retrieved.
  - `date`: The date for which tasks are to be fetched (format: `YYYY-MM-DD`).
- **Request Body**: No body required.
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "message": "Tasks retrieved successfully",
      "data": [
          {
              "taskId": "string",
              "title": "string",
              "date": "string",
              "status": "string"
          }
      ]
  }
  ```
- **Error Response (500)**:
  ```json
  {
      "status": "error",
      "message": "Error retrieving tasks"
  }
  ```
- **URL**: `http://localhost:8080/tracker/:userId/:date`

---

### POST `/tracker/:userId`
- **Description**: Add a new task for a specific user.
- **Authorization**: Bearer Token
- **Request Parameters**:
  - `userId`: ID of the user to add the task for.
- **Request Body**:
  ```json
  {
      "title": "string",
      "date": "string",
      "status": "string"
  }
  ```
- **Success Response (201)**:
  ```json
  {
      "status": "success",
      "message": "Task added successfully",
      "data": {
          "userId": "string",
          "tasks": [
              {
                  "taskId": "string",
                  "title": "string",
                  "date": "string",
                  "status": "string"
              }
          ]
      }
  }
  ```
- **Error Response (500)**:
  ```json
  {
      "status": "error",
      "message": "Error adding task"
  }
  ```
- **URL**: `http://localhost:8080/tracker/:userId`

---

### PUT `/tracker/:userId/:taskId`
- **Description**: Update a specific task for a user.
- **Authorization**: Bearer Token
- **Request Parameters**:
  - `userId`: ID of the user whose task is to be updated.
  - `taskId`: ID of the task to update.
- **Request Body**:
  ```json
  {
      "title": "string",
      "date": "string",
      "status": "string"
  }
  ```
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "message": "Task updated successfully",
      "data": {
          "userId": "string",
          "tasks": [
              {
                  "taskId": "string",
                  "title": "string",
                  "date": "string",
                  "status": "string"
              }
          ]
      }
  }
  ```
- **Error Response (500)**:
  ```json
  {
      "status": "error",
      "message": "Error updating task"
  }
  ```
- **URL**: `http://localhost:8080/tracker/:userId/:taskId`

---

### DELETE `/tracker/:userId/:taskId`
- **Description**: Delete a specific task for a user.
- **Authorization**: Bearer Token
- **Request Parameters**:
  - `userId`: ID of the user whose task is to be deleted.
  - `taskId`: ID of the task to delete.
- **Request Body**: No body required.
- **Success Response (200)**:
  ```json
  {
      "status": "success",
      "message": "Task deleted successfully",
      "data": {
          "userId": "string",
          "tasks": [
              {
                  "taskId": "string",
                  "title": "string",
                  "date": "string",
                  "status": "string"
              }
          ]
      }
  }
  ```
- **Error Response (500)**:
  ```json
  {
      "status": "error",
      "message": "Error deleting task"
  }
  ```
- **URL**: `http://localhost:8080/tracker/:userId/:taskId`
