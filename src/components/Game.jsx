import React, { useState } from "react";
import { X } from "lucide-react";
import { useGetGameQuery } from "../Api/game/game";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const BilliardBookingSystem = () => {
  const { data: backendData, isLoading, isError } = useGetGameQuery();

  const [bookedTables, setBookedTables] = useState([]);
  const [bettedTables, setBettedTables] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [popupTable, setPopupTable] = useState(null);
  const [formData, setFormData] = useState({ phone: "" });
  const [isBooking, setIsBooking] = useState(false);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time to 12-hour format
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

  // Get unique locations from backend data
  const getUniqueLocations = () => {
    if (!backendData || backendData.length === 0) return [];
    const locations = backendData.map((table) => table.location);
    return [...new Set(locations)];
  };

  // Filter tables by selected location
  const getTables = () => {
    if (!backendData || backendData.length === 0) return [];
    if (selectedLocation === "All") return backendData;
    return backendData.filter((table) => table.location === selectedLocation);
  };

  const handleBook = async (tableId) => {
    if (!formData.phone) {
      Notify.warning("Please enter your phone number!");
      return;
    }

    setIsBooking(true);

    try {
      const response = await fetch(
        "https://token-backend-omega.vercel.app/api/games/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameId: popupTable.id,
            phone: formData.phone,
            paymentAmount: parseInt(popupTable.tokenPrice) || 4000,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setBookedTables([...bookedTables, tableId]);
        Notify.success("Table booked successfully!");
        setPopupTable(null);
        setFormData({ phone: "" });
      } else {
        Notify.failure(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      Notify.failure("Network error. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const handleBet = (tableId) => {
    if (!bookedTables.includes(tableId)) {
      Notify.warning("Please book this table first before placing a bet!");
      return;
    }

    if (bettedTables.includes(tableId)) {
      setBettedTables(bettedTables.filter((id) => id !== tableId));
    } else {
      setBettedTables([...bettedTables, tableId]);
    }
  };

  const openPopup = (table) => {
    setPopupTable(table);
    setFormData({ phone: "" });
  };

  const closePopup = () => {
    setPopupTable(null);
    setFormData({ phone: "" });
  };

  // Calculate end time (30 minutes after start time)
  const calculateEndTime = (startTime) => {
    if (!startTime) return "";
    const [hours, minutes] = startTime.split(":");
    const start = new Date();
    start.setHours(parseInt(hours), parseInt(minutes), 0);
    start.setMinutes(start.getMinutes() + 30);
    return start.toTimeString().slice(0, 5);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading tables...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 shadow-lg rounded-3xl border border-red-200">
          <p className="text-red-600 text-lg font-bold">Error loading data</p>
          <p className="text-gray-500 text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 pt-4 to-gray-100">
      {/* Popup Modal */}
      {popupTable && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-yellow-400 p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-black">
                  {popupTable.tableNumber || "Table"}
                </h2>
                <p className="text-black font-semibold text-lg">
                  {popupTable.gameType || "Billiard"}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm text-black">
                <p className="font-medium">{popupTable.location}</p>
                <p className="font-medium">{formatDate(popupTable.gameDate)}</p>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+250 xxx xxx xxx"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900 text-sm"
                />
              </div>

              <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">
                    Amount
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {popupTable.tokenPrice} Rwf
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleBook(popupTable.id)}
                disabled={isBooking}
                className="w-full py-2.5 bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-base transition-all rounded shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? "Booking..." : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Tokennation
            </h1>
            <p className="text-gray-600 text-sm sm:text-base font-semibold">
              Book Tables & Place Your Bets
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Filter Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white p-4 shadow-md rounded-2xl border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-bold">Filter by Location:</span>
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none text-gray-900 text-sm font-semibold bg-white min-w-50"
              >
                <option value="All">All Locations</option>
                {getUniqueLocations().map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="flex flex-wrap gap-4 sm:gap-5">
          {getTables().map((table) => (
            <div
              key={table.id}
              className="bg-white shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden rounded-lg w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
            >
              <div className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 mb-0.5 truncate">
                      {table.playerAName}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium truncate">
                      vs {table.playerBName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBet(table.id)}
                    disabled={!bookedTables.includes(table.id)}
                    className={`px-3 py-1.5 rounded text-xs font-bold shrink-0 ml-2 transition-all ${
                      !bookedTables.includes(table.id)
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : bettedTables.includes(table.id)
                          ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
                          : "bg-purple-500 text-white hover:bg-purple-600 shadow-md"
                    }`}
                  >
                    {bettedTables.includes(table.id) ? "✓ Bet" : "Bet"}
                  </button>
                </div>

                <div className="border-t-2 border-yellow-400 my-2"></div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <p className="text-xs font-bold text-gray-500 mb-0.5">
                      Start
                    </p>
                    <span className="text-xs font-bold text-gray-900">
                      {formatTime(table.scheduledStartTime)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 mb-0.5">
                      End
                    </p>
                    <span className="text-xs font-bold text-gray-900">
                      {formatTime(table.scheduledEndTime)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-2">
                  <div className="text-xs">
                    <span className="text-gray-600 font-medium truncate">
                      {table.tokenMan}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-600 font-medium">
                      {formatDate(table.gameDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">
                      {table.location}
                    </span>
                    <span className="font-bold text-gray-900">
                      {table.tokenPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openPopup(table)}
                  className={`w-full py-2 font-bold text-xs transition-all rounded shadow-md ${
                    bookedTables.includes(table.id)
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-yellow-400 text-black hover:bg-yellow-500"
                  }`}
                >
                  {bookedTables.includes(table.id) ? "✓ Booked" : "Book Table"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {getTables().length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white p-8 shadow-lg rounded-3xl inline-block border border-gray-200">
              <p className="text-gray-900 text-lg font-bold">No tables found</p>
              <p className="text-gray-500 text-sm mt-2 font-medium">
                Try selecting a different location
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        input[type="time"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default BilliardBookingSystem;
