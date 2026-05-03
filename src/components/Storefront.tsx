import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  ChevronRight, 
  Star, 
  Zap, 
  Home, 
  ShoppingBag, 
  Heart,
  MapPin,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Monitor,
  Settings,
  CreditCard,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

const CATEGORIES = [
  { id: 1, name: 'Consumer Electronics', icon: <Smartphone className="w-4 h-4" /> },
  { id: 2, name: 'Fashion & Beauty', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 3, name: 'Home Appliances', icon: <Home className="w-4 h-4" /> },
  { id: 4, name: 'Smart Watches', icon: <Watch className="w-4 h-4" /> },
  { id: 5, name: 'Laptops & Computers', icon: <Laptop className="w-4 h-4" /> },
  { id: 6, name: 'Audio & Gear', icon: <Headphones className="w-4 h-4" /> },
  { id: 7, name: 'Mobile Accessories', icon: <Smartphone className="w-4 h-4" /> },
  { id: 8, name: 'Gaming Consoles', icon: <Monitor className="w-4 h-4" /> },
];

const FLASH_SALES: Product[] = [
  { id: 101, name: 'Modern Smart Watch Pro', price: 4500, oldPrice: 8999, rating: 4.8, reviews: 124, image: 'https://picsum.photos/seed/watch/400/400', category: 'Smart Watches', stock: 15 },
  { id: 102, name: 'Wireless Noise Canceling Buds', price: 2999, oldPrice: 5999, rating: 4.6, reviews: 89, image: 'https://picsum.photos/seed/earbuds/400/400', category: 'Audio', stock: 23 },
  { id: 103, name: 'Smart Home Hub v3', price: 12000, oldPrice: 19999, rating: 4.9, reviews: 256, image: 'https://picsum.photos/seed/homehub/400/400', category: 'Electronics', stock: 5 },
  { id: 104, name: 'Ultra HD Gaming Monitor', price: 24999, oldPrice: 39999, rating: 4.7, reviews: 156, image: 'https://picsum.photos/seed/monitor/400/400', category: 'Gaming', stock: 8 },
  { id: 105, name: 'Pro Series Mechanical Keyboard', price: 7550, oldPrice: 12000, rating: 4.5, reviews: 67, image: 'https://picsum.photos/seed/keyboard/400/400', category: 'Computers', stock: 30 },
];

const JUST_FOR_YOU: Product[] = [
  { id: 201, name: 'Premium Leather Wallet', price: 2490, rating: 4.4, reviews: 45, image: 'https://picsum.photos/seed/wallet/400/400', category: 'Fashion', stock: 50 },
  { id: 202, name: 'Denim Collection Jacket', price: 5490, rating: 4.3, reviews: 32, image: 'https://picsum.photos/seed/jacket/400/400', category: 'Fashion', stock: 12 },
  { id: 203, name: 'Designer Ceramic Mug Set', price: 1850, rating: 4.8, reviews: 12, image: 'https://picsum.photos/seed/mug/400/400', category: 'Home', stock: 20 },
  { id: 204, name: 'Portable Organic Yoga Mat', price: 3500, rating: 4.7, reviews: 54, image: 'https://picsum.photos/seed/yoga/400/400', category: 'Home', stock: 15 },
  { id: 205, name: 'Minimalist Wall Clock', price: 2299, rating: 4.5, reviews: 28, image: 'https://picsum.photos/seed/clock/400/400', category: 'Home', stock: 40 },
  { id: 206, name: 'Botanical Skincare Kit', price: 4200, rating: 4.9, reviews: 110, image: 'https://picsum.photos/seed/skin/400/400', category: 'Beauty', stock: 5 },
];

interface StorefrontProps {
  user: { name: string; role: 'user' | 'admin'; email?: string; phone?: string; address?: string } | null;
  onLogin: (user: { name: string; role: 'user' | 'admin' }) => void;
  onLogout: () => void;
  onUpdateProfile: (data: { phone: string; address: string }) => void;
  onOpenAdmin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Storefront({ user, onLogin, onLogout, onUpdateProfile, onOpenAdmin, isDarkMode, onToggleDarkMode }: StorefrontProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState(7200);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loginMode, setLoginMode] = useState<'user' | 'admin'>('user');
  const [adminCreds, setAdminCreds] = useState({ user: '', pass: '' });
  const [profileFormData, setProfileFormData] = useState({ phone: '', address: '' });
  const [loginError, setLoginError] = useState('');
  const [mfsProvider, setMfsProvider] = useState<'bkash' | 'rocket' | 'nagad' | null>(null);

