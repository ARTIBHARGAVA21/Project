import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Books from './components/Books';
import Authors from './components/Authors';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-teal-400 via-purple-500 to-indigo-600 text-white">
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide">
            Library Management
          </h1>

          <nav className="mb-8">
            <ul className="flex justify-center space-x-8">
              <li>
                <Link
                  to="/books"
                  className="text-lg font-medium text-teal-200 hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Manage Books
                </Link>
              </li>
              <li>
                <Link
                  to="/authors"
                  className="text-lg font-medium text-teal-200 hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Manage Authors
                </Link>
              </li>
            </ul>
          </nav>

          <div className="bg-white p-6 rounded-lg shadow-xl">
            <Routes>
              <Route path="/books" element={<Books />} />
              <Route path="/authors" element={<Authors />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
