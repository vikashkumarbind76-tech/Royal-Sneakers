
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Product, Order, Category } from './types';
import { PRODUCTS } from './constants';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Initialize from localStorage or fallback to constants
    const savedProducts = localStorage.getItem('royal_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(PRODUCTS);
      localStorage.setItem('royal_products', JSON.stringify(PRODUCTS));
    }

    // Mock orders
    const mockOrders: Order[] = [
      { id: 'ORD-001', customerName: 'Marcus Wright', date: '2024-05-20', total: 245, status: 'Shipped', items: [] },
      { id: 'ORD-002', customerName: 'Elena Gilbert', date: '2024-05-19', total: 115, status: 'Pending', items: [] },
      { id: 'ORD-003', customerName: 'Steve Rogers', date: '2024-05-18', total: 380, status: 'Delivered', items: [] },
    ];
    setOrders(mockOrders);
  }, []);

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      category: formData.get('category') as Category,
      image: formData.get('image') as string,
      isFeatured: formData.get('isFeatured') === 'on',
    };

    let newProducts;
    if (editingProduct) {
      newProducts = products.map(p => p.id === editingProduct.id ? productData : p);
    } else {
      newProducts = [productData, ...products];
    }

    setProducts(newProducts);
    localStorage.setItem('royal_products', JSON.stringify(newProducts));
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this product?')) {
      const newProducts = products.filter(p => p.id !== id);
      setProducts(newProducts);
      localStorage.setItem('royal_products', JSON.stringify(newProducts));
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-adminDark">
      {/* Sidebar */}
      <aside className="w-64 bg-royalBlack border-r border-white/5 flex flex-col">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-royalGold text-adminDark flex items-center justify-center rounded font-bold">R</div>
            <span className="font-heading font-bold text-cream uppercase tracking-tighter">Admin Portal</span>
          </div>
        </div>
        <nav className="flex-grow p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-royalGold text-adminDark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <i className="fa-solid fa-chart-line w-5"></i>
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${activeTab === 'products' ? 'bg-royalGold text-adminDark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <i className="fa-solid fa-box w-5"></i>
            <span>Inventory</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${activeTab === 'orders' ? 'bg-royalGold text-adminDark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <i className="fa-solid fa-shopping-cart w-5"></i>
            <span>Orders</span>
          </button>
        </nav>
        <div className="p-6 border-t border-white/5">
          <a href="index.html" className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-all">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to Store</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-adminDark/50 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-xl font-heading font-bold uppercase tracking-widest text-royalGold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white relative">
              <i className="fa-solid fa-bell"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-royalGold rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-white/10 pl-6">
              <div className="w-8 h-8 rounded-full bg-royalGold/20 flex items-center justify-center text-royalGold">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <span className="text-sm font-bold text-cream">Admin User</span>
            </div>
          </div>
        </header>

        <div className="p-10">
          {activeTab === 'dashboard' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-adminCard p-6 rounded-xl border border-white/5 shadow-xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Monthly Revenue</p>
                  <h3 className="text-3xl font-heading font-bold text-cream">$24,580</h3>
                  <p className="text-green-500 text-[10px] mt-2 font-bold uppercase tracking-widest">+12.5% vs last month</p>
                </div>
                <div className="bg-adminCard p-6 rounded-xl border border-white/5 shadow-xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Orders</p>
                  <h3 className="text-3xl font-heading font-bold text-cream">342</h3>
                  <p className="text-green-500 text-[10px] mt-2 font-bold uppercase tracking-widest">+5.2% vs last month</p>
                </div>
                <div className="bg-adminCard p-6 rounded-xl border border-white/5 shadow-xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Active Products</p>
                  <h3 className="text-3xl font-heading font-bold text-cream">{products.length}</h3>
                  <p className="text-royalGold text-[10px] mt-2 font-bold uppercase tracking-widest">In stock</p>
                </div>
                <div className="bg-adminCard p-6 rounded-xl border border-white/5 shadow-xl">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Avg. Order Value</p>
                  <h3 className="text-3xl font-heading font-bold text-cream">$71.80</h3>
                  <p className="text-red-400 text-[10px] mt-2 font-bold uppercase tracking-widest">-2.1% vs last month</p>
                </div>
              </div>
              <div className="bg-adminCard p-8 rounded-xl border border-white/5 shadow-xl">
                <h3 className="text-lg font-heading font-bold text-cream mb-6 uppercase tracking-widest">Recent Orders</h3>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-white/5">
                        <th className="pb-4">Order ID</th>
                        <th className="pb-4">Customer</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Amount</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.map(order => (
                        <tr key={order.id} className="group">
                          <td className="py-4 font-mono text-sm text-royalGold">{order.id}</td>
                          <td className="py-4 text-sm font-medium">{order.customerName}</td>
                          <td className="py-4 text-sm text-gray-400">{order.date}</td>
                          <td className="py-4 text-sm font-bold text-cream">${order.total}</td>
                          <td className="py-4">
                            <span className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${
                              order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                              order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-royalGold/10 text-royalGold'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-heading font-bold text-cream uppercase tracking-tighter">Inventory Manager</h2>
                <button 
                  onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                  className="bg-royalGold text-adminDark px-6 py-3 rounded font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg"
                >
                  <i className="fa-solid fa-plus mr-2"></i> New Product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-adminCard rounded-xl border border-white/5 overflow-hidden shadow-xl flex flex-col group">
                    <div className="aspect-square relative overflow-hidden bg-royalBlack">
                      <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-all duration-700" alt={product.name} />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-royalGold hover:text-adminDark transition-all"
                        >
                          <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-red-500 transition-all"
                        >
                          <i className="fa-solid fa-trash text-xs"></i>
                        </button>
                      </div>
                      {product.isFeatured && (
                        <span className="absolute bottom-4 left-4 bg-royalGold text-adminDark px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest">Featured</span>
                      )}
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold uppercase tracking-tight text-cream line-clamp-1">{product.name}</h4>
                        <span className="text-royalGold font-bold text-sm">${product.price}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-adminCard p-8 rounded-xl border border-white/5 shadow-xl">
              <h2 className="text-2xl font-heading font-bold text-cream uppercase tracking-tighter mb-8">Full Order History</h2>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-white/5">
                      <th className="pb-4">Order ID</th>
                      <th className="pb-4">Customer</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Items</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map(order => (
                      <tr key={order.id} className="group hover:bg-white/[0.02] transition-all">
                        <td className="py-6 font-mono text-sm text-royalGold">{order.id}</td>
                        <td className="py-6 text-sm font-medium text-cream">{order.customerName}</td>
                        <td className="py-6 text-sm text-gray-400">{order.date}</td>
                        <td className="py-6 text-sm text-gray-400">3 items</td>
                        <td className="py-6 text-sm font-bold text-cream">${order.total}</td>
                        <td className="py-6">
                          <span className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${
                            order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                            order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-royalGold/10 text-royalGold'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-6">
                          <button className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-adminDark/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-adminCard w-full max-w-lg p-8 rounded-xl border border-white/10 shadow-2xl">
            <h3 className="text-xl font-heading font-bold text-cream uppercase tracking-widest mb-8">
              {editingProduct ? 'Edit Product' : 'Add New Arrival'}
            </h3>
            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
                  <input name="name" defaultValue={editingProduct?.name} required className="w-full bg-adminDark border border-white/10 p-4 rounded text-sm text-cream focus:outline-none focus:border-royalGold" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Price ($)</label>
                  <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full bg-adminDark border border-white/10 p-4 rounded text-sm text-cream focus:outline-none focus:border-royalGold" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                  <select name="category" defaultValue={editingProduct?.category} className="w-full bg-adminDark border border-white/10 p-4 rounded text-sm text-cream focus:outline-none focus:border-royalGold">
                    <option value="Sneakers">Sneakers</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Shoes">Shoes</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
                  <input name="image" defaultValue={editingProduct?.image} required className="w-full bg-adminDark border border-white/10 p-4 rounded text-sm text-cream focus:outline-none focus:border-royalGold" />
                </div>
                <div className="col-span-2 flex items-center space-x-4 p-4 bg-adminDark rounded">
                  <input name="isFeatured" type="checkbox" defaultChecked={editingProduct?.isFeatured} className="w-4 h-4 rounded bg-royalGold" />
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Feature this product in store</label>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold uppercase tracking-widest text-xs hover:text-white">Cancel</button>
                <button type="submit" className="flex-[2] bg-royalGold text-adminDark py-4 rounded font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><AdminPanel /></React.StrictMode>);
