const express = require('express');
const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

const router = express.Router();

// Endpoint login
router.post('/api/authentication/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email and password are required');
    }
    
    const isValid = await authService.validateUser(email, password);
    if (!isValid) {
      return res.status(403).json({ message: 'INVALID_PASSWORD' });
    }
    
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;