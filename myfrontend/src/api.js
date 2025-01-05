import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Authors CRUD
export const getAuthors = () => API.get('/authors/');
export const createAuthor = (data) => API.post('/authors/', data);
export const updateAuthor = (id, data) => API.put(`/authors/${id}/`, data);
export const deleteAuthor = (id) => API.delete(`/authors/${id}/`);

// Books CRUD
export const getBooks = () => API.get('/books/');
export const createBook = (data) => API.post('/books/', data);
export const updateBook = (id, data) => API.put(`/books/${id}/`, data);
export const deleteBook = (id) => API.delete(`/books/${id}/`);
