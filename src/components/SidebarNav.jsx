import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  {
    to: '/',
    icon: 'dashboard',
    label: 'Dashboard',
    // exact match only for root
    matchExact: true,
  },
  {
    to: '/management',
    icon: 'storefront',
    label: 'User & Restaurant Management',
    // also active for sub-routes like /riders, /restaurants, /approvals
    matchPrefixes: ['/management', '/riders', '/restaurants', '/approvals'],
  },
  {
    to: '/orders',
    icon: 'monitoring',
    label: 'Order Monitoring',
    matchPrefixes: ['/orders'],
  },
];

const DEFAULT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuChqFL7YM88Ozz4iyg55_ATAosNycRyjT80J2q2voiUpfU08-h3EmQXs7o_yLIkHNPwOnTTSM0GU0v30g_s6eNzUQhkVZRas0zSI_4jwTQWxIJBFl5da5nUFifUh8lqcZv2eNRXngIHTPqtqkCfLBd7T6rvTJEEzjqWQoygjrBT_weEN15eWi7HQjp2NZpSI0oD4SDghZn_AoDwAYl8aRvhM0_43l3HJ6kcg9rzLQ68Y_Tkvv9SYJvsETF4hlon-43LEGK22QcleUd5';
const DEFAULT_NAME = 'Johnathan Miller';

export default function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(() => localStorage.getItem('admin_name') || DEFAULT_NAME);
  const [avatar, setAvatar] = useState(() => localStorage.getItem('admin_avatar') || DEFAULT_AVATAR);

  useEffect(() => {
    const handleProfileUpdate = () => {
      setName(localStorage.getItem('admin_name') || DEFAULT_NAME);
      setAvatar(localStorage.getItem('admin_avatar') || DEFAULT_AVATAR);
    };

    window.addEventListener('profile-updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);

    return () => {
      window.removeEventListener('profile-updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  const handleLogout = () => navigate('/login');

  const isActive = (item) => {
    if (item.matchExact) {
      return location.pathname === item.to;
    }
    if (item.matchPrefixes) {
      return item.matchPrefixes.some((prefix) =>
        location.pathname === prefix || location.pathname.startsWith(prefix + '/')
      );
    }
    return location.pathname.startsWith(item.to);
  };

  return (
    <aside
      className="fixed h-screen left-0 top-0 hidden lg:flex flex-col z-40 shadow-xl animate-fade-in"
      style={{ width: '260px', background: '#1E1614' }}
    >
      {/* Logo */}
      <div className="px-6 py-5 flex items-center gap-2 border-b border-white/5">
        <span className="material-symbols-outlined text-[28px] text-[#FF6B35]">restaurant</span>
        <span className="font-bold text-xl text-[#FF6B35] tracking-tight">Food Genie</span>
      </div>

      {/* Admin Profile */}
      <div className="px-6 py-4 flex items-center gap-3 border-b border-white/5">
        <div className="relative flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-[#FF6B35] transition-all duration-300"
            src={avatar}
            alt={name}
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1E1614] rounded-full" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white leading-tight truncate">{name}</p>
          <p className="text-xs text-[#FF6B35]/70 leading-tight">Online</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={[
                'flex items-center gap-3 px-5 py-2.5 mx-2 rounded-lg transition-all duration-200 cursor-pointer active:scale-95',
                active
                  ? 'bg-[#FF6B35] text-white font-semibold border-l-4 border-white/40'
                  : 'text-white/60 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              <span
                className="material-symbols-outlined flex-shrink-0"
                style={{ fontSize: '20px' }}
              >
                {item.icon}
              </span>
              <span className="text-sm leading-snug">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 py-3 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: '20px' }}>
            logout
          </span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
