const supabase = require('../config/supabase');

/**
 * Role-based access control middleware
 * Supports roles: admin, manager, staff
 */
const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      // Get user details from personel table using email
      const { data: personelData, error: personelError } = await supabase
        .from('personel')
        .select('personel_id, personel_rol')
        .eq('personel_eposta', req.user.email)
        .single();
      
      if (personelError || !personelData) {
        return res.status(403).json({ error: 'User role cannot be verified' });
      }
      
      // Add user role to request object
      req.userRole = personelData.personel_rol || 'staff'; // Default to staff if no role specified
      req.personelId = personelData.personel_id;
      
      // Check if user has one of the allowed roles
      if (allowedRoles.includes(req.userRole)) {
        next();
      } else {
        res.status(403).json({ error: 'Insufficient permissions for this action' });
      }
    } catch (error) {
      console.error('Role verification error:', error);
      res.status(500).json({ error: 'Server error during role verification' });
    }
  };
};

// Export role check middleware
module.exports = {
  checkRole
};
