import React, { useState } from 'react';
import {
  BarChart2,
  Package,
  AlertTriangle,
  Truck,
  Search,
  RefreshCw,
  TrendingUp,
  ShoppingCart,
  Menu,
  Bell,
  User,
  ChevronDown,
  MessageSquare,
  Filter,
  Bot
} from 'lucide-react';

export default function ImprovedMustockDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const inventoryStats = {
    totalItems: "2,412",
    lowStockItems: "87",
    restockNeeded: "14"
  };

  const recentActivities = [
    { id: 1, icon: Truck, text: '5 mic stands moved to showroom', time: '2 mins ago' },
    { id: 2, icon: Package, text: '12 cables sold', time: '15 mins ago' },
    { id: 3, icon: RefreshCw, text: '7 drumsticks restocked', time: '45 mins ago' }
  ];

  const lowStockItems = [
    {
      name: 'Black Guitar Cables',
      sku: 'GC-BLK-20',
      currentStock: "42",
      minStock: "50",
      location: 'Aisle 3, Shelf B'
    },
    {
      name: 'Drum Sticks 5A',
      sku: 'DS-5A-PRO',
      currentStock: "8",
      minStock: "25",
      location: 'Aisle A, Shelf 4'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-gray-800 transition-all duration-300
      `}>
        <div className="p-5 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <Package className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-bold text-yellow-400">Mustock AI</span>
            </div>
          ) : (
            <Package className="h-8 w-8 mx-auto text-yellow-400" />
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-10">
          {[{ icon: BarChart2, text: 'Dashboard' }, { icon: Package, text: 'Inventory' }, { icon: Truck, text: 'Restock' }, { icon: MessageSquare, text: 'Assistant' }, { icon: AlertTriangle, text: 'Alerts' }].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out transform hover:scale-105"
            >
              <item.icon className="h-5 w-5 text-gray-400" />
              {isSidebarOpen && <span className="ml-3">{item.text}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 overflow-auto p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Warehouse Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-400" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                3
              </span>
            </button>
            <div className="flex items-center bg-gray-800 rounded-full p-2">
              <User className="h-6 w-6 text-gray-400 mr-2" />
              <span>Jane Doe</span>
              <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[{
            icon: Package,
            value: inventoryStats.totalItems,
            label: 'Total Items',
            color: 'text-blue-400'
          }, {
            icon: AlertTriangle,
            value: inventoryStats.lowStockItems,
            label: 'Low Stock',
            color: 'text-yellow-400'
          }, {
            icon: ShoppingCart,
            value: inventoryStats.restockNeeded,
            label: 'Restock Needed',
            color: 'text-red-400'
          }].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 flex items-center justify-between transition-transform transform duration-300 hover:scale-105 shadow-md"
            >
              <div className="flex flex-col justify-start text-left">
                <p className="text-white mb-2 font-semibold">{stat.label}</p>
                <h2 className="text-3xl font-bold">{stat.value}</h2>
              </div>
              <stat.icon className={`h-10 w-10 ${stat.color}`} />
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl p-6 col-span-1 transition duration-200 ease-in-out transform hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center bg-gray-700 p-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  <activity.icon className="h-6 w-6 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock */}
          <div className="bg-gray-800 rounded-xl p-6 col-span-1 transition duration-200 ease-in-out transform hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Low Stock Alert</h3>
              <TrendingUp className="h-5 w-5 text-red-400" />
            </div>
            {lowStockItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-700 p-4 rounded-lg mb-4 transition duration-200 ease-in-out transform hover:scale-105"
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-400">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Current: {item.currentStock}</p>
                    <p className="text-sm text-red-400">Min: {item.minStock}</p>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Location: {item.location}
                </div>
              </div>
            ))}
          </div>

          {/* AI Assistant */}
          <div className="bg-gray-800 rounded-xl p-6 col-span-1 transition duration-200 ease-in-out transform hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">AI Assistant</h3>
              <Bot className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="bg-gray-700 rounded-lg p-4 mb-4 h-40 overflow-y-auto">
              <div className="mb-2 bg-gray-600 p-3 rounded-lg rounded-tl-none">
                <p>Where are the black guitar cables?</p>
              </div>
              <div className="text-right">
                <div className="inline-block bg-yellow-500 text-black p-3 rounded-lg rounded-tr-none">
                  <p>Aisle 3, Shelf B. 42 units left. $14.99 each.</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Ask about inventory..." 
                className="flex-1 bg-gray-700 p-3 rounded-l-lg focus:outline-none"
              />
              <button className="bg-yellow-500 text-black p-3 rounded-r-lg">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
