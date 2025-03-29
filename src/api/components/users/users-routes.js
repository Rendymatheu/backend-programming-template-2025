const express = require('express');
const userService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

const router = express.Router();

// Endpoint pagination untuk users
router.get('/api/users', async (req, res, next) => {
  try {
    let { offset = 0, limit = 10 } = req.query;
    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10);

    const users = await userService.getUsers(offset, limit);
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;