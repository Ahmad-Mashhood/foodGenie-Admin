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

    // State for Orders
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await API.get('/api/admin/orders');
                if (res.data && res.data.length > 0) {
                    const mapped = res.data.map(o => ({
                        id: `#ORD-${o.id}`,
                        customer: `Customer #${o.customer_id}`,
                        address: o.delivery_address || 'Vehari',
                        restaurant: `Vendor #${o.vendor_id}`,
                        rider: o.rider_id ? `Rider #${o.rider_id}` : 'Assigning...',
                        riderAvatar: null,
                        items: `${o.items?.length || 1} Item(s)`,
                        total: o.total_amount || 0,
                        time: new Date(o.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        status: o.status === 'out_for_delivery' ? 'Out for Delivery' : (o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : 'Pending')
                    }));
                    setOrders(mapped);
                }
            } catch (err) {
                console.error('Failed to load admin orders', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);
        {
            id: '#ORD-9425',
            customer: 'Kev Peterson',
            address: 'East Gate Mall',
            restaurant: 'Wok on Fire',
            rider: 'Assigning...',
            riderAvatar: null,
            items: '1x Pad Thai (Spicy)',
            total: 15.25,
            time: '12:12 PM',
            status: 'Pending'
        },
        {
            id: '#ORD-9421',
            customer: 'Jessica Miller',
            address: 'Downtown, Sector 4',
            restaurant: 'Pasta Palace',
            rider: 'Dave R.',
            riderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBXx6MQTd8t1UefobPsGRC4jO4V4yjQDTVYBQSb4AbSdZzCBVx-NDLjo4yPLzB7HPEkbcy1v-ueQV1Lx0Ty1FwL6SsBuryDD11ak-H-WqF_pJFeBbf8u-Ea0T0O6hi_kCRHWm_m14L_fwiqjM4m1Xk9l7A5CtCIv7zQLtC0eGeSroeMI1_l-RV29IyoJBgG1-hVrMvpi4xn-LVbDUttljfsvmF-sikOtfjVHae4aFiWkQKL1sGiMGwnm5e3if73Ju8CTdJsGbAfxV9',
            items: '2x Fettuccine, 1x Coke',
            total: 34.50,
            time: '12:04 PM',
            status: 'Preparing'
        },
        {
            id: '#ORD-9418',
            customer: 'Marcus Thorne',
            address: 'Highland View Apt',
            restaurant: 'Burger Baron',
            rider: 'Elena S.',
            riderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEg6Y_RF-8ZbEVrIIodIhXwdgQIZNn9_pp2X11IyGSbn8ZXpOKpv23cKkL8eLTcr301BbWTHU2rEXxua7QqsKN9W2gZL-LQ3dmTsm2E_gtg_OF31aDJbDi5ApzQMCtCANW4i6kKaS6B-yh9ODIJvu3t-ZCa-npuF6MToRcokrxkdRl6BPEdE8oYT-bRP_iLIeUcxBmGKfhTcnHr7YeUZdgrXWcLuhBmQNK4djxSVMNhF15pyCEDnECtkvCeyVvxcOXF4XnKQz1k4cY',
            items: '1x Deluxe Meal, 1x Fries',
            total: 21.80,
            time: '11:58 AM',
            status: 'Out for Delivery'
        },
        {
            id: '#ORD-9408',
            customer: 'Robert Chen',
            address: 'Soma Tower B',
            restaurant: 'Pizza Palace',
            rider: 'Marcus T.',
            riderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCain-XHkJ8AQ1bTS_w4ydh7bNStQ7em4S0TiBz3kW4S47WD7duE6YMm7QzDU4AnmEozJU5HVNeSWjbzNJaE8N9cILMvkeRO0T3rCDFeON2D49_ZF46DpKmqoA_-tKzbMZ52JcWfPjRyQcoGBr7V_2jtd83g3Z2-sZNs16Rse7YaoRnVm-tq9clkxr2z_PvfxILV265hkzeDgmkgfsSm-eHH9d_7euInl6R1X-RgswnAP61ElInB3hMTzoHRlq26cfyPdU8RMwJlt7R',
            items: '1x Large Pepperoni',
            total: 24.00,
            time: '11:15 AM',
            status: 'On the Way'
        },
        {
            id: '#ORD-9410',
            customer: 'Linda Wang',
            address: 'West Quay Office',
            restaurant: 'Greens & Grains',
            rider: 'Tasha G.',
            riderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQC85n9KVfcDtdEVAfQai9POsbcA1Tl_G1OKB0RfhlgTA2Ck14txrQXUlOwNEGhtBquv3Uq4ul_1AuHAdJ0x61w6sxW01-7jUaZvGpgLRCF-18zNyxh4oVVd3R20ucZ45-2p63ZKgbaev3w2kLPjUm_3OQ63sVaJfzd2Cr0hVHPPnHNskQG9zeffyj9GG4zo2YraKtZXjk1xLRPpWs6-IpunyhvR_GwQkg3Hecims16rjfnVef4kVTqtMrJO65UwSuNyM21EqvJvTU',
            items: '2x Caesar Salad',
            total: 28.90,
            time: '11:30 AM',
            status: 'Delivered'
        },
        {
            id: '#ORD-9415',
            customer: 'Sarah Jenkins',
            address: 'Parkside Residency',
            restaurant: 'Sushi Zen',
            rider: '—',
            riderAvatar: null,
            items: '4x Salmon Nigiri',
            total: 42.00,
            time: '11:45 AM',
            status: 'Cancelled'
        },
        {
            id: '#ORD-9405',
            customer: 'Emily Davis',
            address: 'Ocean Ave 12',
            restaurant: 'Taco Town',
            rider: 'Dave R.',
            riderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBXx6MQTd8t1UefobPsGRC4jO4V4yjQDTVYBQSb4AbSdZzCBVx-NDLjo4yPLzB7HPEkbcy1v-ueQV1Lx0Ty1FwL6SsBuryDD11ak-H-WqF_pJFeBbf8u-Ea0T0O6hi_kCRHWm_m14L_fwiqjM4m1Xk9l7A5CtCIv7zQLtC0eGeSroeMI1_l-RV29IyoJBgG1-hVrMvpi4xn-LVbDUttljfsvmF-sikOtfjVHae4aFiWkQKL1sGiMGwnm5e3if73Ju8CTdJsGbAfxV9',
            items: '3x Beef Tacos, 1x Nachos',
            total: 18.50,
            time: '11:00 AM',
            status: 'Delivered'
        }
    ]);

    // Live Tracking feed events
    const trackingFeed = [
        { icon: 'motorcycle', color: 'text-primary bg-primary-fixed', text: 'Rider Elena S. is approaching the drop-off', info: 'Order #ORD-9418 • 2 mins away', time: 'Just now' },
        { icon: 'cancel_presentation', color: 'text-secondary bg-secondary-fixed', text: 'New Cancellation Request', info: 'Order #ORD-9430 • Restaurant: Pizza Hub', time: '5m ago' },
        { icon: 'star', color: 'text-tertiary bg-tertiary-fixed', text: '5-Star Review Received', info: 'Order #ORD-9405 • "Super fast delivery!"', time: '12m ago' }
    ];

    const handleUpdateStatus = (orderId, newStatus) => {
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
                                    className={`px-md py-xs rounded-full font-label-sm text-label-sm shadow-sm transition-all duration-200 ${
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
                                <span className="font-headline-md text-headline-md text-[#2B2D42]">24m 12s</span>
                                <span className="text-green-600 font-label-sm text-label-sm flex items-center mb-1">
                                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span> 2.4%
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-tertiary relative overflow-hidden group">
                            <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Orders In-Progress</p>
                            <div className="flex items-end gap-xs mt-xs">
                                <span className="font-headline-md text-headline-md text-[#2B2D42]">
                                    {orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length}
                                </span>
                                <span className="text-[#FF6B35] font-label-sm text-label-sm mb-1 font-semibold animate-pulse">Live Tracking</span>
                            </div>
                        </div>
                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-secondary relative overflow-hidden group">
                            <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Cancellation Rate</p>
                            <div className="flex items-end gap-xs mt-xs">
                                <span className="font-headline-md text-headline-md text-[#2B2D42]">0.8%</span>
                                <span className="text-green-600 font-label-sm text-label-sm flex items-center mb-1">
                                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span> 0.1%
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-outline relative overflow-hidden group">
                            <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Active Riders</p>
                            <div className="flex items-end gap-xs mt-xs">
                                <span className="font-headline-md text-headline-md text-[#2B2D42]">112</span>
                                <span className="text-[#2B2D42]/60 font-label-sm text-label-sm mb-1">94% capacity</span>
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
                                                    <span className="font-body-sm text-body-sm text-[#2B2D42]/40 italic">{order.rider}</span>
                                                )}
                                            </td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]/80">{order.items}</td>
                                            <td className="px-lg py-md font-label-md text-label-md text-right text-[#2B2D42] font-semibold">${order.total.toFixed(2)}</td>
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
                                                    className="px-3 py-1 bg-[#FF6B35] text-white rounded-lg font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all shadow-sm"
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
                                Showing 1 to {filteredOrders.length} of {orders.length} orders
                            </span>
                            <div className="flex items-center gap-xs">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:bg-[#FFF8F0] transition-colors disabled:opacity-30" disabled>
                                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FF6B35] text-white font-label-sm text-label-sm shadow-sm">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-[#2B2D42]/60 hover:bg-[#FFF8F0] font-label-sm">2</button>
                                <span className="px-1 text-outline">...</span>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-[#2B2D42]/60 hover:bg-[#FFF8F0] font-label-sm">30</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-[#2B2D42]/60 hover:bg-[#FFF8F0]">
                                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                        <div className="md:col-span-2 bg-white p-lg rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border border-[#2B2D42]/5">
                            <div className="flex items-center justify-between mb-md">
                                <h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">Live Tracking Feed</h3>
                                <span className="font-label-sm text-label-sm text-[#FF6B35] underline cursor-pointer hover:opacity-80">View Map</span>
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
                                <p className="font-body-sm text-body-sm opacity-90">All systems are operational in Downtown Sector.</p>
                                <div className="mt-lg p-md bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
                                    <div className="flex justify-between items-center mb-xs">
                                        <span className="font-label-sm text-label-sm font-semibold">System Load</span>
                                        <span className="font-label-sm text-label-sm font-semibold">42%</span>
                                    </div>
                                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                        <div className="bg-white h-full" style={{ width: '42%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 mt-xl">
                                <button className="w-full py-md bg-white text-[#FF6B35] rounded-xl font-label-md text-label-md hover:bg-gray-50 transition-all active:scale-95 shadow-lg shadow-black/5 font-semibold">
                                    Download Report
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
                            <button onClick={() => setSelectedOrder(null)} className="text-[#2B2D42]/60 hover:text-[#2B2D42]">
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
                                        <p className="font-body-sm text-sm text-[#2B2D42]/50 italic">{selectedOrder.rider}</p>
                                    )}
                                </div>
                            </div>

                            {/* Order items list */}
                            <div>
                                <p className="font-label-sm text-xs text-[#2B2D42]/60 uppercase mb-1">Items Summary</p>
                                <p className="font-body-sm text-body-sm text-[#2B2D42] font-medium py-1">{selectedOrder.items}</p>
                                <div className="flex justify-between items-center border-t border-[#2B2D42]/5 pt-sm mt-sm">
                                    <span className="font-label-sm text-[#2B2D42]/60 font-semibold">Total Paid</span>
                                    <span className="font-headline-sm text-headline-sm text-[#FF6B35] font-bold">${selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Status controls */}
                            <div className="border-t border-[#2B2D42]/10 pt-md">
                                <label className="block font-label-sm text-xs text-[#2B2D42]/60 uppercase mb-xs">Change Order Status</label>
                                <select 
                                    className="w-full bg-white border border-[#2B2D42]/15 rounded-lg px-md py-sm font-label-md text-[#2B2D42] focus:ring-2 focus:ring-[#FF6B35] outline-none"
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
                                    className="px-md py-sm bg-gray-150 text-[#2B2D42] font-label-md rounded-lg hover:bg-gray-200 border border-[#2B2D42]/10 transition-colors"
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
