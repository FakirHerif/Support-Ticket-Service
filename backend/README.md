# Backend Api Service

This project is a backend system developed using Go and Gin framework. It is designed to serve the frontend by offering endpoints for CRUD (Create, Read, Update, Delete) operations on three primary models: informations, response, and user. The backend is intended to handle data management and user authentication. SQLite is used as the database.

## Getting Started

To run the **'backend'** locally, follow these steps:

1. Clone this repository.

2. Navigate to the backend directory:
```
cd backend
```

3. Install dependencies by running the following command:
```
go mod download
```

4. Run the project from the cmd/api-server directory:
```
cd cmd/api-server
go run main.go
```

## Docker Usage

This project can also be run inside a Docker container. To build the Docker image, run the following command (from the **'backend'** directory):

```
docker build -t support-ticket-service .
```

And to run the Docker container:

```
docker run -p 8080:8080 support-ticket-service
```

## Endpoints

**Informations**
- GET /api/informations: Retrieve all information records.
- GET /api/informations/:id: Retrieve information by ID.
- GET /api/informations/referenceID/:referenceID: Retrieve information by reference ID.
- POST /api/informations: Create a new information record.
- PUT /api/informations/:id: Update an information record by ID.
- DELETE /api/informations/:id: Delete an information record by ID.

**Response**
- GET /api/response: Retrieve all response records.
- GET /api/response/:id: Retrieve response by ID.
- POST /api/response: Create a new response record.
- PUT /api/response/:id: Update a response record by ID.
- DELETE /api/response/:id: Delete a response record by ID.

**User**
- GET /api/user: Retrieve all user records.
- GET /api/user/:id: Retrieve user by ID.
- POST /api/user: Create a new user record.
- PUT /api/user/:id: Update a user record by ID.
- DELETE /api/user/:id: Delete a user record by ID.

**Login**
- POST /api/login: User login using Basic Auth and get JWT token.

## Authentication

Users can authenticate using Basic Auth and obtain a JWT token. This token is used for subsequent requests to protected endpoints. (Endpoints are not protected with JWT. Because JWT is used to get information such as username and role from the token for the frontend.)

## Usage

This backend project serves as the backend for a frontend application. It manages form creation, deletion, and editing functionalities.

## The Models Include:

- **Informations Model:** The Informations model represents various information data, such as personal details, content, and status. It also includes relationships with response data.

- **Response Model:** The Response model stores response details related to the Informations model. It holds information like the response text, reply date, and owner of the response.

- **User Model:** The User model represents user data with fields like username, password, email, and role. This model is primarily utilized for authentication purposes.

## Used Technologies

- **Go 1.21.4:** Programming language and its version used in this project.
    - **Gin-Gonic Framework** (github.com/gin-gonic/gin v1.9.1): A Go web framework used for creating web applications.
    - **GORM** (github.com/go-gorm/gorm v1.25.5): A library used for Object-Relational Mapping (ORM) in Go.
    - **Go-SQLite3** (github.com/mattn/go-sqlite3 v1.14.19): SQLite3 driver for the Go programming language.
    - **Gin Cors Middleware** (github.com/gin-contrib/cors v1.5.0): Middleware used in the Gin framework for Cross-Origin Resource Sharing (CORS) operations.
    - **JWT-GO** (github.com/dgrijalva/jwt-go v3.2.0+incompatible): A library used to implement JSON Web Token (JWT) standards in Go.
    - **Google UUID** (github.com/google/uuid v1.5.0): A library used for generating and processing Universally Unique Identifiers (UUIDs)
- **Docker:** A containerization platform used to encapsulate the application and its dependencies, ensuring consistent and portable deployment across environments.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.