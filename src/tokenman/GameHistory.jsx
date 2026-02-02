import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function GameHistory() {
  // Sample data based on the new screenshot structure
  const [allGames] = useState([
    {
      id: "game_001",
      status: "completed",
      location: "Kigali",
      createdAt: "2026-01-30T09:49:41.258Z",
      winner: "Player A",
      payouts: 150,
      earnings: 75,
    },
    {
      id: "game_002",
      status: "completed",
      location: "Kigali",
      createdAt: "2026-01-30T08:30:22.145Z",
      winner: "Player B",
      payouts: 0,
      earnings: 0,
    },
    {
      id: "game_003",
      status: "completed",
      location: "Kigali",
      createdAt: "2026-01-29T16:15:33.678Z",
      winner: "Player C",
      payouts: 200,
      earnings: 100,
    },
    {
      id: "game_004",
      status: "pending",
      location: "Kigali",
      createdAt: "2026-01-29T14:45:12.234Z",
      winner: "N/A",
      payouts: 0,
      earnings: 0,
    },
    {
      id: "game_005",
      status: "completed",
      location: "Kigali",
      createdAt: "2026-01-28T11:20:45.567Z",
      winner: "Player D",
      payouts: 100,
      earnings: 50,
    },
    {
      id: "game_006",
      status: "completed",
      location: "Kigali",
      createdAt: "2026-01-28T09:55:18.456Z",
      winner: "Player E",
      payouts: 175,
      earnings: 87,
    },
    {
      id: "game_007",
      status: "cancelled",
      location: "Kigali",
      createdAt: "2026-01-27T15:30:29.789Z",
      winner: "N/A",
      payouts: 0,
      earnings: 0,
    },
    {
      id: "game_008",
      status: "completed",
      location: "Kigali",
      createdAt: "2026-01-27T12:10:55.345Z",
      winner: "Player F",
      payouts: 225,
      earnings: 112,
    },
    {
      id: "game_009",
      status: "completed",
      location: "Kigali",
      createdAt: "2026-01-26T18:45:40.678Z",
      winner: "Player G",
      payouts: 125,
      earnings: 62,
    },
    {
      id: "game_010",
      status: "completed",
      location: "Kigali",
      createdAt: "2026-01-26T10:25:15.912Z",
      winner: "Player H",
      payouts: 180,
      earnings: 90,
    },
  ]);

  const [gameHistory, setGameHistory] = useState(allGames);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = (gameId) => {
    setGameHistory(gameHistory.filter((game) => game.id !== gameId));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: {
        bg: "bg-[#FEF3C7]",
        text: "text-[#92400E]",
        border: "border-[#F59E0B]",
        label: "Completed",
      },
      pending: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-300",
        label: "Pending",
      },
      cancelled: {
        bg: "bg-gray-200",
        text: "text-gray-700",
        border: "border-gray-400",
        label: "Cancelled",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

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
    (sum, game) => sum + game.payouts,
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-font-bold text-gray-900 mb-2">
            Game & Earnings History
          </h1>
          <p className="text-gray-600">
            Track your betting performance and results
          </p>
        </div>

        {/* Table Container with Overflow */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#F59E0B]">
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white tracking-wider">
                    Game ID
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white tracking-wider">
                    Location
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white tracking-wider">
                    Created At
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white tracking-wider">
                    Winner
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white tracking-wider">
                    Payouts
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white tracking-wider">
                    Earnings
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((game, index) => (
                  <tr
                    key={game.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm  text-black font-medium">
                        {game.id}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(game.status)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {game.location}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {formatDate(game.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {game.winner}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-semibold ${game.payouts > 0 ? "text-[#F59E0B]" : "text-gray-400"}`}
                      >
                        ${game.payouts}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-semibold ${game.payouts > 0 ? "text-[#F59E0B]" : "text-gray-400"}`}
                      >
                        ${game.earnings}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                      <div className=" flex justify-center items-center">
                        <Trash2
                          size={16}
                          onClick={() => handleDelete(game.id)}
                          className=" text-red-500 hover:text-red-700"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, gameHistory.length)}
                </span>{" "}
                of <span className="font-medium">{gameHistory.length}</span>{" "}
                results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === index + 1
                          ? "bg-[#F59E0B] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
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

        {/* Mobile Scroll Indicator */}
        <div className="mt-4 sm:hidden">
          <div className="text-sm text-gray-500 text-center">
            ← Scroll horizontally to see all columns →
          </div>
        </div>
      </div>
    </div>
  );
}
