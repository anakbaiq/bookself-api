const {
  addingBook, readAllBooks, readBookById, updateBookById, deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'WELCOME TO API BOOKSELF',
  },
  {
    method: 'POST',
    path: '/books',
    handler: addingBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: readAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: readBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = routes;
