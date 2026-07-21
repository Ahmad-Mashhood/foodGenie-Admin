const fs = require('fs');
const path = require('path');

const dir = 'C:/foodGennie/admin-app/src/pages';

// Maps filename -> which tab is active
const pageActiveTab = {
  'OrderMonitoringDesktop.jsx':          '/orders',
  'OrderMonitoringPendingReverted.jsx':  '/orders/pending-reverted',
  'OrderMonitoringPreparing.jsx':        '/orders/preparing',
  'OrderMonitoringOutForDelivery.jsx':   '/orders/out-for-delivery',
  'OrderMonitoringOnTheWay.jsx':         '/orders/on-the-way',
  'OrderMonitoringDelivered.jsx':        '/orders/delivered',
  'OrderMonitoringCancelled.jsx':        '/orders/cancelled',
};

const tabs = [
  { label: 'All Orders',       to: '/orders' },
  { label: 'Pending',          to: '/orders/pending-reverted' },
  { label: 'Preparing',        to: '/orders/preparing' },
  { label: 'Out for Delivery', to: '/orders/out-for-delivery' },
  { label: 'On the Way',       to: '/orders/on-the-way' },
  { label: 'Delivered',        to: '/orders/delivered' },
  { label: 'Cancelled',        to: '/orders/cancelled' },
];

const ACTIVE_CLASS   = `px-md py-xs rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm transition-all active:scale-95`;
const INACTIVE_CLASS = `px-md py-xs rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed transition-colors font-label-sm text-label-sm`;

function buildTabsBlock(activeRoute) {
  const links = tabs.map(tab => {
    const cls = tab.to === activeRoute ? ACTIVE_CLASS : INACTIVE_CLASS;
    return `<Link to="${tab.to}" className="${cls}">${tab.label}</Link>`;
  }).join('\n');

  return `<div className="flex flex-wrap items-center justify-between gap-md">
<div className="flex flex-wrap items-center gap-xs">
${links}
</div>
<div className="flex items-center gap-sm">
<span className="font-body-sm text-body-sm text-on-surface-variant opacity-70">Advanced Filters</span>
<button className="flex items-center gap-xs px-md py-xs bg-surface-container-lowest border border-outline-variant text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filters
                    </button>
</div>
</div>`;
}

// Canonical header block for order monitoring pages
const CANONICAL_HEADER = `<header className="sticky top-0 z-30 bg-surface shadow-sm h-16 flex justify-between items-center px-gutter lg:w-[calc(100%-260px)]">
<div className="flex items-center gap-md">
<button className="lg:hidden p-xs">
<span className="material-symbols-outlined">menu</span>
</button>
<h2 className="font-headline-sm text-headline-sm font-extrabold text-primary">Order Monitoring</h2>
<div className="flex items-center gap-xs ml-base">
<span className="w-2.5 h-2.5 bg-green-500 rounded-full pulse-green"></span>
<span className="font-label-sm text-label-sm text-green-600 font-bold tracking-widest uppercase">Live</span>
</div>
</div>
<div className="flex items-center gap-md">
<div className="hidden md:flex items-center bg-surface-container-low px-sm py-xs rounded-lg border border-outline-variant/30">
<span className="material-symbols-outlined text-outline text-[18px] mr-xs">search</span>
<input className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm p-0 w-48" placeholder="Quick search..." type="text" />
</div>
<Link to="/notifications" className="relative p-xs hover:bg-surface-container-low rounded-full transition-colors">
<span className="material-symbols-outlined text-primary">notifications</span>
<span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
</Link>
</div>
</header>`;

// Canonical sidebar for order monitoring pages
function buildSidebar() {
  return `<aside className="fixed h-screen w-sidebar-width left-0 top-0 hidden lg:flex flex-col z-40 bg-on-background dark:bg-on-background shadow-md">
<div className="px-lg py-xl">
<h1 className="font-headline-md text-headline-md font-bold text-primary-container">Food Genie</h1>
</div>
<div className="px-lg pb-xl border-b border-surface-variant/10 mb-md">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed">
<img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChqFL7YM88Ozz4iyg55_ATAosNycRyjT80J2q2voiUpfU08-h3EmQXs7o_yLIkHNPwOnTTSM0GU0v30g_s6eNzUQhkVZRas0zSI_4jwTQWxIJBFl5da5nUFifUh8lqcZv2eNRXngIHTPqtqkCfLBd7T6rvTJEEzjqWQoygjrBT_weEN15eWi7HQjp2NZpSI0oD4SDghZn_AoDwAYl8aRvhM0_43l3HJ6kcg9rzLQ68Y_Tkvv9SYJvsETF4hlon-43LEGK22QcleUd5" alt="Admin" />
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-primary-fixed">Super Admin</span>
<span className="font-body-sm text-body-sm text-surface-container-highest/60">Food Genie Admin</span>
</div>
</div>
</div>
<nav className="flex-1 py-lg space-y-xs">
<Link to="/" className="flex items-center px-lg py-sm text-surface-container-highest opacity-70 hover:bg-primary/20 hover:opacity-100 transition-all duration-200 cursor-pointer active:scale-95">
<span className="material-symbols-outlined mr-md">dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</Link>
<Link to="/management" className="flex items-center px-lg py-sm text-surface-container-highest opacity-70 hover:bg-primary/20 hover:opacity-100 transition-all duration-200 cursor-pointer active:scale-95">
<span className="material-symbols-outlined mr-md">storefront</span>
<span className="font-label-md text-label-md">User &amp; Restaurant Management</span>
</Link>
<Link to="/orders" className="flex items-center px-lg py-sm bg-primary text-on-primary border-l-4 border-primary-container rounded-r-lg cursor-pointer active:scale-95 transition-all duration-200">
<span className="material-symbols-outlined mr-md">monitoring</span>
<span className="font-label-md text-label-md">Order Monitoring</span>
</Link>
</nav>
<div className="mt-auto py-lg">
<div className="flex items-center px-lg py-sm text-surface-container-highest opacity-70 hover:bg-secondary/20 hover:text-secondary-fixed transition-all duration-200 cursor-pointer active:scale-95">
<span className="material-symbols-outlined mr-sm">logout</span>
<span className="font-label-md text-label-md">Logout</span>
</div>
</div>
</aside>`;
}

