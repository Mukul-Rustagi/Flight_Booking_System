const jwt = require('jsonwebtoken');

// Protect route middleware
const protect = (req, res, next) => {
  // Get the token from the Authorization header (ensure it has the 'Bearer ' prefix)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If there's no token, return a 401 response
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token (using your secret key)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the JWT

    // Assign decoded data directly to req.user (not inside a 'user' field)
    req.user = { userId: decoded.userId, role: decoded.role }; // Corrected assignment

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If there's an error (invalid token), return a 401 response
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin check middleware
const isAdmin = (req, res, next) => {
  // Ensure the user object exists and has the 'role' property
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: 'You do not have admin privileges' });
  }
  // Proceed if the user is an admin
  next();
};

module.exports = { protect, isAdmin }; // Export the middleware functions
