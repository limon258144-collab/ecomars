import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Plus, 
  MoreHorizontal,
  LayoutDashboard,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { Product, Order, OrderStatus, Customer, SalesData } from '../types';

const MOCK_SALES_DATA: SalesData[] = [
  { name: 'Mon', sales: 0 },
  { name: 'Tue', sales: 0 },
  { name: 'Wed', sales: 0 },
  { name: 'Thu', sales: 0 },
  { name: 'Fri', sales: 0 },
  { name: 'Sat', sales: 0 },
  { name: 'Sun', sales: 0 },
];

const MOCK_ORDERS: Order[] = [];

const MOCK_CUSTOMERS: Customer[] = [];

interface AdminDashboardProps {
  user: { name: string; role: 'user' | 'admin' } | null;
  onLogout: () => void;
  onBackToStore: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function AdminDashboard({ user, onLogout, onBackToStore, isDarkMode, onToggleDarkMode }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers'>('overview');

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 dark:bg-black text-white flex flex-col border-r dark:border-gray-800 transition-colors">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold shadow-lg">L</div>
            <span className="font-display font-bold text-lg">Limon.bro Admin</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Admin: {user?.name || 'Limon'}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <ShoppingBag className="w-5 h-5" /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Package className="w-5 h-5" /> Inventory
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'customers' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5" /> Customers
          </button>

          <div className="pt-8 opacity-50">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">System</p>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={onBackToStore}
            className="w-full bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            Back to Storefront
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize transition-colors">{activeTab} Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onToggleDarkMode}
              className="p-2 bg-white dark:bg-gray-900 border dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="bg-white dark:bg-gray-900 border dark:border-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Download Report
            </button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-orange-700 flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Sales', value: '৳ 0', change: '0%', icon: <TrendingUp />, color: 'blue' },
                { label: 'Active Orders', value: '0', change: '0%', icon: <ShoppingBag />, color: 'orange' },
                { label: 'Total Customers', value: '0', change: '0%', icon: <Users />, color: 'green' },
                { label: 'Stock Items', value: '0', change: '0 items', icon: <Package />, color: 'purple' },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                      {stat.icon}
                    </div>
                    <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                <h4 className="font-bold mb-6 flex items-center gap-2 dark:text-white">
                   Sales Performance
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_SALES_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#374151" : "#f0f0f0"} />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                          borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                          color: isDarkMode ? '#f3f4f6' : '#111827'
                        }} 
                      />
                      <Line type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={3} dot={{ r: 4, fill: '#ea580c' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                <h4 className="font-bold mb-6 flex items-center gap-2 dark:text-white">
                   Orders by Status
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_SALES_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#374151" : "#f0f0f0"} />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                          borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                          color: isDarkMode ? '#f3f4f6' : '#111827'
                        }} 
                      />
                      <Bar dataKey="sales" fill="#fb923c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h4 className="font-bold">Recent Orders</h4>
                <button className="text-orange-600 text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-gray-900">{order.customerName}</p>
                          <p className="text-xs text-gray-500">{order.customerEmail}</p>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">৳ {order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold
                            ${order.status === OrderStatus.DELIVERED ? 'bg-green-50 text-green-700' : ''}
                            ${order.status === OrderStatus.PENDING ? 'bg-yellow-50 text-yellow-700' : ''}
                            ${order.status === OrderStatus.SHIPPED ? 'bg-blue-50 text-blue-700' : ''}
                            ${order.status === OrderStatus.CANCELLED ? 'bg-red-50 text-red-700' : ''}
                          `}>
                            {order.status === OrderStatus.DELIVERED && <CheckCircle className="w-3 h-3" />}
                            {order.status === OrderStatus.PENDING && <Clock className="w-3 h-3" />}
                            {order.status === OrderStatus.SHIPPED && <Truck className="w-3 h-3" />}
                            {order.status === OrderStatus.CANCELLED && <XCircle className="w-3 h-3" />}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100">
               <h4 className="font-bold">Order Management</h4>
             </div>
             {/* Similar table as above but with more controls */}
             <div className="p-4 text-center text-gray-500 text-sm">
                Advanced Order Management View
             </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Total Orders</th>
                  <th className="px-6 py-4">Spent</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_CUSTOMERS.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">{customer.phone}</td>
                    <td className="px-6 py-4 text-sm font-bold">{customer.totalOrders}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">৳ {customer.totalSpent}</td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
               <h3 className="text-lg font-bold mb-6">Add New Product</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                   <input type="text" placeholder="e.g. Smart Watch Pro" className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:border-orange-600" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                   <select className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:border-orange-600">
                     <option>Electronics</option>
                     <option>Fashion</option>
                     <option>Home</option>
                     <option>Beauty</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Price (৳)</label>
                   <input type="number" placeholder="2500" className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:border-orange-600" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
                   <input type="number" placeholder="50" className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:border-orange-600" />
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                   <textarea rows={4} placeholder="Product details..." className="w-full p-3 bg-gray-50 border rounded-lg outline-none focus:border-orange-600"></textarea>
                 </div>
               </div>
               <div className="mt-8 flex justify-end gap-4">
                 <button className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                 <button className="px-6 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 shadow-md transition-all active:scale-95">Save Product</button>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100">
                  <h4 className="font-bold">Current Inventory</h4>
               </div>
               <div className="p-12 text-center text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Product list loading...</p>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
