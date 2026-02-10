import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/online_book_store';
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('⚠️  Server will start but API calls will fail until MongoDB is connected.');
    console.error('💡 Make sure MongoDB is running or update MONGODB_URI in .env file');
    // Don't exit - allow server to start even without MongoDB
    // This way the frontend can at least see the server is running
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});
