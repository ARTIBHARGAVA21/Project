import React, { useState, useEffect } from 'react';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../api';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: '', email: '' });
  const [editableAuthor, setEditableAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      setAuthors(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching authors:", error.response?.data || error.message);
      setError("Failed to fetch authors. Please try again.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreate = async () => {
    if (!validateEmail(newAuthor.email)) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      await createAuthor(newAuthor);
      setNewAuthor({ name: '', email: '' });
      fetchAuthors();
    } catch (error) {
      console.error("Error creating author:", error.response?.data || error.message);
      setError(error.response?.data?.email?.[0] || "Failed to create author. Please check the data and try again.");
    }
  };

  const handleEdit = (author) => {
    setEditableAuthor({ ...author });
  };

  const handleUpdate = async () => {
    if (!editableAuthor) return;

    // Only validate email if it has been updated
    if (editableAuthor.email !== authors.find((a) => a.id === editableAuthor.id)?.email) {
      if (!validateEmail(editableAuthor.email)) {
        setError("Enter a valid email address.");
        return;
      }
    }

    try {
      await updateAuthor(editableAuthor.id, editableAuthor);
      setEditableAuthor(null);
      setError(null);
      fetchAuthors();
    } catch (error) {
      console.error(`Error updating author with id ${editableAuthor.id}:`, error.response?.data || error.message);
      setError(error.response?.data?.email?.[0] || `Failed to update author. Please try again.`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      fetchAuthors();
    } catch (error) {
      console.error(`Error deleting author with id ${id}:`, error.response?.data || error.message);
      setError(`Failed to delete author with ID ${id}. Please try again.`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800 tracking-wide">
        Manage Authors
      </h1>

      {error && (
        <div className="mb-6 p-4 text-red-600 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Author</h2>
        <div className="flex flex-col space-y-4">
          <input
            className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            placeholder="Author Name"
            value={newAuthor.name}
            onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
          />
          <input
            className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="email"
            placeholder="Author Email"
            value={newAuthor.email}
            onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })}
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Author
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Authors List</h2>
      <ul className="space-y-4">
        {authors.map((author) => (
          <li
            key={author.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-300"
          >
            {editableAuthor?.id === author.id ? (
              <div className="flex space-x-4">
                <input
                  className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  type="text"
                  value={editableAuthor.name}
                  onChange={(e) => setEditableAuthor({ ...editableAuthor, name: e.target.value })}
                />
                <input
                  className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  type="email"
                  value={editableAuthor.email}
                  onChange={(e) => setEditableAuthor({ ...editableAuthor, email: e.target.value })}
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Save
                </button>
              </div>
            ) : (
              <span className="text-lg text-gray-800">{author.name} ({author.email})</span>
            )}
            <div>
              <button
                onClick={() => handleEdit(author)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(author.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
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

export default Authors;
