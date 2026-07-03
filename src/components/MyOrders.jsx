import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import OrderCard from "./OrderCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaBox, FaShoppingBag, FaPlusCircle } from "react-icons/fa";
import Loading from "../ui/Loading";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCancel = (id) => {
    setOrders((prev) =>
      prev.map((order) => order._id === id ?
        {
          ...order,
          status: "cancelled",
          refunded: true,
        }
        : order
      )
    );
  };

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axiosSecure
      .get(`/myOrders/${user.email}`)
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch(() => {
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [user?.email, axiosSecure]);

  // Sort orders
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );



  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
            My Orders
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Track and manage all your coffee purchases in one place.
          </p>
        </div>

        
        {
          loading ? (
            <Loading />
          ) : orders.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl border border-stone-100 shadow-sm">
              <FaShoppingBag className="w-16 h-16 text-stone-300 mb-4" />
              <h3 className="text-2xl font-semibold text-stone-700">No Orders Yet</h3>
              <p className="text-stone-500 mt-2 max-w-sm text-center">
                You haven't placed any orders. Browse our collection and start your coffee journey.
              </p>
              <Link
                to="/allCoffees"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-900 text-white rounded-xl font-medium hover:bg-amber-800 transition shadow-lg shadow-amber-900/20"
              >
                <FaPlusCircle />
                Shop Coffee
              </Link>
            </div>
          ) : (
            <>
              {/* Orders Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-stone-600 text-sm">
                  Showing <span className="font-semibold text-stone-900">{orders.length}</span>{" "}
                  {orders.length === 1 ? "order" : "orders"}
                </p>
              </div>

              {/* Orders List */}
              <div className="grid grid-cols-1 gap-5">
                {sortedOrders.map((order, index) => (
                  <div
                    key={order._id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <OrderCard coffee={order} onCancel={handleCancel} />
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

export default MyOrders;