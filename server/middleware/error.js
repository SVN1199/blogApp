module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Set default status code to 500 if not defined

  // Set response status and send JSON response
  res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      error: err 
  });

  // If in production environment, handle specific error cases
  if (process.env.NODE_ENV === 'production') {
      let message = err.message;
      let error = new Error(message);

      // Handle different types of errors with appropriate status codes and messages
      if (err.name === "ValidationError") {
          message = Object.values(err.errors).map(value => value.message).join('\n'); // Combine error messages
          error = new Error(message);
          err.statusCode = 400;
      } else if (err.name === 'CastError') {
          // Handle casting errors (e.g., invalid ID format)
          message = `Resource not found: ${err.path}`;
          error = new Error(message);
          err.statusCode = 400;
      } else if (err.code === 11000) {
          let key = Object.keys(err.keyValue)[0]; 
          message = `Duplicate ${key} error`;
          error = new Error(message);
          err.statusCode = 400;
      } else if (err.name === 'JSONWebTokenError' || err.name === 'TokenExpiredError') {
          message = 'Invalid or expired JSON Web Token. Please try again.';
          error = new Error(message);
          err.statusCode = 401; 
      }

      // Send JSON response with appropriate status and error message
      res.status(err.statusCode).json({
          success: false,
          message: error.message || 'Internal Server Error',
      });
  }
};
