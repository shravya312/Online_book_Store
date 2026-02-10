import { create } from 'zustand';
import type { Book } from '../types/book';

interface BookStore {
  // State
  selectedBook: Book | null;
  searchTerm: string;
  category: string;
  showForm: boolean;
  editingBook: Book | null;

  // Actions
  setSelectedBook: (book: Book | null) => void;
  setSearchTerm: (term: string) => void;
  setCategory: (category: string) => void;
  setShowForm: (show: boolean) => void;
  setEditingBook: (book: Book | null) => void;
  resetFilters: () => void;
}

export const useBookStore = create<BookStore>((set) => ({
  // Initial state
  selectedBook: null,
  searchTerm: '',
  category: '',
  showForm: false,
  editingBook: null,

  // Actions
  setSelectedBook: (book) => set({ selectedBook: book }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategory: (category) => set({ category }),
  setShowForm: (show) => set({ showForm: show }),
  setEditingBook: (book) => set({ editingBook: book }),
  resetFilters: () => set({ searchTerm: '', category: '' }),
}));
