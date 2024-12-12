const redis = require('../config/redis');

const rateLimit = (req, res, next) => {
  const userKey = `rate-limit:${req.ip}`;

  redis.get(userKey, (err, record) => {
    if (err) throw err;

    if (!record) {
      redis.set(userKey, 99, 'EX', 60); // 99 requests left, expires in 60 seconds
      return next();
    }

    if (record > 0) {
      redis.decr(userKey);
      return next();
    } else {
      return res.status(429).send('Too many requests. Try again later.');
    }
  });
};

module.exports = rateLimit;
