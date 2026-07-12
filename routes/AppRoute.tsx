import { Routes, Route } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Login from "../features/auth/Login"
import Reset from "../features/auth/Reset"
import Home from "../features/dashboard/Home";
import Profile from "../features/profile/Profile";
import Support from "../features/support/Support"
import Theme from "../features/theme/Theme"
import Notifications from "../features/notification/Notifications"
import Earnings from "../features/earnings/Earnings"
import Promo from "../features/promo/Promo"
import AddLevel from "../features/addLevel/AddLevel"
import Register from "../features/register/Register"
import Settings from "../features/settings/Settings"
import ChatSettings from "../features/settings/ChatSettings"
import ProfileSecurity from "../features/settings/ProfileSecurity"
import DeactivateAccount from "../features/settings/DeactivateAccount"
import ShareReferral from "../features/profile/ShareRefferal"
import Change from "../features/changepass/Change"
import LinkPlayer from "../features/linkPlayer/LinkPlayer"
import CustomerSupport from "../features/dashboard/CustomerSupport"

export default function AppRoutes() {

  return (
    <Routes>
      {/* Main Website */}
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="reset" element={<Reset />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/share-referral" element={<ShareReferral />} />
        <Route path="theme" element={<Theme />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="support" element={<Support />} />
        <Route path="earnings" element={<Earnings/>}/>
        <Route path="promo" element={<Promo />}/>
        <Route path="add-level" element={<AddLevel />}/>
        <Route path="register" element={<Register />}/>
        <Route path="settings" element={<Settings />}/>
        <Route path="profile-security" element={<ProfileSecurity />}/>
        <Route path="chat-settings" element={<ChatSettings />}/>
        <Route path="deactivate-account" element={<DeactivateAccount />}/>
        <Route path="change-password" element={<Change />}/>
        <Route path="link-player-account" element={<LinkPlayer />}/>
        <Route path="customer-support" element={<CustomerSupport/>}/>
      </Route>

      {/* Protected Routes */}

      {/* 
      FLOW -- Protected Route -> Render AuthenticatedLayout -> Access Routes 
      If not authenticated, redirect to login page */}
      {/* 
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedLayout />}>
        
            

        </Route>
      </Route>  */}


      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}