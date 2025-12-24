
import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { UserRole } from '../types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, User, Search, Menu, X, Home, 
  LayoutDashboard, ShoppingCart, List, Users, 
  Settings, LogOut, Package, ChevronRight, ClipboardList 
} from 'lucide-react';
import { Footer } from './Footer';

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; label: string; active: boolean; onClick?: () => void }> = ({ to, icon, label, active, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20 translate-x-1' : 'text-slate-500 hover:bg-cyan-50 hover:text-cyan-700'
    }`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </Link>
);

const Navbar: React.FC<{ toggleMobileMenu: () => void }> = ({ toggleMobileMenu }) => {
  const { user, setUserRole, cart, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-cyan-600 transition-colors">
                <ShoppingBag className="text-white" size={22} />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-cyan-600 hidden sm:block">
                SwiftMarket
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-6 relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={18} />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 border border-slate-100 rounded-2xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600/20 focus:border-cyan-600 focus:bg-white transition-all text-sm"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <select 
              className="text-xs font-black uppercase tracking-tight border-none bg-slate-100 text-slate-700 rounded-xl px-4 py-2 focus:ring-0 cursor-pointer hover:bg-slate-200 transition-colors"
              value={user.role}
              onChange={(e) => {
                setUserRole(e.target.value as UserRole);
                navigate('/');
              }}
            >
              <option value={UserRole.CUSTOMER}>Customer</option>
              <option value={UserRole.VENDOR}>Vendor</option>
              <option value={UserRole.ADMIN}>Admin</option>
            </select>

            <Link to="/cart" className="relative p-3 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all">
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-cyan-600 rounded-full ring-2 ring-white">
                  {cart.length}
                </span>
              )}
            </Link>

            <button 
              onClick={() => navigate('/orders')}
              className="hidden sm:flex items-center gap-2 p-1.5 pl-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all"
            >
              <img src={user.avatar} alt="User" className="w-8 h-8 rounded-lg object-cover" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col font-medium selection:bg-cyan-100 selection:text-cyan-900">
      <Navbar toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transform lg:translate-x-0 transition-transform duration-500 lg:static ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full py-8">
            <div className="px-8 mb-8 flex items-center justify-between">
              <span className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Main Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900"><X size={20} /></button>
            </div>

            <div className="flex-1 px-4 space-y-1.5 overflow-y-auto">
              <SidebarLink to="/" label="Home Feed" icon={<Home size={20} />} active={location.pathname === '/'} onClick={() => setMobileMenuOpen(false)} />
              <SidebarLink to="/orders" label="My Orders" icon={<ClipboardList size={20} />} active={location.pathname === '/orders'} onClick={() => setMobileMenuOpen(false)} />
              
              {user.role === UserRole.VENDOR && (
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-1.5">
                  <span className="px-4 text-[10px] font-black uppercase tracking-widest text-cyan-600 block mb-2">Vendor Panel</span>
                  <SidebarLink to="/vendor" label="Analytics" icon={<LayoutDashboard size={20} />} active={location.pathname === '/vendor'} onClick={() => setMobileMenuOpen(false)} />
                  <SidebarLink to="/vendor/products" label="Inventory" icon={<Package size={20} />} active={location.pathname.startsWith('/vendor/products')} onClick={() => setMobileMenuOpen(false)} />
                </div>
              )}

              {user.role === UserRole.ADMIN && (
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-1.5">
                  <span className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Platform Admin</span>
                  <SidebarLink to="/admin" label="Command Center" icon={<LayoutDashboard size={20} />} active={location.pathname === '/admin'} onClick={() => setMobileMenuOpen(false)} />
                </div>
              )}
              
              <div className="pt-6 mt-auto">
                <button className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all font-bold text-sm">
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto h-[calc(100vh-80px)] bg-slate-50/50">
          <main className="p-4 sm:p-8">
            <div className="max-w-6xl mx-auto min-h-[60vh]">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </div>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
