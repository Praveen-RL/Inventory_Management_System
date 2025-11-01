import React from "react";
import ProductList from "./components/ProductList";
import SupplierList from "./components/SupplierList";
import AddSupplierForm from "./components/AddSupplierForm";
import AddProductForm from "./components/AddProductForm";
import LowStockAlerts from "./components/LowStockAlerts";
import Reports from "./components/Reports";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📦 Inventory Management</h1>
              <p className="text-sm text-gray-500">Simple demo dashboard — modernized UI</p>
            </div>
            <div>
              <button className="btn-primary">New Report</button>
            </div>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <AddProductForm />
              <AddSupplierForm />
              <ProductList />
              <SupplierList />
            </div>
            <div className="space-y-8">
              <LowStockAlerts />
              <Reports />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