Object.entries(pageActiveTab).forEach(([filename, activeRoute]) => {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping (not found): ' + filename);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Ensure import React and Link are present
  if (!content.includes("import React")) {
    content = "import React from 'react';\n" + content;
  }
  if (!content.includes("import { Link }") && !content.includes("import {Link}")) {
    content = content.replace("import React from 'react';", "import React from 'react';\nimport { Link } from 'react-router-dom';");
  }

  // Get the existing component function name
  const funcMatch = content.match(/export default function (\w+)/);
  const funcName = funcMatch ? funcMatch[1] : filename.replace('.jsx','');

  // Build the new full page content preserving the main content area
  // We need to extract the existing main content (the tables/cards) and wrap them with canonical structure
  // Strategy: find the content between the first <section or <div inside <main and the closing </main>
  
  // Extract everything inside main that comes after the tab bar
  // Look for the stats/table section - everything after the filter bar
  let mainContent = '';
  
  // Try to find content after the tab area
  // For pages that have their own unique content sections (stat cards, tables), preserve them
  const sectionMatch = content.match(/<div className="grid[^"]*grid-cols[^"]*gap[^>]*>([\s\S]*?)<\/section>/);
  const tableMatch = content.match(/<div className="[^"]*rounded-xl[^"]*shadow[^>]*>([\s\S]*)/);
  
  // Just grab everything after the outer wrapper opening tag until end of component return
  // Find the inner body: everything inside the top-level div of the component
  const returnMatch = content.match(/return \(\s*<div[^>]*>([\s\S]*)<\/div>\s*\);\s*\}/s);
  
  if (!returnMatch) {
    console.log('Could not parse: ' + filename);
    return;
  }
  
  const innerContent = returnMatch[1];
  
  // Try to extract main section content - everything after the first </header> that isn't sidebar/aside
  const mainSectionMatch = innerContent.match(/<main[^>]*>([\s\S]*)<\/main>/);
  
  let preservedMainContent = '';
  if (mainSectionMatch) {
    const mainInner = mainSectionMatch[1];
    // Remove header
    const afterHeader = mainInner.replace(/<header[\s\S]*?<\/header>/, '').trim();
    // Remove the old tab bar (any div containing filter/tab Links to /orders routes)
    // Keep everything from the stats grid onward
    const statsStart = afterHeader.search(/<section|<div className="grid|<div className="p-gutter|<div className="flex flex-col gap-lg/);
    if (statsStart > -1) {
      preservedMainContent = afterHeader.substring(statsStart).trim();
      // Remove closing </main> if it ended up included
      preservedMainContent = preservedMainContent.replace(/<\/main>\s*$/, '').trim();
    } else {
      preservedMainContent = afterHeader;
    }
  } else {
    // No <main> tag - just use everything after </aside>
    const afterAside = innerContent.replace(/<aside[\s\S]*?<\/aside>/, '').trim();
    // Remove header
    const afterHeader = afterAside.replace(/<header[\s\S]*?<\/header>/, '').trim();
    preservedMainContent = afterHeader;
  }

  const sidebar = buildSidebar();
  const header = CANONICAL_HEADER;
  const tabsBlock = buildTabsBlock(activeRoute);

  const newContent = `import React from 'react';
import { Link } from 'react-router-dom';

export default function ${funcName}() {
    return (
        <div className="bg-background font-body-md text-on-surface min-h-screen overflow-x-hidden">

${sidebar}

<div className="lg:ml-sidebar-width flex flex-col min-h-screen">

${header}

<section className="p-gutter flex flex-col gap-lg flex-1">

${tabsBlock}

${preservedMainContent}

</section>

</div>

</div>
    );
}
`;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('✓ Updated: ' + filename);
});

console.log('\nAll done!');
