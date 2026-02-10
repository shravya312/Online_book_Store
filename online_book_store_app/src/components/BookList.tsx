import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Book, BooksResponse } from '../types/book';
import BookCard from './BookCard';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, category]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: BooksResponse = await api.getBooks({
        search: searchTerm || undefined,
        category: category || undefined,
      });
      if (response.success) {
        setBooks(response.data || []);
        if (response.message && response.message.includes('Failed to connect')) {
          setError(response.message);
        }
      } else {
        setError(response.message || 'Failed to fetch books');
        setBooks([]);
      }
    } catch (err: any) {
      setError(err.message || 'Error loading books. Make sure the backend server is running.');
      setBooks([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      const response = await api.deleteBook(id);
      if (response.success) {
        setBooks(books.filter(book => book._id !== id));
      } else {
        alert('Failed to delete book');
      }
    } catch (err) {
      alert('Error deleting book');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  return (
    <div className="book-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
          <option value="History">History</option>
          <option value="Biography">Biography</option>
        </select>
      </div>

      {error && <div className="error">{error}</div>}

      {books.length === 0 ? (
        <div className="no-books">No books found. Add some books to get started!</div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
