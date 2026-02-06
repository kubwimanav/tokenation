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

  const{data, isLoading, isError} = useGetCommissionsQuery();
  console.log('commissions',data);
  const [commissionData, setCommissionData] = useState([
    {
      id: 1,
      date: "2026-01-26",
      table: "Table A",
      totalBets: 125000,
      commission: 6250,
      status: "Paid",
      games: 8,
      players: 12,
    },
    {
      id: 2,
      date: "2026-01-26",
      table: "Table B",
      totalBets: 89000,
      commission: 4450,
      status: "Paid",
      games: 6,
      players: 9,
    },
    {
      id: 3,
      date: "2026-01-25",
      table: "Table A",
      totalBets: 156000,
      commission: 7800,
      status: "Paid",
      games: 12,
      players: 15,
    },
    {
      id: 4,
      date: "2026-01-25",
      table: "Table C",
      totalBets: 98000,
      commission: 4900,
      status: "Pending",
      games: 7,
      players: 11,
    },
    {
      id: 5,
      date: "2026-01-24",
      table: "Table A",
      totalBets: 112000,
      commission: 5600,
      status: "Paid",
      games: 9,
      players: 10,
    },
    {
      id: 6,
      date: "2026-01-24",
      table: "Table B",
      totalBets: 67000,
      commission: 3350,
      status: "Paid",
      games: 5,
      players: 8,
    },
    {
      id: 7,
      date: "2026-01-23",
      table: "Table C",
      totalBets: 143000,
      commission: 7150,
      status: "Paid",
      games: 11,
      players: 14,
    },
    {
      id: 8,
      date: "2026-01-23",
      table: "Table A",
      totalBets: 78000,
      commission: 3900,
      status: "Paid",
      games: 6,
      players: 7,
    },
  ]);

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this commission record?")
    ) {
      setCommissionData(commissionData.filter((item) => item.id !== id));
      // Reset to first page if current page becomes empty
      const newTotal = commissionData.length - 1;
      const newTotalPages = Math.ceil(newTotal / itemsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1);
      }
    }
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
    (sum, item) => sum + item.commission,
    0,
  );
  const paidCommission = commissionData
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.commission, 0);
  const pendingCommission = commissionData
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.commission, 0);
  const totalGames = commissionData.reduce((sum, item) => sum + item.games, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <div className="mb-4">
            <h1 className="text-font-bold text-gray-900 mb-2">
              Token Man Commission
            </h1>
            <p className="text-gray-600">
              Track your earnings and commission breakdown
            </p>
          </div>
        </div>

        {/* Commission Table */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F59E0B]">
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Table
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Games
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Total Bets
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Commission
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-white whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-600 font-medium whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {item.table}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-600 whitespace-nowrap">
                      {item.games}
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-600 whitespace-nowrap">
                      {item.totalBets.toLocaleString()} RWF
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-bold text-[#F59E0B] whitespace-nowrap">
                      {item.commission.toLocaleString()} RWF
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg  text-red-600 hover:text-red-200 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 lg:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs lg:text-sm text-slate-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, commissionData.length)} of{" "}
              {commissionData.length} entries
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
                      ? "bg-[#F59E0B] text-white hover:bg-emerald-600"
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
        </div>
      </div>
    </div>
  );
}
