import axios from 'axios';
import { useState } from 'react';
import { FaTimes, FaSpinner, FaClock, FaTag, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { GiCoffeeBeans } from 'react-icons/gi';
import Swal from 'sweetalert2';

const OrderCard = ({ coffee, onCancel }) => {
  const { _id, name, price, quantity, photo, createdAt, customerEmail, coffeeId } = coffee;
  const [isCancelling, setIsCancelling] = useState(false);

  const cancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: 'No',
      confirmButtonColor: '#b45309',
      cancelButtonColor: '#78716c',
    });

    if (result.isConfirmed) {
      setIsCancelling(true);
     try {
  await axios.patch(
    `${import.meta.env.VITE_URL}/order/cancel/${orderId}`
  );

  Swal.fire({
    icon: "success",
    title: "Order cancelled",
    text: "Your payment has been refunded successfully.",
    timer: 2000,
    showConfirmButton: false,
  });

  onCancel(orderId);
} catch (err) {
  Swal.fire({
    icon: "error",
    title: "Cancellation Failed",
    text: err.response?.data?.message || "Something went wrong.",
  });
} finally {
  setIsCancelling(false);
}
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-200 overflow-hidden">
      {/* Header: Order ID, date, status */}
      <div className="flex flex-wrap items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50/50">
        <div className="flex items-center gap-3">
          <GiCoffeeBeans className="text-xl text-amber-900" />
          <span className="font-semibold text-stone-800">Order #{_id.slice(-6)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-500">
          <FaClock className="text-stone-400" size={12} />
          <span>{formatTimeAgo(createdAt)}</span>
        </div>
      </div>

      {/* Body: compact horizontal layout */}
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Coffee image, name, price/qty */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
            <img
              src={photo || 'https://via.placeholder.com/100?text=Coffee'}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-stone-800 truncate">{name || 'Coffee'}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm">
              <span className="text-amber-900 font-semibold">${price || '0.00'}</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-600">Qty: {quantity || 1}</span>
              <span className="text-stone-400">·</span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <FaTag size={10} />
                {coffeeId?.slice(-6) || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Customer email */}
        <div className='flex gap-8 md:gap-12'>

        <div className="flex items-center gap-2 text-sm text-stone-600  md:pl-4 md:border-l border-stone-200">
          <FaEnvelope className="text-stone-400" size={14} />
          <span className="truncate max-w-[160px]">{customerEmail}</span>
        </div>

        {/* Order placed date */}
        <div className="flex items-center gap-2 text-sm text-stone-500  md:pl-4 md:border-l border-stone-200">
          <FaCalendarAlt className="text-stone-400" size={14} />
          <span className="whitespace-nowrap">
            {new Date(createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
              </div>
        </div>

      {/* Actions */}
<div className="flex flex-wrap justify-end gap-2">
  {coffee.status === "cancelled" ? (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-50 text-gray-600 border border-gray-200">
      Refunded
    </span>
  ) : (
    <button
      onClick={() => cancelOrder(_id)}
      disabled={isCancelling}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
        isCancelling
          ? "bg-stone-200 text-stone-500 cursor-not-allowed"
          : "text-red-600 hover:bg-gray-50 border border-gray-100 shadow-xs"
      }`}
    >
      {isCancelling ? (
        <>
          <FaSpinner className="animate-spin" /> Cancelling...
        </>
      ) : (
        <>
          <FaTimes size={14} /> Cancel
        </>
      )}
    </button>
  )}
</div>
      </div>
    </div>
  );
};

// Helper function
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  return 'over a month ago';
};

export default OrderCard;