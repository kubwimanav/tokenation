import React, { useState } from "react";
import {
  Percent,
  DollarSign,
  TrendingUp,
  Activity,
  Download,
  Filter,
  Search,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { useGetCommissionsQuery } from "../Api/tokenman/tokenman";

export default function CommissionPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { data, isLoading, isError, refetch } = useGetCommissionsQuery();
  console.log("commissions", data);

  // Use data from API, fallback to empty array if no data
  const commissionData = data?.commissions || [];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = async (tableId) => {
    if (
      window.confirm("Are you sure you want to delete this commission record?")
    ) {
      const accessToken = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://token-backend-omega.vercel.app/api/tokenman/commission/${tableId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.ok) {
          alert("Commission record deleted successfully");
          refetch(); // Refetch the data after deletion
        } else {
          const error = await response.json();
          alert(error.message || "Failed to delete commission record");
        }
      } catch (error) {
        alert("Failed to delete commission record");
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PAID: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Paid",
      },
      PENDING: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        label: "Pending",
      },
      NO_BETS: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "No Bets",
      },
    };

    const config = statusConfig[status?.toUpperCase()] || statusConfig.PENDING;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  // Calculate pagination
  const totalPages = Math.ceil(commissionData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = commissionData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalCommission = commissionData.reduce(
    (sum, item) => sum + (item.commission || 0),
    0,
  );
  const paidCommission = commissionData
    .filter((item) => item.status === "PAID")
    .reduce((sum, item) => sum + (item.commission || 0), 0);
  const pendingCommission = commissionData
    .filter((item) => item.status === "PENDING")
    .reduce((sum, item) => sum + (item.commission || 0), 0);
  const totalGames = commissionData.reduce(
    (sum, item) => sum + (item.games || 0),
    0,
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-350 mx-auto w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading commission data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-350 mx-auto w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-red-600">
              Error loading commission data. Please try again.
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-350 mx-auto w-full">
        {/* Header */}
        <div className="mb-3">
          <h1 className="text-[19px] font-bold text-gray-900 mb-2">
            Token Man Commission
          </h1>
          <p className="text-xs sm:text-sm lg:text-sm xl:text-base text-gray-600">
            Track your earnings and commission breakdown
          </p>
        </div>

        {/* Commission Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Scroll Indicator for Mobile - Top */}
          <div className="block lg:hidden bg-[#F59E0B] text-white text-xs py-2 px-4 text-center">
            ← Swipe to see all columns →
          </div>

          {/* Scrollable Table Wrapper */}
          <div className="overflow-x-auto overflow-y-visible lg:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-auto lg:table-fixed w-full">
                  <thead className="bg-[#F59E0B] sticky top-0 z-10">
                    <tr>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Date
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Table Name
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Location
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Games
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Total Bets
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Commission
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-center text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentData.length > 0 ? (
                      currentData.map((item, index) => (
                        <tr
                          key={item.tableId || index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm text-gray-600 font-medium">
                              {formatDate(item.date || item.createdAt)}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-gray-900">
                              {item.tableName || "N/A"}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm text-gray-600">
                              {item.location || "N/A"}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm text-gray-600">
                              {item.games || 0}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm text-gray-600">
                              {(item.totalBets || 0).toLocaleString()} RWF
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm font-bold text-[#F59E0B]">
                              {(item.commission || 0).toLocaleString()} RWF
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <button
                                onClick={() => handleDelete(item.tableId)}
                                className="p-2 hover:bg-red-50 rounded-full transition-colors"
                                aria-label="Delete commission record"
                              >
                                <Trash2
                                  size={16}
                                  className="text-red-500 hover:text-red-700 cursor-pointer"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-4 sm:px-6 py-8 text-center text-gray-500 text-sm sm:text-base"
                        >
                          No commission data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {commissionData.length > 0 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Results info */}
                <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, commissionData.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{commissionData.length}</span>{" "}
                  entries
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>

                  {/* Page numbers */}
                  <div className="flex gap-1 overflow-x-auto max-w-50 sm:max-w-none scrollbar-thin">
                    {[...Array(totalPages)].map((_, index) => {
                      // Show all pages on desktop, limited on mobile
                      const showPage =
                        totalPages <= 5 ||
                        index === 0 ||
                        index === totalPages - 1 ||
                        (index >= currentPage - 2 && index <= currentPage);

                      if (!showPage && index === currentPage - 3) {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-2 py-2 text-gray-500"
                          >
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={index + 1}
                          onClick={() => goToPage(index + 1)}
                          className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors shrink-0 ${
                            currentPage === index + 1
                              ? "bg-[#F59E0B] text-white hover:bg-[#D97706]"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Scroll Indicator - Bottom */}
        <div className="mt-4 lg:hidden">
          <div className="text-xs sm:text-sm text-gray-500 text-center">
            ← Scroll horizontally to see all columns →
          </div>
        </div>
      </div>
    </div>
  );
}
