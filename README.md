Scissor URL-Shortening Backend

Overview

The Scissor URL-Shortening project is a web application designed to allow users to shorten long URLs, manage these URLs, and view analytics on the usage of the shortened URLs. The backend is built with Node.js, Express, TypeScript, and MongoDB, following best practices for structure, security, and documentation.

Project Structure

src/

├── controllers/          # Contains all the controllers for handling requests

├── middlewares/          # Middleware functions for authentication, role-based access, etc.

├── models/               # Mongoose models for MongoDB collections

├── routes/               # API route definitions

├── services/             # Business logic encapsulated in service classes

├── types/                # TypeScript type definitions

├── utils/                # Utility functions

├── logger.ts             # Logging configuration

├── swaggerConfig.ts      # Swagger documentation setup

└── app.ts                # Entry point of the application

Explanation of Key Folders and Files

- controllers/: Houses the logic for handling requests and returning responses. Each controller is responsible for a specific set of endpoints, like authentication, URL management, and analytics.

- middlewares/: Middleware functions that run before reaching the route handlers. For example, authMiddleware checks if a user is authenticated, and roleMiddleware verifies the user's role.

- models/: Mongoose models define the structure of documents within MongoDB collections, like User, Url, and Analytics.

- routes/: Defines the endpoints and maps them to controller functions.

- services/: Contains the business logic, including URL shortening, deletion, and click tracking.

- types/: TypeScript type definitions, ensuring type safety and clarity in the codebase.

- logger.ts: Centralized logging using the winston library.

- swaggerConfig.ts: Configuration file for generating Swagger API documentation.

- app.ts: The main application file, where routes, middleware, and services are initialized.


API Endpoints

Authentication

- POST /api/auth/register: Registers a new user.
  
- POST /api/auth/login: Logs in a user and returns a JWT token.
  
URL Management

- POST /api/urls/shorten: Shortens a given URL.
  
- GET /api/urls/
  
  : Redirects to the original URL based on the short code.

- DELETE /api/urls/delete/
  
  : Deletes a URL by its short code.

- GET /api/urls/: Retrieves all URLs created by the authenticated user.
  
Analytics

- GET /api/analytics/clicks/
  
  : Retrieves the number of clicks for a specific short URL.

Authentication and Authorization

Authentication is handled using JSON Web Tokens (JWT). Upon successful login, a JWT token is issued to the user. This token is required for accessing protected routes.

- authMiddleware: Verifies the JWT token and attaches the decoded user information to the request object.
  
- roleMiddleware: Restricts access to certain routes based on the user's role (e.g., admin).
  
Middleware

The project includes several custom middleware functions:

- authMiddleware: Ensures that the user is authenticated before accessing certain routes.
  
- roleMiddleware: Restricts access to routes based on user roles.
  
- errorMiddleware: Handles errors and sends appropriate responses to the client.
  
Services

The services layer encapsulates the core business logic, making it reusable and easier to test. Key services include:

- urlShorteningService: Handles URL shortening and validation.
  
- urlDeletionService: Manages the deletion of URLs.
  
- analyticsService: Tracks and retrieves click analytics for URLs.
  
Testing

The project includes unit and integration tests using Jest and Supertest.

- urlShorteningService.test.ts: Tests the URL shortening functionality.
  
- authController.test.ts: Tests the authentication endpoints.

Logging

Logging is handled using the winston library. Logs are stored in both the console and log files, providing valuable information during development and in production.

- logger.ts: Configures the logging system, specifying log levels and formats.