  useEffect(() => {
    if (user) {
      setProfileFormData({ 
        phone: user.phone || '', 
        address: user.address || '' 
      });
    }
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCreds.user === 'limonabc123' && adminCreds.pass === 'limon000') {
      setLoginError('');
      setShowLogin(false);
      onLogin({ name: 'Admin Limon', role: 'admin' });
      onOpenAdmin();
    } else {
      setLoginError('Invalid Admin Credentials');
    }
  };

  const handleUserLogin = () => {
    onLogin({ name: 'Limon User', role: 'user' });
    setShowLogin(false);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0'),
    };
  };

  const { h, m, s } = formatTime(timeLeft);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] dark:bg-gray-950 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 py-1.5 px-4 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-600 transition-colors">Become a Seller</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Help & Support</a>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1 cursor-pointer hover:text-orange-600">
              <MapPin className="w-3 h-3" /> Ship to Dhaka
            </span>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="font-bold text-orange-600">Hi, {user.name}</span>
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-1 cursor-pointer hover:text-red-600 font-medium"
                >
                  <LogOut className="w-3 h-3" /> Logout
                </button>
              </div>
            ) : (
              <>
                <span 
                  onClick={() => { setLoginMode('user'); setShowLogin(true); }}
                  className="cursor-pointer hover:text-orange-600 font-medium"
                >
                  Login
                </span>
                <span className="text-gray-300">|</span>
                <span className="cursor-pointer hover:text-orange-600 font-medium">Signup</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm border-b dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6 md:gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-display font-bold text-xl shadow-lg transition-transform group-hover:rotate-6">
              L
            </div>
            <h1 className="text-xl font-display font-bold tracking-tight text-gray-900 dark:text-white hidden sm:block">
              Limon<span className="text-orange-600">.bro</span>
            </h1>
          </div>

          {/* Large Search Bar */}
          <div className="flex-1 relative group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center px-4 py-2 border-2 border-transparent focus-within:border-orange-600 focus-within:bg-white dark:focus-within:bg-gray-700 transition-all shadow-sm">
              <input
                type="text"
                placeholder="Search in Limon.bro..."
                className="bg-transparent border-none outline-none w-full text-sm py-1 dark:text-gray-100"
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.currentTarget.value)}
              />
              <button className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md transition-colors ml-2">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button 
              onClick={onToggleDarkMode}
              className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-full transition-all"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            {user?.role === 'admin' ? (
              <button 
                onClick={onOpenAdmin}
                className="p-2.5 text-orange-600 bg-orange-50 dark:bg-orange-900/20 rounded-full transition-all ring-2 ring-orange-200 dark:ring-orange-900/50"
                title="Admin Dashboard"
              >
                <Settings className="w-6 h-6" />
              </button>
            ) : (
              <button 
                onClick={() => { setLoginMode('admin'); setShowLogin(true); }}
                className="p-2.5 text-gray-600 dark:text-gray-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-full transition-all"
                title="Admin Login"
              >
                <Settings className="w-6 h-6" />
              </button>
            )}
            
            <div className="relative">
              <button 
                onClick={() => {
                  if (!user) {
                    setLoginMode('user');
                    setShowLogin(true);
                  } else {
                    setShowProfileMenu(!showProfileMenu);
                  }
                }}
                className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-full transition-all"
              >
                <User className="w-6 h-6" />
                {user && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>}
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileMenu && user && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-xl z-[60] overflow-hidden"
                  >
                    <div className="p-4 border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                       <button 
                         onClick={() => {
                           setShowProfileModal(true);
                           setShowProfileMenu(false);
                         }}
                         className="w-full flex items-center gap-3 p-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                       >
                         <User className="w-4 h-4" /> My Profile
                       </button>
                       <button className="w-full flex items-center gap-3 p-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                         <ShoppingBag className="w-4 h-4" /> My Orders
                       </button>
                       <button className="w-full flex items-center gap-3 p-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                         <Heart className="w-4 h-4" /> Wishlist
                       </button>
                    </div>
                    <div className="p-2 border-t dark:border-gray-800">
                      <button 
                        onClick={() => {
                          onLogout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 p-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800 rounded-full transition-all">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white dark:border-gray-900">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16">
        {/* Banner Section */}
        <div className="max-w-7xl mx-auto px-4 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 self-start">
             <div className="p-4 border-b">
               <h2 className="text-sm font-bold flex items-center gap-2"><Menu className="w-4 h-4 text-orange-600" /> Categories</h2>
             </div>
             <nav className="p-2">
               {CATEGORIES.map(cat => (
                 <a key={cat.id} href="#" className="flex items-center gap-3 p-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all group">
                   <span className="text-gray-400 group-hover:text-orange-600">{cat.icon}</span>
                   <span className="font-medium">{cat.name}</span>
                 </a>
               ))}
             </nav>
          </aside>
          <div className="lg:col-span-9">
            <div className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden shadow-lg group">
              <img src="https://picsum.photos/seed/marketplace/1200/500" alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-10">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ramadan Special <br/><span className="text-orange-500">Big Sale</span></h2>
                 <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg w-fit transition-transform hover:scale-105">Shop All Deals</button>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
           <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
              <div className="p-4 md:p-6 flex items-center justify-between border-b bg-orange-50/50">
                 <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-orange-600 flex items-center gap-2"><Zap className="fill-orange-600 w-5 h-5"/> Flash Sale</h3>
                    <div className="flex gap-2 items-center">
                       <span className="text-sm text-gray-500 hidden sm:block">Ends in</span>
                       <div className="flex gap-1.5 font-mono">
                          <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">{h}</span>
                          <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">{m}</span>
                          <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">{s}</span>
                       </div>
                    </div>
                 </div>
                 <button className="text-orange-600 text-sm font-bold">Shop All</button>
              </div>
              <div className="p-4 flex gap-4 overflow-x-auto scrollbar-hide">
                 {FLASH_SALES.map(product => (
                   <div key={product.id} className="w-[180px] bg-white group cursor-pointer border rounded-lg p-2 transition-all hover:border-orange-200">
                     <div className="relative aspect-square rounded-md overflow-hidden bg-gray-50 mb-3">
                        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform"/>
                        <div className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded">-{Math.round(100 - (product.price / (product.oldPrice||1)) * 100)}%</div>
                     </div>
                     <h4 className="text-xs font-medium h-8 line-clamp-2 mb-2">{product.name}</h4>
                     <p className="text-lg font-bold text-orange-600">৳ {product.price}</p>
                     <p className="text-xs text-gray-400 line-through">৳ {product.oldPrice}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Just For You */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Just For You</h3>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {JUST_FOR_YOU.map(product => (
                <div key={product.id} className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-3 rounded-xl hover:shadow-lg transition-all group">
                   <div className="aspect-square rounded-lg overflow-hidden relative mb-3 bg-gray-50 dark:bg-gray-800">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full text-gray-400 hover:text-red-500 shadow-sm"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                   </div>
                   <h4 className="text-sm font-medium h-10 line-clamp-2 mb-2 dark:text-gray-200">{product.name}</h4>
                   <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-current"/>
                      <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">{product.rating}</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-orange-600">৳ {product.price}</p>
                      <button 
                        onClick={() => addToCart(product.id)}
                        className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg text-orange-600 hover:bg-orange-600 hover:text-white transition-all transform active:scale-90"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* Payment Simulation Toggle */}
      {cart.length > 0 && (
         <div className="fixed bottom-6 right-6 z-50">
            <button 
              onClick={() => setShowPayment(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:bg-orange-700 transition-all hover:scale-105"
            >
              <CreditCard className="w-5 h-5"/> Checkout (৳ {cart.reduce((sum, id) => sum + (FLASH_SALES.find(p => p.id === id)?.price || JUST_FOR_YOU.find(p => p.id === id)?.price || 0), 0)})
            </button>
         </div>
      )}

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && user && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
             >
                <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                   <h3 className="font-bold text-lg">My Profile</h3>
                   <button onClick={() => setShowProfileModal(false)} className="text-white/80 hover:text-white">✕</button>
                </div>
                <div className="p-8 space-y-6">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                         <p className="font-bold text-lg dark:text-white">{user.name}</p>
                         <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                   </div>

                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                      <input 
                        type="text" 
                        placeholder="01XXXXXXXXX"
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 dark:text-white border dark:border-gray-700 rounded-xl outline-none focus:border-orange-600" 
                        value={profileFormData.phone}
                        onChange={(e) => setProfileFormData({...profileFormData, phone: e.target.value})}
                      />
                   </div>

                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Shipping Address</label>
                      <textarea 
                        rows={3}
                        placeholder="House #, Road #, City, Postal Code"
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 dark:text-white border dark:border-gray-700 rounded-xl outline-none focus:border-orange-600" 
                        value={profileFormData.address}
                        onChange={(e) => setProfileFormData({...profileFormData, address: e.target.value})}
                      />
                   </div>

                   <button 
                     onClick={() => {
                        onUpdateProfile(profileFormData);
                        setShowProfileModal(false);
                     }}
                     className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 shadow-lg transition-transform active:scale-95"
                   >
                      Save Profile & Address
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
             >
                <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                   <h3 className="font-bold text-lg">{loginMode === 'admin' ? 'Admin Portal Login' : 'Sign In'}</h3>
                   <button onClick={() => {setShowLogin(false); setLoginError('');}} className="text-white/80 hover:text-white">✕</button>
                </div>
                <div className="p-8">
                   {loginMode === 'user' ? (
                     <div className="space-y-6">
                        <button 
                          onClick={handleUserLogin}
                          className="w-full flex items-center justify-center gap-3 p-4 border-2 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700"
                        >
                           <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
                           Sign in with Google
                        </button>
                        <div className="relative py-2">
                           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                           <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or email login</span></div>
                        </div>
                        <input type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 border rounded-xl" />
                        <button onClick={handleUserLogin} className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold">Continue</button>
                     </div>
                   ) : (
                     <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Username</label>
                           <input 
                             type="text" 
                             className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-orange-600" 
                             value={adminCreds.user}
                             onChange={(e) => setAdminCreds({...adminCreds, user: e.target.value})}
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Security Password</label>
                           <input 
                             type="password" 
                             className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-orange-600" 
                             value={adminCreds.pass}
                             onChange={(e) => setAdminCreds({...adminCreds, pass: e.target.value})}
                           />
                        </div>
                        {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
                        <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all">
                           Unlock Dashboard
                        </button>
                     </form>
                   )}
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Portal Simulation */}
      <AnimatePresence>
        {showPayment && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
             >
                <div className="p-6 bg-orange-600 text-white flex justify-between items-center">
                   <h3 className="font-bold text-lg">Secure Payment Portal</h3>
                   <button onClick={() => {setShowPayment(false); setMfsProvider(null);}} className="text-white/80 hover:text-white">✕</button>
                </div>
                {!mfsProvider ? (
                  <div className="p-8 space-y-6">
                    <p className="text-center text-gray-500 font-medium">Select your payment method</p>
                    <div className="grid grid-cols-1 gap-4">
                       <button onClick={() => setMfsProvider('bkash')} className="flex items-center gap-4 p-4 border-2 rounded-xl border-gray-100 hover:border-pink-500 hover:bg-pink-50 transition-all group">
                          <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold">bKash</div>
                          <span className="font-bold text-gray-800">Pay with bKash</span>
                       </button>
                       <button onClick={() => setMfsProvider('nagad')} className="flex items-center gap-4 p-4 border-2 rounded-xl border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all group">
                          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">Nagad</div>
                          <span className="font-bold text-gray-800">Pay with Nagad</span>
                       </button>
                       <button onClick={() => setMfsProvider('rocket')} className="flex items-center gap-4 p-4 border-2 rounded-xl border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all group">
                          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">Rocket</div>
                          <span className="font-bold text-gray-800">Pay with Rocket</span>
                       </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                       <div className={`p-4 rounded-xl text-white font-bold ${mfsProvider === 'bkash' ? 'bg-pink-500' : mfsProvider === 'nagad' ? 'bg-orange-500' : 'bg-purple-500'}`}>
                          {mfsProvider.toUpperCase()}
                       </div>
                       <div>
                          <p className="text-sm text-gray-500">Payment to</p>
                          <p className="font-bold">Limon.bro Ltd.</p>
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Enter {mfsProvider} Number</label>
                       <input type="text" placeholder="01XXXXXXXXX" className="w-full p-4 bg-gray-50 border-2 rounded-xl outline-none focus:border-brand" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                       <input type="text" placeholder="XXXXXX" className="w-full p-4 bg-gray-50 border-2 rounded-xl outline-none focus:border-brand" />
                    </div>
                    <button 
                      onClick={() => {
                        alert(`Payment Successful via ${mfsProvider}!`);
                        setCart([]);
                        setShowPayment(false);
                        setMfsProvider(null);
                      }}
                      className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-transform active:scale-95 ${mfsProvider === 'bkash' ? 'bg-pink-600' : mfsProvider === 'nagad' ? 'bg-orange-600' : 'bg-purple-600'}`}
                    >
                       Confirm Payment
                    </button>
                  </div>
                )}
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-12 px-4 transition-colors">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-gray-400">
           <div>
             <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase">Limon.bro</h4>
             <p>The most trusted online marketplace in Bangladesh.</p>
           </div>
           <div>
             <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase">Customer Care</h4>
             <ul className="space-y-2">
               <li className="hover:text-orange-600 cursor-pointer">Help Center</li>
               <li className="hover:text-orange-600 cursor-pointer">How to Buy</li>
               <li className="hover:text-orange-600 cursor-pointer">Returns & Refunds</li>
             </ul>
           </div>
           <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase">Payments</h4>
              <div className="flex gap-2">
                 <div className="w-10 h-6 bg-gray-100 dark:bg-gray-800 rounded"></div>
                 <div className="w-10 h-6 bg-gray-100 dark:bg-gray-800 rounded"></div>
                 <div className="w-10 h-6 bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>
           </div>
           <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase">Contact</h4>
              <p>support@bazaarhub.com</p>
              <p>+880 1234 567890</p>
           </div>
         </div>
      </footer>
    </div>
  );
}
