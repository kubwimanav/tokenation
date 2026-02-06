import { useState, useEffect } from "react";
import {
  FaMobileAlt,
  FaPhone,
  FaTrophy,
  FaFire,
  FaBolt,
  FaStar,
  FaCrown,
  FaRocket,
  FaCoins,
  FaShieldAlt,
  FaUsers,
  FaGem,
  FaChevronRight,
  FaCheck,
  FaGamepad,
} from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import billiardBg from "../assets/billiard.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

function Home({ selectedLanguage, translations }) {
  const navigate = useNavigate();

  const [liveGames, setLiveGames] = useState([
    {
      id: 1,
      player1: "Pro***892",
      player2: "King***445",
      stake: "5,000 Tokens",
      viewers: 234,
      game: "8-Ball",
    },
    {
      id: 2,
      player1: "Ace***267",
      player2: "Boss***891",
      stake: "8,500 Tokens",
      viewers: 456,
      game: "9-Ball",
    },
    {
      id: 3,
      player1: "Star***156",
      player2: "Champ***789",
      stake: "3,200 Tokens",
      viewers: 189,
      game: "Snooker",
    },
    {
      id: 4,
      player1: "Elite***445",
      player2: "Master***267",
      stake: "12,000 Tokens",
      viewers: 678,
      game: "Pool",
    },
  ]);

  const [stats, setStats] = useState({
    players: 25715,
    games: 1676,
    payout: 3345000,
  });

  useEffect(() => {
    AOS.init({
      duration: 400,
      once: true,
    });

    // Update stats
    const statsInterval = setInterval(() => {
      setStats((prev) => ({
        players: prev.players + Math.floor(Math.random() * 10),
        games: prev.games + Math.floor(Math.random() * 5),
        payout: prev.payout + Math.floor(Math.random() * 5000),
      }));
    }, 3000);

    // Update live games
    const gamesInterval = setInterval(() => {
      setLiveGames((prev) => {
        const newGame = {
          id: Date.now(),
          player1: `${["Pro", "King", "Ace", "Boss", "Star"][Math.floor(Math.random() * 5)]}***${Math.floor(Math.random() * 900 + 100)}`,
          player2: `${["Elite", "Master", "Champ", "Legend", "Hero"][Math.floor(Math.random() * 5)]}***${Math.floor(Math.random() * 900 + 100)}`,
          stake: `${Math.floor(Math.random() * 15000 + 3000).toLocaleString()} Tokens`,
          viewers: Math.floor(Math.random() * 500 + 100),
          game: ["8-Ball", "9-Ball", "Snooker", "Pool"][
            Math.floor(Math.random() * 4)
          ],
        };
        return [newGame, ...prev.slice(0, 3)];
      });
    }, 5000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(gamesInterval);
    };
  }, []);

const billiardGames = [
  {
    name: "8-Ball Pool",
    image: "https://source.unsplash.com/800x600/?8-ball,pool",
    icon: "🎱",
    players: "12.4K",
    stakes: "500-50K Tokens",
    color: "from-blue-600 to-cyan-500",
    hot: true,
  },
  {
    name: "9-Ball Rush",
    image: "https://source.unsplash.com/800x600/?9-ball,pool",
    icon: "🟡",
    players: "8.7K",
    stakes: "1K-100K Tokens",
    color: "from-yellow-600 to-orange-500",
  },
  {
    name: "Snooker Pro",
    image: "https://source.unsplash.com/800x600/?snooker,table",
    icon: "🔴",
    players: "5.3K",
    stakes: "2K-200K Tokens",
    color: "from-green-600 to-emerald-500",
  },
  {
    name: "Speed Pool",
    image: "https://source.unsplash.com/800x600/?pool,action",
    icon: "⚡",
    players: "9.1K",
    stakes: "300-30K Tokens",
    color: "from-purple-600 to-pink-500",
    hot: true,
  },
  {
    name: "Straight Pool",
    image: "https://source.unsplash.com/800x600/?billiards,table",
    icon: "🎯",
    players: "4.2K",
    stakes: "1K-25K Tokens",
    color: "from-red-600 to-rose-500",
  },
  {
    name: "Pool Master",
    image: "https://source.unsplash.com/800x600/?professional,pool",
    icon: "👑",
    players: "6.8K",
    stakes: "2K-80K Tokens",
    color: "from-indigo-600 to-blue-500",
  },
  {
    name: "Billiard Blitz",
    image: "https://source.unsplash.com/800x600/?billiard,game",
    icon: "💥",
    players: "7.5K",
    stakes: "500-40K Tokens",
    color: "from-pink-600 to-purple-500",
  },
  {
    name: "Classic Pool",
    image: "https://source.unsplash.com/800x600/?classic,pool",
    icon: "🎱",
    players: "5.9K",
    stakes: "800-60K Tokens",
    color: "from-teal-600 to-cyan-500",
  },
];



  return (
    <div className="relative w-full overflow-x-hidden bg-[#0d1f1f]">
      {/* ============================================
          HEADER WITH HERO
          ============================================ */}
      <section className="relative min-h-112.5 flex items-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${billiardBg})`,
            filter: "brightness(0.5)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left - Main content */}
            <div className="text-center">
              {/* Logo/Brand */}
              <div className="mb-4 sm:mb-6">
                <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
                  <span className="text-emerald-400">Token</span>
                  <span className="text-yellow-400"> nation</span>
                </h1>
                <p className="text-base sm:text-lg text-zinc-300 font-medium">
                  Rwanda's Billiard Betting Platform
                </p>
              </div>

              {/* Live stats bar */}
              <div className="bg-zinc-900/80 backdrop-blur-xl p-5 rounded-2xl border border-zinc-800/50 mb-5 max-w-2xl mx-auto lg:mx-auto">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <div className="text-lg font-black text-emerald-400 mb-1">
                      {stats.players.toLocaleString()}
                    </div>
                    <div className="text-[12px] text-zinc-400 tracking-wide">
                      Players Online
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-yellow-400 mb-1">
                      {stats.games.toLocaleString()}
                    </div>
                    <div className="text-[12px] text-zinc-400 tracking-wide">
                      Live Games
                    </div>
                  </div>
                  <div>
                    <div className="text-xm font-black text-blue-400 mb-1">
                      {(stats.payout / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-[12px] text-zinc-400  tracking-wide">
                      Paid Today
                    </div>
                  </div>
                </div>

                {/* Two Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="py-2.5 bg-linear-to-r from-emerald-500 to-green-600 text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
                  >
                    Join Now
                  </button>
                  <button
                    onClick={() => navigate("/game")}
                    className="py-2.5 bg-zinc-800 text-white font-bold text-sm rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-all"
                  >
                    Book Table
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="flex items-center gap-2 px-3 py-2 bg-zinc-900/60 text-xs text-zinc-300 rounded-lg border border-zinc-800">
                  <FaShieldAlt className="text-green-400 text-sm" />
                  Secure Escrow System
                </span>
                <span className="flex items-center gap-2 px-3 py-2 bg-zinc-900/60 text-xs text-zinc-300 rounded-lg border border-zinc-800">
                  <FaBolt className="text-yellow-400 text-sm" />
                  MTN MoMo Integration
                </span>
                <span className="flex items-center gap-2 px-3 py-2 bg-zinc-900/60 text-xs text-zinc-300 rounded-lg border border-zinc-800">
                  <FaCheck className="text-blue-400 text-sm" />
                  Fair Play Verified
                </span>
              </div>
            </div>

            {/* Right - Live games feed */}
            <div className="bg-zinc-900/90 backdrop-blur-xl p-5 rounded-2xl border border-zinc-800/50">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  </div>
                  Live Games
                </h3>
                <span className="text-xs text-emerald-400 font-semibold">
                  {liveGames.length} active
                </span>
              </div>

              <div className="space-y-3 max-h-87.5 overflow-y-auto custom-scrollbar">
                {liveGames.slice(0, 3).map((game) => (
                  <div
                    key={game.id}
                    className="bg-zinc-800/50 p-4 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-700/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                          P1
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {game.player1}
                          </div>
                          <div className="text-xs text-zinc-500">VS</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-yellow-400">
                          {game.game}
                        </div>
                        <div className="text-xs text-emerald-400 font-semibold">
                          Token: 500
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                          P2
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {game.player2}
                          </div>
                          <div className="text-xs text-zinc-400">
                            Stake: {game.stake}
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-linear-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-colors">
                        Bet Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/game")}
                className="w-full mt-4 py-2.5 bg-linear-to-r from-emerald-600 to-green-700 text-white text-sm font-bold rounded-xl hover:from-emerald-500 hover:to-green-600 transition-all"
              >
                View All Live Games
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          BILLIARD GAMES SECTION
          ============================================ */}
      <section className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Available Billiard Games
            </h2>
            <p className="text-base text-zinc-400">
              Buy tokens and place bets on your favorite game
            </p>
          </div>

          {/* Game grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {billiardGames.map((game, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden hover:ring-2 hover:ring-emerald-500 transition-all cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={idx * 30}
                onClick={() => navigate("/login")}
              >
                {/* Hot badge */}
                {game.hot && (
                  <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-linear-to-r from-orange-500 to-red-500 text-white text-xs font-black rounded-full flex items-center gap-1">
                    <FaFire className="text-xs" />
                    HOT
                  </div>
                )}

                {/* Background Image */}
                <div className="relative h-36 overflow-hidden">
                  {game.image ? (
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : null}
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${game.color}`}
                  />
                  {/* Icon display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl transform group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-4 bg-zinc-900">
                  {/* Game name */}
                  <h3 className="text-base font-bold text-white mb-2">
                    {game.name}
                  </h3>

                  {/* Details */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-[10px] text-emerald-400" />
                        Players:
                      </span>
                      <span className="font-semibold text-white">
                        {game.players}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span className="flex items-center gap-1">
                        <FaCoins className="text-[10px] text-yellow-400" />
                        Stakes:
                      </span>
                      <span className="font-semibold text-white">
                        {game.stakes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS - SIMPLE GAME FLOW
          ============================================ */}
      <section className="relative py-12 px-4 bg-linear-to-b from-black/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-7">
            <h2 className="text-2xl font-medium text-white mb-2">
              How It Works
            </h2>
            <p className="text-base text-zinc-400">Simple Game Flow</p>
          </div>

          {/* Game Flow Explanation - Card Style */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div
                className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-emerald-500 transition-all"
                data-aos="fade-up"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Buy Tokens
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Pay Token Man to access table
                  </p>
                </div>
              </div>

              <div
                className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-yellow-500 transition-all"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Place Bet (Optional)
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Wager on your game if you want
                  </p>
                </div>
              </div>

              <div
                className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-blue-500 transition-all"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Play Game
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Compete and show your skills
                  </p>
                </div>
              </div>

              <div
                className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-purple-500 transition-all"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Get Paid
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Winner receives payout instantly
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tokens and Bets Cards - Same Width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Tokens Card */}
            <div
              className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-emerald-500 transition-all"
              data-aos="fade-up"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-3">
                  <FaCoins className="text-xl text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Tokens</h3>
                <p className="text-sm text-emerald-400">Pay-for-Play Credits</p>
              </div>

              <div className="space-y-3 text-center">
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">
                    Buy directly from Token Man
                  </span>{" "}
                  - Pay to access the table
                </p>
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">
                    No platform fee
                  </span>{" "}
                  - Payment goes straight to venue
                </p>
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">
                    Required to play
                  </span>{" "}
                  - Tokens unlock table access
                </p>
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">
                    Tables stay open
                  </span>{" "}
                  - Buying tokens doesn't lock the table
                </p>
              </div>
            </div>

            {/* Bets Card */}
            <div
              className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-yellow-500 transition-all"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mb-3">
                  <FaTrophy className="text-xl text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Bets</h3>
                <p className="text-sm text-yellow-400">Optional Wagering</p>
              </div>

              <div className="space-y-3 text-center">
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">
                    Completely optional
                  </span>{" "}
                  - Play without betting if you prefer
                </p>
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">
                    Secure escrow system
                  </span>{" "}
                  - All bets held safely until game ends
                </p>
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">
                    Winner takes all
                  </span>{" "}
                  - Payout confirmed by Token Man via MTN MoMo
                </p>
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-white">
                    Platform commission applies
                  </span>{" "}
                  - Small fee on winnings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHY CHOOSE US
          ============================================ */}
      <section className="relative py-12 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-7">
            <h2 className="text-2xl  font-bold text-white mb-2">
              Why Token Nation?
            </h2>
            <p className="text-base text-zinc-400">
              Hybrid platform with Web PWA & USSD access
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div
              className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-emerald-500 transition-all"
              data-aos="fade-up"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-3">
                  <FaShieldAlt className="text-xl text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Secure Escrow
                </h3>
                <p className="text-sm text-zinc-400">
                  All bets held safely in escrow until game ends
                </p>
              </div>
            </div>

            <div
              className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-yellow-500 transition-all"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center mb-3">
                  <FaMobileAlt className="text-xl text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Dual Access
                </h3>
                <p className="text-sm text-zinc-400">
                  Play via Web App (smartphones) or USSD (any phone)
                </p>
              </div>
            </div>

            <div
              className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-blue-500 transition-all"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3">
                  <FaBolt className="text-xl text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  MTN MoMo
                </h3>
                <p className="text-sm text-zinc-400">
                  Fast deposits and withdrawals via MTN Mobile Money
                </p>
              </div>
            </div>

            <div
              className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-purple-500 transition-all"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-3">
                  <FaCheck className="text-xl text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Transparent
                </h3>
                <p className="text-sm text-zinc-400">
                  All transactions logged for full traceability
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER CTA
          ============================================ */}
      <section className="relative py-8 sm:py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl sm:text-5xl mb-3">🎱</div>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
            Ready to Play & Bet?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mb-4">
            Buy tokens, place bets, and win real money
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 sm:px-8 py-3 bg-linear-to-r from-emerald-500 to-green-600 text-white font-medium text-sm sm:text-base rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* ============================================
          CUSTOM SCROLLBAR & ANIMATIONS
          ============================================ */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.8);
        }
      `}</style>
    </div>
  );
}

export default Home;
