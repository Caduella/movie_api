# My Quick Movie API
This web application implements a RESTful API to perform CRUD operations on many different aspects on the application. Users will be able to sign up, update their personal information, and add and remove movies from their favorites as well as obtaining informaiton about different movies, directors, and genres.

# Essential Features
- Return a list of all movies to the user
- Return data (description, genre, director, image URL, whether it's featured or not) about a single movie by title to the user
- Return data about a genre (description) by name (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

# Technical Requirements
-The API is a Node.js and Express application.
- The API uses REST architecture, with URL endpoints corresponding to the data operations listed above.
- The API uses at least three middleware modules, such as the body-parser package for reading data from requests and morgan for logging as well as cors and passport.
- The API uses a "package.json" file.
- The database is built using MongoDB.
- The business logic is modeled with Mongoose.
- The API provides movie information in JSON format.
- The API was tested in Postman.
- The API includes user authentication and authorization code.
- The API includes data validation logic.
- The API meets data sercurity regulations.
- The API source code is deployed to  a publicly accessible platform like GitHub.
- The API is deployed to Render.

# API Hosted: https://myquickmovieapi.onrender.com

# Dependencies

List of dependencies can be found under package.json file



