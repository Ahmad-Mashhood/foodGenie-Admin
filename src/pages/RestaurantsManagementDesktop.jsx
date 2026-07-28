import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import ManagementTabs from '../components/ManagementTabs';
import API from '../api';

export default function RestaurantsManagementDesktop() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRestaurants = async () => {
        setLoading(true);
        try {
            const res = await API.get('/api/admin/vendors');
            setRestaurants(res.data || []);
        } catch (err) {
            setRestaurants([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const [editName, setEditName] = useState('');
    const [editOwner, setEditOwner] = useState('');
    const [editCuisine, setEditCuisine] = useState('');
    const [editCity, setEditCity] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const handleApprove = async (vendorId) => {
        try {
            await API.patch(`/api/admin/vendors/${vendorId}/approve`);
            fetchRestaurants();
        } catch (err) {
            alert('Failed to approve restaurant: ' + (err.response?.data?.detail || err.message));
        }
    };

    const handleReject = async (vendorId) => {
        try {
            await API.patch(`/api/admin/vendors/${vendorId}/reject`);
            fetchRestaurants();
        } catch (err) {
            alert('Failed to reject restaurant: ' + (err.response?.data?.detail || err.message));
        }
    };

    const confirmDelete = () => {
        setRestaurants(restaurants.filter(r => r.id !== deletingId));
        setDeletingId(null);
    };

    const startEdit = (restaurant) => {
        setEditingRestaurant(restaurant);
        setEditName(restaurant.name || '');
        setEditOwner(restaurant.email || '');
        setEditCuisine(restaurant.category || '');
        setEditCity(restaurant.city || '');
    };

    const saveEdit = (e) => {
        e.preventDefault();
        setRestaurants(restaurants.map(r => {
            if (r.id === editingRestaurant.id) {
                return { ...r, name: editName, email: editOwner, category: editCuisine, city: editCity };
            }
            return r;
        }));
        setEditingRestaurant(null);
    };

    // Filter Logic
    const filteredRestaurants = restaurants.filter(r => {
        const name = r.name || '';
        const email = r.email || '';
        const category = r.category || '';
        const city = r.city || '';
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             city.toLowerCase().includes(searchTerm.toLowerCase());
        
        const isApproved = r.is_approved !== false;
        const matchesStatus = statusFilter === 'All Status' ||
                             (statusFilter === 'Active' && isApproved) ||
                             (statusFilter === 'Pending' && !isApproved);
        return matchesSearch && matchesStatus;
    });

    const activeCount = restaurants.filter(r => r.is_approved !== false).length;
    const pendingCount = restaurants.filter(r => !r.is_approved).length;

    return (
        <div className="flex min-h-screen overflow-x-hidden text-[#2B2D42]">
            <SidebarNav />

            <main className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>
                <TopNavBar title="User & Restaurant Management" />

                <div className="px-margin flex-1 pb-xl">
                    <ManagementTabs />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-emerald-500 flex justify-between items-center">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase mb-xs">Total Approved</p>
                                <h3 className="font-headline-md text-headline-md text-on-surface">{activeCount}</h3>
                                <p className="text-emerald-600 font-label-sm text-label-sm flex items-center gap-xs mt-base font-bold">
                                    Approved & Live
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <span className="material-symbols-outlined">verified</span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-[#FFB703] flex justify-between items-center">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase mb-xs">Pending Approvals</p>
                                <h3 className="font-headline-md text-headline-md text-on-surface">{pendingCount}</h3>
                                <p className="text-[#FFB703] font-label-sm text-label-sm flex items-center gap-xs mt-base font-bold">
                                    Requires Admin Review
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#FFB703]/10 flex items-center justify-center text-[#FFB703]">
                                <span className="material-symbols-outlined">pending_actions</span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-[#FF6B35] flex justify-between items-center">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase mb-xs">Total Registered</p>
                                <h3 className="font-headline-md text-headline-md text-on-surface">{restaurants.length}</h3>
                                <p className="text-[#FF6B35] font-label-sm text-label-sm mt-base font-bold">Platform Restaurants</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                                <span className="material-symbols-outlined">storefront</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-md mb-lg">
                        <div className="flex flex-1 min-w-[300px] items-center gap-sm">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40">search</span>
                                <input 
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2B2D42]/10 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent font-body-sm text-body-sm text-[#2B2D42] outline-none transition-all" 
                                    placeholder="Search by restaurant name, email, category..." 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select 
                                className="bg-white border border-[#2B2D42]/10 rounded-lg px-4 py-2.5 font-label-md text-label-md text-[#2B2D42] focus:ring-[#FF6B35] outline-none"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All Status">All Status</option>
                                <option value="Active">Approved Only</option>
                                <option value="Pending">Pending Only</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] overflow-hidden mb-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#2B2D42]/5 border-b border-[#2B2D42]/10">
                                    <tr>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Restaurant</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Email / Contact</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Category</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">City</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Approval Status</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2B2D42]/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="px-lg py-xl text-center text-gray-500">
                                                Loading restaurants...
                                            </td>
                                        </tr>
                                    ) : filteredRestaurants.map(restaurant => {
                                        const isApproved = restaurant.is_approved !== false;
                                        return (
                                            <tr key={restaurant.id} className="hover:bg-[#FFF8F0] transition-colors group">
                                                <td className="px-lg py-md">
                                                    <div className="flex items-center gap-sm">
                                                        <div className="w-10 h-10 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center font-bold">
                                                            <span className="material-symbols-outlined">storefront</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-label-md text-label-md text-[#2B2D42] font-bold block">{restaurant.name}</span>
                                                            <span className="text-xs text-gray-400">ID #{restaurant.id}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]">
                                                    <p className="font-medium">{restaurant.email}</p>
                                                    <p className="text-xs text-gray-500">{restaurant.phone || 'N/A'}</p>
                                                </td>
                                                <td className="px-lg py-md">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FF6B35]/10 text-[#FF6B35]">
                                                        {restaurant.category || 'Restaurant'}
                                                    </span>
                                                </td>
                                                <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]">{restaurant.city || 'Vehari'}</td>
                                                <td className="px-lg py-md">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold ${
                                                        isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                                    }`}>
                                                        {isApproved ? 'Approved' : 'Pending Approval'}
                                                    </span>
                                                </td>
                                                <td className="px-lg py-md text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {!isApproved ? (
                                                            <button
                                                                onClick={() => handleApprove(restaurant.id)}
                                                                className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all cursor-pointer flex items-center gap-1"
                                                            >
                                                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                                                Approve
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleReject(restaurant.id)}
                                                                className="px-3 py-1 border border-red-500 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 transition-all cursor-pointer flex items-center gap-1"
                                                            >
                                                                <span className="material-symbols-outlined text-[14px]">cancel</span>
                                                                Revoke Approval
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {!loading && filteredRestaurants.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-lg py-xl text-center font-body-md text-[#2B2D42]/60">
                                                No restaurants found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
