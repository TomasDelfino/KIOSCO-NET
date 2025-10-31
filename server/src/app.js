import dotenv from 'dotenv'; dotenv.config();
import express from 'express'; import cors from 'cors'; import morgan from 'morgan';
import mongoose from 'mongoose'; import path from 'path'; import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js'; import offersRouter from './routes/offers.js';
import authRouter from './routes/auth.js'; import usersRouter from './routes/users.js';
import salesRouter from './routes/sales.js'; import uploadRouter from './routes/upload.js';

const app = express();
app.use(express.json({ limit:'10mb' })); app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));

const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req,res)=> res.json({ ok:true, v:'v9', db:!!mongoose.connection.readyState, time:new Date() }));
app.use('/api/auth', authRouter); app.use('/api/products', productsRouter); app.use('/api/offers', offersRouter);
app.use('/api/users', usersRouter); app.use('/api/sales', salesRouter); app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('MongoDB conectado'); app.listen(PORT, ()=>console.log('API http://localhost:'+PORT));
}).catch(err=>{ console.error('Error Mongo:', err?.message || err); app.listen(PORT, ()=>console.log('API (sin DB) http://localhost:'+PORT)); });
