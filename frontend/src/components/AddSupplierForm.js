import React, { useState } from "react";

function AddSupplierForm() {
  const [supplier, setSupplier] = useState({ name: "", contact: "", email: "" });

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(supplier),
    })
      .then((res) => res.json())
      .then(() => {
        // notify other components
        window.dispatchEvent(new Event('inventoryUpdated'));
        alert("✅ Supplier added successfully!");
        setSupplier({ name: "", contact: "", email: "" });
      })
      .catch((err) => {
        console.error("Error adding supplier:", err);
        alert("Failed to add supplier. See console for details.");
      });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Supplier Name"
          value={supplier.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="contact"
          placeholder="Contact"
          value={supplier.contact}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={supplier.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full btn-primary">
          Add Supplier
        </button>
      </form>
    </div>
  );
}

export default AddSupplierForm;
