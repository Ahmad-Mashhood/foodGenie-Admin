import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    return (
        <div className="text-on-surface">


<SidebarNav />

<main className="min-h-screen flex flex-col" style={{ marginLeft: '260px' }}>

<TopNavBar title="User & Restaurant Management" />

<div className="px-margin mb-lg">
<ManagementTabs />
</div>

<div className="px-margin flex-1 pb-xl">

<div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
<div className="bg-white p-lg rounded-xl custom-shadow accent-strip border-l-[#FF6B35]">
<div className="flex justify-between items-start mb-sm">
<p className="font-label-md text-on-surface-variant/70 uppercase tracking-wider">Average Review Time</p>
<span className="material-symbols-outlined text-[#FF6B35]">timer</span>
</div>
<div className="flex items-end gap-xs">
<p className="font-display-lg text-[32px] leading-none font-bold text-[#2B2D42]">4.2h</p>
<span className="font-label-sm text-emerald-600 mb-1 flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_downward</span> 12%</span>
</div>
</div>
<div className="bg-white p-lg rounded-xl custom-shadow accent-strip border-l-[#FFB703]">
<div className="flex justify-between items-start mb-sm">
<p className="font-label-md text-on-surface-variant/70 uppercase tracking-wider">Applications Today</p>
<span className="material-symbols-outlined text-[#FFB703]">pending_actions</span>
</div>
<div className="flex items-end gap-xs">
<p className="font-display-lg text-[32px] leading-none font-bold text-[#2B2D42]">24</p>
<span className="font-label-sm text-emerald-600 mb-1 flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 8%</span>
</div>
</div>
<div className="bg-white p-lg rounded-xl custom-shadow accent-strip border-l-[#E63946]">
<div className="flex justify-between items-start mb-sm">
<p className="font-label-md text-on-surface-variant/70 uppercase tracking-wider">Rejection Rate</p>
<span className="material-symbols-outlined text-[#E63946]">cancel</span>
</div>
<div className="flex items-end gap-xs">
<p className="font-display-lg text-[32px] leading-none font-bold text-[#2B2D42]">15.4%</p>
<span className="font-label-sm text-[#E63946] mb-1 flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 2.1%</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-xl">

<div className="bg-white rounded-xl custom-shadow overflow-hidden flex flex-col border border-white hover:border-primary/20 transition-all group">
<div className="p-lg flex gap-md">
<div className="w-20 h-20 rounded-xl bg-[#FFB703] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-4xl text-white">restaurant</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<div>
<h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">The Golden Wok</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Owner: Jonathan Chen</p>
</div>
<span className="bg-surface-container-high text-primary font-label-md px-sm py-1 rounded-full">Asian Fusion</span>
</div>
<div className="mt-sm flex items-center gap-md text-on-surface-variant/70 font-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> San Francisco</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> 2 hours ago</span>
</div>
</div>
</div>
<div className="px-lg pb-md border-t border-dashed border-outline-variant/40 mt-auto">
<details className="group/details">
<summary className="list-none cursor-pointer py-md text-primary font-label-md flex justify-center items-center gap-2 select-none">
                                View Application Details
                                <span className="material-symbols-outlined transition-transform group-open/details:rotate-180">expand_more</span>
</summary>
<div className="pb-md grid grid-cols-3 gap-md">
<div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/10">
<p className="font-label-sm text-label-sm opacity-60 mb-1 uppercase">Documents</p>
<div className="flex flex-col gap-1">
<Link className="text-primary font-label-sm flex items-center gap-1 hover:underline" to="#"><span className="material-symbols-outlined text-[14px]">description</span> Business_License.pdf</Link>
<Link className="text-primary font-label-sm flex items-center gap-1 hover:underline" to="#"><span className="material-symbols-outlined text-[14px]">description</span> Health_Cert.pdf</Link>
</div>
</div>
<div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/10">
<p className="font-label-sm text-label-sm opacity-60 mb-1 uppercase">Contact</p>
<p className="font-body-sm text-body-sm">+1 (555) 012-3456</p>
<p className="font-body-sm text-body-sm break-all">j.chen@goldenwok.com</p>
</div>
<div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/10">
<p className="font-label-sm text-label-sm opacity-60 mb-1 uppercase">Menu Preview</p>
<div className="flex gap-1 overflow-x-auto no-scrollbar">
<div className="w-8 h-8 rounded bg-surface-variant shrink-0"></div>
<div className="w-8 h-8 rounded bg-surface-variant shrink-0"></div>
<div className="w-8 h-8 rounded bg-surface-variant shrink-0"></div>
</div>
</div>
</div>
</details>
<div className="flex gap-md py-base">
<button className="flex-1 bg-primary-container text-white font-label-md py-sm rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all">Approve</button>
<button className="flex-1 border-2 border-[#E63946] text-[#E63946] font-label-md py-sm rounded-lg hover:bg-[#E63946]/5 active:scale-[0.98] transition-all">Reject</button>
</div>
</div>
</div>

<div className="bg-white rounded-xl custom-shadow overflow-hidden flex flex-col border border-white hover:border-primary/20 transition-all group">
<div className="p-lg flex gap-md">
<div className="w-20 h-20 rounded-xl bg-[#FFB703] flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-4xl text-white" style={{}}>bia</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<div>
<h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">Bella Napoli Pizza</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Owner: Maria Rossini</p>
</div>
<span className="bg-surface-container-high text-primary font-label-md px-sm py-1 rounded-full">Italian</span>
</div>
<div className="mt-sm flex items-center gap-md text-on-surface-variant/70 font-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> New York</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> 5 hours ago</span>
</div>
</div>
</div>
<div className="px-lg pb-md border-t border-dashed border-outline-variant/40 mt-auto">
<details className="group/details">
<summary className="list-none cursor-pointer py-md text-primary font-label-md flex justify-center items-center gap-2 select-none">
                                View Application Details
                                <span className="material-symbols-outlined transition-transform group-open/details:rotate-180">expand_more</span>
</summary>
<div className="pb-md grid grid-cols-3 gap-md">
<div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/10">
<p className="font-label-sm text-label-sm opacity-60 mb-1 uppercase">Documents</p>
<div className="flex flex-col gap-1">
<button className="text-primary font-label-sm flex items-center gap-1 hover:underline" to="#"><span className="material-symbols-outlined text-[14px]">description</span> EIN_Form.pdf</button>
</div>
</div>
<div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/10">
<p className="font-label-sm text-label-sm opacity-60 mb-1 uppercase">Contact</p>
<p className="font-body-sm text-body-sm">+1 (555) 987-6543</p>
<p className="font-body-sm text-body-sm break-all">contact@bellanapoli.com</p>
</div>
<div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/10">
<p className="font-label-sm text-label-sm opacity-60 mb-1 uppercase">Menu Preview</p>
<div className="flex gap-1 overflow-x-auto no-scrollbar">
<div className="w-8 h-8 rounded bg-surface-variant shrink-0"></div>
<div className="w-8 h-8 rounded bg-surface-variant shrink-0"></div>
</div>
</div>
</div>
</details>
<div className="flex gap-md py-base">
<button className="flex-1 bg-primary-container text-white font-label-md py-sm rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all">Approve</button>
<button className="flex-1 border-2 border-[#E63946] text-[#E63946] font-label-md py-sm rounded-lg hover:bg-[#E63946]/5 active:scale-[0.98] transition-all">Reject</button>
</div>
</div>
</div>
</div>

<section className="flex flex-col items-center justify-center py-xl bg-white/40 rounded-3xl border border-dashed border-outline-variant/50 mb-xl">
<div className="w-32 h-32 mb-lg opacity-30">
<span className="material-symbols-outlined text-[128px] text-on-surface-variant">inbox</span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface-variant/80">No more pending approvals</h4>
<p className="font-body-md text-body-md text-on-surface-variant/60 mt-xs">Check back later for new applications.</p>
<button className="mt-lg flex items-center gap-xs text-primary font-label-md hover:underline">
<span className="material-symbols-outlined text-[18px]">refresh</span> Refresh List
                </button>
</section>
</div>
</main>


</div>
    );
}




