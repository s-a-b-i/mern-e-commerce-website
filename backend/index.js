import dotenv from 'dotenv';
import connectDB from './db/dbconnection.js';
import { app } from './app.js';

dotenv.config();

(async () => {
  try {
    await connectDB();
    app.on('error', (error) => {
      console.error('Server Error:', error);
      throw error;
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database Connection Error:', error);
  }
})();
 