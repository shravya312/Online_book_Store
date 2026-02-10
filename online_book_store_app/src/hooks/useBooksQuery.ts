import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Book } from '../types/book';

// Query keys
export const bookKeys = {
  all: ['books'] as const,
  lists: () => [...bookKeys.all, 'list'] as const,
  list: (filters: { search?: string; category?: string }) => 
    [...bookKeys.lists(), filters] as const,
  details: () => [...bookKeys.all, 'detail'] as const,
  detail: (id: string) => [...bookKeys.details(), id] as const,
};

// Get all books query
export const useBooksQuery = (filters?: { search?: string; category?: string }) => {
  return useQuery({
    queryKey: bookKeys.list(filters || {}),
    queryFn: () => api.getBooks(filters),
    select: (data) => ({
      books: data.data || [],
      pagination: data.pagination,
      success: data.success,
      message: data.message,
    }),
  });
};

// Get single book query
export const useBookQuery = (id: string) => {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => api.getBook(id),
    enabled: !!id,
    select: (data) => data.data,
  });
};

// Create book mutation
export const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (book: Partial<Book>) => api.createBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
};

// Update book mutation
export const useUpdateBookMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, book }: { id: string; book: Partial<Book> }) => 
      api.updateBook(id, book),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookKeys.detail(variables.id) });
    },
  });
};

// Delete book mutation
export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => api.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
};
