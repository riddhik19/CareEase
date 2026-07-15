const jwt = require('jsonwebtoken');

function adminOnly(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // check if logged in user is admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = adminOnly;