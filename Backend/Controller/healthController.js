const getHealth = (request, response) => {
  response.json({
    success: true,
    service: "portfolio-api",
    timestamp: new Date().toISOString(),
  });
};

module.exports = { getHealth };
