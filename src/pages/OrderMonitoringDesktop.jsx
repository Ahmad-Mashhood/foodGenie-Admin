import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import API from '../api';

export default function OrderMonitoringDesktop({ initialFilter = 'All' }) {
    const location = useLocation();

    // Map initial URL paths to status tabs if needed
    const getStatusFromPath = (path) => {
        if (path.includes('pending')) return 'Pending';
        if (path.includes('preparing')) return 'Preparing';
        if (path.includes('out-for-delivery')) return 'Out for Delivery';
        if (path.includes('on-the-way')) return 'On the Way';
        if (path.includes('delivered')) return 'Delivered';
        if (path.includes('cancelled')) return 'Cancelled';
        return initialFilter;
    };

    const [activeTab, setActiveTab] = useState(() => getStatusFromPath(location.pathname));
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Sync state if initialFilter or pathname changes
    useEffect(() => {
        setActiveTab(getStatusFromPath(location.pathname));
    }, [location.pathname, initialFilter]);

    // Live State
    const [orders, setOrders] = useState([]);
    const [activeRidersCount, setActiveRidersCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [ordersRes, ridersRes] = await Promise.allSettled([
                    API.get('/api/admin/orders'),
                    API.get('/api/admin/riders')
                ]);

                if (ordersRes.status === 'fulfilled' && ordersRes.value.data) {
                    const mapped = ordersRes.value.data.map(o => ({
                        id: `#ORD-${o.id}`,
                        rawId: o.id,
                        customer: o.customer?.name || o.delivery_name || `Customer #${o.customer_id}`,
                        address: o.delivery_address || 'Vehari',
                        restaurant: o.vendor?.name || `Vendor #${o.vendor_id}`,
                        rider: o.rider?.name || (o.rider_id ? `Rider #${o.rider_id}` : 'Assigning...'),
                        riderAvatar: null,
                        items: `${o.items?.length || 1} Item(s)`,
                        total: o.total_amount || 0,
                        time: new Date(o.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        status: o.status === 'out_for_delivery' ? 'Out for Delivery' : (o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : 'Pending')
                    }));
                    setOrders(mapped);
                }

                if (ridersRes.status === 'fulfilled' && Array.isArray(ridersRes.value.data)) {
                    setActiveRidersCount(ridersRes.value.data.filter(r => r.is_approved !== false).length);
                }
            } catch (err) {
                console.error('Failed to load admin monitoring data', err);
                setOrders([]);
                setActiveRidersCount(0);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculate dynamic stats
    const totalOrdersCount = orders.length;
    const inProgressCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
    const cancelledCount = orders.filter(o => o.status === 'Cancelled').length;
    const cancellationRate = totalOrdersCount > 0 ? ((cancelledCount / totalOrdersCount) * 100).toFixed(1) : '0.0';

    // Generate dynamic tracking feed from real orders
    const trackingFeed = orders.length > 0 ? orders.slice(0, 4).map(o => ({
        icon: o.status === 'Delivered' ? 'task_alt' : o.status === 'Cancelled' ? 'cancel' : 'motorcycle',
        color: o.status === 'Delivered' ? 'text-emerald-600 bg-emerald-100' : o.status === 'Cancelled' ? 'text-red-600 bg-red-100' : 'text-primary bg-primary-fixed',
        text: `Order ${o.id} update: Status is ${o.status}`,
        info: `${o.restaurant} → ${o.customer}`,
        time: o.time
    })) : [
        { icon: 'info', color: 'text-gray-500 bg-gray-100', text: 'Operational System Ready', info: 'No active delivery events recorded yet', time: 'Now' }
    ];

    const handleUpdateStatus = async (orderId, newStatus) => {
        const targetOrder = orders.find(o => o.id === orderId);
        if (targetOrder && targetOrder.rawId) {
            try {
                const apiStatus = newStatus === 'Out for Delivery' ? 'out_for_delivery' : newStatus.toLowerCase();
                await API.patch(`/api/orders/${targetOrder.rawId}/status`, { status: apiStatus });
            } catch (err) {
                console.error('Failed to update status on server:', err);
            }
        }

        setOrders(orders.map(o => {
            if (o.id === orderId) {
                return { ...o, status: newStatus };
            }
            return o;
        }));

        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    // Filter Logic
    const filteredOrders = orders.filter(o => {
        const matchesTab = activeTab === 'All' || o.status === activeTab;
        const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             o.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (o.rider && o.rider.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-800';
            case 'Preparing': return 'bg-blue-100 text-blue-800';
            case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
            case 'On the Way': return 'bg-cyan-100 text-cyan-800';
            case 'Delivered': return 'bg-emerald-100 text-emerald-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return 'schedule';
            case 'Preparing': return 'skillet';
            case 'Out for Delivery': return 'delivery_dining';
            case 'On the Way': return 'motorcycle';
            case 'Delivered': return 'task_alt';
            case 'Cancelled': return 'cancel';
            default: return 'help';
        }
    };

    return (
        <div className="bg-[#FFF8F0] font-body-md text-on-surface min-h-screen overflow-x-hidden">
            <SidebarNav />

            <div className="flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>
                <TopNavBar title="Order Monitoring" />

                <section className="p-gutter flex flex-col gap-lg flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-md mb-xs">
                        <div className="flex flex-wrap items-center gap-xs">
                            {['All', 'Pending', 'Preparing', 'Out for Delivery', 'On the Way', 'Delivered', 'Cancelled'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-md py-xs rounded-full font-label-sm text-label-sm shadow-sm transition-all duration-200 cursor-pointer ${
                                        activeTab === tab 
                                        ? 'bg-[#FF6B35] text-white font-semibold' 
                                        : 'bg-white border border-[#2B2D42]/10 text-[#2B2D42]/70 hover:bg-[#FFF8F0]'
                                    }`}
                                >
                                    {tab === 'All' ? 'All Orders' : tab}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-72">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40">search</span>
                            <input 
                                className="w-full pl-10 pr-4 py-2 bg-white border border-[#2B2D42]/10 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent font-body-sm text-body-sm text-[#2B2D42] outline-none transition-all" 
                                placeholder="Search by Order ID, Customer, Restaurant..." 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-[#FF6B35] relative overflow-hidden group">
                            <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Avg. Delivery Time</p>
                            <div className="flex items-end gap-xs mt-xs">
                                <span className="font-headline-md text-headline-md text-[#2B2D42]">
                                    {totalOrdersCount > 0 ? '18m 30s' : '0m'}
                                </span>
                                <span className="text-green-600 font-label-sm text-label-sm flex items-center mb-1">
                                    <span className="material-symbols-outlined text-[16px]">check_circle</span> Live
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-tertiary relative overflow-hidden group">
                            <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Orders In-Progress</p>
                            <div className="flex items-end gap-xs mt-xs">
                                <span className="font-headline-md text-headline-md text-[#2B2D42]">
                                    {inProgressCount}
                                </span>
                                <span className="text-[#FF6B35] font-label-sm text-label-sm mb-1 font-semibold animate-pulse">Live Tracking</span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-secondary relative overflow-hidden group">
                            <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Cancellation Rate</p>
                            <div className="flex items-end gap-xs mt-xs">
                                <span className="font-headline-md text-headline-md text-[#2B2D42]">{cancellationRate}%</span>
                                <span className="text-gray-500 font-label-sm text-label-sm flex items-center mb-1">
                                    ({cancelledCount} order{cancelledCount === 1 ? '' : 's'})
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-outline relative overflow-hidden group">
                            <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Active Riders</p>
                            <div className="flex items-end gap-xs mt-xs">
                                <span className="font-headline-md text-headline-md text-[#2B2D42]">
                                    {activeRidersCount}
                                </span>
                                <span className="text-[#2B2D42]/60 font-label-sm text-label-sm mb-1">Registered Platform Fleet</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#2B2D42]/5 border-b border-[#2B2D42]/10">
                                    <tr>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Order ID</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Customer</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Restaurant</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Rider</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Items</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider text-right">Total</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Time</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Status</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2B2D42]/5">
                                    {filteredOrders.map(order => (
                                        <tr key={order.id} className="hover:bg-[#FFF8F0] transition-colors group">
                                            <td className="px-lg py-md font-label-md text-label-md text-[#FF6B35] font-bold">{order.id}</td>
                                            <td className="px-lg py-md">
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md text-[#2B2D42] font-semibold">{order.customer}</span>
                                                    <span className="font-body-sm text-body-sm text-[#2B2D42]/60">{order.address}</span>
                                                </div>
                                            </td>
                                            <td className="px-lg py-md font-body-md text-body-md text-[#2B2D42]">{order.restaurant}</td>
                                            <td className="px-lg py-md">
                                                {order.riderAvatar ? (
                                                    <div className="flex items-center gap-xs">
                                                        <img className="w-6 h-6 rounded-full object-cover" src={order.riderAvatar} alt={order.rider} />
                                                        <span className="font-body-sm text-body-sm text-[#2B2D42]">{order.rider}</span>
                                                    </div>
                                                ) : (
                                                    <span className="font-body-sm text-body-sm text-[#2B2D42]/60 font-medium">{order.rider}</span>
                                                )}
                                            </td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]/80">{order.items}</td>
                                            <td className="px-lg py-md font-label-md text-label-md text-right text-[#2B2D42] font-semibold">Rs. {order.total.toLocaleString()}</td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]/80">{order.time}</td>
                                            <td className="px-lg py-md">
                                                <span className={`px-2.5 py-1 rounded-full font-label-sm text-xs flex items-center w-fit gap-1 font-semibold ${getStatusClass(order.status)}`}>
                                                    <span className="material-symbols-outlined text-[14px]">{getStatusIcon(order.status)}</span>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-lg py-md text-center">
                                                <button 
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="px-3 py-1 bg-[#FF6B35] text-white rounded-lg font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredOrders.length === 0 && (
                                        <tr>
                                            <td colSpan="9" className="px-lg py-xl text-center font-body-md text-[#2B2D42]/60">
                                                No orders found matching filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-lg py-md bg-white border-t border-[#2B2D42]/10 flex items-center justify-between">
                            <span className="font-body-sm text-body-sm text-[#2B2D42]/60">
                                Showing {filteredOrders.length > 0 ? 1 : 0} to {filteredOrders.length} of {orders.length} orders
                            </span>
                            <div className="flex items-center gap-xs">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:bg-[#FFF8F0] transition-colors disabled:opacity-30" disabled>
                                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FF6B35] text-white font-label-sm text-label-sm shadow-sm">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:bg-[#FFF8F0] transition-colors disabled:opacity-30" disabled>
                                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                        <div className="md:col-span-2 bg-white p-lg rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border border-[#2B2D42]/5">
                            <div className="flex items-center justify-between mb-md">
                                <h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">Live Tracking Feed</h3>
                                <span className="font-label-sm text-label-sm text-[#FF6B35] font-semibold">Real-Time</span>
                            </div>
                            <div className="space-y-md">
                                {trackingFeed.map((feed, idx) => (
                                    <div key={idx} className="flex items-start gap-md pb-md border-b border-[#2B2D42]/5 last:border-0 last:pb-0">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${feed.color}`}>
                                            <span className="material-symbols-outlined">{feed.icon}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-label-md text-label-md text-[#2B2D42] font-semibold">{feed.text}</p>
                                            <p className="font-body-sm text-body-sm text-[#2B2D42]/60">{feed.info}</p>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-[#2B2D42]/40">{feed.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#FF6B35] p-lg rounded-xl shadow-[0px_4px_12px_rgba(255,107,53,0.15)] text-white flex flex-col justify-between relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="font-headline-sm text-headline-sm mb-xs">Operational Status</h3>
                                <p className="font-body-sm text-body-sm opacity-90">All delivery services operational in Vehari.</p>
                                <div className="mt-lg p-md bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
                                    <div className="flex justify-between items-center mb-xs">
                                        <span className="font-label-sm text-label-sm font-semibold">Platform Load</span>
                                        <span className="font-label-sm text-label-sm font-semibold">
                                            {inProgressCount > 0 ? `${Math.min(95, inProgressCount * 15)}%` : '5%'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                        <div className="bg-white h-full" style={{ width: inProgressCount > 0 ? `${Math.min(95, inProgressCount * 15)}%` : '5%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 mt-xl">
                                <button className="w-full py-md bg-white text-[#FF6B35] rounded-xl font-label-md text-label-md hover:bg-gray-50 transition-all active:scale-95 shadow-lg shadow-black/5 font-semibold cursor-pointer">
                                    Operational Report Active
                                </button>
                            </div>
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform"></div>
                        </div>
                    </div>
                </section>

                <footer className="px-margin py-md flex justify-between items-center border-t border-[#2B2D42]/5 text-[#2B2D42]/40">
                    <span className="font-body-sm text-body-sm">© 2026 Food Genie Global Ops. All rights reserved.</span>
                    <div className="flex gap-md font-label-sm text-label-sm">
                        <Link className="hover:text-[#FF6B35] transition-colors" to="#">Privacy Policy</Link>
                        <Link className="hover:text-[#FF6B35] transition-colors" to="#">Service Level Agreement</Link>
                        <Link className="hover:text-[#FF6B35] transition-colors" to="#">System Support</Link>
                    </div>
                </footer>
            </div>

            {/* Premium Order Details Modal overlay */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-lg w-full max-w-lg border border-[#2B2D42]/10 transition-all text-on-surface">
                        <div className="flex justify-between items-center mb-md border-b border-[#2B2D42]/10 pb-sm">
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">{selectedOrder.id}</h3>
                                <p className="text-xs text-[#2B2D42]/60">Placed at {selectedOrder.time}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-[#2B2D42]/60 hover:text-[#2B2D42] cursor-pointer">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <div className="space-y-md">
                            {/* Customer and Restaurant details grid */}
                            <div className="grid grid-cols-2 gap-md bg-gray-50 p-md rounded-lg border border-[#2B2D42]/5">
                                <div>
                                    <p className="font-label-sm text-xs text-[#2B2D42]/60 uppercase">Customer Details</p>
                                    <p className="font-label-md text-label-md text-[#2B2D42] font-semibold mt-1">{selectedOrder.customer}</p>
                                    <p className="font-body-sm text-xs text-[#2B2D42]/60">{selectedOrder.address}</p>
                                </div>
                                <div>
                                    <p className="font-label-sm text-xs text-[#2B2D42]/60 uppercase">Restaurant</p>
                                    <p className="font-label-md text-label-md text-[#2B2D42] font-semibold mt-1">{selectedOrder.restaurant}</p>
                                </div>
                            </div>

                            {/* Rider info */}
                            <div>
                                <p className="font-label-sm text-xs text-[#2B2D42]/60 uppercase mb-2">Assigned Rider</p>
                                <div className="flex items-center gap-sm bg-[#FFF8F0] p-sm rounded-lg border border-[#FF6B35]/10">
                                    {selectedOrder.riderAvatar ? (
                                        <>
                                            <img className="w-8 h-8 rounded-full object-cover" src={selectedOrder.riderAvatar} alt={selectedOrder.rider} />
                                            <div>
                                                <p className="font-label-md text-label-md text-[#2B2D42] font-semibold">{selectedOrder.rider}</p>
                                                <p className="text-[11px] text-[#2B2D42]/60">Operational Delivery Team</p>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="font-body-sm text-sm text-[#2B2D42]/70 font-medium">{selectedOrder.rider}</p>
                                    )}
                                </div>
                            </div>

                            {/* Order items list */}
                            <div>
                                <p className="font-label-sm text-xs text-[#2B2D42]/60 uppercase mb-1">Items Summary</p>
                                <p className="font-body-sm text-body-sm text-[#2B2D42] font-medium py-1">{selectedOrder.items}</p>
                                <div className="flex justify-between items-center border-t border-[#2B2D42]/5 pt-sm mt-sm">
                                    <span className="font-label-sm text-[#2B2D42]/60 font-semibold">Total Paid</span>
                                    <span className="font-headline-sm text-headline-sm text-[#FF6B35] font-bold">Rs. {selectedOrder.total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Status controls */}
                            <div className="border-t border-[#2B2D42]/10 pt-md">
                                <label className="block font-label-sm text-xs text-[#2B2D42]/60 uppercase mb-xs">Change Order Status</label>
                                <select 
                                    className="w-full bg-white border border-[#2B2D42]/15 rounded-lg px-md py-sm font-label-md text-[#2B2D42] focus:ring-2 focus:ring-[#FF6B35] outline-none cursor-pointer"
                                    value={selectedOrder.status}
                                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Preparing">Preparing</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="On the Way">On the Way</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            {/* Actions footer */}
                            <div className="flex justify-end gap-sm pt-sm border-t border-[#2B2D42]/5">
                                <button 
                                    onClick={() => setSelectedOrder(null)} 
                                    className="px-md py-sm bg-gray-150 text-[#2B2D42] font-label-md rounded-lg hover:bg-gray-200 border border-[#2B2D42]/10 transition-colors cursor-pointer"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
