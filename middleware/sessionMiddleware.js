// const redis = require('../config/redis');

// const sessionMiddleware = (req, res, next) => {
//   const sessionId = req.headers['authorization'];

//   redis.get(`session:${sessionId}`, (err, sessionData) => {
//     if (err || !sessionData) {
//       return res.status(401).send('Unauthorized');
//     }

//     // Log the session data for debugging purposes
//     console.log('Session Data Retrieved:', sessionData);

//     // Parse the session data and attach it to the request object
//     req.user = JSON.parse(sessionData);

//     // Print a success message in the console
//     console.log('User authenticated successfully:', req.user);

//     // Pass control to the next middleware or route handler
//     next();
//   });
// };

// module.exports = sessionMiddleware;
