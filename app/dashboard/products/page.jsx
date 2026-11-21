'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Grid,
  List,
  Edit2,
  Trash2,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Package,
  Layers,
  TrendingUp,
  X
} from 'lucide-react';
import {
  selectProducts,
  selectProductFilters,
  setSearchQuery,
  setSelectedCategory,
  setSelectedStatus,
  setViewMode,
  deleteProduct,
  toggleProductStatus
} from '@/redux/slices/productSlice';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const { searchQuery, selectedCategory, selectedStatus, viewMode } = useSelector(selectProductFilters);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'Active').length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalValuation = products.reduce((acc, item) => acc + item.price * item.stock, 0);

  const handleDeleteConfirm = () => {
    if (deleteModalId) {
      dispatch(deleteProduct(deleteModalId));
      setDeleteModalId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Inventory Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Products Catalog</h1>
          <p className="text-slate-600 text-sm mt-0.5">Manage luxury UAE indoor plants, outdoor trees, planters, and irrigation stock.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add New Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Items</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-3">{totalProducts}</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <span className="text-emerald-700 font-semibold">{activeProducts} Active</span> live items
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Low Stock Alerts</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-700 mt-3">{lowStockCount}</div>
          <div className="text-xs text-slate-500 mt-1">Requires stock reorder</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Out of Stock</span>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
              <X className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-700 mt-3">{outOfStockCount}</div>
          <div className="text-xs text-slate-500 mt-1">Hidden from storefront</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Inventory Valuation</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-3">AED {totalValuation.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-1">Total catalog asset value</div>
        </motion.div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, SKU or category..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
              className="w-full sm:w-44 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition-all"
            >
              <option value="all">All Categories</option>
              <option value="plants">Plants & Trees</option>
              <option value="pots-planters">Pots & Planters</option>
              <option value="equipment">Irrigation & Smart Gear</option>
              <option value="garden-decor">Garden Decor & Turf</option>
              <option value="care-maintenance">Soil & Fertilizers</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => dispatch(setSelectedStatus(e.target.value))}
              className="w-full sm:w-36 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 transition-all"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
          <span className="text-xs text-slate-600 font-medium">
            Showing <strong className="text-emerald-700">{filteredProducts.length}</strong> items
          </span>
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => dispatch(setViewMode('grid'))}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => dispatch(setViewMode('table'))}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No items match your criteria</h3>
          <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
            Try resetting your search query or filter selections.
          </p>
        </motion.div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                          product.status === 'Active'
                            ? 'bg-emerald-500/90 border-emerald-600 text-white'
                            : product.status === 'Out of Stock'
                            ? 'bg-rose-500/90 border-rose-600 text-white'
                            : 'bg-slate-700/90 border-slate-800 text-white'
                        }`}
                      >
                        {product.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                        {product.status}
                      </span>
                      {product.isFeatured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-white border border-amber-600 backdrop-blur-md">
                          <Sparkles className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="p-2 rounded-xl bg-white hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200 shadow-sm transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setDeleteModalId(product.id)}
                        className="p-2 rounded-xl bg-white hover:bg-rose-600 text-slate-700 hover:text-white border border-slate-200 shadow-sm transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-white border border-slate-700 text-[11px] font-mono">
                        {product.sku}
                      </span>
                      <span className="text-white font-bold text-xs bg-emerald-700 px-2.5 py-1 rounded-lg shadow-sm">
                        AED {product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      {product.category.replace('-', ' ')}
                    </div>
                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1 block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      Stock:{' '}
                      <strong className={product.stock <= product.lowStockThreshold ? 'text-amber-700' : 'text-slate-900'}>
                        {product.stock} units
                      </strong>
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(toggleProductStatus(product.id))}
                    className="text-[11px] font-semibold text-slate-600 hover:text-emerald-700 transition-colors underline underline-offset-2"
                  >
                    Toggle Status
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Product Details</th>
                  <th className="p-4">SKU & Category</th>
                  <th className="p-4">Price (AED)</th>
                  <th className="p-4">Stock Level</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <Link
                            href={`/dashboard/products/${product.id}`}
                            className="font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors block"
                          >
                            {product.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5">
                            {product.isFeatured && (
                              <span className="text-[10px] text-amber-700 font-bold">★ Featured</span>
                            )}
                            <span className="text-[10px] text-slate-500">{product.subCategory}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-slate-900 font-bold">{product.sku}</div>
                      <div className="text-[11px] text-emerald-700 capitalize font-medium">{product.category.replace('-', ' ')}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      AED {product.price.toLocaleString()}
                      {product.comparePrice && (
                        <div className="text-[10px] text-slate-400 line-through font-normal">
                          AED {product.comparePrice.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              product.stock === 0
                                ? 'bg-rose-600'
                                : product.stock <= product.lowStockThreshold
                                ? 'bg-amber-500'
                                : 'bg-emerald-600'
                            }`}
                            style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                          />
                        </div>
                        <span
                          className={`font-bold ${
                            product.stock === 0
                              ? 'text-rose-700'
                              : product.stock <= product.lowStockThreshold
                              ? 'text-amber-700'
                              : 'text-slate-900'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          product.status === 'Active'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : product.status === 'Out of Stock'
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/products/${product.id}`}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 transition-colors border border-slate-200"
                          title="Edit Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalId(product.id)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-700 transition-colors border border-slate-200"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-4 text-slate-900"
          >
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Product</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to remove this item from the Dubai landscaping catalog?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors border border-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}