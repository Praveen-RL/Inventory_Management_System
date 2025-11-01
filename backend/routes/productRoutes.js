import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// ✅ Get all products
router.get('/', (req, res) => {
  const query = `
    SELECT products.*, suppliers.name AS supplier_name
    FROM products
    LEFT JOIN suppliers ON products.supplier_id = suppliers.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    } else {
      res.json(results);
    }
  });
});

// ✅ Add a new product
router.post('/', (req, res) => {
  const { name, category, stock, supplier_id } = req.body;
  const query = 'INSERT INTO products (name, category, stock, supplier_id) VALUES (?, ?, ?, ?)';
  db.query(query, [name, category, stock, supplier_id], (err, result) => {
    if (err) {
      console.error('❌ Error adding product:', err);
      res.status(500).json({ error: 'Failed to add product' });
    } else {
      res.json({ message: '✅ Product added successfully', id: result.insertId });
    }
  });
});

// ✅ Update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, stock, supplier_id } = req.body;
  const query = 'UPDATE products SET name = ?, category = ?, stock = ?, supplier_id = ? WHERE id = ?';
  db.query(query, [name, category, stock, supplier_id, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating product:', err);
      res.status(500).json({ error: 'Failed to update product' });
    } else {
      res.json({ message: '✅ Product updated successfully' });
    }
  });
});

// ✅ Delete a product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting product:', err);
      res.status(500).json({ error: 'Failed to delete product' });
    } else {
      res.json({ message: '✅ Product deleted successfully' });
    }
  });
});

export default router;
