const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Get all books
  getBooks: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await fetch(`${API_BASE_URL}/books?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        data: [],
        message: 'Failed to connect to server. Make sure the backend is running.',
      };
    }
  },

  // Get single book
  getBook: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    return response.json();
  },

  // Create book
  createBook: async (book: any) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return response.json();
  },

  // Update book
  updateBook: async (id: string, book: any) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return response.json();
  },

  // Delete book
  deleteBook: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
