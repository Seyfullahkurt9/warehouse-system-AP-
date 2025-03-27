/**
 * Validation middleware for request data
 */
const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Combine all possible request data sources
      const data = {
        ...req.body,
        ...req.params,
        ...req.query
      };
      
      // Simple validation based on schema
      const missingFields = [];
      const invalidFields = [];
      
      for (const field in schema) {
        const rules = schema[field];
        const value = data[field];
        
        // Check required fields
        if (rules.required && (value === undefined || value === null || value === '')) {
          missingFields.push(field);
          continue;
        }
        
        // Skip further validation if field is not required and not provided
        if (!rules.required && (value === undefined || value === null || value === '')) {
          continue;
        }
        
        // Type validation
        if (rules.type && typeof value !== rules.type) {
          invalidFields.push(`${field} must be of type ${rules.type}`);
        }
        
        // Min/max for numbers
        if (rules.type === 'number') {
          if (rules.min !== undefined && value < rules.min) {
            invalidFields.push(`${field} must be at least ${rules.min}`);
          }
          if (rules.max !== undefined && value > rules.max) {
            invalidFields.push(`${field} must be at most ${rules.max}`);
          }
        }
        
        // Min/max length for strings
        if (rules.type === 'string') {
          if (rules.minLength !== undefined && value.length < rules.minLength) {
            invalidFields.push(`${field} must be at least ${rules.minLength} characters long`);
          }
          if (rules.maxLength !== undefined && value.length > rules.maxLength) {
            invalidFields.push(`${field} must be at most ${rules.maxLength} characters long`);
          }
          if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
            invalidFields.push(`${field} format is invalid`);
          }
        }
      }
      
      // If there are validation errors, return them
      if (missingFields.length > 0 || invalidFields.length > 0) {
        return res.status(400).json({
          error: 'Validation failed',
          missingFields: missingFields.length > 0 ? missingFields : undefined,
          invalidFields: invalidFields.length > 0 ? invalidFields : undefined
        });
      }
      
      next();
    } catch (error) {
      console.error('Validation error:', error);
      res.status(500).json({ error: 'Server error during validation' });
    }
  };
};

module.exports = validate;
