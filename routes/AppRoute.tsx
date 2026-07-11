import { Routes, Route } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Login from "../features/auth/Login"
import Home from "../features/dashboard/Home";
import Profile from "../features/profile/Profile";
import Support from "../features/support/Support"
import Theme from "../features/theme/Theme"
import Notifications from "../features/notification/Notifications"
import Earnings from "../features/earnings/Earnings"
import Promo from "../features/promo/Promo"
import AddLevel from "../features/addLevel/AddLevel"
import Register from "../features/register/Register"
export default function AppRoutes() {

  return (
    <Routes>
      {/* Main Website */}
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Login />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="theme" element={<Theme />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="support" element={<Support />} />
        <Route path="earnings" element={<Earnings/>}/>
        <Route path="promo" element={<Promo />}/>
        <Route path="add-level" element={<AddLevel />}/>
        <Route path="register" element={<Register />}/>
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