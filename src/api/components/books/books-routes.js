const express = require('express');
const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

const router = express.Router();

// Endpoint pagination untuk books
router.get('/api/books', async (req, res, next) => {
  try {
    let { offset = 0, limit = 10 } = req.query;
    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10);

    const books = await booksService.getBooks(offset, limit);
    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;