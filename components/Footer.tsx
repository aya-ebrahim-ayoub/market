
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Facebook, Twitter, Instagram, 
  Youtube, Mail, Phone, MapPin, ArrowRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-600/20 group-hover:bg-cyan-500 transition-colors">
                <ShoppingBag className="text-white" size={22} />
              </div>
              <span className="text-2xl font-black text-white">
                SwiftMarket
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The world's fastest growing multi-vendor marketplace. Premium products, verified sellers, and global express delivery.
            </p>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
                <Instagram size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
                <Youtube size={18} />
              </button>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">Marketplace</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Electronics & Tech</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home & Living</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Beauty & Health</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Sports & Fitness</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">Support & Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Track My Order</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Vendor Policy</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">Newsletter</h4>
            <p className="text-sm mb-6">Subscribe to get special offers and drop alerts.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-600/50 transition-all text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 w-10 bg-cyan-600 text-white rounded-xl flex items-center justify-center hover:bg-cyan-500 transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <Mail size={16} className="text-cyan-500" />
                <span>hello@swiftmarket.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Phone size={16} className="text-cyan-500" />
                <span>+1 (555) 000-1234</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-500">
            © 2025 SwiftMarket Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Apple_Pay_logo.svg" alt="Apple Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};
