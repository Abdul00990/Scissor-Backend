Scissor URL-Shortening Backend

Overview

The Scissor URL-Shortening project is a web application designed to allow users to shorten long URLs, manage these URLs, and view analytics on the usage of the shortened URLs. The backend is built with Node.js, Express, TypeScript, and MongoDB, following best practices for structure, security, and documentation.

Project Structure

src/

  controllers/
  
  middleware/
  
  models/
  
  routes/
  
  services/
  
  types/
  
  app.ts
  
  server.ts
  
  swaggerConfig.ts
  
  logger.ts
  
  ...
tests/

  ...
.env

tsconfig.json

package.json

Explanation of Key Folders

- controllers/: Houses the logic for handling requests and returning responses. Each controller is responsible for a specific set of endpoints, like authentication, URL management, and analytics.

- middlewares/: Middleware functions that run before reaching the route handlers. For example, authMiddleware checks if a user is authenticated, and roleMiddleware verifies the user's role.

- models/: Mongoose models define the structure of documents within MongoDB collections, like User, Url, and Analytics.

- routes/: Defines the endpoints and maps them to controller functions.

- services/: Contains the business logic, including URL shortening, deletion, and click tracking.

- types/: TypeScript type definitions, ensuring type safety and clarity in the codebase.

- logger.ts: Centralized logging using the winston library.

- swaggerConfig.ts: Configuration file for generating Swagger API documentation.

- app.ts: The main application file, where routes, middleware, and services are initialized.



File Explanations

- 'src/app.ts'

  The 'app.ts' file is the entry point for the Express application. It initializes the Express app, configures middleware, sets up routes, and integrates Swagger for API documentation.

- src/server.ts

  The 'server.ts' file is responsible for starting the Express server and connecting to the MongoDB database.

- 'src/swaggerConfig.ts'
  
  The 'swaggerConfig.ts' file configures Swagger for API documentation. It defines the API specification and sets the path for route files.

- src/routes

  The routes directory contains all the API route files.

- 'src/routes/authRoutes.ts'

  Handles user authentication, including registration and login. 

- 'src/routes/urlRoutes.ts'

  Handles URL shortening, redirection, and analytics.

- 'src/routes/userRoutes.ts'

  Handles user-specific operations, such as retrieving URL history.

- src/middleware

  Middleware functions for request processing.

- 'src/middleware/authMiddleware.ts'
  
  Authenticates users by verifying JWT tokens.

- src/controllers
  
  Controller files contain the logic for handling requests and returning responses.

- 'src/controllers/authController.ts'

  Handles user registration and login.

- 'src/controllers/urlController.ts'
  
  Handles URL shortening and redirection.

- 'src/controllers/userController.ts'

  Handles user-specific operations.

- src/models
  
  Mongoose models representing the MongoDB database schemas.

- 'src/models/Url.ts'
  
  Represents a shortened URL.

- 'src/models/User.ts'

  Represents a user in the system.

- src/services

  Contains the business logic and utility functions.

- 'src/services/urlShorteningService.ts'

  Handles the logic for shortening URLs and generating short codes.

- src/logger.ts
  
  Custom logger setup using winston.


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

