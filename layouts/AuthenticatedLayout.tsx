import { Outlet } from "react-router-dom";


export default function AuthenticatedLayout() {
 
  return (
     <section className="min-h-dvh flex w-full">
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />  
      </main>
    </section>
  );
}
