
import React, { useMemo, useState } from 'react';
import { useStore } from '../store/StoreContext';
import { CATEGORIES } from '../constants';
import { Star, ShoppingCart, TrendingUp, Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Shared';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4">
          <Badge variant="neutral">{product.category}</Badge>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2 gap-2">
          <Link to={`/product/${product.id}`} className="block flex-1">
            <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-cyan-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center text-amber-500 text-xs font-bold shrink-0">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-slate-900">{product.rating}</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 h-8">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase block">Price</span>
            <span className="text-xl font-black text-slate-900">${product.price.toFixed(2)}</span>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-xl hover:bg-cyan-600 transition-all shadow-lg active:scale-95"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const { products, searchQuery, selectedCategory, setSelectedCategory } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high' | 'rated'>('featured');

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rated') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 sm:px-16 sm:py-24 text-white">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 backdrop-blur-md text-cyan-300 text-xs font-black uppercase tracking-widest mb-8 border border-cyan-500/20">
            <Sparkles size={14} />
            <span>Premium Multi-Vendor Platform</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight">
            Elevate Your <br />
            <span className="text-cyan-400">Marketplace.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-300 opacity-90 leading-relaxed">
            Discover a curated world of high-performance tech, timeless fashion, and home essentials.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-cyan-600 text-white font-black rounded-2xl hover:bg-cyan-500 transition-all shadow-2xl shadow-cyan-600/40">
              Start Shopping
            </button>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-md text-white font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10">
              Vendor Portal
            </button>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-slate-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                : 'bg-white border-slate-100 text-slate-500 hover:border-cyan-600 hover:text-cyan-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm self-start">
          <div className="px-3 text-slate-400">
            <SlidersHorizontal size={18} />
          </div>
          <select 
            className="bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer pr-10"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rated">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => <ProductCard key={p.id} product={p} />)
        ) : (
          <div className="col-span-full py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 text-slate-300 mb-6 border border-slate-100">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-800">No items found</h3>
            <p className="text-slate-500 mt-2">Adjust your filters or try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};
