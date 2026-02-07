import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useGetGameHistoryQuery } from "../Api/tokenman/tokenman";

export default function GameHistory() {
  const { data, isLoading, isError, refetch } = useGetGameHistoryQuery();
  console.log("gamehistory", data);

  // Use data from API, fallback to empty array if no data
  const gameHistory = data?.gameHistory || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async (gameId) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      const accessToken = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://token-backend-omega.vercel.app/api/tokenman/game/${gameId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.ok) {
          // Show success notification if you have a notification library
          alert("Game deleted successfully");
          refetch(); // Refetch the data after deletion
        } else {
          const error = await response.json();
          alert(error.message || "Failed to delete game");
        }
      } catch (error) {
        alert("Failed to delete game");
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      COMPLETED: {
        bg: "bg-[#FEF3C7]",
        text: "text-[#92400E]",
        border: "border-[#F59E0B]",
        label: "Completed",
      },
      IDLE: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-300",
        label: "Idle",
      },
      PENDING: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-300",
        label: "Pending",
      },
      CANCELLED: {
        bg: "bg-gray-200",
        text: "text-gray-700",
        border: "border-gray-400",
        label: "Cancelled",
      },
      ACTIVE: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-300",
        label: "Active",
      },
    };

    const config = statusConfig[status?.toUpperCase()] || statusConfig.PENDING;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  // Calculate total earnings
  const totalEarnings = gameHistory.reduce(
    (sum, game) => sum + (game.earnings || 0),
    0,
  );

  // Pagination logic
  const totalPages = Math.ceil(gameHistory.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gameHistory.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59E0B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading game history...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-red-600">
              Error loading game history. Please try again.
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
            Game & Earnings History
          </h1>
          <p className="text-xs sm:text-sm lg:text-sm xl:text-base text-gray-600">
            Track your betting performance and results
          </p>
        </div>

        {/* Table Container with Responsive Overflow */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto overflow-y-visible lg:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-auto lg:table-fixed w-full">
                  <thead className="bg-[#F59E0B] sticky top-0 z-10">
                    <tr>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Table Name
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Location
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Game Date
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Winner
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Commission
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-left text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Earnings
                      </th>
                      <th className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 text-center text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold text-white tracking-wider whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.length > 0 ? (
                      currentItems.map((game, index) => (
                        <tr
                          key={game.gameId || index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm text-black font-medium">
                              {game.tableName || "N/A"}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            {getStatusBadge(game.status)}
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm text-gray-700">
                              {game.location || "N/A"}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm text-gray-700">
                              {formatDate(game.date || game.createdAt)}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm lg:text-[13px] xl:text-sm font-medium text-gray-900">
                              {game.winner || "N/A"}
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div
                              className={`text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold ${game.breakdown?.commission > 0 ? "text-[#F59E0B]" : "text-gray-400"}`}
                            >
                              {game.breakdown?.commission || 0} RWF
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div
                              className={`text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold ${game.earnings > 0 ? "text-[#F59E0B]" : "text-gray-400"}`}
                            >
                              {game.earnings || 0} RWF
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3.5 lg:py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <button
                                onClick={() => handleDelete(game.gameId)}
                                className="p-2 hover:bg-red-50 rounded-full transition-colors"
                                aria-label="Delete game"
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
                          No game history found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Results info */}
              <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, gameHistory.length)}
                </span>{" "}
                of <span className="font-medium">{gameHistory.length}</span>{" "}
                results
              </div>

              {/* Pagination controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
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
                        onClick={() => paginate(index + 1)}
                        className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors shrink-0 ${
                          currentPage === index + 1
                            ? "bg-[#F59E0B] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
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
