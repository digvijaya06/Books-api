const express = require('express');
const { body, validationResult } = require('express-validator');
const controller = require('../controllers/booksController');

const router = express.Router();

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "The Great Gatsby"
 *         author:
 *           type: string
 *           example: "F. Scott Fitzgerald"
 *   examples:
 *     SampleBook:
 *       value:
 *         id: 1
 *         title: "The Great Gatsby"
 *         author: "F. Scott Fitzgerald"
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *             examples:
 *               ExampleList:
 *                 value:
 *                   - id: 1
 *                     title: "The Great Gatsby"
 *                     author: "F. Scott Fitzgerald"
 *                   - id: 2
 *                     title: "1984"
 *                     author: "George Orwell"
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: "To Kill a Mockingbird"
 *             author: "Harper Lee"
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               id: 3
 *               title: "To Kill a Mockingbird"
 *               author: "Harper Lee"
 */
router.get('/books', controller.getBooks);

router.post(
  '/books',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required')
  ],
  validate,
  controller.addBook
);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               id: 1
 *               title: "The Great Gatsby"
 *               author: "F. Scott Fitzgerald"
 *       404:
 *         description: Book not found
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: "Updated Book"
 *             author: "Updated Author"
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               id: 1
 *               title: "Updated Book"
 *               author: "Updated Author"
 *       404:
 *         description: Book not found
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.get('/books/:id', controller.getBookById);

router.put(
  '/books/:id',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required')
  ],
  validate,
  controller.updateBook
);

router.delete('/books/:id', controller.deleteBook);

module.exports = router;
