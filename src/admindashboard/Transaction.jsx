import React, { useState } from "react";
import {
  DollarSign,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Trophy,
  TrendingUp,
} from "lucide-react";

export default function Transaction() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dateRange, setDateRange] = useState("today");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState(null);

  const stats = [
    {
      label: "Total Volume Today",
      value: "2,450,000 RWF",
      change: "+12.5%",
      icon: TrendingUp,
      color: "blue",
    },
    {
      label: "Token Purchases",
      value: "1,200,000 RWF",
      count: "245 transactions",
      icon: Coins,
      color: "green",
    },
    {
      label: "Bets in Escrow",
      value: "850,000 RWF",
      count: "89 active bets",
      icon: Clock,
      color: "amber",
    },
    {
      label: "Payouts Completed",
      value: "400,000 RWF",
      count: "34 payouts",
      icon: CheckCircle,
      color: "emerald",
    },
  ];

  const transactions = [
    {
      id: "TXN-2025-001234",
      type: "token_purchase",
      player: "Jean Munyankindi",
      phone: "+250788123456",
      tokenMan: "Eric Nkusi",
      amount: 5000,
      status: "completed",
      timestamp: "2025-01-26 14:32:15",
      table: "Table A - Kimironko",
      method: "MTN MoMo",
      platformFee: 0,
      details: { tokens: 50, rate: "100 RWF/token" },
    },
    {
      id: "TXN-2025-001233",
      type: "bet_placed",
      player: "Marie Uwase",
      phone: "+250789234567",
      tokenMan: "Eric Nkusi",
      amount: 10000,
      status: "in_escrow",
      timestamp: "2025-01-26 14:28:45",
      table: "Table A - Kimironko",
      method: "MTN MoMo",
      platformFee: 500,
      details: { betAmount: 10000, escrowStatus: "held", gameId: "GAME-456" },
    },
    {
      id: "TXN-2025-001232",
      type: "payout",
      player: "Patrick Habimana",
      phone: "+250788345678",
      tokenMan: "Eric Nkusi",
      amount: 45000,
      status: "completed",
      timestamp: "2025-01-26 14:15:22",
      table: "Table B - Nyamirambo",
      method: "MTN MoMo",
      platformFee: 2250,
      tokenManCommission: 2250,
      details: {
        winnings: 45000,
        totalPool: 50000,
        winner: true,
        gameId: "GAME-455",
      },
    },
    {
      id: "TXN-2025-001231",
      type: "bet_placed",
      player: "Alice Ingabire",
      phone: "+250789456789",
      tokenMan: "David Mugisha",
      amount: 8000,
      status: "in_escrow",
      timestamp: "2025-01-26 14:10:08",
      table: "Table C - Kicukiro",
      method: "MTN MoMo",
      platformFee: 400,
      details: { betAmount: 8000, escrowStatus: "held", gameId: "GAME-457" },
    },
    {
      id: "TXN-2025-001230",
      type: "token_purchase",
      player: "Joseph Tuyisenge",
      phone: "+250788567890",
      tokenMan: "David Mugisha",
      amount: 3000,
      status: "completed",
      timestamp: "2025-01-26 13:58:33",
      table: "Table C - Kicukiro",
      method: "MTN MoMo",
      platformFee: 0,
      details: { tokens: 30, rate: "100 RWF/token" },
    },
    {
      id: "TXN-2025-001229",
      type: "payout",
      player: "Grace Mukamana",
      phone: "+250789678901",
      tokenMan: "Eric Nkusi",
      amount: 30000,
      status: "pending",
      timestamp: "2025-01-26 13:45:17",
      table: "Table A - Kimironko",
      method: "MTN MoMo",
      platformFee: 1500,
      tokenManCommission: 1500,
      details: {
        winnings: 30000,
        totalPool: 35000,
        winner: true,
        gameId: "GAME-454",
        awaitingConfirmation: true,
      },
    },
  ];

  const getTypeConfig = (type) => {
    const configs = {
      token_purchase: {
        label: "Token Purchase",
        icon: Coins,
        color: "text-green-600 bg-green-50 border-green-200",
        arrow: ArrowDownRight,
      },
      bet_placed: {
        label: "Bet Placed",
        icon: DollarSign,
        color: "text-amber-600 bg-amber-50 border-amber-200",
        arrow: ArrowUpRight,
      },
      payout: {
        label: "Payout",
        icon: Trophy,
        color: "text-blue-600 bg-blue-50 border-blue-200",
        arrow: ArrowDownRight,
      },
    };
    return configs[type] || configs.token_purchase;
  };

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        label: "Completed",
        icon: CheckCircle,
        color: "text-green-600 bg-green-50",
      },
      in_escrow: {
        label: "In Escrow",
        icon: Clock,
        color: "text-amber-600 bg-amber-50",
      },
      pending: {
        label: "Pending",
        icon: AlertCircle,
        color: "text-orange-600 bg-orange-50",
      },
      failed: {
        label: "Failed",
        icon: XCircle,
        color: "text-red-600 bg-red-50",
      },
    };
    return configs[status] || configs.pending;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
        <p className="text-slate-600 mt-1">
          Full transaction traceability and audit trail
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border border-slate-200 p-5"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}
                >
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
                {stat.change && (
                  <span className="text-green-600 text-sm font-medium">
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-4">
                {stat.value}
              </h3>
              <p className="text-slate-600 text-sm mt-1">{stat.label}</p>
              {stat.count && (
                <p className="text-slate-500 text-xs mt-2">{stat.count}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by ID, phone, player name..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in_escrow">In Escrow</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Export */}
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-lg border-t border-x border-slate-200">
        <div className="flex border-b border-slate-200">
          {["all", "token_purchase", "bet_placed", "payout"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                selectedTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === "all"
                ? "All Transactions"
                : tab
                    .split("_")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-b-lg border-x border-b border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Token Man
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {transactions.map((txn) => {
                const typeConfig = getTypeConfig(txn.type);
                const statusConfig = getStatusConfig(txn.status);
                const TypeIcon = typeConfig.icon;
                const StatusIcon = statusConfig.icon;
                const isExpanded = expandedRow === txn.id;

                return (
                  <React.Fragment key={txn.id}>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg ${typeConfig.color} border flex items-center justify-center`}
                          >
                            <TypeIcon size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {txn.id}
                            </p>
                            <p className="text-xs text-slate-500">
                              {typeConfig.label}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {txn.player}
                        </p>
                        <p className="text-xs text-slate-500">{txn.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-900">{txn.tokenMan}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-900">{txn.table}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">
                          {txn.amount.toLocaleString()} RWF
                        </p>
                        {txn.platformFee > 0 && (
                          <p className="text-xs text-slate-500">
                            Fee: {txn.platformFee.toLocaleString()} RWF
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
                        >
                          <StatusIcon size={14} />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">
                          {txn.timestamp.split(" ")[1]}
                        </p>
                        <p className="text-xs text-slate-500">
                          {txn.timestamp.split(" ")[0]}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setExpandedRow(isExpanded ? null : txn.id)
                          }
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                          Details
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {isExpanded && (
                      <tr className="bg-slate-50">
                        <td colSpan="8" className="px-6 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-slate-500 font-medium mb-1">
                                Payment Method
                              </p>
                              <p className="text-sm text-slate-900">
                                {txn.method}
                              </p>
                            </div>
                            {txn.details.tokens && (
                              <>
                                <div>
                                  <p className="text-xs text-slate-500 font-medium mb-1">
                                    Tokens
                                  </p>
                                  <p className="text-sm text-slate-900">
                                    {txn.details.tokens} tokens
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-500 font-medium mb-1">
                                    Rate
                                  </p>
                                  <p className="text-sm text-slate-900">
                                    {txn.details.rate}
                                  </p>
                                </div>
                              </>
                            )}
                            {txn.details.gameId && (
                              <div>
                                <p className="text-xs text-slate-500 font-medium mb-1">
                                  Game ID
                                </p>
                                <p className="text-sm text-slate-900">
                                  {txn.details.gameId}
                                </p>
                              </div>
                            )}
                            {txn.details.escrowStatus && (
                              <div>
                                <p className="text-xs text-slate-500 font-medium mb-1">
                                  Escrow Status
                                </p>
                                <p className="text-sm text-slate-900 capitalize">
                                  {txn.details.escrowStatus}
                                </p>
                              </div>
                            )}
                            {txn.tokenManCommission && (
                              <div>
                                <p className="text-xs text-slate-500 font-medium mb-1">
                                  Token Man Commission
                                </p>
                                <p className="text-sm text-slate-900">
                                  {txn.tokenManCommission.toLocaleString()} RWF
                                </p>
                              </div>
                            )}
                            {txn.details.totalPool && (
                              <div>
                                <p className="text-xs text-slate-500 font-medium mb-1">
                                  Total Pool
                                </p>
                                <p className="text-sm text-slate-900">
                                  {txn.details.totalPool.toLocaleString()} RWF
                                </p>
                              </div>
                            )}
                            {txn.details.awaitingConfirmation && (
                              <div className="col-span-2">
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                  <p className="text-xs text-amber-800 font-medium flex items-center gap-2">
                                    <AlertCircle size={14} />
                                    Awaiting Token Man MoMo PIN Confirmation
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing 1 to 6 of 234 transactions
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm">
              3
            </button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
