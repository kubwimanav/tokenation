import { FaMessage, FaUsers } from "react-icons/fa6";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  MdGeneratingTokens,
  MdInsertDriveFile,
  MdOutlineInsertDriveFile,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { DollarSign } from "lucide-react";
import { IoTabletLandscape } from "react-icons/io5";

function TokenHome() {
  const revenueData = [
    { name: "Jan", revenue: 18500 },
    { name: "Feb", revenue: 21200 },
    { name: "Mar", revenue: 19800 },
    { name: "Apr", revenue: 24500 },
    { name: "May", revenue: 26300 },
    { name: "Jun", revenue: 24583 },
  ];

  const usersData = [
    { name: "Jan", users: 850 },
    { name: "Feb", users: 920 },
    { name: "Mar", users: 1050 },
    { name: "Apr", users: 980 },
    { name: "May", users: 1200 },
    { name: "Jun", users: 1100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-sm text-[#2d4a3e] font-medium">Users</span>
              <span className="text-xs font-bold mt-1 text-[#2d4a3e]">50</span>
              <span className="text-xs text-[#F49B0F] font-medium mt-1">
                Total Users
              </span>
            </div>
            <div className="w-12 h-12 flex items-center justify-center text-[#F49B0F] text-2xl">
              <FaUsers />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-sm text-[#2d4a3e] font-medium">Tables</span>
              <span className="text-xs font-bold mt-1 text-[#2d4a3e]">10</span>
              <span className="text-xs text-[#F49B0F] font-medium mt-1">
                Total Available Tables
              </span>
            </div>
            <div className="w-12 h-12 flex items-center justify-center text-[#2d4a3e] text-2xl">
              <IoTabletLandscape />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-sm text-[#2d4a3e] font-medium">
                Earnings
              </span>
              <span className="text-xs font-bold mt-1 text-[#2d4a3e]">
                15M Rwf
              </span>
              <span className="text-xs text-[#F49B0F] font-medium mt-1">
                Total Earnings
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg  flex items-center justify-center text-[#F49B0F] text-2xl">
              <DollarSign />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-sm text-[#2d4a3e] font-medium">Token</span>
              <span className="text-xs font-bold mt-1 text-[#2d4a3e]">80</span>
              <span className="text-xs text-[#F49B0F] font-medium mt-1">
                Total Bought Token
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-[#2d4a3e] text-2xl">
              <MdGeneratingTokens />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#2d4a3e]">
                Revenue Overview
              </h3>
              <span className="text-xs text-[#F49B0F] font-medium bg-[#F49B0F]/10 px-3 py-1 rounded-full">
                Last 6 Months
              </span>
            </div>
            <div className="w-full h-50">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#2d4a3e" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#2d4a3e"
                        stopOpacity={0.4}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2d4a3e",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Users Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#2d4a3e]">
                User Statistics
              </h3>
              <span className="text-xs text-[#F49B0F] font-medium bg-[#F49B0F]/10 px-3 py-1 rounded-full">
                Monthly Growth
              </span>
            </div>
            <div className="w-full h-50">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={usersData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F49B0F" stopOpacity={0.6} />
                      <stop
                        offset="95%"
                        stopColor="#F49B0F"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F49B0F",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#2d4a3e"
                    strokeWidth={3}
                    fill="url(#colorUsers)"
                    dot={{ fill: "#F49B0F", r: 4 }}
                    activeDot={{ r: 6, fill: "#2d4a3e" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenHome;
