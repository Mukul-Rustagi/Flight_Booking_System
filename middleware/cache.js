const redis = require('../config/redis');
const Flight = require('../models/Flight');

const cacheMiddleware = async (req, res, next) => {
  const flightId = req.params.id;

  redis.get(`flight:${flightId}`, async (err, data) => {
    if (err) throw err;

    if (data) {
      res.json(JSON.parse(data));
    } else {
      const flight = await Flight.findById(flightId);
      if (flight) {
        redis.setex(`flight:${flightId}`, 3600, JSON.stringify(flight)); // Cache for 1 hour
        res.json(flight);
      } else {
        res.status(404).send('Flight not found');
      }
    }
  });
};

module.exports = cacheMiddleware;
