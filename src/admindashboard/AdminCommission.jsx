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
  Eye,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminCommissionPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [commissionData, setCommissionData] = useState([
    {
      id: 1,
      date: "2026-01-26",
      tokenMan: "Jean Mutesi",
      phone: "+250 788 123 456",
      table: "Table A",
      totalBets: 125000,
      platformFee: 6250,
      tokenManCommission: 5625,
      status: "Paid",
    },
    {
      id: 2,
      date: "2026-01-26",
      tokenMan: "John Doe",
      phone: "+250 788 234 567",
      table: "Table B",
      totalBets: 89000,
      platformFee: 4450,
      tokenManCommission: 4005,
      status: "Pending",
    },
    {
      id: 3,
      date: "2026-01-25",
      tokenMan: "Marie Claire",
      phone: "+250 788 345 678",
      table: "Table C",
      totalBets: 156000,
      platformFee: 7800,
      tokenManCommission: 7020,
      status: "Paid",
    },
    {
      id: 4,
      date: "2026-01-25",
      tokenMan: "Paul Kagame",
      phone: "+250 788 456 789",
      table: "Table D",
      totalBets: 98000,
      platformFee: 4900,
      tokenManCommission: 4410,
      status: "Pending",
    },
    {
      id: 5,
      date: "2026-01-24",
      tokenMan: "Jean Mutesi",
      phone: "+250 788 123 456",
      table: "Table A",
      totalBets: 112000,
      platformFee: 5600,
      tokenManCommission: 5040,
      status: "Paid",
    },
    {
      id: 6,
      date: "2026-01-24",
      tokenMan: "Sarah Uwase",
      phone: "+250 788 567 890",
      table: "Table F",
      totalBets: 67000,
      platformFee: 3350,
      tokenManCommission: 3015,
      status: "Paid",
    },
    {
      id: 7,
      date: "2026-01-23",
      tokenMan: "Eric Nzabahimana",
      phone: "+250 788 678 901",
      table: "Table G",
      totalBets: 143000,
      platformFee: 7150,
      tokenManCommission: 6435,
      status: "Paid",
    },
    {
      id: 8,
      date: "2026-01-23",
      tokenMan: "Grace Ingabire",
      phone: "+250 788 789 012",
      table: "Table H",
      totalBets: 78000,
      platformFee: 3900,
      tokenManCommission: 3510,
      status: "Pending",
    },
  ]);

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this commission record?")
    ) {
      setCommissionData(commissionData.filter((item) => item.id !== id));
      const newTotal = commissionData.length - 1;
      const newTotalPages = Math.ceil(newTotal / itemsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1);
      }
    }
  };

  const handleApprove = (id) => {
    setCommissionData(
      commissionData.map((item) =>
        item.id === id ? { ...item, status: "Paid" } : item,
      ),
    );
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this payout?")) {
      setCommissionData(
        commissionData.map((item) =>
          item.id === id ? { ...item, status: "Rejected" } : item,
        ),
      );
    }
  };

  const totalPlatformFee = commissionData.reduce(
    (sum, item) => sum + item.platformFee,
    0,
  );
  const totalTokenManCommission = commissionData.reduce(
    (sum, item) => sum + item.tokenManCommission,
    0,
  );
  const paidCommission = commissionData
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.tokenManCommission, 0);
  const pendingCommission = commissionData
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.tokenManCommission, 0);
  const uniqueTokenMen = [
    ...new Set(commissionData.map((item) => item.tokenMan)),
  ].length;

  // Calculate pagination
  const totalPages = Math.ceil(commissionData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = commissionData.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-bold text-gray-900 mb-2">
              Commission Management
            </h1>
            <p className="text-gray-600">
              Monitor and manage all commission payouts
            </p>
          </div>
        </div>

        {/* Commission Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F59E0B]">
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Date
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Token Man
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Phone
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Table
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Total Bets
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-2 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Platform Fee
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Tm Commission
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Status
                  </th>
                  <th className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-left text-xs sm:text-sm font-semibold text-white tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      {item.tokenMan}
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                      {item.phone}
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                      {item.table}
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                      {item.totalBets.toLocaleString()} RWF
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-xs sm:text-sm font-bold text-[#F59E0B] whitespace-nowrap">
                      {item.platformFee.toLocaleString()} RWF
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-xs sm:text-sm font-bold text-emerald-600 whitespace-nowrap">
                      {item.tokenManCommission.toLocaleString()} RWF
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-xs font-semibold ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Pending"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-2 py-2.5 sm:px-3 sm:py-3 lg:px-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-700 order-2 sm:order-1">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, commissionData.length)} of{" "}
              {commissionData.length} entries
            </p>
            <div className="flex flex-wrap gap-2 justify-center order-1 sm:order-2">
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className={`px-2 py-1.5 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={`px-2 py-1.5 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    currentPage === index + 1
                      ? "bg-[#F59E0B] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`px-2 py-1.5 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
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

        {/* Mobile Scroll Indicator */}
        <div className="mt-4 lg:hidden">
          <div className="text-sm text-gray-500 text-center">
            ← Scroll horizontally to see all columns →
          </div>
        </div>
      </div>
    </div>
  );
}
