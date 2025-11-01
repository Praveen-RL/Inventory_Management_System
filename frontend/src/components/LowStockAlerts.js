import React, { useEffect, useState } from "react";

function LowStockAlerts() {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const lowStock = data.filter((product) => product.stock < 10);
        setLowStockProducts(lowStock);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // listen for inventory updates
  useEffect(() => {
    const handler = () => {
      fetch("http://localhost:5000/api/products")
        .then((res) => res.json())
        .then((data) => setLowStockProducts(data.filter((product) => product.stock < 10)))
        .catch((err) => console.error("Error fetching products:", err));
    };
    window.addEventListener('inventoryUpdated', handler);
    return () => window.removeEventListener('inventoryUpdated', handler);
  }, []);

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">⚠️ Low Stock Alerts</h2>
      {lowStockProducts.length > 0 ? (
        <ul className="space-y-2">
          {lowStockProducts.map((product) => (
            <li key={product.id} className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-md">
              <div>
                <span className="font-medium text-red-800">{product.name}</span>
                <span className="text-red-600 ml-2">(Stock: {product.stock})</span>
              </div>
              <span className="text-sm text-gray-600">{product.category}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No low stock alerts at this time.</p>
      )}
    </div>
  );
}

export default LowStockAlerts;
