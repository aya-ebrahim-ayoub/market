
import React from 'react';
import { useStore } from '../store/StoreContext';
import { Package, ChevronRight, Clock } from 'lucide-react';
import { Badge, Card } from '../components/Shared';

export const OrdersPage: React.FC = () => {
  const { orders } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">My Orders</h1>
          <p className="text-slate-500">Track and manage your recent purchases.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <Card className="p-20 text-center border-dashed border-2 border-slate-200 bg-transparent">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
            <Package size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-800">No orders yet</h3>
          <p className="text-slate-500 mt-2 max-w-xs mx-auto">When you make a purchase, your complete order history and tracking will appear here.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6 hover:border-cyan-200 transition-all cursor-pointer group hover:shadow-xl hover:shadow-cyan-600/5">
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 flex-shrink-0">
                    <Package size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-lg text-slate-900">Order {order.id}</span>
                      <Badge variant={order.status === 'DELIVERED' ? 'success' : 'info'}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-sm text-slate-400 font-bold">
                      <Clock size={14} />
                      {new Date(order.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-2xl font-black text-cyan-600">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex -space-x-3 overflow-hidden">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="inline-block h-10 w-10 rounded-xl ring-4 ring-white overflow-hidden bg-white border border-slate-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                  ))}
                  {order.items.length > 5 && (
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-500 ring-4 ring-white border border-slate-100">
                      +{order.items.length - 5}
                    </div>
                  )}
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                  {order.items.reduce((acc, item) => acc + item.quantity, 0)} Items
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
