const { nanoid } = require('nanoid');
const books = require('./books');

const addingBook = (request, h) => {
  const id = nanoid();
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const finished = Number(readPage) === Number(pageCount);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  if (!name) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
    return response;
  }
  if (Number(readPage) > Number(pageCount)) {
    const response = h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
    return response;
  }
  books.push({
    id,
    name,
    year: Number(year),
    author,
    summary,
    publisher,
    pageCount: Number(pageCount),
    readPage: Number(readPage),
    finished,
    reading,
    insertedAt,
    updatedAt,
  });
  const bookInsertResult = books.filter((book) => book.id === id)[0];
  if (bookInsertResult) {
    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: bookInsertResult.id,
        },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Buku tidak berhasil ditambahkan',
    })
    .code(400);
  return response;
};

const readAllBooks = (request, h) => {
  let searchName = '';
  const { name, reading, finished } = request.query;
  if (name) {
    searchName = name;
    const resultTempSearch = [];
    books.forEach((book) => {
      if (book.name.toLowerCase().search(searchName.toLowerCase()) !== -1) {
        resultTempSearch.push(book);
      }
    });
    const resultSearch = resultTempSearch.map((resBook) => ({
      id: resBook.id,
      name: resBook.name,
      publisher: resBook.publisher,
    }));
    const response = h
      .response({
        status: 'success',
        message: 'My Books',
        data: {
          books: resultSearch,
        },
      })
      .code(200);
    return response;
  }
  if (Number(reading) === 1) {
    const searchReading = true;
    const resultTempSearch = [];
    books.forEach((book) => {
      if (book.reading === searchReading) {
        resultTempSearch.push(book);
      }
    });
    const resultSearch = resultTempSearch.map((resBook) => ({
      id: resBook.id,
      name: resBook.name,
      publisher: resBook.publisher,
      reading: searchReading,
    }));
    const response = h
      .response({
        status: 'success',
        message: 'My Books is reading',
        data: {
          books: resultSearch,
        },
      })
      .code(200);
    return response;
  }
  if (Number(reading) === 0) {
    const searchReading = false;
    const resultTempSearch = [];
    books.forEach((book) => {
      if (book.reading === searchReading) {
        resultTempSearch.push(book);
      }
    });
    const resultSearch = resultTempSearch.map((resBook) => ({
      id: resBook.id,
      name: resBook.name,
      publisher: resBook.publisher,
      reading: searchReading,
    }));
    const response = h
      .response({
        status: 'success',
        message: 'My Books is not reading',
        data: {
          books: resultSearch,
        },
      })
      .code(200);
    return response;
  }
  if (Number(finished) === 1) {
    const searchFinished = true;
    const resultTempSearch = [];
    books.forEach((book) => {
      if (book.finished === searchFinished) {
        resultTempSearch.push(book);
      }
    });
    const resultSearch = resultTempSearch.map((resBook) => ({
      id: resBook.id,
      name: resBook.name,
      publisher: resBook.publisher,
      finished: searchFinished,
    }));
    const response = h
      .response({
        status: 'success',
        message: 'My Books is finished',
        data: {
          books: resultSearch,
        },
      })
      .code(200);
    return response;
  }
  if (Number(finished) === 0) {
    const searchFinished = false;
    const resultTempSearch = [];
    books.forEach((book) => {
      if (book.finished === searchFinished) {
        resultTempSearch.push(book);
      }
    });
    const resultSearch = resultTempSearch.map((resBook) => ({
      id: resBook.id,
      name: resBook.name,
      publisher: resBook.publisher,
      finished: searchFinished,
    }));
    const response = h
      .response({
        status: 'success',
        message: 'My Books is not finished',
        data: {
          books: resultSearch,
        },
      })
      .code(200);
    return response;
  }
  const booksShow = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  const response = h
    .response({
      status: 'success',
      message: 'My Books',
      data: {
        books: booksShow,
      },
    })
    .code(200);
  return response;
};

const readBookById = (request, h) => {
  const { bookId } = request.params;
  const bookRequest = books.filter((book) => book.id === bookId)[0];
  if (bookRequest) {
    const response = h
      .response({
        status: 'success',
        message: 'My Book',
        data: {
          book: bookRequest,
        },
      })
      .code(200);
    return response;
  }
  const response = h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
  return response;
};
const updateBookById = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const finished = Number(readPage) === Number(pageCount);
  const updatedAt = new Date().toISOString();
  if (!name) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
    return response;
  }
  if (Number(readPage) > Number(pageCount)) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
    return response;
  }
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year: Number(year),
      author,
      summary,
      publisher,
      pageCount: Number(pageCount),
      readPage: Number(readPage),
      finished,
      reading,
      updatedAt,
    };
    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
        data: {
          updateBook: books[index],
        },
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addingBook,
  readAllBooks,
  readBookById,
  updateBookById,
  deleteBookById,
};
