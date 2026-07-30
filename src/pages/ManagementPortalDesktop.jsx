import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import ManagementTabs from '../components/ManagementTabs';
import API from '../api';

export default function ManagementPortalDesktop() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await API.get('/api/admin/users');
            if (res.data) {
                const customerList = res.data.map(u => ({
                    id: u.id,
                    name: u.name || 'Customer',
                    email: u.email,
                    phone: u.phone || 'N/A',
                    status: 'Active',
                    joinedDate: u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Recent'
                }));
                setCustomers(customerList);
            }
        } catch (err) {
            console.error('Failed to fetch users:', err);
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

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
                                <span className="font-label-md text-label-md text-on-surface-variant opacity-70">Registered Customers</span>
                                <span className="material-symbols-outlined text-primary-container">groups</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h2 className="font-headline-lg text-headline-lg text-on-surface">{customers.length}</h2>
                                <span className="font-label-sm text-label-sm text-tertiary mb-1 flex items-center font-bold">
                                    Live Customers
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-card shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border-l-4 border-tertiary relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-sm">
                                <span className="font-label-md text-label-md text-on-surface-variant opacity-70">Active Accounts</span>
                                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h2 className="font-headline-lg text-headline-lg text-on-surface">{customers.filter(c => c.status === 'Active').length}</h2>
                                <span className="font-label-sm text-label-sm text-tertiary mb-1 flex items-center font-bold">
                                    Verified
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-card shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border-l-4 border-secondary relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-sm">
                                <span className="font-label-md text-label-md text-on-surface-variant opacity-70">Account Type</span>
                                <span className="material-symbols-outlined text-secondary">badge</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h2 className="font-headline-lg text-headline-lg text-on-surface">Customers</h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-md mb-lg">
                        <div className="flex flex-1 min-w-[300px] items-center gap-sm">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40">search</span>
                                <input 
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2B2D42]/10 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent font-body-sm text-body-sm text-[#2B2D42] outline-none transition-all" 
                                    placeholder="Search by customer name, email..." 
                                    type="text" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] overflow-hidden mb-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#2B2D42]/5 border-b border-[#2B2D42]/10">
                                    <tr>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Customer Details</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Phone</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Status</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Joined Date</th>
                                        <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2B2D42]/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="px-lg py-xl text-center text-gray-500">
                                                Loading customers...
                                            </td>
                                        </tr>
                                    ) : filteredCustomers.map(customer => (
                                        <tr key={customer.id} className="hover:bg-[#FFF8F0] transition-colors group">
                                            <td className="px-lg py-md">
                                                <div className="flex items-center gap-sm">
                                                    <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center font-bold">
                                                        <span className="material-symbols-outlined">person</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-label-md text-label-md text-[#2B2D42] font-bold">{customer.name}</p>
                                                        <p className="font-body-sm text-body-sm text-[#2B2D42]/60">{customer.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]">{customer.phone}</td>
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
                                    {!loading && filteredCustomers.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-lg py-xl text-center font-body-md text-[#2B2D42]/60">
                                                No registered customers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {editingCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-lg w-full max-w-md border border-[#2B2D42]/10 transition-all">
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
