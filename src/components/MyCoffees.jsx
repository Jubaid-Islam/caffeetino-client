
import { useLoaderData, Link } from "react-router-dom";
import CoffeeCard from "./CoffeeCard";
import { FaCoffee, FaPlusCircle } from "react-icons/fa";

const MyCoffees = () => {
  const data = useLoaderData();
  const coffees = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
            My Coffees
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Manage your listed coffees. Add new ones or update existing entries.
          </p>
        </div>

        {/* Coffee List Section */}

        {coffees.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl border border-stone-100 shadow-sm">
            <FaCoffee className="w-16 h-16 text-stone-300 mb-4" />
            <h3 className="text-2xl font-semibold text-stone-700">No Coffees Added Yet</h3>
            <p className="text-stone-500 mt-2 max-w-sm text-center">
              Start by adding your first coffee to the collection. It only takes a minute.
            </p>
            <Link
              to="/addCoffee"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-900 text-white rounded-xl font-medium hover:bg-amber-800 transition shadow-lg shadow-amber-900/20"
            >
              <FaPlusCircle />
              Add Your First Coffee
            </Link>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-stone-600 text-sm">
                Showing <span className="font-semibold text-stone-900">{coffees.length}</span> {coffees.length === 1 ? "coffee" : "coffees"}
              </p>
              <Link
                to="/addCoffee"
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors "
              >
                <FaPlusCircle />
                Add New
              </Link>
            </div>

            {/* Coffee Grid */}
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
          </>
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

export default MyCoffees;