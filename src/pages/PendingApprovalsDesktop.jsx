import React, { useState, useEffect } from 'react';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import ManagementTabs from '../components/ManagementTabs';
import API from '../api';

export default function PendingApprovalsDesktop() {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVendors = async () => {
        setLoading(true);
        try {
            const res = await API.get('/api/admin/vendors');
            setVendors(res.data || []);
        } catch (err) {
            console.error('Failed to load vendors', err);
            setVendors([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    const handleApprove = async (vendorId) => {
        try {
            await API.patch(`/api/admin/vendors/${vendorId}/approve`);
            fetchVendors();
        } catch (err) {
            alert('Failed to approve vendor: ' + (err.response?.data?.detail || err.message));
        }
    };

    const handleReject = async (vendorId) => {
        try {
            await API.patch(`/api/admin/vendors/${vendorId}/reject`);
            fetchVendors();
        } catch (err) {
            alert('Failed to reject vendor: ' + (err.response?.data?.detail || err.message));
        }
    };

    const pendingVendors = vendors.filter(v => !v.is_approved);
    const approvedCount = vendors.filter(v => v.is_approved).length;

    return (
        <div className="text-on-surface">
            <SidebarNav />

            <main className="min-h-screen flex flex-col" style={{ marginLeft: '260px' }}>
                <TopNavBar title="User & Restaurant Management" />

                <div className="px-margin mb-lg">
                    <ManagementTabs />
                </div>

                <div className="px-margin flex-1 pb-xl">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                        <div className="bg-white p-lg rounded-xl custom-shadow accent-strip border-l-[#FFB703]">
                            <div className="flex justify-between items-start mb-sm">
                                <p className="font-label-md text-on-surface-variant/70 uppercase tracking-wider">Pending Applications</p>
                                <span className="material-symbols-outlined text-[#FFB703]">pending_actions</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <p className="font-display-lg text-[32px] leading-none font-bold text-[#2B2D42]">{pendingVendors.length}</p>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow accent-strip border-l-emerald-500">
                            <div className="flex justify-between items-start mb-sm">
                                <p className="font-label-md text-on-surface-variant/70 uppercase tracking-wider">Approved Restaurants</p>
                                <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <p className="font-display-lg text-[32px] leading-none font-bold text-[#2B2D42]">{approvedCount}</p>
                            </div>
                        </div>

                        <div className="bg-white p-lg rounded-xl custom-shadow accent-strip border-l-[#FF6B35]">
                            <div className="flex justify-between items-start mb-sm">
                                <p className="font-label-md text-on-surface-variant/70 uppercase tracking-wider">Total Registered</p>
                                <span className="material-symbols-outlined text-[#FF6B35]">storefront</span>
                            </div>
                            <div className="flex items-end gap-xs">
                                <p className="font-display-lg text-[32px] leading-none font-bold text-[#2B2D42]">{vendors.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Pending Vendors Cards */}
                    <div className="mb-md flex items-center justify-between">
                        <h2 className="font-headline-md text-headline-md text-[#2B2D42]">Pending Applications ({pendingVendors.length})</h2>
                    </div>

                    {loading ? (
                        <div className="py-12 text-center text-gray-500">
                            <div className="w-8 h-8 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                            <p className="text-sm">Loading applications...</p>
                        </div>
                    ) : pendingVendors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                            {pendingVendors.map(vendor => (
                                <div key={vendor.id} className="bg-white rounded-xl custom-shadow overflow-hidden flex flex-col border border-white hover:border-[#FF6B35]/20 transition-all">
                                    <div className="p-lg flex gap-md">
                                        <div className="w-16 h-16 rounded-xl bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-3xl">storefront</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-headline-sm text-headline-sm text-[#2B2D42] truncate">{vendor.name}</h3>
                                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{vendor.email}</p>
                                                </div>
                                                <span className="bg-[#FFB703]/20 text-[#ab7500] font-label-md px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                    {vendor.category || 'Restaurant'}
                                                </span>
                                            </div>
                                            <div className="mt-sm flex items-center gap-md text-on-surface-variant/70 font-body-sm text-xs">
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">location_on</span> {vendor.city || 'Vehari'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">call</span> {vendor.phone || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-lg pb-md pt-md border-t border-dashed border-outline-variant/40 mt-auto flex gap-md">
                                        <button
                                            onClick={() => handleApprove(vendor.id)}
                                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-label-md py-2.5 rounded-lg shadow-sm active:scale-[0.98] transition-all font-bold text-xs cursor-pointer flex items-center justify-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            Approve Restaurant
                                        </button>
                                        <button
                                            onClick={() => handleReject(vendor.id)}
                                            className="flex-1 border-2 border-[#E63946] text-[#E63946] hover:bg-[#E63946]/10 font-label-md py-2.5 rounded-lg active:scale-[0.98] transition-all font-bold text-xs cursor-pointer flex items-center justify-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">cancel</span>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm space-y-3">
                            <span className="material-symbols-outlined text-5xl text-gray-300">verified</span>
                            <h3 className="text-lg font-bold text-[#2B2D42]">No Pending Approvals</h3>
                            <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                All restaurant partner applications have been reviewed. New signup requests will appear here for your approval.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
