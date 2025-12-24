
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './store/StoreContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { OrdersPage } from './pages/OrdersPage';
import { VendorDashboard } from './pages/VendorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserRole } from './types';

const RoleBasedRouter: React.FC = () => {
  const { user } = useStore();

  return (
    <Routes>
      {/* Shared/Customer Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      
      {/* Vendor Routes */}
      {user.role === UserRole.VENDOR && (
        <>
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/vendor/products" element={<VendorDashboard />} />
          <Route path="/vendor/orders" element={<div className="p-8 text-center bg-white rounded-3xl border border-gray-100">Store Orders UI Integrated into Dashboard</div>} />
        </>
      )}

      {/* Admin Routes */}
      {user.role === UserRole.ADMIN && (
        <>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/vendors" element={<div className="p-8 text-center bg-white rounded-3xl border border-gray-100">Admin Management UI Active</div>} />
          <Route path="/admin/products" element={<div className="p-8 text-center bg-white rounded-3xl border border-gray-100">Global Product Management Active</div>} />
          <Route path="/admin/users" element={<div className="p-8 text-center bg-white rounded-3xl border border-gray-100">User Governance Active</div>} />
        </>
      )}

      {/* Redirects */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <RoleBasedRouter />
        </Layout>
      </Router>
    </StoreProvider>
  );
};

export default App;
