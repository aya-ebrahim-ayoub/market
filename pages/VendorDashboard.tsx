
import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  Package, DollarSign, TrendingUp, Plus, 
  Search, Edit3, Trash2, Loader2, Sparkles,
  Bell, MessageCircle, AlertTriangle, CheckCircle2,
  Clock, ArrowUpRight, ArrowDownRight, X, Star
} from 'lucide-react';
import { generateProductDescription } from '../services/gemini';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { Badge, Card } from '../components/Shared';

const MOCK_SALES_DATA = [
  { name: 'Mon', sales: 400 },
  { name: 'Tue', sales: 300 },
  { name: 'Wed', sales: 600 },
  { name: 'Thu', sales: 800 },
  { name: 'Fri', sales: 500 },
  { name: 'Sat', sales: 900 },
  { name: 'Sun', sales: 700 },
];

export const VendorDashboard: React.FC = () => {
  const { products, user, addProduct, updateProduct, deleteProduct } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const vendorProducts = products.filter(p => p.vendorId === 'v1'); 

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Electronics',
    description: '',
    stock: ''
  });

  const handleAiDescription = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(formData.name, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSave = () => {
    const p: Product = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      stock: parseInt(formData.stock),
      image: editingProduct?.image || `https://picsum.photos/id/${Math.floor(Math.random()*200)}/600/600`,
      vendorId: 'v1',
      rating: editingProduct?.rating || 0,
      reviews: editingProduct?.reviews || 0
    };

    if (editingProduct) {
      updateProduct(p);
    } else {
      addProduct(p);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', category: 'Electronics', description: '', stock: '' });
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      price: p.price.toString(),
      category: p.category,
      description: p.description,
      stock: p.stock.toString()
    });
    setIsAdding(true);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Store Analytics</h1>
          <p className="text-slate-500">Your store performance is 12% higher than last week.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-black rounded-2xl hover:bg-cyan-700 transition-all shadow-xl shadow-cyan-600/20"
          >
            <Plus size={20} />
            Create Listing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Net Revenue', value: '$12,450', icon: <DollarSign />, color: 'bg-emerald-500', trend: '+12%' },
          { label: 'Active Orders', value: '154', icon: <Package />, color: 'bg-cyan-500', trend: '+5%' },
          { label: 'Customer Views', value: '4.2k', icon: <TrendingUp />, color: 'bg-slate-900', trend: '+18%' },
          { label: 'Product Rating', value: '4.8', icon: <Star />, color: 'bg-amber-500', trend: 'Stable' },
        ].map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl text-white ${stat.color} shadow-lg shadow-black/5`}>
                {/* Fix: cast to React.ReactElement<any> to resolve type error for 'size' prop */}
                {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-widest">{stat.trend}</span>
            </div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 p-8">
          <h2 className="text-xl font-black text-slate-900 mb-8">Sales Velocity</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="sales" stroke="#0891b2" strokeWidth={4} dot={{ r: 6, fill: '#0891b2', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-xl font-black text-slate-900 mb-6">Inventory Health</h2>
          <div className="space-y-6">
            {vendorProducts.slice(0, 5).map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(100, p.stock)}%` }}></div>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-400">{p.stock}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-black text-slate-900">Manage Products</h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Filter your catalog..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-cyan-600/20 focus:outline-none transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Item</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Stock</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendorProducts.map((p) => (
                <tr key={p.id} className="hover:bg-cyan-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={p.image} className="w-10 h-10 rounded-xl object-cover" />
                      <span className="font-bold text-slate-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <Badge variant={p.stock > 0 ? 'success' : 'error'}>{p.stock > 0 ? 'Active' : 'Out'}</Badge>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600">{p.stock} units</td>
                  <td className="px-8 py-5 font-black text-slate-900">${p.price}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(p)} className="p-2.5 text-cyan-600 hover:bg-cyan-100 rounded-xl"><Edit3 size={18} /></button>
                      <button onClick={() => deleteProduct(p.id)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">{editingProduct ? 'Update Listing' : 'New Listing'}</h2>
              <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-xl"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-cyan-600/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold">
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                  <button onClick={handleAiDescription} disabled={isGenerating} className="text-[10px] font-black text-cyan-600 uppercase flex items-center gap-1">
                    <Sparkles size={12} /> {isGenerating ? 'Drafting...' : 'AI Draft'}
                  </button>
                </div>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold" />
              </div>
            </div>
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={resetForm} className="px-6 py-3 font-bold text-slate-500">Cancel</button>
              <button onClick={handleSave} className="px-10 py-3 bg-slate-900 text-white font-black rounded-2xl hover:bg-cyan-600 transition-all">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
