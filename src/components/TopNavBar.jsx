import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared top navigation bar for the admin portal.
 *
 * Props:
 *   title       – Page title shown on the left (string, required)
 *   titleExtra  – Optional JSX to render alongside the title (e.g. "Live" badge)
 */
export default function TopNavBar({ title, titleExtra }) {
  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-6 h-16 bg-white border-b border-gray-100 shadow-sm">
      {/* Left: page title */}
      <div className="flex items-center gap-3">
        <h1 className="font-semibold text-lg leading-tight" style={{ color: '#1E1614' }}>{title}</h1>
        {titleExtra && <div className="flex items-center">{titleExtra}</div>}
      </div>

      {/* Right: icons */}
      <div className="flex items-center gap-1">

        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-full transition-colors hover:bg-gray-100 active:opacity-80"
          title="Notifications"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#1E1614' }}>
            notifications
          </span>
          {/* Unread badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Link>

        {/* Settings */}
        <Link
          to="/settings"
          className="p-2 rounded-full transition-colors hover:bg-gray-100 active:opacity-80"
          title="Settings"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#1E1614' }}>
            settings
          </span>
        </Link>

      </div>
    </header>
  );
}
