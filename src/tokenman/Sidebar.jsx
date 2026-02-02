import {
  MdHome,
  MdOutlineAppSettingsAlt,
  MdOutlineLogout,
  MdPayment,
  MdReport,
} from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Confirm, Notify } from "notiflix";

function Sidebar({ isopen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    {
      name: "Home",
      path: "/token",
      icon: <MdHome className="h-4 w-4 mr-3" />,
    },
    {
      name: "Users history",
      path: "/token/userhistory",
      icon: <TbUsers className="h-4 w-4 mr-3" />,
    },
    {
      name: "Available Table",
      path: "/token/tokentable",
      icon: <MdOutlineAppSettingsAlt className="h-4 w-4 mr-3" />,
    },
    {
      name: "Commissions",
      path: "/token/commission",
      icon: <MdPayment className="h-4 w-4 mr-3" />,
    },
    {
      name: "Game history",
      path: "/token/gamehistory",
      icon: <MdReport className="h-5 w-5 mr-3" />,
    },
  ];

  const handleNavClick = (path) => {
    navigate(path);

    // Close sidebar on mobile after clicking a link
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    Confirm.show(
      "Confirm Logout",
      "Are you sure you want to logout?",
      "Yes",
      "Cancel",
      () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        Notify.success("Logged out successfully!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      },
      () => {
        Notify.info("Logout cancelled");
      },
    );
  };

  // Check if link is active
  const isLinkActive = (itemPath) => {
    if (itemPath === "/token") {
      return currentPath === "/token";
    }
    return currentPath.startsWith(itemPath);
  };

  return (
    <aside
      className={`bg-white w-50 shadow-md shrink-0 transition-all duration-300 ease-in-out fixed md:relative h-full z-40 ${
        isopen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <nav className="p-4 h-full flex flex-col gap-6 overflow-y-auto">
        <img src={logo} alt="" className="w-30 h-10 mt-4" />
        <ul className="space-y-2 mt-10">
          {menuItems.map((item, index) => {
            const isActive = isLinkActive(item.path);

            return (
              <li key={index} >
                <button
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center px-4 py-2 rounded-md w-full text-left transition-colors ${
                    isActive
                      ? "bg-[#2d4a3e] text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="text-red-500 flex items-center mt-17 ml-6">
          <MdOutlineLogout className="h-5 w-5 mr-3" />
          <Link onClick={handleLogout} to={"#"} className="mb-1">
            Logout
          </Link>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
