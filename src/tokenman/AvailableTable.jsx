import React, { useState } from "react";
import {
  Table,
  DollarSign,
  Percent,
  Download,
  Filter,
  Search,
  ChevronDown,
  Trash2,
  Eye,
} from "lucide-react";
import { IoMdAdd } from "react-icons/io";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import {
  useGetMytablesQuery,
  useGetQrcodeQuery,
} from "../Api/tokenman/tokenman";

export default function AvailableTable() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCodeImages, setQrCodeImages] = useState({});

  const [newTable, setNewTable] = useState({
    playerAName: "",
    playerBName: "",
    tokenPrice: "",
    location: "",
    gameDate: "",
    scheduledStartTime: "",
    scheduledEndTime: "",
  });

  const { data, isLoading, isError, refetch } = useGetMytablesQuery();

  console.log("mytablesddd", data);
  const { data: qrcode } = useGetQrcodeQuery();
  console.log("qrcode", qrcode);

  // Use data from API, fallback to empty array if no data
  const tablesData = data?.tables || [];

  // Fetch QR codes with authorization
  const fetchQRCode = async (tableId) => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://token-backend-omega.vercel.app/api/tokenman/games/${tableId}/qr-code`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setQrCodeImages((prev) => ({ ...prev, [tableId]: imageUrl }));
      }
    } catch (error) {
      console.error(`Failed to fetch QR code for ${tableId}:`, error);
    }
  };

  // Fetch QR codes when tables data changes
  React.useEffect(() => {
    if (tablesData.length > 0) {
      tablesData.forEach((table) => {
        if (table.tableId && !qrCodeImages[table.tableId]) {
          fetchQRCode(table.tableId);
        }
      });
    }
  }, [tablesData]);

  // Cleanup blob URLs when component unmounts
  React.useEffect(() => {
    return () => {
      Object.values(qrCodeImages).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [qrCodeImages]);

  // Format date and time helper functions
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDownloadQRCode = async (tableId) => {
    const accessToken = localStorage.getItem("token");
    try {
      Notify.info("Downloading QR Code...");

      const response = await fetch(
        `https://token-backend-omega.vercel.app/api/tokenman/games/${tableId}/qr-code`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `QRCode-${tableId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        Notify.success("QR Code downloaded successfully");
      } else {
        const error = await response.json();
        Notify.failure(error.message || "Failed to download QR code");
      }
    } catch (error) {
      console.error("Download error:", error);
      Notify.failure("Failed to download QR code");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this table?")) {
      const accessToken = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://token-backend-omega.vercel.app/api/tokenman/game/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.ok) {
          Notify.success("Table deleted successfully");
          refetch(); // Refetch the data after deletion
          const newTotal = tablesData.length - 1;
          const newTotalPages = Math.ceil(newTotal / itemsPerPage);
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }
        } else {
          const error = await response.json();
          Notify.failure(error.message || "Failed to delete table");
        }
      } catch (error) {
        Notify.failure("Failed to delete table");
      }
    }
  };

  const handleCreateTable = async () => {
    if (
      !newTable.playerAName ||
      !newTable.playerBName ||
      !newTable.tokenPrice ||
      !newTable.location ||
      !newTable.gameDate ||
      !newTable.scheduledStartTime ||
      !newTable.scheduledEndTime
    ) {
      Notify.failure("Please fill in all fields");
      return;
    }

    const accessToken = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await fetch(
        "https://token-backend-omega.vercel.app/api/tokenman/game/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            playerAName: newTable.playerAName,
            playerBName: newTable.playerBName,
            tokenPrice: Number(newTable.tokenPrice),
            location: newTable.location,
            gameDate: newTable.gameDate,
            scheduledStartTime: newTable.scheduledStartTime,
            scheduledEndTime: newTable.scheduledEndTime,
          }),
        },
      );
      if (response.ok) {
        setShowCreateModal(false);
        setNewTable({
          playerAName: "",
          playerBName: "",
          tokenPrice: "",
          location: "",
          gameDate: "",
          scheduledStartTime: "",
          scheduledEndTime: "",
        });
        Notify.success("Table created successfully");
        refetch(); // Refetch the data after creation
      } else {
        const error = await response.json();
        Notify.failure(error.message || "Failed to create table");
      }
    } catch (error) {
      Notify.failure("Failed to create table. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const reservedTables = tablesData.filter(
    (t) => t.status === "Reserved",
  ).length;
  const boughtTables = tablesData.filter((t) => t.status === "Buy").length;
  const totalRevenue = tablesData.reduce((sum, t) => sum + (t.revenue || 0), 0);
  const totalCommission = tablesData.reduce(
    (sum, t) => sum + (t.commission || 0) * (t.totalTokensSold || 0),
    0,
  );

  // Calculate pagination
  const totalPages = Math.ceil(tablesData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tablesData.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const getStatusBadge = (status) => {
    const badges = {
      Reserved: "bg-orange-100 text-orange-800",
      Buy: "bg-green-100 text-green-800",
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B] mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading tables...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 text-center">
            <p className="text-red-600">
              Error loading tables. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className=" font-bold text-[19px] text-slate-900">
                Tables & Token Pricing
              </h1>
              <p className="text-sm lg:text-base text-slate-600">
                Manage token prices and commission per table
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex gap-1 items-center justify-center px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-lg shadow-lg transition-colors whitespace-nowrap"
            >
              <IoMdAdd className="text-xl" />
              <span className="text-xs">Create Table</span>
            </button>
          </div>
        </div>

        {/* Tables Table */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full ">
              <thead>
                <tr className=" bg-[#F59E0B]">
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    QR Code
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Game Date
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Start Time
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    End Time
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Price/Token
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Commission
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentData.length > 0 ? (
                  currentData.map((table) => (
                    <tr
                      key={table.tableId}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {qrCodeImages[table.tableId] ? (
                            <img
                              src={qrCodeImages[table.tableId]}
                              alt={`QR Code for ${table.tableId}`}
                              className="w-16 h-16 object-contain border border-slate-200 rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded border border-slate-200">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F59E0B]"></div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 whitespace-nowrap">
                        {formatDate(table.gameDate)}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 whitespace-nowrap">
                        {formatTime(table.scheduledStartTime)}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 whitespace-nowrap">
                        {formatTime(table.scheduledEndTime)}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(table.status)}`}
                        >
                          {table.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold text-blue-600 whitespace-nowrap">
                        {table.tokenPrice?.toLocaleString() || 0} RWF
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold text-emerald-600 whitespace-nowrap">
                        {table.commission?.toLocaleString() || 0} RWF
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDownloadQRCode(table.tableId)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Download QR Code"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(table._id || table.id)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-600 hover:bg-red-200 transition-colors"
                            title="Delete table"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 lg:px-6 py-8 text-center text-slate-500"
                    >
                      No tables found. Create your first table!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {tablesData.length > 0 && (
            <div className="px-4 lg:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs lg:text-sm text-slate-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, tablesData.length)} of {tablesData.length}{" "}
                entries
              </p>
              <div className="flex gap-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#F59E0B] text-white hover:bg-cyan-600"
                        : "border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Table Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Create Table</h3>
              <button
                onClick={() => setShowCreateModal(false)}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Player A Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Player A Name *
                </label>
                <input
                  type="text"
                  value={newTable.playerAName}
                  onChange={(e) =>
                    setNewTable({ ...newTable, playerAName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                  placeholder="e.g. Team Red"
                />
              </div>

              {/* Player B Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Player B Name *
                </label>
                <input
                  type="text"
                  value={newTable.playerBName}
                  onChange={(e) =>
                    setNewTable({ ...newTable, playerBName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                  placeholder="e.g. Team Blue"
                />
              </div>

              {/* Token Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token Price *
                </label>
                <input
                  type="number"
                  value={newTable.tokenPrice}
                  onChange={(e) =>
                    setNewTable({ ...newTable, tokenPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                  placeholder="e.g. 50"
                  min="0"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={newTable.location}
                  onChange={(e) =>
                    setNewTable({ ...newTable, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                  placeholder="e.g. Kampala Stadium"
                />
              </div>

              {/* Game Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Game Date *
                </label>
                <input
                  type="date"
                  value={newTable.gameDate}
                  onChange={(e) =>
                    setNewTable({ ...newTable, gameDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                />
              </div>

              {/* Scheduled Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scheduled Start Time *
                </label>
                <input
                  type="datetime-local"
                  value={newTable.scheduledStartTime}
                  onChange={(e) =>
                    setNewTable({
                      ...newTable,
                      scheduledStartTime: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                />
              </div>

              {/* Scheduled End Time - Full Width */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scheduled End Time *
                </label>
                <input
                  type="datetime-local"
                  value={newTable.scheduledEndTime}
                  onChange={(e) =>
                    setNewTable({
                      ...newTable,
                      scheduledEndTime: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTable}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Table"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
