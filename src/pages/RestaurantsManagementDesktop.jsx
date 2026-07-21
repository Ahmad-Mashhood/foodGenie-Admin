import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import ManagementTabs from '../components/ManagementTabs';

export default function RestaurantsManagementDesktop() {
    const [restaurants, setRestaurants] = useState([
        {
            id: 1,
            name: 'Burger Haven',
            owner: 'John Mitchell',
            cuisine: 'American',
            city: 'New York',
            status: 'Active',
            joinedDate: 'Oct 12, 2023',
            icon: 'restaurant_menu'
        },
        {
            id: 2,
            name: 'Sushi Zen',
            owner: 'Akiro Tanaka',
            cuisine: 'Japanese',
            city: 'Los Angeles',
            status: 'Pending',
            joinedDate: 'Nov 05, 2023',
            icon: 'ramen_dining'
        },
        {
            id: 3,
            name: 'Pizza Palace',
            owner: 'Marco Rossi',
            cuisine: 'Italian',
            city: 'Chicago',
            status: 'Suspended',
            joinedDate: 'Sep 28, 2023',
            icon: 'local_pizza'
        }
    ]);

    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const [editName, setEditName] = useState('');
    const [editOwner, setEditOwner] = useState('');
    const [editCuisine, setEditCuisine] = useState('');
    const [editCity, setEditCity] = useState('');
    
    // Deletion Modal State
    const [deletingId, setDeletingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Actions
    const confirmDelete = () => {
        setRestaurants(restaurants.filter(r => r.id !== deletingId));
        setDeletingId(null);
    };

    const handleToggleBlock = (id) => {
        setRestaurants(restaurants.map(r => {
            if (r.id === id) {
                return { ...r, status: r.status === 'Suspended' ? 'Active' : 'Suspended' };
            }
            return r;
        }));
    };

    const startEdit = (restaurant) => {
        setEditingRestaurant(restaurant);
        setEditName(restaurant.name);
        setEditOwner(restaurant.owner);
        setEditCuisine(restaurant.cuisine);
        setEditCity(restaurant.city);
    };

    const saveEdit = (e) => {
        e.preventDefault();
        setRestaurants(restaurants.map(r => {
            if (r.id === editingRestaurant.id) {
                return { ...r, name: editName, owner: editOwner, cuisine: editCuisine, city: editCity };
            }
            return r;
        }));
        setEditingRestaurant(null);
    };

    // Filter Logic
    const filteredRestaurants = restaurants.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             r.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             r.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             r.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex min-h-screen overflow-x-hidden text-[#2B2D42]">
            <SidebarNav />

            <main className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>
                <TopNavBar title="User & Restaurant Management" />

                <div className="px-margin flex-1 pb-xl">
                    <ManagementTabs />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-primary-container flex justify-between items-center">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase mb-xs">Total Active</p>
                                <h3 className="font-headline-md text-headline-md text-on-surface">{restaurants.filter(r => r.status === 'Active').length}</h3>
                                <p className="text-green-600 font-label-sm text-label-sm flex items-center gap-xs mt-base">
                                    <span className="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span>
                                    +4 this month
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                                <span className="material-symbols-outlined" data-icon="verified">verified</span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-[#FFB703] flex justify-between items-center">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase mb-xs">Average Rating</p>
                                <h3 className="font-headline-md text-headline-md text-on-surface">4.8</h3>
                                <p className="text-on-surface-variant opacity-60 font-label-sm text-label-sm mt-base">Based on 12.4k reviews</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#FFB703]/10 flex items-center justify-center text-[#FFB703]">
                                <span className="material-symbols-outlined" data-icon="star">star</span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow border-l-4 border-[#E63946] flex justify-between items-center">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase mb-xs">Pending Approvals</p>
                                <h3 className="font-headline-md text-headline-md text-on-surface">12</h3>
                                <p className="text-secondary font-label-sm text-label-sm flex items-center gap-xs mt-base">
                                    <span className="material-symbols-outlined text-[14px]" data-icon="priority_high">priority_high</span>
                                    Requires attention
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#E63946]/10 flex items-center justify-center text-[#E63946]">
                                <span className="material-symbols-outlined" data-icon="pending_actions">pending_actions</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-md mb-lg">
                        <div className="flex flex-1 min-w-[300px] items-center gap-sm">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40" data-icon="search">search</span>
                                <input 
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2B2D42]/10 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent font-body-sm text-body-sm text-[#2B2D42] outline-none transition-all" 
                                    placeholder="Search by restaurant name, owner, cuisine..." 
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
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Suspended</option>
                            </select>
                            <button className="flex items-center gap-xs px-4 py-2.5 bg-white border border-[#2B2D42]/10 rounded-lg font-label-md text-label-md text-[#2B2D42] hover:bg-surface-container-low transition-colors">
                                <span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
                                More Filters
                            </button>
                        </div>
                        <button className="flex items-center gap-xs px-6 py-2.5 bg-[#FF6B35] text-white rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#FF6B35]/20">
                            <span className="material-symbols-outlined" data-icon="add">add</span>
                            Add New Restaurant
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] overflow-hidden mb-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#2B2D42]/5 border-b border-[#2B2D42]/10">
                                    <tr>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Restaurant</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Owner Name</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Cuisine</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">City</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Status</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Joined Date</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2B2D42]/5">
                                    {filteredRestaurants.map(restaurant => (
                                        <tr key={restaurant.id} className="hover:bg-[#FFF8F0] transition-colors group">
                                            <td className="px-lg py-md">
                                                <div className="flex items-center gap-sm">
                                                    <div className="w-10 h-10 rounded-full bg-[#FFB703] flex items-center justify-center text-white font-bold">
                                                        <span className="material-symbols-outlined" data-icon={restaurant.icon}>{restaurant.icon}</span>
                                                    </div>
                                                    <span className="font-label-md text-label-md text-[#2B2D42] font-semibold">{restaurant.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]">{restaurant.owner}</td>
                                            <td className="px-lg py-md">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FF6B35]/20 text-[#FF6B35]">{restaurant.cuisine}</span>
                                            </td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]">{restaurant.city}</td>
                                            <td className="px-lg py-md">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                    restaurant.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                                                    restaurant.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {restaurant.status}
                                                </span>
                                            </td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]">{restaurant.joinedDate}</td>
                                            <td className="px-lg py-md">
                                                <div className="flex items-center gap-md">
                                                    <button onClick={() => startEdit(restaurant)} className="text-[#FF6B35] hover:opacity-70" title="Edit">
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button onClick={() => handleToggleBlock(restaurant.id)} className="text-[#2B2D42]/60 hover:text-[#2B2D42]" title={restaurant.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}>
                                                        <span className="material-symbols-outlined">
                                                            {restaurant.status === 'Active' ? 'check_circle' : 
                                                                restaurant.status === 'Pending' ? 'do_not_disturb' : 
                                                                'block'}
                                                        </span>
                                                    </button>
                                                    <button onClick={() => setDeletingId(restaurant.id)} className="text-[#E63946] hover:opacity-70" title="Delete">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredRestaurants.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="px-lg py-xl text-center font-body-md text-[#2B2D42]/60">
                                                No restaurants found matching filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="px-lg py-md bg-white border-t border-[#2B2D42]/10 flex items-center justify-between">
                                <p className="font-body-sm text-body-sm text-[#2B2D42]/60">
                                    Showing 1 to {filteredRestaurants.length} of {restaurants.length} restaurants
                                </p>
                                <div className="flex items-center gap-base">
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2B2D42]/10 text-[#2B2D42]/40 hover:bg-[#FFF8F0]" disabled><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded bg-[#FF6B35] text-white font-label-md">1</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2B2D42]/10 text-[#2B2D42]/60 hover:bg-[#FFF8F0] font-label-md">2</button>
                                    <span className="px-1 text-[#2B2D42]/40">...</span>
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2B2D42]/10 text-[#2B2D42]/60 hover:bg-[#FFF8F0] font-label-md">6</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2B2D42]/10 text-[#2B2D42]/40 hover:bg-[#FFF8F0]"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Premium Edit Modal overlay */}
            {editingRestaurant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-lg w-full max-w-md border border-[#2B2D42]/10 transition-all">
                        <div className="flex justify-between items-center mb-md border-b border-[#2B2D42]/10 pb-sm">
                            <h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">Edit Restaurant</h3>
                            <button onClick={() => setEditingRestaurant(null)} className="text-[#2B2D42]/60 hover:text-[#2B2D42]">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={saveEdit} className="space-y-md">
                            <div>
                                <label className="block font-label-sm text-label-sm text-[#2B2D42]/70 mb-xs">Restaurant Name</label>
                                <input 
                                    type="text" 
                                    className="w-full px-md py-sm bg-white border border-[#2B2D42]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-[#2B2D42]"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block font-label-sm text-label-sm text-[#2B2D42]/70 mb-xs">Owner Name</label>
                                <input 
                                    type="text" 
                                    className="w-full px-md py-sm bg-white border border-[#2B2D42]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-[#2B2D42]"
                                    value={editOwner}
                                    onChange={(e) => setEditOwner(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block font-label-sm text-label-sm text-[#2B2D42]/70 mb-xs">Cuisine</label>
                                <input 
                                    type="text" 
                                    className="w-full px-md py-sm bg-white border border-[#2B2D42]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-[#2B2D42]"
                                    value={editCuisine}
                                    onChange={(e) => setEditCuisine(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block font-label-sm text-label-sm text-[#2B2D42]/70 mb-xs">City</label>
                                <input 
                                    type="text" 
                                    className="w-full px-md py-sm bg-white border border-[#2B2D42]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-[#2B2D42]"
                                    value={editCity}
                                    onChange={(e) => setEditCity(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="flex justify-end gap-sm pt-sm border-t border-[#2B2D42]/10">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingRestaurant(null)} 
                                    className="px-md py-sm rounded-lg border border-[#2B2D42]/20 text-[#2B2D42] font-label-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-md py-sm rounded-lg bg-[#FF6B35] text-white font-label-md hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#FF6B35]/20"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Premium Custom Deletion Modal */}
            {deletingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-lg w-full max-w-sm border border-[#2B2D42]/10 text-center">
                        <span className="material-symbols-outlined text-[#E63946] text-5xl mb-sm">warning</span>
                        <h3 className="font-headline-sm text-headline-sm text-[#2B2D42] mb-xs">Confirm Delete</h3>
                        <p className="font-body-sm text-body-sm text-[#2B2D42]/70 mb-md">
                            Are you sure you want to delete this restaurant? This action cannot be undone.
                        </p>
                        <div className="flex justify-center gap-sm">
                            <button 
                                onClick={() => setDeletingId(null)} 
                                className="px-md py-sm rounded-lg border border-[#2B2D42]/20 text-[#2B2D42] font-label-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                className="px-md py-sm rounded-lg bg-[#E63946] text-white font-label-md hover:opacity-90 active:scale-95 transition-all shadow-md"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
