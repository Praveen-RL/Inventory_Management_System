import express from 'express';
import cors from 'cors';
import './config/db.js';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Inventory Management Backend is running 🚀');
});

app.listen(5000, () => {
  console.log('✅ Server running on port 5000');
});
