import { useState } from 'react';
import { api } from '../services/api';
import type { Book, BookResponse } from '../types/book';

export const useBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBook = async (bookData: Partial<Book>): Promise<Book | null> => {
    try {
      setLoading(true);
      setError(null);
      const response: BookResponse = await api.createBook(bookData);
      if (response.success) {
        return response.data;
      } else {
        setError(response.message || 'Failed to create book');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Error creating book');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (id: string, bookData: Partial<Book>): Promise<Book | null> => {
    try {
      setLoading(true);
      setError(null);
      const response: BookResponse = await api.updateBook(id, bookData);
      if (response.success) {
        return response.data;
      } else {
        setError(response.message || 'Failed to update book');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Error updating book');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.deleteBook(id);
      if (response.success) {
        return true;
      } else {
        setError(response.message || 'Failed to delete book');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'Error deleting book');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createBook, updateBook, deleteBook, loading, error };
};
