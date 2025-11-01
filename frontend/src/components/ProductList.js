import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", category: "", stock: "", supplier_id: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Refresh when other parts of the app update inventory
  useEffect(() => {
    const handler = () => fetchProducts();
    window.addEventListener('inventoryUpdated', handler);
    return () => window.removeEventListener('inventoryUpdated', handler);
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      stock: product.stock,
      supplier_id: product.supplier_id,
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/products/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingId(null);
        fetchProducts();
        window.dispatchEvent(new Event('inventoryUpdated'));
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      })
        .then(() => fetchProducts())
          .then(() => window.dispatchEvent(new Event('inventoryUpdated')))
        .catch((err) => console.error("Error deleting product:", err));
    }
  };

  const isLowStock = (stock) => stock < 10;

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛒 Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} className={isLowStock(p.stock) ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{p.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {editingId === p.id ? (
                      <input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      p.name
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {editingId === p.id ? (
                      <input
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      p.category
                    )}
                  </td>
                  <td className={`px-4 py-2 whitespace-nowrap text-sm ${isLowStock(p.stock) ? "text-red-600 font-bold" : "text-gray-900"}`}>
                    {editingId === p.id ? (
                      <input
                        type="number"
                        value={editForm.stock}
                        onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      p.stock
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{p.supplier_name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {editingId === p.id ? (
                      <div className="flex space-x-2">
                        <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                          Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button aria-label={`Edit ${p.name}`} onClick={() => handleEdit(p)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                          Edit
                        </button>
                        <button aria-label={`Delete ${p.name}`} onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
