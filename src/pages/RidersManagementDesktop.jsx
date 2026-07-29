import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import ManagementTabs from '../components/ManagementTabs';
import API from '../api';

export default function RidersManagementDesktop() {
    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRiders = async () => {
        setLoading(true);
        try {
            const res = await API.get('/api/admin/riders');
            setRiders(res.data || []);
        } catch (err) {
            setRiders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRiders();
    }, []);

    const [editingRider, setEditingRider] = useState(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const handleApprove = async (riderId) => {
        try {
            await API.patch(`/api/admin/riders/${riderId}/approve`);
            fetchRiders();
        } catch (err) {
            alert('Failed to approve rider: ' + (err.response?.data?.detail || err.message));
        }
    };

    const handleReject = async (riderId) => {
        try {
            await API.patch(`/api/admin/riders/${riderId}/reject`);
            fetchRiders();
        } catch (err) {
            alert('Failed to reject rider: ' + (err.response?.data?.detail || err.message));
        }
    };

    const confirmDelete = () => {
        setRiders(riders.filter(r => r.id !== deletingId));
        setDeletingId(null);
    };

    const startEdit = (rider) => {
        setEditingRider(rider);
        setEditName(rider.name);
        setEditEmail(rider.email);
        setEditPhone(rider.phone);
    };

    const saveEdit = (e) => {
        e.preventDefault();
        setRiders(riders.map(r => {
            if (r.id === editingRider.id) {
                return { ...r, name: editName, email: editEmail, phone: editPhone };
            }
            return r;
        }));
        setEditingRider(null);
    };

    // Filter Logic
    const filteredRiders = riders.filter(r => {
        const name = r.name || '';
        const email = r.email || '';
        const phone = r.phone || '';
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             phone.includes(searchTerm);
        
        const isApproved = r.is_approved !== false;
        const matchesStatus = statusFilter === 'All Status' ||
                             (statusFilter === 'Active' && isApproved) ||
                             (statusFilter === 'Pending' && !isApproved);
        return matchesSearch && matchesStatus;
    });

    const activeCount = riders.filter(r => r.is_approved !== false).length;
    const pendingCount = riders.filter(r => !r.is_approved).length;

    return (
        <div className="flex min-h-screen text-on-surface">
            <SidebarNav />

            <main className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>
                <TopNavBar title="User & Restaurant Management" />

                <div className="flex-1 px-lg pb-xl">
                    <ManagementTabs />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                        <div className="bg-white p-lg rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border-l-4 border-emerald-500">
                            <div className="flex items-center justify-between mb-sm">
                                <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Approved Riders</p>
                                <span className="material-symbols-outlined text-emerald-500">verified</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h3 className="font-headline-md text-headline-md text-[#2B2D42]">{activeCount}</h3>
                                <span className="text-emerald-500 font-label-sm flex items-center mb-1 font-bold">
                                    Approved & Active
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border-l-4 border-[#FFB703]">
                            <div className="flex items-center justify-between mb-sm">
                                <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Pending Approvals</p>
                                <span className="material-symbols-outlined text-[#FFB703]">pending_actions</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h3 className="font-headline-md text-headline-md text-[#2B2D42]">{pendingCount}</h3>
                                <span className="text-[#FFB703] font-label-sm flex items-center mb-1 font-bold">
                                    Requires Admin Review
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] border-l-4 border-[#FF6B35]">
                            <div className="flex items-center justify-between mb-sm">
                                <p className="font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Total Registered</p>
                                <span className="material-symbols-outlined text-[#FF6B35]">two_wheeler</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <h3 className="font-headline-md text-headline-md text-[#2B2D42]">{riders.length}</h3>
                                <span className="text-[#FF6B35] font-label-sm mb-1 font-bold">Delivery Partners</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-md mb-lg">
                        <div className="flex flex-1 min-w-[300px] items-center gap-sm">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40">search</span>
                                <input 
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2B2D42]/10 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent font-body-sm text-body-sm text-[#2B2D42] outline-none transition-all" 
                                    placeholder="Search by rider name, email or phone..." 
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

                    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(43,45,66,0.05)] overflow-hidden mb-lg">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#2B2D42]/5 border-b border-[#2B2D42]/10">
                                <tr>
                                    <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Rider Details</th>
                                    <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Phone Number</th>
                                    <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider">Approval Status</th>
                                    <th className="px-lg py-md font-label-sm text-label-sm text-[#2B2D42]/60 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2B2D42]/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-lg py-xl text-center text-gray-500">
                                            Loading riders...
                                        </td>
                                    </tr>
                                ) : filteredRiders.map(rider => {
                                    const isApproved = rider.is_approved !== false;
                                    return (
                                        <tr key={rider.id} className="hover:bg-[#FFF8F0] transition-colors group">
                                            <td className="px-lg py-md">
                                                <div className="flex items-center gap-sm">
                                                    <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center font-bold">
                                                        <span className="material-symbols-outlined">two_wheeler</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-label-md text-label-md text-[#2B2D42] font-bold">{rider.name}</p>
                                                        <p className="font-body-sm text-body-sm text-[#2B2D42]/60">{rider.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-lg py-md font-body-sm text-body-sm text-[#2B2D42]">{rider.phone || 'N/A'}</td>
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
                                                            onClick={() => handleApprove(rider.id)}
                                                            className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all cursor-pointer flex items-center gap-1"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                                            Approve Rider
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleReject(rider.id)}
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
                                {!loading && filteredRiders.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-lg py-xl text-center font-body-md text-[#2B2D42]/60">
                                            No riders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
