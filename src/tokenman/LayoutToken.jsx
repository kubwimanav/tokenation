import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import TokenHome from './TokenHome';
import NavbarToken from './NavbarToken';

export default function LayoutToken() {
  return (
    
        <div className="flex h-screen bg-gray-100">
          <Sidebar />

          <div className="flex flex-col  w-full">
            <NavbarToken />
            <main className="flex-1 overflow-auto p-1">
              <Outlet />
            </main>
          </div>
        </div>
     
  );
}
