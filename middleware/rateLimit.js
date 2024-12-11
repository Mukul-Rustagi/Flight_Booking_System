const { RateLimiterMemory } = require('rate-limiter-flexible');

// Rate limit: 5 requests per 1 minute
const rateLimiter = new RateLimiterMemory({
  points: 5, 
  duration: 60
});

module.exports = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ message: 'Too many requests, please try again later.' }));
};
