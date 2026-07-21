import React from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';

export default function AdminDashboardDesktop() {
    return (
        <div className="text-on-surface">

<SidebarNav />

<div className="flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>

<TopNavBar title="Admin Dashboard" />

<main className="flex-1 p-margin space-y-lg">

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="bg-surface-container-lowest p-sm card-shadow rounded-xl border-l-4 border-primary-container flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Total Users</span>
<span className="material-symbols-outlined text-primary-container">groups</span>
</div>
<div className="mt-md">
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">12,482</h2>
<div className="flex items-center gap-xs mt-xs">
<span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
<span className="font-label-sm text-label-sm text-green-600">+12% from last month</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-sm card-shadow rounded-xl border-l-4 border-tertiary flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Active Restaurants</span>
<span className="material-symbols-outlined text-tertiary">restaurant</span>
</div>
<div className="mt-md">
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">843</h2>
<div className="flex items-center gap-xs mt-xs">
<span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
<span className="font-label-sm text-label-sm text-green-600">+4 new today</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-sm card-shadow rounded-xl border-l-4 border-secondary flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Orders Today</span>
<span className="material-symbols-outlined text-secondary">shopping_bag</span>
</div>
<div className="mt-md">
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">2,105</h2>
<div className="flex items-center gap-xs mt-xs">
<span className="material-symbols-outlined text-secondary text-sm">trending_down</span>
<span className="font-label-sm text-label-sm text-secondary">-3% vs yesterday</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-sm card-shadow rounded-xl border-l-4 border-on-secondary-fixed-variant flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Platform Revenue</span>
<span className="material-symbols-outlined text-on-secondary-fixed-variant">payments</span>
</div>
<div className="mt-md">
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">$45,290</h2>
<div className="flex items-center gap-xs mt-xs">
<span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
<span className="font-label-sm text-label-sm text-green-600">+22% monthly growth</span>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-1 xl:grid-cols-2 gap-gutter">

<div className="bg-surface-container-lowest card-shadow rounded-xl p-lg flex flex-col">
<div className="flex justify-between items-center mb-lg">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Activity</h3>
<button className="text-primary font-label-md text-label-md hover:underline">View All</button>
</div>
<div className="space-y-md overflow-y-auto max-h-[500px] pr-xs">

<div className="flex items-center gap-md p-sm hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/30">
<div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container">local_shipping</span>
</div>
<div className="flex-1">
<p className="font-body-md text-body-md font-semibold text-on-surface">Order #FG-9231 Delivered</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Golden Dragon Express â€¢ 2 mins ago</p>
</div>
<span className="font-label-md text-label-md text-on-primary-container bg-primary-fixed px-sm py-base rounded-full">Completed</span>
</div>

<div className="flex items-center gap-md p-sm hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/30">
<div className="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">person_add</span>
</div>
<div className="flex-1">
<p className="font-body-md text-body-md font-semibold text-on-surface">New Restaurant Partner</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Pizzeria Roma â€¢ 15 mins ago</p>
</div>
<span className="font-label-md text-label-md text-tertiary bg-tertiary-fixed px-sm py-base rounded-full">Pending Approval</span>
</div>

<div className="flex items-center gap-md p-sm hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/30">
<div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">report</span>
</div>
<div className="flex-1">
<p className="font-body-md text-body-md font-semibold text-on-surface">Customer Complaint #C-102</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Refund requested for cold food â€¢ 1 hour ago</p>
</div>
<span className="font-label-md text-label-md text-white bg-secondary px-sm py-base rounded-full">Urgent</span>
</div>

<div className="flex items-center gap-md p-sm hover:bg-surface-container-low transition-colors rounded-lg border border-transparent hover:border-outline-variant/30">
<div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container">receipt_long</span>
</div>
<div className="flex-1">
<p className="font-body-md text-body-md font-semibold text-on-surface">Order #FG-9245 Placed</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Burger King â€¢ 1.5 hours ago</p>
</div>
<span className="font-label-md text-label-md text-on-primary-container bg-primary-fixed px-sm py-base rounded-full">In Preparation</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest card-shadow rounded-xl p-lg flex flex-col">
<div className="flex justify-between items-center mb-lg">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Top Performance</h3>
<div className="flex gap-xs">
<button className="px-md py-xs rounded-full text-primary border border-primary font-label-sm text-label-sm bg-surface-container active:scale-95 transition-all">Today</button>
<button className="px-md py-xs rounded-full text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container transition-all">This Week</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="border-b border-surface-variant">
<th className="pb-md font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Restaurant</th>
<th className="pb-md font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Orders</th>
<th className="pb-md font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Rating</th>
<th className="pb-md font-label-sm text-label-sm text-on-surface-variant opacity-60 uppercase tracking-wider">Revenue</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant/30">
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
<td className="py-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-lg bg-surface-variant overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A stylized minimalist icon for a high-end sushi restaurant called 'Sushi Zen'. The image features a single, clean salmon nigiri roll on a clean ceramic plate, captured from a top-down angle. The color palette is modern, featuring vibrant salmon pink and stark charcoal, perfectly fitting a professional SaaS restaurant portal." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYa1GXIsQjIIu9S8Dcz_3qSuiJ6Lt0Aj4X9FAOxOHS7g9eZ0HUx_Q9gjt-fI8Y5hh1phAs3sWl7emJFOuMziMbavx8XUfQSgc2YdEHxCc1fWYymYMk1UByIy3eD6Zq37Gbl_wB9auJoCCROkI9zryjGNRrImOGSwe3d3jAJMQ1HMdP0Bw4raiSctzcrf4mIhFDwQFO88z1qYQNJbmek8b9OoFy80NxRmkX6k2kJPuRmlrSHXarhuAXl-uH6Jl-ipKn8YZuTCBGq2av" />
</div>
<span className="font-body-md text-body-md font-semibold text-on-surface">Sushi Zen</span>
</div>
</td>
<td className="py-md font-body-sm text-body-sm text-on-surface">142</td>
<td className="py-md">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-primary-container text-sm" style={{}}>star</span>
<span className="font-body-sm text-body-sm font-medium">4.9</span>
</div>
</td>
<td className="py-md font-label-md text-label-md text-on-surface-variant font-bold">$2,840</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
<td className="py-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-lg bg-surface-variant overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A graphic logo for an Italian pizzeria, 'Pasta Bella', showing a wood-fired oven and a single sprig of basil. The design is rustic yet refined, using warm orange and olive green tones to maintain a professional SaaS look while communicating a warm culinary theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu2OM99VRmt4dAPUUC-wNNLyLcJVWk3nLFl0W8Q0_YQ3TMzJES3qW8OZ1-j-yf9f81J8HkzINVjgaSFPQmq73P9wGCsIj_DR4mUKS8hANjZ0TwvIab2ZasE8bp_dIyk0iNlw5Rv_l7Lxk7JLhkMAh_9S9-e8FvBuKDurk8t5Iy4MJ4Al_fyduWjrXaIS1dMZ7YifECaY0pM0UJO4MA3dcMxaO2LF0sQdmeQdo1Pgldp0VE99JQETwP7r_vAwiF1rIb_tvpVSjwfu47" />
</div>
<span className="font-body-md text-body-md font-semibold text-on-surface">Pasta Bella</span>
</div>
</td>
<td className="py-md font-body-sm text-body-sm text-on-surface">118</td>
<td className="py-md">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-primary-container text-sm" style={{}}>star</span>
<span className="font-body-sm text-body-sm font-medium">4.7</span>
</div>
</td>
<td className="py-md font-label-md text-label-md text-on-surface-variant font-bold">$1,950</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
<td className="py-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-lg bg-surface-variant overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A minimal and modern logo for a fast-food burger joint named 'Urban Grill'. The visual features a sleek, geometric burger icon with warm yellow and bold red colors against a clean white background. This design is part of a high-end food management dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4l1V7rr3EC3KKDGsogS95X7XJAyB7PZoao8QF9Zld7zUgfbJ_nh_ZU7vRWibTIZDMxqTBmuz8OTn7T54ziybutBoPhHiC59d-Wctu56MJ7sTJLZfIeVNhQwTwAqLAscd0HaJirkd1ukAv6H3qGF7jl47GUaJMnWjOOIYqrtz03SB97uVHtGC7ultnJ7U8eDHOApjyLL3OPKgG_BElzrSuEo0_It6AqOBOION-FX6qASbtoFSBRZecMloknCtGhe2w6kUqb0W_qqGQ" />
</div>
<span className="font-body-md text-body-md font-semibold text-on-surface">Urban Grill</span>
</div>
</td>
<td className="py-md font-body-sm text-body-sm text-on-surface">94</td>
<td className="py-md">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-primary-container text-sm" style={{}}>star_half</span>
<span className="font-body-sm text-body-sm font-medium">4.4</span>
</div>
</td>
<td className="py-md font-label-md text-label-md text-on-surface-variant font-bold">$1,420</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
<td className="py-md">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-lg bg-surface-variant overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A professional food icon representing 'Green Leaf Salads', featuring a fresh, artistic salad bowl icon in vibrant greens and zesty lemon yellows. The image is designed with a high-key light mode aesthetic for a SaaS administrative dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgeoT9nAGx6Lxl719tup61bKjdBx6FPR2UKvg1a3IHtaMQcAzUZDLvMzxKhhQfbPvkCda0kubA2vuWfsP0ajWZ1A8pQfDh5YcD9Hz1FiaYx-OAihDSptb2yX-ZP5GhiS2NYXNMoXMCtDc7dgYd809RtExdfxMNKLJD0SoOmckkqnUDca3njOElWYkpVpb0HblMVViXmQMSMHduPVgo8VlGXTPW6O9Q-tTrBB2vuxnSozfM1nNIXpr3HKhyeySrgjNMx3yDwkiSoY5n" />
</div>
<span className="font-body-md text-body-md font-semibold text-on-surface">Green Leaf Salads</span>
</div>
</td>
<td className="py-md font-body-sm text-body-sm text-on-surface">82</td>
<td className="py-md">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-primary-container text-sm" style={{}}>star</span>
<span className="font-body-sm text-body-sm font-medium">4.8</span>
</div>
</td>
<td className="py-md font-label-md text-label-md text-on-surface-variant font-bold">$1,280</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
</main>
</div>





</div>
    );
}



