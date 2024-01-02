# Support Ticket Service

Welcome to the Support Ticket Service repository, housing a comprehensive system that comprises both the frontend and backend components.

# Live View

https://sendform.vercel.app/

## Overview

This project is a cohesive system designed to manage support ticket submissions and their resolution processes. It consists of two main components: the frontend and backend.

### Frontend

The frontend, developed using React, is the user-facing part of the system. It serves as an interface for users—both logged-in and guest—to interact with the backend. Through this intuitive React-based application, users can seamlessly submit various forms related to complaints, suggestions, or support requests. These submitted forms are then reviewed and responded to by authorized personnel, aiming to address and resolve the issues highlighted in them.

### Backend API Service

Complementing the frontend, the backend component is built using the Go programming language along with the Gin framework. It operates as the powerhouse, managing the data processing, authentication, and database interaction for the entire system. The backend provides a set of API endpoints enabling CRUD (Create, Read, Update, Delete) operations on essential models such as information, response, and user. These endpoints facilitate seamless communication between the frontend and the underlying database, utilizing SQLite as the primary data storage solution.

## Purpose

The combined functionality of the frontend and backend ensures a smooth and efficient support ticketing system. The frontend offers an intuitive interface for users to submit their queries and concerns, while the backend handles the processing, authentication, and storage of this data to ensure a seamless user experience.

## How to Use
 
- Instructions for installing and running the project are provided in the respective README file of each component and are also combined and presented in this readme file.

# Support Ticket Service - Frontend

This is the frontend repository of the Support Ticket Service system. It's a React-based application designed to interact with the backend to manage support form information.

This project enables both logged-in users and guest users to submit forms, expressing complaints, suggestions, or seeking support. These forms are responded to by authorized personnel, catering to various concerns outlined within them.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository.

2. Navigate to the frontend directory:
```
cd frontend/ticket-support
```

3. Install dependencies:
```
npm install
```

4. To run it locally with the backend, replace the 'baseURL' with 
```
http://localhost:8080/api 
```
    in 'AuthContext.jsx' in frontend/ticket-support/src/context

5. Start the development server:

```
npm start
```

This will start the server 

## Project Overview
### Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Axios**: HTTP client to make requests to the backend API.
- **React-Router-Dom**: DOM bindings for React Router.
- **React-dom**: React package for DOM rendering.
- **Formik**: Library for building forms in React.
- **Yup**: JavaScript schema builder for validation.
- **Toastify**: Notification library for React applications.
- **Bootstrap**: React components for Bootstrap.
- **Google-Recaptcha**: Google reCAPTCHA integration for React.

### Folder Structure

- **src/admin**: Contains files related to administrative operations such as adminformdetail, adminformlist, and adminlogin.
- **src/context**: Manages authentication processes, extracting information like username, role, and token using JWT.
- **src/form**: Handles form-related functionalities including formdetail, formsearch, formsend, and formsuccess files.
- **src/helper**: Houses files for specific tasks such as displaying confetti on success after form submission, extracting and downloading files like jpg, pdf, and png.
- **src/layouts**: Includes header, home, notfound, and register files that define the layout of the project.
- **src/route**: Contains privateroute file defining routes with restricted access.
- **src/user**: Consists of files related to user operations like loginuser and userformlist.
- **src/style**: Holds CSS files responsible for styling elements across the project.

### What can be done in this project?

- You can create an account, log in, and log out. Each created account is automatically saved in the database with the user role.
- You can send personal details such as name, surname, identification number, age, address, phone number, form title, and content, along with attachments like PDF/JPG/PNG files. Files containing specific details, such as PDFs, JPGs, or PNGs, can only be viewed by authorized personnel. Each form you submit can be tracked with an automatically generated reference ID. If you submit a form after logging in, your username will be included in the form. You can filter through all the forms you've submitted without the need to save the reference IDs of each form separately. If you submit a form as a guest, your username will automatically be marked as 'guest', and you'll need to access your submitted forms using your reference ID.
- If logged in as a user, you can comment below your submitted form, adding additional comments about areas where you feel the description might be incomplete. Guests cannot leave comments without logging in; they are expected to log in to write comments.
- If you accidentally submit a form, you can update its status and mark it as 'Cancelled'. If your submitted form has been marked as 'Resolved' by an authorized person but you believe you haven’t received the necessary response, you can edit the form, mark it as 'Waiting for response', and await a new reply. Guests cannot edit their submitted forms. Additionally, users can only edit the 'status' of their submitted form; they cannot edit other sections.
- Your personal and private information in the submitted form is only visible to authorized personnel. Other users and guests can only see general sections of your complaint, such as the subject and content, but cannot view your personal and private details.
- Forms submitted by other users and guests can be viewed by everyone. Comments made by authorized personnel can be seen, and the status of these forms being resolved or not can be checked.
- Members cannot interact with each other. Users and guests cannot access the admin panel.
- Admins can view the complete contents of all forms, including personal information. They have full authorization to edit all form details and comments, delete forms, and comments.
- The login pages for admins and regular users differ. If an admin tries to log in from the regular user login panel, they receive a warning message and are automatically redirected to the admin login panel.
- If the URL being accessed does not exist, a 404 not found error is encountered.
Feel free to modify or add more detailed explanations if required, based on the specifics of your project or any additional context you'd like to provide.

