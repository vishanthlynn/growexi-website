const authMiddleware = require('./authMiddleware');

module.exports = async function(req, res, next) {
  // First verify JWT
  await authMiddleware(req, res, () => {
    // All authenticated users are admins (no role field needed)
    if (req.user) {
      next();
    } else {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin privileges required.' 
      });
    }
  });
};
