import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// ✅ Get all suppliers
router.get('/', (req, res) => {
  const query = 'SELECT * FROM suppliers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching suppliers:', err);
      res.status(500).json({ error: 'Failed to fetch suppliers' });
    } else {
      res.json(results);
    }
  });
});

// ✅ Add a new supplier
router.post('/', (req, res) => {
  const { name, contact, email } = req.body;
  const query = 'INSERT INTO suppliers (name, contact, email) VALUES (?, ?, ?)';
  db.query(query, [name, contact, email], (err, result) => {
    if (err) {
      console.error('❌ Error adding supplier:', err);
      res.status(500).json({ error: 'Failed to add supplier' });
    } else {
      res.json({ message: '✅ Supplier added successfully', id: result.insertId });
    }
  });
});

// ✅ Update a supplier
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, contact, email } = req.body;
  const query = 'UPDATE suppliers SET name = ?, contact = ?, email = ? WHERE id = ?';
  db.query(query, [name, contact, email, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating supplier:', err);
      res.status(500).json({ error: 'Failed to update supplier' });
    } else {
      res.json({ message: '✅ Supplier updated successfully' });
    }
  });
});

// ✅ Delete a supplier
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM suppliers WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting supplier:', err);
      res.status(500).json({ error: 'Failed to delete supplier' });
    } else {
      res.json({ message: '✅ Supplier deleted successfully' });
    }
  });
});

export default router;
