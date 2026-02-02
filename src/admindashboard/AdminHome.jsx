import { FaMessage, FaUser, FaUsers } from "react-icons/fa6";
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
import { MdInsertDriveFile, MdMoney, MdMoneyOff, MdOutlineInsertDriveFile, MdTableBar } from "react-icons/md";
import { data, Link } from "react-router-dom";
import { useGetGameQuery } from "../Api/game/game";
import { useGetTokenmanpendingQuery, useGetTokenmanQuery } from "../Api/Admin/Admin";
import { DollarSign } from "lucide-react";

function AdminHome() {
  const { data: gameDate } = useGetGameQuery();
  const { data: tokemanData } = useGetTokenmanQuery();

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

const { data } = useGetTokenmanpendingQuery();
const users = Object.values(data?.tokenMen || {});
  let i = 0; 


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-sm text-[#2d4a3e] font-medium">
                Token Man
              </span>
              <span className="text-[13px] font-bold mt-1 text-[#2d4a3e]">
                {tokemanData?.length}
              </span>
              <span className="text-xs text-[#F49B0F] font-medium mt-1">
                Total Token Man
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-[#F49B0F] text-2xl">
              <FaUsers />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-sm text-[#2d4a3e] font-medium">Tables</span>
              <span className="text-[13px] font-bold mt-1 text-[#2d4a3e]">
                {gameDate?.length}
              </span>
              <span className="text-xs text-[#F49B0F] font-medium mt-1">
                Total Available Tables
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-[#2d4a3e] text-2xl">
              <MdTableBar />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-sm text-[#2d4a3e] font-medium">
                Earnings
              </span>
              <span className="text-[13px] font-bold mt-1 text-[#2d4a3e]">
                1.5M Frw
              </span>
              <span className="text-xs text-[#F49B0F] font-medium mt-1">
                Total Earnings
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-[#F49B0F] text-2xl">
              <MdMoney />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-sm text-[#2d4a3e] font-medium">
                Token Man
              </span>
              <span className="text-[13px] font-bold mt-1 text-[#2d4a3e]">
              {users?.length}
              </span>
              <span className="text-xs text-[#F49B0F] font-medium mt-1">
                Not Approved
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg  flex items-center justify-center text-red-300 text-2xl">
              <FaUsers />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
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
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#F49B0F" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F49B0F" stopOpacity={0} />
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
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#F49B0F"
                    strokeWidth={3}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Users Chart */}
          <div className="bg-white rounded-xl shadow-lg p-3 hover:shadow-xl transition-shadow">
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
                <BarChart
                  data={usersData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
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
                    cursor={{ fill: "#F49B0F", opacity: 0.1 }}
                  />
                  <Bar
                    dataKey="users"
                    fill="#2d4a3e"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100">
            <h4 className="text-lg font-bold text-[#2d4a3e]">
              Recent Activity
            </h4>
            <Link
              to={"adminuser"}
              className="text-[#F49B0F] hover:text-[#2d4a3e] text-sm font-medium transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-[#2d4a3e] to-[#2d4a3e]/90">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white tracking-wider">
                    Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white tracking-wider">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {users?.map((activity, index) => (
                  <tr
                    key={activity.id}
                    className="hover:bg-[#F49B0F]/5 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-[#2d4a3e] font-medium">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {activity.fullName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {activity.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {activity.phone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {activity.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap   text-xs font-medium text-green-600 ">
                      {activity.isApproved ? "Approved" : "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
