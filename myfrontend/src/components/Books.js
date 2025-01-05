import React, { useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook, getAuthors } from '../api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', published_date: '', author: '' });
  const [editBook, setEditBook] = useState(null); // Track the book being edited
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books.');
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      setAuthors(response.data);
    } catch (err) {
      console.error('Error fetching authors:', err);
      setError('Failed to load authors.');
    }
  };

  const handleCreate = async () => {
    try {
      if (!newBook.title || !newBook.published_date || !newBook.author) {
        setError('All fields are required.');
        return;
      }
      await createBook(newBook);
      setNewBook({ title: '', published_date: '', author: '' });
      fetchBooks();
      setError('');
    } catch (err) {
      console.error('Error creating book:', err.response?.data || err.message);
      setError('Failed to create book. Please check the data and try again.');
    }
  };

  const handleUpdate = async () => {
    if (!editBook) return;

    try {
      const updatedData = {
        title: editBook.title,
        published_date: editBook.published_date,
        author: editBook.author,
      };

      await updateBook(editBook.id, updatedData);
      setEditBook(null); // Clear edit state
      fetchBooks();
      setError('');
    } catch (err) {
      console.error('Error updating book:', err.response?.data || err.message);
      setError('Failed to update the book. Please check the data and try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete the book.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Books</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Book</h2>
        <div className="flex flex-col space-y-4">
          <input
            className="border p-3 rounded-md text-black"
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            className="border p-3 rounded-md text-black"
            type="date"
            value={newBook.published_date}
            onChange={(e) => setNewBook({ ...newBook, published_date: e.target.value })}
          />
          <select
            className="border p-3 rounded-md text-black"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: parseInt(e.target.value) || '' })}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          <button onClick={handleCreate} className="bg-blue-500 text-white py-3 px-6 rounded-md">
            Add Book
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Books List</h2>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md text-black">
            {editBook && editBook.id === book.id ? (
              <div className="flex flex-col space-y-2">
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  value={editBook.title}
                  onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                />
                <input
                  className="border p-2 rounded-md"
                  type="date"
                  value={editBook.published_date}
                  onChange={(e) => setEditBook({ ...editBook, published_date: e.target.value })}
                />
                <select
                  className="border p-2 rounded-md"
                  value={editBook.author}
                  onChange={(e) => setEditBook({ ...editBook, author: parseInt(e.target.value) })}
                >
                  <option value="">Select Author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleUpdate} className="bg-green-500 text-white py-2 px-4 rounded-md">
                  Save
                </button>
              </div>
            ) : (
              <span>
                {book.title} ({book.published_date}) - Author ID: {book.author}
              </span>
            )}
            <div>
              <button
                onClick={() => setEditBook(book)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
