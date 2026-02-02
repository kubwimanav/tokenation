import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function UserHistory() {
  // Sample data based on the screenshot
  const [allGames] = useState([
    {
      gameId: "game_001",
      date: "2026-01-30T09:17:01.995Z",
      betAmount: 50,
      won: true,
      payout: 100,
      location: "Kigali",
      phoneNumber: "+250 788 123 456",
    },
    {
      gameId: "game_002",
      date: "2026-01-30T08:45:23.123Z",
      betAmount: 25,
      won: false,
      payout: 0,
      location: "Kigali",
      phoneNumber: "+250 788 234 567",
    },
    {
      gameId: "game_003",
      date: "2026-01-29T15:30:45.678Z",
      betAmount: 75,
      won: true,
      payout: 150,
      location: "Kigali",
      phoneNumber: "+250 788 345 678",
    },
    {
      gameId: "game_004",
      date: "2026-01-29T12:20:10.234Z",
      betAmount: 100,
      won: true,
      payout: 200,
      location: "Kigali",
      phoneNumber: "+250 788 456 789",
    },
    {
      gameId: "game_005",
      date: "2026-01-28T18:55:33.567Z",
      betAmount: 30,
      won: false,
      payout: 0,
      location: "Kigali",
      phoneNumber: "+250 788 567 890",
    },
    {
      gameId: "game_006",
      date: "2026-01-28T14:30:22.456Z",
      betAmount: 60,
      won: true,
      payout: 120,
      location: "Kigali",
      phoneNumber: "+250 788 678 901",
    },
    {
      gameId: "game_007",
      date: "2026-01-27T11:15:45.789Z",
      betAmount: 40,
      won: false,
      payout: 0,
      location: "Kigali",
      phoneNumber: "+250 788 789 012",
    },
    {
      gameId: "game_008",
      date: "2026-01-27T09:45:12.345Z",
      betAmount: 85,
      won: true,
      payout: 170,
      location: "Kigali",
      phoneNumber: "+250 788 890 123",
    },
    {
      gameId: "game_009",
      date: "2026-01-26T16:20:33.678Z",
      betAmount: 45,
      won: false,
      payout: 0,
      location: "Kigali",
      phoneNumber: "+250 788 901 234",
    },
    {
      gameId: "game_010",
      date: "2026-01-26T13:55:44.912Z",
      betAmount: 90,
      won: true,
      payout: 180,
      location: "Kigali",
      phoneNumber: "+250 788 012 345",
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
    setGameHistory(gameHistory.filter((game) => game.gameId !== gameId));
  };

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-4 lg:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-font-bold text-gray-900 mb-2">Game History</h1>
          <p className="text-gray-600">
            Track your betting performance and results
          </p>
        </div>

        {/* Table Container with Overflow */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#F59E0B]">
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Game ID
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Bet Amount
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Payout
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-white  tracking-wider">
                    Location
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-center text-[14px] font-semibold text-white tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((game, index) => (
                  <tr
                    key={game.gameId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm  text-black font-medium">
                        {game.gameId}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {formatDate(game.date)}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {game.phoneNumber}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-[#F59E0B]">
                        ${game.betAmount}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      {game.won ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Won
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 border border-gray-400">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Lost
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-semibold ${game.payout > 0 ? "text-[#F59E0B]" : "text-gray-400"}`}
                      >
                        ${game.payout}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {game.location}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                      <div className=" flex justify-center items-center">
                        <Trash2
                          size={16}
                          onClick={() => handleDelete(game.gameId)}
                          className=" text-red-500 hover:text-red-700 "
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-2 border-t border-gray-200 sm:px-6">
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
