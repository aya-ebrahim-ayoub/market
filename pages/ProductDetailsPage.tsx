
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Badge } from '../components/Shared';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-cyan-600 font-bold flex items-center gap-2 mx-auto">
          <ArrowLeft size={18} /> Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors font-semibold">
        <ArrowLeft size={20} /> Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-sm p-8 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="space-y-8">
          <div>
            <Badge variant="info">{product.category}</Badge>
            <h1 className="text-4xl font-black text-slate-900 mt-3 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center text-amber-500">
                <Star size={20} fill="currentColor" />
                <span className="ml-1.5 text-slate-900 font-black text-lg">{product.rating}</span>
              </div>
              <span className="text-slate-400 font-bold text-sm">({product.reviews} verified reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-cyan-600">${product.price.toFixed(2)}</span>
            <span className="text-slate-400 text-sm font-bold">Tax included</span>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg border-l-4 border-cyan-100 pl-6">
            {product.description}
          </p>

          <div className="pt-8 border-t border-slate-100 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden bg-white h-14">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-6 py-2 hover:bg-slate-50 transition-colors text-slate-600 font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-slate-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-6 py-2 hover:bg-slate-50 transition-colors text-slate-600 font-bold"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addToCart(product);
                  navigate('/cart');
                }}
                className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-cyan-600 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingCart size={22} />
                Confirm & Add to Bag
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                <Truck size={20} className="text-cyan-500" />
                <div className="text-[10px] font-black uppercase text-slate-400">Free Express Delivery</div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                <RotateCcw size={20} className="text-cyan-500" />
                <div className="text-[10px] font-black uppercase text-slate-400">30-Day Policy</div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                <ShieldCheck size={20} className="text-cyan-500" />
                <div className="text-[10px] font-black uppercase text-slate-400">100% Authentic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
