import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { query } from './config/db.js';

dotenv.config();
const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Day 1 Health Check Endpoint (Verifies DB + Seed Data)
app.get('/api/health', async (req, res) => {
  try {
    const result = await query('SELECT COUNT(*) AS department_count FROM departments');
    res.status(200).json({
      status: 'OK',
      database: 'Connected',
      seededDepartments: Number(result.rows[0].department_count),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 EMS Backend running on http://localhost:${PORT}`);
});