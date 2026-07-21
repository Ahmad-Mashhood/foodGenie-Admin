import React from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';

export default function NotificationsDesktop() {
    return (
        <div className="overflow-x-hidden">


<SidebarNav />

<main className="min-h-screen flex flex-col" style={{ marginLeft: '260px' }}>

<TopNavBar title="Notifications" />

<div className="px-margin py-lg flex-1">

<div className="flex justify-between items-end mb-xl">
<div>
<h2 className="font-headline-lg text-headline-lg text-brand-dark">Notifications</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Stay updated with the latest activity across the portal.</p>
</div>
<button className="px-md py-xs border-2 border-brand-orange text-brand-orange font-label-md text-label-md rounded-lg hover:bg-brand-orange hover:text-white transition-all active:scale-95">
                    Mark All as Read
                </button>
</div>

<div className="flex gap-sm mb-lg overflow-x-auto pb-2 scrollbar-hide">
<button className="px-lg py-xs border-2 border-brand-dark/20 text-brand-dark rounded-full font-label-md text-label-md hover:border-brand-dark transition-all active:scale-95">All</button>
<button className="px-lg py-xs border-2 border-brand-dark/20 text-brand-dark rounded-full font-label-md text-label-md hover:border-brand-dark transition-all active:scale-95">Orders</button>
<button to="/restaurants" className="px-lg py-xs border-2 border-brand-dark/20 text-brand-dark rounded-full font-label-md text-label-md hover:border-brand-dark transition-all active:scale-95">Restaurants</button>
<button className="px-lg py-xs border-2 border-brand-dark/20 text-brand-dark rounded-full font-label-md text-label-md hover:border-brand-dark transition-all active:scale-95">Complaints</button>
<button className="px-lg py-xs border-2 border-brand-dark/20 text-brand-dark rounded-full font-label-md text-label-md hover:border-brand-dark transition-all active:scale-95">System</button>
</div>

<div className="space-y-md">

<div className="notification-card bg-brand-cream border-l-4 border-brand-orange rounded-xl shadow-sm p-md flex items-center gap-md group">
<div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red flex-shrink-0">
<span className="material-symbols-outlined" style={{}}>report</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-xs mb-1">
<span className="font-label-md text-label-md text-brand-dark">Urgent Complaint #C-102</span>
<span className="px-2 py-0.5 bg-brand-red text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Urgent</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Customer reported missing items from Order #FG-9210. Immediate intervention required.</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-1">2 mins ago</p>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>

<div className="notification-card bg-white border-l-4 border-brand-orange rounded-xl shadow-sm p-md flex items-center gap-md group">
<div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow flex-shrink-0">
<span className="material-symbols-outlined" style={{}}>store</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-xs mb-1">
<span className="font-label-md text-label-md text-brand-dark">New Restaurant Partner Request</span>
<span className="px-2 py-0.5 bg-brand-yellow text-brand-dark text-[10px] font-bold rounded-full uppercase tracking-wider">Pending Approval</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">'The Sizzling Grill' has submitted their business credentials for verification.</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-1">15 mins ago</p>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>

<div className="notification-card bg-white rounded-xl shadow-sm p-md flex items-center gap-md group opacity-80 hover:opacity-100">
<div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
<span className="material-symbols-outlined">check_circle</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-xs mb-1">
<span className="font-label-md text-label-md text-brand-dark">Order #FG-9231 Delivered</span>
<span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Completed</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Order has been successfully picked up and delivered to the customer.</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-1">1 hour ago</p>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>

<div className="notification-card bg-white rounded-xl shadow-sm p-md flex items-center gap-md group opacity-80 hover:opacity-100">
<div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
<span className="material-symbols-outlined">update</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-xs mb-1">
<span className="font-label-md text-label-md text-brand-dark">System Update</span>
<span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-wider">System</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Scheduled maintenance completed successfully for the dispatching algorithm.</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-1">3 hours ago</p>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>

<div className="notification-card bg-white rounded-xl shadow-sm p-md flex items-center gap-md group opacity-80 hover:opacity-100">
<div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
<span className="material-symbols-outlined">restaurant</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-xs mb-1">
<span className="font-label-md text-label-md text-brand-dark">New Order #FG-9245</span>
<span className="px-2 py-0.5 bg-brand-orange/20 text-brand-orange text-[10px] font-bold rounded-full uppercase tracking-wider">In Preparation</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Sushi Zen has accepted the order and started preparing the meal.</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-1">5 hours ago</p>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>

<div className="notification-card bg-white rounded-xl shadow-sm p-md flex items-center gap-md group opacity-80 hover:opacity-100">
<div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow flex-shrink-0">
<span className="material-symbols-outlined" style={{}}>verified</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-xs mb-1">
<span className="font-label-md text-label-md text-brand-dark">Restaurant Approval</span>
<span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Completed</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">'Pasta Paradiso' has been successfully onboarded to the platform.</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-1">Yesterday</p>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>

<div className="flex justify-center mt-xl">
<button className="flex items-center gap-xs px-xl py-md border-2 border-brand-orange text-brand-orange font-label-md text-label-md rounded-lg hover:bg-brand-orange hover:text-white transition-all active:scale-95">
<span className="material-symbols-outlined">expand_more</span>
                    Load More Notifications
                </button>
</div>
</div>

<div className="mt-auto py-lg px-margin opacity-30 pointer-events-none select-none">
<div className="flex justify-between items-center text-on-surface-variant/40">
<p className="font-label-sm text-label-sm">Â© 2024 Food Genie Tech Operations</p>
<div className="flex gap-md">
<div className="w-8 h-1 bg-brand-orange rounded-full"></div>
<div className="w-8 h-1 bg-brand-yellow rounded-full"></div>
<div className="w-8 h-1 bg-brand-red rounded-full"></div>
</div>
</div>
</div>
</main>






</div>
    );
}




