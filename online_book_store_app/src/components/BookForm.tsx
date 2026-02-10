import { useState } from 'react';
import { api } from '../services/api';
import type { Book } from '../types/book';
import './BookForm.css';

interface BookFormProps {
  onSuccess: () => void;
  editingBook?: Book | null;
}

const BookForm = ({ onSuccess, editingBook }: BookFormProps) => {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: editingBook?.title || '',
    author: editingBook?.author || '',
    isbn: editingBook?.isbn || '',
    price: editingBook?.price || 0,
    description: editingBook?.description || '',
    category: editingBook?.category || '',
    stock: editingBook?.stock || 0,
    imageUrl: editingBook?.imageUrl || '',
    publishedDate: editingBook?.publishedDate || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (editingBook?._id) {
        response = await api.updateBook(editingBook._id, formData);
      } else {
        response = await api.createBook(formData);
      }

      if (response.success) {
        onSuccess();
        if (!editingBook) {
          setFormData({
            title: '',
            author: '',
            isbn: '',
            price: 0,
            description: '',
            category: '',
            stock: 0,
            imageUrl: '',
            publishedDate: '',
          });
        }
      } else {
        setError(response.message || 'Failed to save book');
      }
    } catch (err) {
      setError('Error saving book');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
      
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="isbn">ISBN *</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock *</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="publishedDate">Published Date</label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Saving...' : editingBook ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;
