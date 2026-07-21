import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import ManagementTabs from '../components/ManagementTabs';

export default function ManagementPortalDesktop() {
    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: 'James Wilson',
            email: 'james.wilson@email.com',
            status: 'Active',
            joinedDate: 'Oct 12, 2023',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzZEWEqbVKohv4ydWLYMD_n5PI2cUZzQXBiqo_33diQSui2aSt7c_9il_Bwb7yikn32IAGoJe_OOrwHY8kZW--aqej4S-F_xK8yEGmcun-9PdQlRLeCmkdOZeTWdZzs3kZIKqmDqHwiUVUhTSBA0KCLFw4d0DzbByxv3oNafuxLl843qGVQ6o-u6_dCrSFsd_dnAF-p-hCXL7FAT5zQTsgNfL500XBZDuNo49sclzHfWeF5JSRMw1J5_3APKroJwGHVgjVEYlQtoGL'
        },
        {
            id: 2,
            name: 'Sarah Chen',
            email: 's.chen@techmail.io',
            status: 'Suspended',
            joinedDate: 'Nov 05, 2023',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSm6IMSnrxO7L0xbLdmpLwXpbojEVaOwqeARJ5IFeP2PE1am57ZnPJQeFd7U2LsrTNfrXO22kWEkNCukpPJ2ztk5tPcwptU7-fikvEJSoJeFc0j4M0_kiDZAx4R2GTjWEoJFux5kK_rDKU94Bf567sisJneEsxpOdCg2Xhqt8NMUTLriss9FnKgmT6mZlST3a-4F-5vwLu9XVJQHyKsC7R9HWQ5nnLEXmLKJTt90FS-otJ6e7pOdAYiF6JfQ1-cxLXZlSt8qDmtpGp'
        },
        {
            id: 3,
            name: 'Marcus Rodriguez',
            email: 'marcus.r@delivery.com',
            status: 'Active',
            joinedDate: 'Dec 01, 2023',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBm0VNI50XWIkSWOfaydPeGcHfXIKZChodK6v_JhPaqaSbPxOHoGxaEEtC4NF-LWXR001LLxvHk5lS8H1Qr-dgmmPU2NaGj4nUNh5Z65xK9b4ZldnRUN1XpQBJ9V_BkJ3nF6BqkDcD-Z6eVrv2Uqj8NqNBQWJt7JtK9rD3H1WGar0uXU44GyJcsU1iWTpDcBdilIZKcpKenWyc7UvDLmeRcDiX1YbDJrbB9QzAP38EDfK6ySpkMUZCFfoVePk8CaeCbOTRzMrZCDCe'
        },
        {
            id: 4,
            name: 'Priya Gupta',
            email: 'priya.g@service.net',
            status: 'Active',
            joinedDate: 'Jan 14, 2024',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVnk_U88ERq0m0-gG09Du6JAksM2D13fCy_VIUQcQ_42n79YN9ymMdAsJX5HtisfGVxVj5N77o55ckdHzniy4L9EP1pNiraz3vIIM_UEcAhXhqD-wB580FBzvnVr2_arnWmxyA_hmgvRCFWkLkPKUkvBQ68dlwvoMUuWUkr60CZh4cGHBpO9IQk3QlYneBP8UUmfu-b1cpHihkekPfhMe79IxmMRY-P8BOHsHA6f8EBr21c3tq6JaNzONxyMvK76SaqFvoZgblwrGU'
        },
        {
            id: 5,
            name: 'David Miller',
            email: 'dmiller@web.com',
            status: 'Active',
            joinedDate: 'Feb 20, 2024',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOWToy_JptququksIkIdtcbOL-iEvb8IT5rARIjHDZcaVRQsYiMbgZuQugf9NCsLgQukE-fMQ2Aa9JjoOEGh7wtL23JZt2_VzL4w81BrCDfwDT7oCPulgdwX7-1FW3nyH61hdgESN6gC2kzI5E5d2-GyY69UqBqZe_6uSs_xfB6ziqbWK4fPE4fiNRFuatAA1PK94lY4yKxpGn8VTvhYkMJt1fvAAvnad5MczVwRBHPLbhZ_CL8yZ_rzhoaFPn4zHVPRNX1YobISt1'
        }
    ]);

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    
    // Custom Premium Deletion Modal State
    const [deletingId, setDeletingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Actions
    const confirmDelete = () => {
        setCustomers(customers.filter(c => c.id !== deletingId));
        setDeletingId(null);
    };

    const handleToggleBlock = (id) => {
        setCustomers(customers.map(c => {
            if (c.id === id) {
                return { ...c, status: c.status === 'Active' ? 'Suspended' : 'Active' };
            }
            return c;
        }));
    };

    const startEdit = (customer) => {
        setEditingCustomer(customer);
        setEditName(customer.name);
        setEditEmail(customer.email);
    };

    const saveEdit = (e) => {
        e.preventDefault();
        setCustomers(customers.map(c => {
            if (c.id === editingCustomer.id) {
                return { ...c, name: editName, email: editEmail };
            }
            return c;
        }));
        setEditingCustomer(null);
    };

    // Filters logic
    const filteredCustomers = customers.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             c.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex min-h-screen text-on-surface">
            <SidebarNav />

            <main className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>
                <TopNavBar title="User & Restaurant Management" />

                <div className="flex-1 px-lg pb-xl">
                    <ManagementTabs />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                        <div className="bg-white p-lg rounded-card shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border-l-4 border-primary relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-sm">
                                <span className="font-label-md text-label-md text-on-surface-variant opacity-70">Total Customers</span>
                                <span className="material-symbols-outlined text-primary-container">groups</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h2 className="font-headline-lg text-headline-lg text-on-surface">{customers.length}</h2>
                                <span className="font-label-sm text-label-sm text-tertiary mb-1 flex items-center">
                                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 12%
                                </span>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[120px]">groups</span>
                            </div>
                        </div>
                        <div className="bg-white p-lg rounded-card shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border-l-4 border-tertiary relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-sm">
                                <span className="font-label-md text-label-md text-on-surface-variant opacity-70">Active Riders</span>
                                <span className="material-symbols-outlined text-tertiary">directions_bike</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h2 className="font-headline-lg text-headline-lg text-on-surface">458</h2>
                                <span className="font-label-sm text-label-sm text-tertiary mb-1 flex items-center">
                                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 5.2%
                                </span>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[120px]">directions_bike</span>
                            </div>
                        </div>
                        <div className="bg-white p-lg rounded-card shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border-l-4 border-secondary relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-sm">
                                <span className="font-label-md text-label-md text-on-surface-variant opacity-70">Avg. Restaurant Rating</span>
                                <span className="material-symbols-outlined text-secondary">star</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h2 className="font-headline-lg text-headline-lg text-on-surface">4.8</h2>
                                <span className="font-label-sm text-label-sm text-secondary-container mb-1 flex items-center">
                                    <span className="material-symbols-outlined text-[16px]">remove</span> stable
                                </span>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[120px]">star</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-md mb-lg">
                        <div className="flex flex-1 min-w-[300px] items-center gap-sm">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40" data-icon="search">search</span>
                                <input 
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2B2D42]/10 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent font-body-sm text-body-sm text-[#2B2D42] outline-none transition-all" 
                                    placeholder="Search by name, email..." 
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
                                <option>Suspended</option>
                            </select>
                            <button className="flex items-center gap-xs px-4 py-2.5 bg-white border border-[#2B2D42]/10 rounded-lg font-label-md text-label-md text-[#2B2D42] hover:bg-surface-container-low transition-colors">
                                <span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
                                More Filters
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] overflow-hidden mb-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#2B2D42]/5 border-b border-[#2B2D42]/10">
                                    <tr>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Customer Details</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Status</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Joined Date</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2B2D42]/5">
                                    {filteredCustomers.map(customer => (
                                        <tr key={customer.id} className="hover:bg-[#FFF8F0] transition-colors group">
                                            <td className="px-lg py-md">
                                                <div className="flex items-center gap-sm">
                                                    <img className="w-10 h-10 rounded-full object-cover" src={customer.avatar} alt={customer.name} />
                                                    <div>
                                                        <p className="font-label-md text-label-md text-[#2B2D42]">{customer.name}</p>
                                                        <p className="font-body-sm text-body-sm text-[#2B2D42]/60">{customer.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-lg py-md">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${customer.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]">{customer.joinedDate}</td>
                                            <td className="px-lg py-md">
                                                <div className="flex items-center gap-md">
                                                    <button onClick={() => startEdit(customer)} className="text-[#FF6B35] hover:opacity-70" title="Edit">
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button onClick={() => handleToggleBlock(customer.id)} className="text-[#2B2D42]/60 hover:text-[#2B2D42]" title={customer.status === 'Active' ? 'Suspend' : 'Unsuspend'}>
                                                        <span className="material-symbols-outlined">
                                                            {customer.status === 'Active' ? 'check_circle' : 'block'}
                                                        </span>
                                                    </button>
                                                    <button onClick={() => setDeletingId(customer.id)} className="text-[#E63946] hover:opacity-70" title="Delete">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCustomers.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-lg py-xl text-center font-body-md text-[#2B2D42]/60">
                                                No customers found matching filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="px-lg py-md bg-surface-container-low/30 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-md">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Showing 1 to <span className="font-bold text-on-surface">{filteredCustomers.length}</span> of <span className="font-bold text-on-surface">{customers.length}</span> customers
                        </span>
                        <div className="flex items-center gap-xs">
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-outline hover:bg-surface-container-low transition-colors disabled:opacity-30" disabled>
                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-label-sm text-label-sm shadow-sm">1</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-low transition-colors">2</button>
                            <span className="px-1 text-outline">...</span>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-low transition-colors">9</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Premium Edit Modal overlay */}
            {editingCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-lg w-full max-w-md border border-[#2B2D42]/10 transition-all transform scale-100">
                        <div className="flex justify-between items-center mb-md border-b border-[#2B2D42]/10 pb-sm">
                            <h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">Edit Customer Details</h3>
                            <button onClick={() => setEditingCustomer(null)} className="text-[#2B2D42]/60 hover:text-[#2B2D42]">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={saveEdit} className="space-y-md">
                            <div>
                                <label className="block font-label-sm text-label-sm text-[#2B2D42]/70 mb-xs">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full px-md py-sm bg-white border border-[#2B2D42]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-[#2B2D42]"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block font-label-sm text-label-sm text-[#2B2D42]/70 mb-xs">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full px-md py-sm bg-white border border-[#2B2D42]/20 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-[#2B2D42]"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="flex justify-end gap-sm pt-sm border-t border-[#2B2D42]/10">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingCustomer(null)} 
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
                            Are you sure you want to delete this customer? This action cannot be undone.
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
