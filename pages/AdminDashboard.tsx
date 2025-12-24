
import React from 'react';
import { useStore } from '../store/StoreContext';
import { 
  Users, ShoppingBag, ShieldCheck, 
  AlertCircle, ChevronRight, Activity, Globe, CreditCard,
  Search, Plus, Smartphone, Tablet, Monitor
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  AreaChart, Area, CartesianGrid, Cell
} from 'recharts';
import { Badge, Card } from '../components/Shared';

const PLATFORM_DATA = [
  { name: 'Tech', value: 45, color: '#0891b2' },
  { name: 'Fashion', value: 30, color: '#0f172a' },
  { name: 'Home', value: 15, color: '#64748b' },
  { name: 'Others', value: 10, color: '#94a3b8' },
];

const GROWTH_DATA = [
  { month: 'Jan', gmv: 45000 },
  { month: 'Feb', gmv: 52000 },
  { month: 'Mar', gmv: 48000 },
  { month: 'Apr', gmv: 61000 },
  { month: 'May', gmv: 75000 },
  { month: 'Jun', gmv: 89000 },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Platform Command</h1>
          <p className="text-slate-500">Global oversight and infrastructure health.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white font-black text-xs rounded-2xl uppercase tracking-widest shadow-xl shadow-black/10">
          Sync Global Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Platform GMV', value: '$892,450', icon: <CreditCard />, color: 'text-cyan-600' },
          { label: 'Active Sellers', value: '1,204', icon: <ShoppingBag />, color: 'text-slate-900' },
          { label: 'Node Traffic', value: '12.5k', icon: <Globe />, color: 'text-slate-500' },
          { label: 'Active Tasks', value: '842', icon: <Activity />, color: 'text-emerald-600' },
        ].map((kpi, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl bg-slate-50 ${kpi.color}`}>
                {/* Fix: cast to React.ReactElement<any> to resolve type error for 'size' prop */}
                {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                <p className="text-2xl font-black text-slate-900">{kpi.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 p-8">
          <h2 className="text-xl font-black text-slate-900 mb-8">Revenue Growth</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} />
                <Tooltip />
                <Area type="monotone" dataKey="gmv" stroke="#0891b2" strokeWidth={4} fillOpacity={1} fill="url(#colorGmv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-xl font-black text-slate-900 mb-8">Access Points</h2>
          <div className="space-y-8">
            {[
              { label: 'Mobile App', value: '58%', icon: <Smartphone />, color: 'bg-cyan-600' },
              { label: 'Desktop', value: '32%', icon: <Monitor />, color: 'bg-slate-900' },
              { label: 'Tablet', value: '10%', icon: <Tablet />, color: 'bg-slate-400' },
            ].map((device, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">{device.label}</span>
                  <span className="text-sm font-black text-slate-900">{device.value}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${device.color}`} style={{ width: device.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-slate-900">System Activity</h2>
          <Search size={20} className="text-slate-300" />
        </div>
        <div className="space-y-4">
          {[
            { title: 'Vendor Approved', desc: 'Zenith Gadgets verified for Electronics', type: 'success' },
            { title: 'Audit Required', desc: 'Large transaction detected from #User82', type: 'warning' },
            { title: 'Deployment Success', desc: 'UI version 2.4.1 stable in all regions', type: 'success' },
          ].map((alert, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100">
                <ShieldCheck size={20} className="text-cyan-600" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">{alert.title}</h4>
                <p className="text-xs text-slate-500">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