### Routes/Paths

1. **/basvuru-olustur**
    - Public endpoint/The section where users and guests create forms.
    - Allows any user to fill out the application form.
    - The application form includes fields for [Name, Surname, Age, ID Number, Reason for Application, Address Information, Photos/Attachments, Submit] button.

2. **/basvuru-basarili (Successful application submission page)**
    - Displays a thank-you message and provides the user with an application code along with application details.

3. **/basvuru-sorgula (Query application)**
    - Displays an input field where the application code can be entered, along with a query button.

4. **/basvuru/{applicationNo} (Application details)**
    - Displays application details, its current status, and any provided response(s) if available.
    - If the application number is incorrect, a 404 (Not Found) message is displayed.

5. **/admin**
    - Displays a admin login form.

6. **/admin/basvuru-listesi (Application list for admin)**
    - After successful login, lists pending (unresolved/unanswered) applications with basic information. (Applicant, Date)
    - Each item in the application list has a "View Application" button.

7. **/admin/basvuru/{applicationNo} (Application details for admin)**
    - Allows the status of the application to be updated and enables admins to write a response to the application.
    - The response written here is visible to end users in the application/{applicationNo} section.

***Additionally, added features beyond the requested ones:***

8. **/login**
    - Endpoint for users with the 'user' role to log in.

9. **/register**
    - Registration page for creating an account.

10. **/user/basvuru-listesi**
    - Page where both guests and logged-in users can view and filter all forms submitted.

11. **/**
    - Homepage of the application.

12. **'*'**
    - 404 not found page for non-existent URLs.


Additionally, this project encompasses all the above functionalities as described. Everything requested has been implemented within this project.

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

### Docker Usage

This project can also be run inside a Docker container. To build the Docker image, run the following command (from the **'backend'** directory):

```
docker build -t support-ticket-service .
```

And to run the Docker container:

```
docker run -p 8080:8080 support-ticket-service
```

### Endpoints

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

### Authentication

Users can authenticate using Basic Auth and obtain a JWT token. This token is used for subsequent requests to protected endpoints. (Endpoints are not protected with JWT. Because JWT is used to get information such as username and role from the token for the frontend.)

### Usage

This backend project serves as the backend for a frontend application. It manages form creation, deletion, and editing functionalities.

### The Models Include:

- **Informations Model:** The Informations model represents various information data, such as personal details, content, and status. It also includes relationships with response data.

- **Response Model:** The Response model stores response details related to the Informations model. It holds information like the response text, reply date, and owner of the response.

- **User Model:** The User model represents user data with fields like username, password, email, and role. This model is primarily utilized for authentication purposes.

### Used Technologies

- **Go 1.21.4:** Programming language and its version used in this project.
    - **Gin-Gonic Framework** (github.com/gin-gonic/gin v1.9.1): A Go web framework used for creating web applications.
    - **GORM** (github.com/go-gorm/gorm v1.25.5): A library used for Object-Relational Mapping (ORM) in Go.
    - **Go-SQLite3** (github.com/mattn/go-sqlite3 v1.14.19): SQLite3 driver for the Go programming language.
    - **Gin Cors Middleware** (github.com/gin-contrib/cors v1.5.0): Middleware used in the Gin framework for Cross-Origin Resource Sharing (CORS) operations.
    - **JWT-GO** (github.com/dgrijalva/jwt-go v3.2.0+incompatible): A library used to implement JSON Web Token (JWT) standards in Go.
    - **Google UUID** (github.com/google/uuid v1.5.0): A library used for generating and processing Universally Unique Identifiers (UUIDs)
- **Docker:** A containerization platform used to encapsulate the application and its dependencies, ensuring consistent and portable deployment across environments.

# Contributing

Contributions to this project are welcome! Feel free to open issues for feature requests, bug reports, or submit pull requests.

# Acknowledgements

This project has been developed as the final project for the Patika/Fimple React Bootcamp. Rather than serving a professional purpose, it is designed for educational purposes.

# Screenshots From Project

<img src="./frontend/ticket-support/imgs/1.jpg" width="500" height="400">

<img src="./frontend/ticket-support/imgs/2.jpg" width="500" height="425">

<img src="./frontend/ticket-support/imgs/3.jpg" width="500" height="425">

<img src="./frontend/ticket-support/imgs/4.jpg" width="500" height="525">

<img src="./frontend/ticket-support/imgs/5.jpg" width="500" height="375">

<img src="./frontend/ticket-support/imgs/6.jpg" width="500" height="350">

<img src="./frontend/ticket-support/imgs/7.jpg" width="500" height="550">

<img src="./frontend/ticket-support/imgs/8.jpg" width="500" height="600">

<img src="./frontend/ticket-support/imgs/9.jpg" width="500" height="375">