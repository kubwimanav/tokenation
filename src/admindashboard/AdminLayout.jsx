import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminHeader';

export default function AdminLayout() {
  return (
    
        <div className="flex h-screen bg-gray-100">
          <AdminSidebar />

          <div className="flex flex-col  w-full">
            <AdminNavbar />
            <main className="flex-1 overflow-auto p-1">
              <Outlet />
            </main>
          </div>
        </div>
     
  );
}
