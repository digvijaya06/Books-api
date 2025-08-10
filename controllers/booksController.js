/**
 * Controller: Books
 * Handles all CRUD operations for books.json
 */

const fs = require('fs');
const path = require('path');

// Path to JSON file that stores book data
const booksFilePath = path.join(__dirname, '../data/books.json');

/**
 * Helper: Read all books from file
 */
function readBooks() {
  try {
    const data = fs.readFileSync(booksFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading books file:', err);
    return []; // Return empty list if file read fails
  }
}

/**
 * Helper: Write updated books array to file
 */
function writeBooks(books) {
  try {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
  } catch (err) {
    console.error('Error writing to books file:', err);
  }
}

/**
 * GET /books
 * Optional query: ?author=xyz&title=abc
 */
exports.getBooks = (req, res) => {
  let books = readBooks();
  const { author, title } = req.query;

  if (author) {
    books = books.filter(b =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    books = books.filter(b =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  res.json(books);
};

/**
 * GET /books/:id
 */
exports.getBookById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const books = readBooks();

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: `Book with ID ${id} not found` });
  }

  res.json(book);
};

/**
 * POST /books
 * Body: { title, author }
 */
exports.addBook = (req, res) => {
  const { title, author } = req.body;
  const books = readBooks();

  const newBook = {
    id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  writeBooks(books);

  res.status(201).json(newBook);
};

/**
 * PUT /books/:id
 * Body: { title, author }
 */
exports.updateBook = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, author } = req.body;
  const books = readBooks();

  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Book with ID ${id} not found` });
  }

  books[index] = { id, title, author };
  writeBooks(books);

  res.json(books[index]);
};

/**
 * DELETE /books/:id
 */
exports.deleteBook = (req, res) => {
  const id = parseInt(req.params.id, 10);
  let books = readBooks();

  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Book with ID ${id} not found` });
  }

  books.splice(index, 1);
  writeBooks(books);

  res.status(204).send();
};
