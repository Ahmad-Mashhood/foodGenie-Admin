import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../api';

/**
 * Shared tabs navigation bar for User & Restaurant Management section.
 * Pages: Customers (/management), Riders (/riders), Restaurants (/restaurants), Pending Approvals (/approvals)
 */
export default function ManagementTabs() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const [vendorsRes, ridersRes] = await Promise.allSettled([
          API.get('/api/admin/vendors'),
          API.get('/api/admin/riders')
        ]);
        let count = 0;
        if (vendorsRes.status === 'fulfilled' && Array.isArray(vendorsRes.value.data)) {
          count += vendorsRes.value.data.filter(v => !v.is_approved).length;
        }
        if (ridersRes.status === 'fulfilled' && Array.isArray(ridersRes.value.data)) {
          count += ridersRes.value.data.filter(r => !r.is_approved).length;
        }
        setPendingCount(count);
      } catch (err) {
        setPendingCount(0);
      }
    };
    fetchPendingCount();
  }, []);

  const tabs = [
    {
      to: '/management',
      label: 'Customers',
    },
    {
      to: '/riders',
      label: 'Riders',
    },
    {
      to: '/restaurants',
      label: 'Restaurants',
    },
    {
      to: '/approvals',
      label: 'Pending Approvals',
      badge: pendingCount,
    },
  ];

  return (
    <div className="flex items-center gap-xl border-b border-[#2B2D42]/10 mb-lg">
      {tabs.map((tab) => {
        const isActive = currentPath === tab.to;
        
        if (isActive) {
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="font-label-md text-label-md py-md text-[#FF6B35] active-tab-indicator flex items-center gap-xs border-b-2 border-[#FF6B35]"
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-1.5 py-0.5 bg-[#FF6B35] text-white rounded-full text-[10px] font-bold leading-none">
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        } else {
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="py-sm font-label-md text-label-md text-on-surface-variant opacity-60 hover:opacity-100 transition-colors flex items-center gap-xs border-b-2 border-transparent"
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-1.5 py-0.5 bg-secondary text-white rounded-full text-[10px] font-bold leading-none">
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        }
      })}
    </div>
  );
}
