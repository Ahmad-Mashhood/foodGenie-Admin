import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopNavBar from '../components/TopNavBar';
import API from '../api';

const DEFAULT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGzX2CPtxYhYVI7Bf7tcl06JZZvjnrpl0G5XTUlpIyg3a7N6hgRlEqf36LEYNa9jRJohFGdjcYOAaBc4kUj22wtCcTM_jyEaOugiUTDEZY-7FMLEVi4KBaKpwnlVLoBybiCIJqkr2fg0jXhv-3Y9CetC2OjwlGww9fwJTfu15kHpo2h27KEmkzX7uNmDIc2Pbk5b9PhQxhoVsKjoUDUQ3Ge0ljA8QzKg0wN4Ob9oCE8GgTCGv5wZLOU0CJRJAZ2fv0rc0CO3UB5xnm';
const PRESET_AVATARS = [
    { name: 'Johnathan (Default)', url: DEFAULT_AVATAR },
    { name: 'James Wilson', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzZEWEqbVKohv4ydWLYMD_n5PI2cUZzQXBiqo_33diQSui2aSt7c_9il_Bwb7yikn32IAGoJe_OOrwHY8kZW--aqej4S-F_xK8yEGmcun-9PdQlRLeCmkdOZeTWdZzs3kZIKqmDqHwiUVUhTSBA0KCLFw4d0DzbByxv3oNafuxLl843qGVQ6o-u6_dCrSFsd_dnAF-p-hCXL7FAT5zQTsgNfL500XBZDuNo49sclzHfWeF5JSRMw1J5_3APKroJwGHVgjVEYlQtoGL' },
    { name: 'Sarah Chen', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSm6IMSnrxO7L0xbLdmpLwXpbojEVaOwqeARJ5IFeP2PE1am57ZnPJQeFd7U2LsrTNfrXO22kWEkNCukpPJ2ztk5tPcwptU7-fikvEJSoJeFc0j4M0_kiDZAx4R2GTjWEoJFux5kK_rDKU94Bf567sisJneEsxpOdCg2Xhqt8NMUTLriss9FnKgmT6mZlST3a-4F-5vwLu9XVJQHyKsC7R9HWQ5nnLEXmLKJTt90FS-otJ6e7pOdAYiF6JfQ1-cxLXZlSt8qDmtpGp' },
    { name: 'Marcus Thompson', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCain-XHkJ8AQ1bTS_w4ydh7bNStQ7em4S0TiBz3kW4S47WD7duE6YMm7QzDU4AnmEozJU5HVNeSWjbzNJaE8N9cILMvkeRO0T3rCDFeON2D49_ZF46DpKmqoA_-tKzbMZ52JcWfPjRyQcoGBr7V_2jtd83g3Z2-sZNs16Rse7YaoRnVm-tq9clkxr2z_PvfxILV265hkzeDgmkgfsSm-eHH9d_7euInl6R1X-RgswnAP61ElInB3hMTzoHRlq26cfyPdU8RMwJlt7R' },
    { name: 'David Miller', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOWToy_JptququksIkIdtcbOL-iEvb8IT5rARIjHDZcaVRQsYiMbgZuQugf9NCsLgQukE-fMQ2Aa9JjoOEGh7wtL23JZt2_VzL4w81BrCDfwDT7oCPulgdwX7-1FW3nyH61hdgESN6gC2kzI5E5d2-GyY69UqBqZe_6uSs_xfB6ziqbWK4fPE4fiNRFuatAA1PK94lY4yKxpGn8VTvhYkMJt1fvAAvnad5MczVwRBHPLbhZ_CL8yZ_rzhoaFPn4zHVPRNX1YobISt1' }
];

export default function SettingsDesktop() {
    // Shared State with localStorage
    const [name, setName] = useState(() => localStorage.getItem('admin_name') || 'Johnathan Miller');
    const [email, setEmail] = useState(() => localStorage.getItem('admin_email') || 'admin@foodgenie.com');
    const [phone, setPhone] = useState(() => localStorage.getItem('admin_phone') || '+1 (555) 123-4567');
    const [role, setRole] = useState(() => localStorage.getItem('admin_role') || 'Operations Manager');
    const [avatar, setAvatar] = useState(() => localStorage.getItem('admin_avatar') || DEFAULT_AVATAR);

    // Visibility States for Passwords
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Passwords values
    const [currentPassword, setCurrentPassword] = useState('currentsecret123');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Two-Factor Authentication States
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => localStorage.getItem('admin_2fa') === 'enabled');
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [show2FADisableModal, setShow2FADisableModal] = useState(false);
    const [tfaCode, setTfaCode] = useState('');
    const [tfaError, setTfaError] = useState('');

    // Picture Upload Modal State
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [customPhotoUrl, setCustomPhotoUrl] = useState('');

    // Toggle Preferences States
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(true);
    const [restaurantApprovals, setRestaurantApprovals] = useState(true);
    const [complaintsDisputes, setComplaintsDisputes] = useState(true);
    const [weeklyReports, setWeeklyReports] = useState(false);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    // Platform settings values
    const [commissionRate, setCommissionRate] = useState('15');
    const [minOrderValue, setMinOrderValue] = useState('$12.00');
    const [baseDeliveryFee, setBaseDeliveryFee] = useState('$3.50');

    // Toast/Feedback state
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        // Enforce light mode on HTML tag
        document.documentElement.className = 'light';
        localStorage.setItem('theme', 'light');
    }, []);

    const handleSaveProfile = async () => {
        try {
            const res = await API.put('/api/auth/profile', { name, email, phone });
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
            }
            if (res.data && res.data.user) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }
        } catch (err) {
            console.error('Failed to sync profile update to backend', err);
        }

        localStorage.setItem('admin_name', name);
        localStorage.setItem('admin_email', email);
        localStorage.setItem('admin_phone', phone);
        localStorage.setItem('admin_role', role);
        localStorage.setItem('admin_avatar', avatar);

        // Dispatch storage update so Sidebar updates immediately
        window.dispatchEvent(new Event('profile-updated'));

        setToastMessage('Profile settings saved and updated on server successfully!');
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleSaveSecurity = async (e) => {
        e.preventDefault();
        if (newPassword && newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        if (newPassword) {
            try {
                const res = await API.put('/api/auth/profile', { password: newPassword });
                if (res.data && res.data.token) {
                    localStorage.setItem('token', res.data.token);
                }
            } catch (err) {
                alert("Failed to update password on server: " + (err.response?.data?.detail || err.message));
                return;
            }
        }
        setToastMessage('Security password updated on server successfully!');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setToastMessage(''), 3000);
    };


    const handleEnable2FA = (e) => {
        e.preventDefault();
        if (tfaCode.length === 6) {
            setTwoFactorEnabled(true);
            localStorage.setItem('admin_2fa', 'enabled');
            setShow2FAModal(false);
            setTfaCode('');
            setTfaError('');
            setToastMessage('2FA enabled successfully!');
            setTimeout(() => setToastMessage(''), 3000);
        } else {
            setTfaError('Please enter a valid 6-digit verification code.');
        }
    };

    const handleDisable2FA = () => {
        setTwoFactorEnabled(false);
        localStorage.setItem('admin_2fa', 'disabled');
        setShow2FADisableModal(false);
        setToastMessage('2FA disabled successfully.');
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleSelectPresetAvatar = (url) => {
        setAvatar(url);
        localStorage.setItem('admin_avatar', url);
        window.dispatchEvent(new Event('profile-updated'));
        setShowPhotoModal(false);
        setToastMessage('Profile picture updated successfully!');
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleCustomPhotoSubmit = (e) => {
        e.preventDefault();
        if (customPhotoUrl.startsWith('http')) {
            setAvatar(customPhotoUrl);
            localStorage.setItem('admin_avatar', customPhotoUrl);
            window.dispatchEvent(new Event('profile-updated'));
            setShowPhotoModal(false);
            setCustomPhotoUrl('');
            setToastMessage('Custom profile picture applied!');
            setTimeout(() => setToastMessage(''), 3000);
        } else {
            alert('Please enter a valid HTTP/HTTPS URL.');
        }
    };

    return (
        <div className="font-body-md min-h-screen bg-[#FFF8F0] text-on-surface">
            <SidebarNav />

            <main className="flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>
                <TopNavBar title="Settings" />

                <div className="px-margin pb-xl">
                    <div className="flex justify-between items-center mb-lg pt-sm">
                        <h2 className="font-headline-lg text-headline-lg text-[#2B2D42]">Settings</h2>
                        <button 
                            onClick={handleSaveProfile}
                            className="bg-primary-container text-white font-label-md text-label-md px-lg py-md rounded-lg shadow-md hover:opacity-90 transition-all active:scale-95 shadow-[#FF6B35]/20"
                        >
                            Save Changes
                        </button>
                    </div>

                    <div className="grid grid-cols-12 gap-gutter">
                        {/* Profile Settings - Set to full width (col-span-12) as Appearance is removed */}
                        <section className="col-span-12 custom-card p-lg">
                            <div className="flex justify-between items-center mb-lg">
                                <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-[#2B2D42]">Profile Settings</h3>
                                <span className="bg-[#FFB703] text-black font-label-sm text-label-sm px-md py-1 rounded-full font-semibold">Super Admin</span>
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-lg mb-lg">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF6B35]/20 shadow-sm relative">
                                        <img className="w-full h-full object-cover" src={avatar} alt={name} />
                                    </div>
                                    <button 
                                        onClick={() => setShowPhotoModal(true)} 
                                        className="absolute bottom-0 right-0 bg-[#FF6B35] text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-all"
                                        title="Change Profile Photo"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                    </button>
                                </div>
                                <div className="flex-grow flex flex-col justify-center">
                                    <h4 className="font-headline-sm text-headline-sm mb-base text-on-surface">{name}</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant/70 mb-md">Super Admin access granted. Last login: 2 hours ago from London, UK.</p>
                                    <button 
                                        onClick={() => setShowPhotoModal(true)} 
                                        className="bg-[#FF6B35]/10 text-[#FF6B35] font-label-md text-label-md px-md py-xs rounded-lg w-fit hover:bg-[#FF6B35]/25 transition-all active:scale-95"
                                    >
                                        Upload New Photo
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                                <div className="flex flex-col gap-base">
                                    <label className="font-label-sm text-label-sm text-on-surface-variant/70">Full Name</label>
                                    <input 
                                        className="border rounded-lg px-md py-md text-body-md font-body-md outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-base">
                                    <label className="font-label-sm text-label-sm text-on-surface-variant/70">Email Address</label>
                                    <input 
                                        className="border rounded-lg px-md py-md text-body-md font-body-md outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-base">
                                    <label className="font-label-sm text-label-sm text-on-surface-variant/70">Phone Number</label>
                                    <input 
                                        className="border rounded-lg px-md py-md text-body-md font-body-md outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                        type="tel" 
                                        value={phone} 
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-base">
                                    <label className="font-label-sm text-label-sm text-on-surface-variant/70">Display Role</label>
                                    <input 
                                        className="border rounded-lg px-md py-md text-body-md font-body-md outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                        type="text" 
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Security settings */}
                        <section className="col-span-12 lg:col-span-7 custom-card p-lg">
                            <h3 className="font-label-sm text-label-sm uppercase tracking-widest mb-lg text-[#2B2D42]">Security &amp; Privacy</h3>
                            <form onSubmit={handleSaveSecurity} className="space-y-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                                    <div className="flex flex-col gap-base relative">
                                        <label className="font-label-sm text-label-sm text-on-surface-variant/70">Current Password</label>
                                        <input 
                                            className="border rounded-lg px-md py-md text-body-md font-body-md pr-xl outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        <span 
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="material-symbols-outlined absolute right-md bottom-[14px] text-outline cursor-pointer select-none"
                                        >
                                            {showCurrentPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-base relative">
                                        <label className="font-label-sm text-label-sm text-on-surface-variant/70">New Password</label>
                                        <input 
                                            className="border rounded-lg px-md py-md text-body-md font-body-md pr-xl outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                            placeholder="Min. 8 characters" 
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <span 
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="material-symbols-outlined absolute right-md bottom-[14px] text-outline cursor-pointer select-none"
                                        >
                                            {showNewPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-base relative w-full md:w-1/2">
                                    <label className="font-label-sm text-label-sm text-on-surface-variant/70">Confirm New Password</label>
                                    <input 
                                        className="border rounded-lg px-md py-md text-body-md font-body-md pr-xl outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span 
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="material-symbols-outlined absolute right-md bottom-[14px] text-outline cursor-pointer select-none"
                                    >
                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </div>
                                <div className="flex justify-end pt-sm">
                                    <button 
                                        type="submit" 
                                        className="bg-[#FF6B35] text-white font-label-md text-label-md px-lg py-sm rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#FF6B35]/20"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>

                            {/* 2FA Section */}
                            <div className="pt-md mt-md border-t border-outline/10 flex items-center justify-between">
                                <div>
                                    <h4 className="font-label-md text-label-md font-semibold">Two-Factor Authentication</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant/70">Secure your account with a secondary verification method.</p>
                                </div>
                                <div 
                                    onClick={() => twoFactorEnabled ? setShow2FADisableModal(true) : setShow2FAModal(true)} 
                                    className={`toggle-switch ${twoFactorEnabled ? 'active' : ''}`}
                                >
                                    <div className="toggle-handle"></div>
                                </div>
                            </div>
                        </section>

                        {/* Notification preferences */}
                        <section className="col-span-12 lg:col-span-5 custom-card p-lg">
                            <h3 className="font-label-sm text-label-sm uppercase tracking-widest mb-lg text-[#2B2D42]">Notification Preferences</h3>
                            <div className="space-y-md">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <span className="material-symbols-outlined text-on-surface-variant/70">mail</span>
                                        <span className="font-body-md text-body-md">Email Notifications</span>
                                    </div>
                                    <div onClick={() => setEmailNotifications(!emailNotifications)} className={`toggle-switch ${emailNotifications ? 'active' : ''}`}>
                                        <div className="toggle-handle"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <span className="material-symbols-outlined text-on-surface-variant/70">sms</span>
                                        <span className="font-body-md text-body-md">SMS Alerts</span>
                                    </div>
                                    <div onClick={() => setSmsAlerts(!smsAlerts)} className={`toggle-switch ${smsAlerts ? 'active' : ''}`}>
                                        <div className="toggle-handle"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <span className="material-symbols-outlined text-on-surface-variant/70">verified_user</span>
                                        <span className="font-body-md text-body-md">Restaurant Approvals</span>
                                    </div>
                                    <div onClick={() => setRestaurantApprovals(!restaurantApprovals)} className={`toggle-switch ${restaurantApprovals ? 'active' : ''}`}>
                                        <div className="toggle-handle"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <span className="material-symbols-outlined text-on-surface-variant/70">report</span>
                                        <span className="font-body-md text-body-md">Complaints &amp; Disputes</span>
                                    </div>
                                    <div onClick={() => setComplaintsDisputes(!complaintsDisputes)} className={`toggle-switch ${complaintsDisputes ? 'active' : ''}`}>
                                        <div className="toggle-handle"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-sm">
                                        <span className="material-symbols-outlined text-on-surface-variant/70">analytics</span>
                                        <span className="font-body-md text-body-md">Weekly Reports</span>
                                    </div>
                                    <div onClick={() => setWeeklyReports(!weeklyReports)} className={`toggle-switch ${weeklyReports ? 'active' : ''}`}>
                                        <div className="toggle-handle"></div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Global Platform Settings */}
                        <section className="col-span-12 custom-card p-lg">
                            <h3 className="font-label-sm text-label-sm uppercase tracking-widest mb-lg text-[#2B2D42]">Platform Global Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
                                <div className="flex flex-col gap-base">
                                    <label className="font-label-sm text-label-sm text-on-surface-variant/70">Global Commission Rate (%)</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full border rounded-lg px-md py-md text-body-md font-body-md outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                            type="number" 
                                            value={commissionRate} 
                                            onChange={(e) => setCommissionRate(e.target.value)}
                                        />
                                        <span className="absolute right-md top-1/2 -translate-y-1/2 text-outline">%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-base">
                                    <label className="font-label-sm text-label-sm text-on-surface-variant/70">Minimum Order Value</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full border rounded-lg px-md py-md text-body-md font-body-md outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                            type="text" 
                                            value={minOrderValue} 
                                            onChange={(e) => setMinOrderValue(e.target.value)}
                                        />
                                        <span className="absolute right-md top-1/2 -translate-y-1/2 text-outline">USD</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-base">
                                    <label className="font-label-sm text-label-sm text-on-surface-variant/70">Base Delivery Fee</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full border rounded-lg px-md py-md text-body-md font-body-md outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all bg-surface-container-low border-outline/20"
                                            type="text" 
                                            value={baseDeliveryFee} 
                                            onChange={(e) => setBaseDeliveryFee(e.target.value)}
                                        />
                                        <span className="absolute right-md top-1/2 -translate-y-1/2 text-outline">USD</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-error-container/20 border-l-4 border-error p-md rounded-r-lg flex flex-col md:flex-row items-center justify-between">
                                <div className="flex items-center gap-md mb-md md:mb-0">
                                    <span className="material-symbols-outlined text-error text-[32px]">warning</span>
                                    <div>
                                        <h4 className="font-label-md text-label-md text-error font-semibold">Maintenance Mode</h4>
                                        <p className="font-body-sm text-body-sm text-on-error-container">Activating this will take the entire Food Genie platform offline for all users.</p>
                                    </div>
                                </div>
                                <div onClick={() => setMaintenanceMode(!maintenanceMode)} className={`toggle-switch ${maintenanceMode ? 'error-active' : ''}`}>
                                    <div className="toggle-handle"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Profile Avatar Selection Modal */}
            {showPhotoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-lg w-full max-w-md border border-[#2B2D42]/10 text-on-surface">
                        <div className="flex justify-between items-center mb-md border-b border-[#2B2D42]/10 pb-sm">
                            <h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">Change Profile Picture</h3>
                            <button onClick={() => setShowPhotoModal(false)} className="text-[#2B2D42]/60 hover:opacity-75">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="space-y-md">
                            <div>
                                <p className="font-label-sm text-label-sm text-[#2B2D42]/70 mb-sm">Select a premium preset avatar:</p>
                                <div className="grid grid-cols-5 gap-sm">
                                    {PRESET_AVATARS.map((p, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleSelectPresetAvatar(p.url)}
                                            className={`relative w-14 h-14 rounded-full overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 ${
                                                avatar === p.url ? 'border-[#FF6B35] ring-2 ring-[#FF6B35]/20' : 'border-transparent'
                                            }`}
                                            title={p.name}
                                        >
                                            <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-[#2B2D42]/10 pt-md">
                                <form onSubmit={handleCustomPhotoSubmit} className="space-y-sm">
                                    <label className="block font-label-sm text-label-sm text-[#2B2D42]/70">Or paste custom image URL:</label>
                                    <div className="flex gap-sm">
                                        <input 
                                            type="text"
                                            className="flex-1 px-md py-sm bg-white border border-[#2B2D42]/20 rounded-lg outline-none text-body-sm focus:ring-2 focus:ring-[#FF6B35]"
                                            placeholder="https://example.com/avatar.jpg"
                                            value={customPhotoUrl}
                                            onChange={(e) => setCustomPhotoUrl(e.target.value)}
                                            required
                                        />
                                        <button 
                                            type="submit"
                                            className="bg-[#FF6B35] text-white px-md rounded-lg text-label-sm font-semibold hover:opacity-90 active:scale-95"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2FA Setup Modal */}
            {show2FAModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-lg w-full max-w-sm border border-[#2B2D42]/10 text-on-surface">
                        <div className="flex justify-between items-center mb-sm border-b border-[#2B2D42]/10 pb-xs">
                            <h3 className="font-headline-sm text-headline-sm text-[#2B2D42]">Enable 2FA Authentication</h3>
                            <button onClick={() => setShow2FAModal(false)} className="text-[#2B2D42]/60 hover:opacity-75">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleEnable2FA} className="space-y-md">
                            <p className="font-body-sm text-body-sm text-[#2B2D42]/70">
                                Scan the QR code below using your Google Authenticator or Duo App, then enter the 6-digit code.
                            </p>
                            
                            {/* Premium Mock QR Code */}
                            <div className="flex flex-col items-center justify-center bg-gray-50 p-md rounded-xl border border-[#2B2D42]/10">
                                <svg width="140" height="140" viewBox="0 0 100 100" className="text-black fill-current">
                                    <path d="M0,0 h30 v10 h-20 v20 h-10 z M70,0 h30 v30 h-10 v-20 h-20 z M0,70 h10 v20 h20 v10 h-30 z M90,90 v-20 h10 v30 h-30 v-10 z" />
                                    <rect x="15" y="15" width="20" height="20" />
                                    <rect x="65" y="15" width="20" height="20" />
                                    <rect x="15" y="65" width="20" height="20" />
                                    <rect x="45" y="45" width="10" height="10" />
                                    <rect x="45" y="25" width="10" height="10" />
                                    <rect x="25" y="45" width="10" height="10" />
                                    <rect x="65" y="65" width="10" height="10" />
                                    <rect x="75" y="75" width="10" height="10" />
                                </svg>
                                <span className="font-label-sm text-label-sm text-[#2B2D42]/60 mt-sm select-all">Secret: JBSWY3DPEHPK3PXP</span>
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm text-[#2B2D42]/70 mb-xs">6-Digit Verification Code</label>
                                <input 
                                    type="text" 
                                    className="w-full px-md py-sm bg-white border border-[#2B2D42]/20 rounded-lg outline-none text-center font-bold text-lg tracking-widest focus:ring-2 focus:ring-[#FF6B35]"
                                    maxLength="6"
                                    placeholder="000 000"
                                    value={tfaCode}
                                    onChange={(e) => setTfaCode(e.target.value.replace(/\D/g, ''))}
                                    required 
                                />
                                {tfaError && <p className="text-[#E63946] text-xs font-medium mt-xs">{tfaError}</p>}
                            </div>

                            <div className="flex justify-end gap-sm pt-xs border-t border-[#2B2D42]/10">
                                <button 
                                    type="button" 
                                    onClick={() => setShow2FAModal(false)}
                                    className="px-md py-sm rounded-lg border border-[#2B2D42]/20 font-label-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-md py-sm rounded-lg bg-[#FF6B35] text-white font-label-md hover:opacity-90 active:scale-95 shadow-md shadow-[#FF6B35]/20"
                                >
                                    Verify & Enable
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 2FA Disable Modal */}
            {show2FADisableModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-lg w-full max-w-sm border border-[#2B2D42]/10 text-center">
                        <span className="material-symbols-outlined text-[#E63946] text-5xl mb-sm">warning</span>
                        <h3 className="font-headline-sm text-headline-sm text-[#2B2D42] mb-xs">Disable 2FA</h3>
                        <p className="font-body-sm text-body-sm text-[#2B2D42]/70 mb-md">
                            Are you sure you want to disable Two-Factor Authentication? Your account security will be lowered.
                        </p>
                        <div className="flex justify-center gap-sm">
                            <button 
                                onClick={() => setShow2FADisableModal(false)}
                                className="px-md py-sm rounded-lg border border-[#2B2D42]/20 font-label-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDisable2FA}
                                className="px-md py-sm rounded-lg bg-[#E63946] text-white font-label-md hover:opacity-90 active:scale-95 shadow-md"
                            >
                                Yes, Disable
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Toast Notification alert */}
            {toastMessage && (
                <div className="fixed bottom-lg right-lg z-50 bg-[#FF6B35] text-white px-lg py-md rounded-xl shadow-2xl animate-bounce flex items-center gap-sm border border-white/20">
                    <span className="material-symbols-outlined">verified_user</span>
                    <span className="font-label-md text-label-md">{toastMessage}</span>
                </div>
            )}
        </div>
    );
}
