export interface Book {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl?: string;
  publishedDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookResponse {
  success: boolean;
  data: Book;
  message?: string;
}

export interface BooksResponse {
  success: boolean;
  data: Book[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
