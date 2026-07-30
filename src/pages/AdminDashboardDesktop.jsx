import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import API from '../api';

export default function AdminDashboardDesktop() {
    const [analytics, setAnalytics] = useState({
        total_users: 0,
        total_vendors: 0,
        total_orders: 0,
        total_revenue: 0,
        pending_orders_count: 0,
        delivered_orders_count: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [topVendors, setTopVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [analyticsRes, ordersRes, vendorsRes] = await Promise.allSettled([
                    API.get('/api/admin/analytics'),
                    API.get('/api/admin/orders'),
                    API.get('/api/admin/vendors')
                ]);

                if (analyticsRes.status === 'fulfilled' && analyticsRes.value.data) {
                    setAnalytics(analyticsRes.value.data);
                }

                if (ordersRes.status === 'fulfilled' && Array.isArray(ordersRes.value.data)) {
                    setRecentOrders(ordersRes.value.data.slice(0, 5));
                }

                if (vendorsRes.status === 'fulfilled' && Array.isArray(vendorsRes.value.data)) {
                    setTopVendors(vendorsRes.value.data.filter(v => v.is_approved !== false).slice(0, 5));
                }
            } catch (err) {
                console.error('Failed to load admin dashboard data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="text-on-surface">
            <SidebarNav />

            <div className="flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>
                <TopNavBar title="Admin Dashboard" />

                <main className="flex-1 p-margin space-y-lg">
                    {/* Key Metrics Cards */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">

                        <div className="bg-surface-container-lowest p-sm card-shadow rounded-xl border-l-4 border-primary-container flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Total Users</span>
                                <span className="material-symbols-outlined text-primary-container">groups</span>
                            </div>
                            <div className="mt-md">
                                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                                    {analytics.total_users || 0}
                                </h2>
                                <div className="flex items-center gap-xs mt-xs">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    <span className="font-label-sm text-label-sm text-green-600">Registered Platform Accounts</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-sm card-shadow rounded-xl border-l-4 border-tertiary flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Active Vendors</span>
                                <span className="material-symbols-outlined text-tertiary">restaurant</span>
                            </div>
                            <div className="mt-md">
                                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                                    {analytics.total_vendors || 0}
                                </h2>
                                <div className="flex items-center gap-xs mt-xs">
                                    <span className="material-symbols-outlined text-green-500 text-sm">storefront</span>
                                    <span className="font-label-sm text-label-sm text-green-600">Approved Restaurants</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-sm card-shadow rounded-xl border-l-4 border-secondary flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Total Orders</span>
                                <span className="material-symbols-outlined text-secondary">shopping_bag</span>
                            </div>
                            <div className="mt-md">
                                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                                    {analytics.total_orders || 0}
                                </h2>
                                <div className="flex items-center gap-xs mt-xs">
                                    <span className="material-symbols-outlined text-secondary text-sm">shopping_cart</span>
                                    <span className="font-label-sm text-label-sm text-secondary">Pending: {analytics.pending_orders_count || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-container-lowest p-sm card-shadow rounded-xl border-l-4 border-on-secondary-fixed-variant flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Platform Revenue</span>
                                <span className="material-symbols-outlined text-on-secondary-fixed-variant">payments</span>
                            </div>
                            <div className="mt-md">
                                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                                    Rs. {(analytics.total_revenue || 0).toLocaleString()}
                                </h2>
                                <div className="flex items-center gap-xs mt-xs">
                                    <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
                                    <span className="font-label-sm text-label-sm text-green-600">Total System Volume</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-2 gap-gutter">

                        {/* Recent Activity Feed */}
                        <div className="bg-surface-container-lowest card-shadow rounded-xl p-lg flex flex-col">
                            <div className="flex justify-between items-center mb-lg">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Live Orders</h3>
                                <Link to="/orders" className="text-primary font-label-md text-label-md hover:underline">View All</Link>
                            </div>
                            <div className="space-y-md overflow-y-auto max-h-[500px] pr-xs">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map(order => (
                                        <div key={order.id} className="flex items-center gap-md p-sm hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/30">
                                            <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-primary-container">shopping_bag</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-body-md text-body-md font-semibold text-on-surface truncate">
                                                    Order #ORD-{order.id} • Rs. {order.total_amount || 0}
                                                </p>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                                    {order.vendor?.name || `Vendor #${order.vendor_id}`} → {order.delivery_address || 'Vehari'}
                                                </p>
                                            </div>
                                            <span className="font-label-md text-xs font-bold text-on-primary-container bg-primary-fixed px-3 py-1 rounded-full uppercase tracking-wider shrink-0">
                                                {order.status || 'Pending'}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center text-gray-400 space-y-2">
                                        <span className="material-symbols-outlined text-4xl">inbox</span>
                                        <p className="text-sm">No live orders placed yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Top Performance Restaurants */}
                        <div className="bg-surface-container-lowest card-shadow rounded-xl p-lg flex flex-col">
                            <div className="flex justify-between items-center mb-lg">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Approved Restaurants</h3>
                                <Link to="/restaurants" className="text-primary font-label-md text-label-md hover:underline">Manage All</Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-surface-variant">
                                            <th className="pb-md font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Restaurant</th>
                                            <th className="pb-md font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Category</th>
                                            <th className="pb-md font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Rating</th>
                                            <th className="pb-md font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">City</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-surface-variant/30">
                                        {topVendors.length > 0 ? (
                                            topVendors.map(vendor => (
                                                <tr key={vendor.id} className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                                                    <td className="py-md">
                                                        <div className="flex items-center gap-sm">
                                                            <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center font-bold">
                                                                <span className="material-symbols-outlined text-sm">storefront</span>
                                                            </div>
                                                            <span className="font-body-md text-body-md font-semibold text-on-surface">{vendor.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-md font-body-sm text-body-sm text-on-surface">{vendor.category || 'Fast Food'}</td>
                                                    <td className="py-md">
                                                        <div className="flex items-center gap-xs">
                                                            <span className="material-symbols-outlined text-amber-500 text-sm">star</span>
                                                            <span className="font-body-sm text-body-sm font-medium">{vendor.rating || 5.0}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-md font-label-md text-label-md text-on-surface-variant font-bold">{vendor.city || 'Vehari'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="py-8 text-center text-gray-400 text-sm">
                                                    No approved restaurants found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
