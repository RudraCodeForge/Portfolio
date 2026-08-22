const notFound = (request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.stack || error.message);
  response.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

module.exports = { notFound, errorHandler };
