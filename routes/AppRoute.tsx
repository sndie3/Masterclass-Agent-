import { Routes, Route } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Login from "../features/auth/Login"
import Home from "../features/dashboard/Home";
import Profile from "../features/profile/Profile";
import Support from "../features/support/Support"
import Theme from "../features/theme/Theme"
export default function AppRoutes() {

  return (
    <Routes>
      {/* Main Website */}
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Login />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="theme" element={<Theme />} />
        <Route path="support" element={<Support />} />
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