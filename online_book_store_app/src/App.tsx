import { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import ScrollToTop from './components/ScrollToTop';
import type { Book } from './types/book';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBook(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Online Book Store</h1>
        <p>Manage your book collection</p>
      </header>

      <main className="App-main">
        {!showForm ? (
          <>
            <div className="header-actions">
              <button onClick={handleAddBook} className="add-book-btn">
                + Add New Book
              </button>
            </div>
            <BookList key={refreshKey} />
          </>
        ) : (
          <div className="form-container">
            <BookForm
              onSuccess={handleFormSuccess}
              editingBook={editingBook}
            />
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        )}
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;
