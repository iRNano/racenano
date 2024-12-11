export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role; // Assuming `req.user` is populated by `authenticateToken`
    if (!userRole || userRole !== requiredRole) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
