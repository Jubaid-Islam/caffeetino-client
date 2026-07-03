import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CoffeeCard from "./CoffeeCard";
import { FaFilter, FaSortAmountDown, FaSortAmountUp, FaSortAlphaDown } from "react-icons/fa";

const AllCoffees = () => {
  const data = useLoaderData();
  const [coffees, setCoffees] = useState([...(data?.data || [])].reverse());
  const [sortBy, setSortBy] = useState("default");

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sorted = [...coffees];
    switch (sortType) {
      case "price-asc":
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted = [...(data?.data || [])].reverse();
        break;
    }
    setCoffees(sorted);
  };

  // Sort button
  const sortOptions = [
    { key: "default", label: "Default", icon: null },
    { key: "price-asc", label: "Price: Low → High", icon: <FaSortAmountUp className="inline" /> },
    { key: "price-desc", label: "Price: High → Low", icon: <FaSortAmountDown className="inline" /> },
    { key: "name", label: "Name A–Z", icon: <FaSortAlphaDown className="inline" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative">
        <div className="container px-4 py-10 sm:py-16 text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 leading-tight">
            All Coffees
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto mt-3">
            Discover our premium selection of hand-roasted specialty coffees, sourced from the finest estates.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8 sm:py-12">
        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-stone-100 mb-8">
          <div className="flex items-center gap-3 text-stone-700">
            <FaFilter className="text-amber-900" />
            <span className="font-semibold text-sm">Sort by:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSort(option.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  sortBy === option.key
                    ? "bg-amber-900 text-white shadow-md shadow-amber-900/20"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900"
                }`}
              >
                {option.icon && <span className="text-xs">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count, optional badge */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-stone-600 text-sm">
            Showing <span className="font-semibold text-stone-900">{coffees.length}</span> products
          </p>
          <span className="hidden sm:inline text-xs text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
            Freshly roasted • Free shipping over $25
          </span>
        </div>

        {/* Coffee Grid */}
        {coffees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {coffees.map((coffee, index) => (
              <div
                key={coffee._id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CoffeeCard coffee={coffee} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 rounded-3xl border border-stone-100">
            <p className="text-stone-500 text-lg">No coffees found</p>
            <p className="text-stone-400 text-sm mt-1">Check back later for new arrivals</p>
          </div>
        )}
      </div>

      {/* Custom animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default AllCoffees;