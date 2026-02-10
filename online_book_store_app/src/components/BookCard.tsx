import type { Book } from '../types/book';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

const BookCard = ({ book, onDelete }: BookCardProps) => {
  return (
    <div className="book-card">
      {book.imageUrl && (
        <img src={book.imageUrl} alt={book.title} className="book-image" />
      )}
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-description">{book.description}</p>
        <div className="book-details">
          <span className="book-category">{book.category}</span>
          <span className="book-isbn">ISBN: {book.isbn}</span>
        </div>
        <div className="book-footer">
          <div className="book-price-stock">
            <span className="book-price">${book.price.toFixed(2)}</span>
            <span className={`book-stock ${book.stock === 0 ? 'out-of-stock' : ''}`}>
              {book.stock === 0 ? 'Out of Stock' : `Stock: ${book.stock}`}
            </span>
          </div>
          <button
            onClick={() => book._id && onDelete(book._id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
