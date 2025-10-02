const authMiddleware = require('./authMiddleware');

module.exports = async function(req, res, next) {
  // First verify JWT
  await authMiddleware(req, res, () => {
    // Then check if user is admin
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin privileges required.' 
      });
    }
  });
};
