import express from 'express';
import healthRoutes from './routes/health.routes.js';
import brandRoutes from './routes/brand.routes.js';
import motorcycleRoutes from './routes/motorcycle.routes.js';
import motorcycleImageRoutes from './routes/motorcycle-image.routes.js';
import authRoutes from './auth/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Daftar domain yang diizinkan mengakses API
const allowedOrigins = [
  'http://localhost:5173',
  'https://motorcycle-showroom-e37f.vercel.app/', // Domain Vercel Frontend kamu
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins, // Passing array langsung (aman dari 500 error)
    credentials: true,       // Wajib untuk cookie refresh token
  })
);

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: 'Used Motorcycle Showroom API',
  });
});

app.use('/health', healthRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/motorcycles', motorcycleRoutes);
app.use('/api/v1', motorcycleImageRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorMiddleware);

export default app;