
import React from 'react';
import { useStore } from '../store/StoreContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, placeOrder } = useStore();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 25.00;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-8 border border-slate-100">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-3">Your bag is empty</h2>
        <p className="text-slate-500 mb-10 max-w-sm text-center font-medium">Add premium items from our curated collections to start your shopping journey.</p>
        <Link to="/" className="px-12 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-cyan-600 transition-all shadow-xl active:scale-95">
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-baseline gap-4">
          <h1 className="text-3xl font-black text-slate-900">Checkout Bag</h1>
          <span className="text-slate-400 font-bold">{cart.length} items</span>
        </div>
        
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
          {cart.map((item) => (
            <div key={item.id} className="p-8 border-b border-slate-100 last:border-0 flex flex-col sm:flex-row gap-8 hover:bg-slate-50/50 transition-colors">
              <div className="w-28 h-28 bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden flex-shrink-0 p-4">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">Verified Vendor</span>
                  </div>
                  
                  <div className="pt-4 flex items-center gap-6">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-2 px-4 hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-900"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-2 px-4 hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-900"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <p className="text-2xl font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-slate-400 font-bold mt-1">${item.price.toFixed(2)} / unit</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl sticky top-24 border border-white/5">
          <h2 className="text-2xl font-black mb-8">Summary</h2>
          <div className="space-y-5">
            <div className="flex justify-between text-slate-400 font-bold text-sm">
              <span>Cart Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400 font-bold text-sm">
              <span>Handling Fee</span>
              <span className="text-white">{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="pt-6 border-t border-white/10 flex justify-between items-baseline">
              <span className="font-black text-lg">Total</span>
              <span className="text-4xl font-black text-cyan-400">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            onClick={placeOrder}
            className="w-full mt-10 flex items-center justify-center gap-3 py-5 bg-cyan-600 text-white font-black rounded-2xl hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-600/20 active:scale-95 group"
          >
            Process Secure Checkout
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Encrypted Transactions
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Global Priority Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
