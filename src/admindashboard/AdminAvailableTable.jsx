import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { CgAdd } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { useGetTokenmanQuery } from "../Api/Admin/Admin";
import ReactPaginate from "react-paginate";
import { useGetGameQuery } from "../Api/game/game";

export default function AdminAvailableTable() {
  // Sample data based on the screenshot structure

  const { data, refetch } = useGetGameQuery();
  console.log("tokennnnnnn", data);

  const [users, setUsers] = useState(data || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const itemsPerPage = 4;

  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "Kigali",
  });
    
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleApprove = async (user) => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://token-backend-omega.vercel.app/api/admin/token-men/${user._id}/approve`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.ok) {
        refetch();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to approve user");
      }
    } catch (error) {
      alert("Failed to approve user");
    }
  };

  const handleReject = async (user) => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://token-backend-omega.vercel.app/api/admin/token-men/${user._id}/reject`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.ok) {
        refetch();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to reject user");
      }
    } catch (error) {
      alert("Failed to reject user");
    }
  };

  const handleAddUser = () => {
    if (!newUser.fullName || !newUser.email || !newUser.phone) {
      alert("Please fill in all required fields");
      return;
    }

    const user = {
      id: `user_${String(users.length + 1).padStart(3, "0")}`,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      location: newUser.location,
      isActive: true,
      tokens: 0,
      joinedDate: new Date().toISOString(),
    };

    setUsers([...users, user]);
    setShowAddUserModal(false);
    setNewUser({
      fullName: "",
      email: "",
      phone: "",
      location: "Kigali",
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [pagenumber, setPagenumber] = useState(0);
  const bookpage = 4;
  const pagevisited = pagenumber * bookpage;
  const displayuser = data?.slice(pagevisited, pagevisited + bookpage) || [];

  const changepage = ({ selected }) => {
    setPagenumber(selected);
    };
    
    let i = 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className=" font-bold text-gray-900 mb-2">Available Table</h1>
            <p className="text-gray-600">Manage the list of available table</p>
          </div>
       
        </div>

        {/* Table Container with Overflow */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175">
              <thead>
                <tr className="bg-[#F59E0B]">
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Id
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Full Name
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Start Time
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-[14px] font-semibold text-white  tracking-wider">
                    End Time
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs font-semibold text-white  tracking-wider">
                    Phone
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Location
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Status
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {displayuser.length > 0 ? (
                  displayuser.map((user) => (
                    <tr
                      key={i++}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-mono text-black font-medium">
                          {i + 1}
                        </div>
                      </td>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-semibold text-gray-900">
                          {user.tokenMan}
                        </div>
                        <div className="text-xs text-gray-500 hidden lg:block">
                          GameDate {formatDate(user.gameDate)}
                        </div>
                      </td>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-700 break-all max-w-30 sm:max-w-37.5 lg:max-w-50">
                          {formatTime(user.scheduledStartTime)}
                        </div>
                      </td>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-700 break-all max-w-30 sm:max-w-37.5 lg:max-w-50">
                          {formatTime(user.scheduledEndTime)}
                        </div>
                      </td>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-700">
                          {user.tokenPrice}
                        </div>
                      </td>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-700">
                          {user.location}
                        </div>
                      </td>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full cursor-pointer">
                          {user.status}
                          {}
                        </span>
                      </td>
                      <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                        <Trash2
                          className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => handleDelete(user.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-400 text-sm"
                    >
                      Not Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-xs text-gray-500">
              Showing {indexOfFirstItem + 1}–
              {Math.min(indexOfLastItem, data?.length)} of {data?.length} users
            </span>

            <ReactPaginate
              pageCount={Math.ceil(data?.length / bookpage)}
              previousLabel="Prev"
              nextLabel="Next"
              onPageChange={changepage}
              containerClassName="flex items-center gap-2 mt-6 list-none"
              pageClassName=""
              pageLinkClassName="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
              previousClassName=""
              previousLinkClassName="px-3 py-1.5 rounded-lg bg-orange-700 text-white font-normal cursor-not-allowed"
              nextClassName=""
              nextLinkClassName="px-3 py-1.5 rounded-lg bg-[#F59E0B] text-white font-normal hover:bg-orange-600 transition"
              activeLinkClassName=" bg-[#db8d05] text-black"
              disabledClassName="pointer-events-none opacity-60"
            />
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="mt-4 lg:hidden">
          <div className="text-sm text-gray-500 text-center">
            ← Scroll horizontally to see all columns →
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Add New Token Man
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                  placeholder="+250 788 123 456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={newUser.location}
                  onChange={(e) =>
                    setNewUser({ ...newUser, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-md font-medium transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
