import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboardDesktop from './pages/AdminDashboardDesktop';
import ManagementPortalDesktop from './pages/ManagementPortalDesktop';
import NotificationsDesktop from './pages/NotificationsDesktop';
import OrderMonitoringCancelled from './pages/OrderMonitoringCancelled';
import OrderMonitoringDelivered from './pages/OrderMonitoringDelivered';
import OrderMonitoringDesktop from './pages/OrderMonitoringDesktop';
import OrderMonitoringOutForDelivery from './pages/OrderMonitoringOutForDelivery';
import OrderMonitoringOnTheWay from './pages/OrderMonitoringOnTheWay';
import OrderMonitoringPendingReverted from './pages/OrderMonitoringPendingReverted';
import OrderMonitoringPreparing from './pages/OrderMonitoringPreparing';
import PendingApprovalsDesktop from './pages/PendingApprovalsDesktop';
import RestaurantsManagementDesktop from './pages/RestaurantsManagementDesktop';
import RidersManagementDesktop from './pages/RidersManagementDesktop';
import SettingsDesktop from './pages/SettingsDesktop';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<AdminDashboardDesktop />} />
        <Route path='/management' element={<ManagementPortalDesktop />} />
       
        <Route path='/orders' element={<OrderMonitoringDesktop />} />
        <Route path='/orders/cancelled' element={<OrderMonitoringCancelled />} />
        <Route path='/orders/delivered' element={<OrderMonitoringDelivered />} />
        <Route path='/orders/out-for-delivery' element={<OrderMonitoringOutForDelivery />} />
        <Route path='/orders/on-the-way' element={<OrderMonitoringOnTheWay />} />
        <Route path='/orders/pending-reverted' element={<OrderMonitoringPendingReverted />} />
        <Route path='/orders/preparing' element={<OrderMonitoringPreparing />} />
        <Route path='/approvals' element={<PendingApprovalsDesktop />} />
        <Route path='/restaurants' element={<RestaurantsManagementDesktop />} />
        <Route path='/riders' element={<RidersManagementDesktop />} />
        <Route path='/settings' element={<SettingsDesktop />} />
        <Route path="/notifications" element={<NotificationsDesktop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
