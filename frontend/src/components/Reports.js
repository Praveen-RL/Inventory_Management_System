import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reports() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // refresh charts when inventory updates elsewhere
  useEffect(() => {
    const handler = () => {
      fetch("http://localhost:5000/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    };
    window.addEventListener('inventoryUpdated', handler);
    return () => window.removeEventListener('inventoryUpdated', handler);
  }, []);

  const data = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Stock Levels",
        data: products.map((p) => p.stock),
        backgroundColor: products.map((p) => (p.stock < 10 ? "rgba(255, 99, 132, 0.6)" : "rgba(54, 162, 235, 0.6)")),
        borderColor: products.map((p) => (p.stock < 10 ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Stock Levels",
      },
    },
  };

  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock < 10).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Reports & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-blue-800">Total Products</h3>
          <p className="text-2xl font-bold text-blue-600">{totalProducts}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-red-800">Low Stock Items</h3>
          <p className="text-2xl font-bold text-red-600">{lowStockCount}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-green-800">Total Stock</h3>
          <p className="text-2xl font-bold text-green-600">{totalStock}</p>
        </div>
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Reports;
