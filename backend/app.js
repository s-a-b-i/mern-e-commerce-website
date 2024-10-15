import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes.js';
import { productRouter } from './routes/product.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import { searchRouter } from './routes/search.routes.js';
import path  from 'path';

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/search', searchRouter);

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

export { app };
