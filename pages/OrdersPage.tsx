
import React from 'react';
import { useStore } from '../store/StoreContext';
import { Package, ChevronRight, Clock } from 'lucide-react';
import { Badge, Card } from '../components/Shared';

export const OrdersPage: React.FC = () => {
  const { orders } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900">My Orders</h1>
          <p className="text-gray-500">Track and manage your recent purchases.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <Card className="p-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
            <Package size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No orders yet</h3>
          <p className="text-gray-500 mt-2">When you shop, your order history will appear here.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6 hover:border-indigo-200 transition-colors cursor-pointer group">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <Package size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-gray-900">Order {order.id}</span>
                      <Badge variant={order.status === 'DELIVERED' ? 'success' : 'warning'}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <Clock size={14} />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Amount</p>
                    <p className="text-xl font-black text-indigo-600">${order.total.toFixed(2)}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                {order.items.map((item, idx) => (
                  <img 
                    key={idx} 
                    src={item.image} 
                    alt={item.name} 
                    className="w-10 h-10 rounded-lg object-cover border border-gray-100" 
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
