import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Book, BooksResponse } from '../types/book';

interface UseBooksParams {
  search?: string;
  category?: string;
}

export const useBooks = (params?: UseBooksParams) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: BooksResponse = await api.getBooks({
        search: params?.search,
        category: params?.category,
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

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.search, params?.category]);

  const refetch = () => {
    fetchBooks();
  };

  return { books, loading, error, refetch };
};
