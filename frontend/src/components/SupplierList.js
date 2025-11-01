import React, { useEffect, useState } from "react";

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", contact: "", email: "" });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Refresh when other parts of the app modify inventory/suppliers
  useEffect(() => {
    const handler = () => fetchSuppliers();
    window.addEventListener('inventoryUpdated', handler);
    return () => window.removeEventListener('inventoryUpdated', handler);
  }, []);

  const fetchSuppliers = () => {
    fetch("http://localhost:5000/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Error fetching suppliers:", err));
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier.id);
    setEditForm({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/suppliers/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingId(null);
        fetchSuppliers();
        window.dispatchEvent(new Event('inventoryUpdated'));
      })
      .catch((err) => console.error("Error updating supplier:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      fetch(`http://localhost:5000/api/suppliers/${id}`, {
        method: "DELETE",
      })
        .then(() => fetchSuppliers())
        .then(() => window.dispatchEvent(new Event('inventoryUpdated')))
        .catch((err) => console.error("Error deleting supplier:", err));
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏭 Supplier List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.length > 0 ? (
              suppliers.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{s.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {editingId === s.id ? (
                      <input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      s.name
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {editingId === s.id ? (
                      <input
                        value={editForm.contact}
                        onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      s.contact
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {editingId === s.id ? (
                      <input
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      s.email
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {editingId === s.id ? (
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
                        <button onClick={() => handleEdit(s)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-sm text-gray-500">
                  No suppliers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierList;
