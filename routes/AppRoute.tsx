import { Routes, Route } from "react-router-dom"; 
import BaseLayout from "../layouts/BaseLayout";
import Login from "../features/auth/Login"
export default function AppRoutes() { 

  return ( 
    <Routes> 
      {/* Main Website */} 
      <Route path="/"  element={<BaseLayout />}> 
          <Route index element={<Login />} />
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