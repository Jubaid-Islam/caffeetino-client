import axios from 'axios';
import { FaCoffee, FaUserCircle, FaCalendarAlt, FaTag, FaEnvelope, FaClock } from 'react-icons/fa';
import Swal from "sweetalert2";
import { GiCoffeeBeans } from 'react-icons/gi';
const OrderCard = ({ coffee, onCancel }) => {
    const { _id, name, price, quantity, photo, createdAt, customerEmail, coffeeId } = coffee




    const cancelOrder = async (orderId) => {

        // Step 1: Confirmation Alert
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this order?",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel",
            cancelButtonText: "No",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_URL}/order/${orderId}`);

                const Toast = Swal.mixin({
                    toast: true, position: "top-end", showConfirmButton: false, timer: 1500, timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer
                        toast.onmouseleave = Swal.resumeTimer
                    }
                })
                Toast.fire({
                    icon: "success", title: "  Order cancel successfully"
                })

                onCancel(orderId);

            } catch (err) {
                console.log(err);

                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                });
            }
        }
    };


    return (
        <div className='max-w-6xl mx-auto'>

            {/* Orders Grid */}
            <div>
                <div
                    className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100'
                >
                    <div className='p-6'>
                        {/* Order Header */}
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                            <div className='flex items-center gap-3'>
                                <div className='p-3 bg-gray-100 rounded-lg'>
                                    <GiCoffeeBeans className='text-2xl text-amber-600' />
                                </div>
                                <div>
                                    <h3 className='text-xl font-semibold text-gray-900'>Order: {_id}</h3>

                                </div>
                            </div>
                            <div className='flex items-center gap-1 text-sm text-gray-600'>
                                <FaClock className='text-xs' />
                                <span> {formatTimeAgo(createdAt)}</span>
                            </div>
                        </div>

                        {/* Order Details Grid */}
                        <div className='grid md:grid-cols-3 gap-6'>
                            {/* Coffee Information */}
                            <div className='space-y-4'>
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-3 p-3 bg-amber-50 rounded-lg'>
                                        <div className='w-12 h-12 bg-gray-200 rounded-lg overflow-hidden'>
                                            <img
                                                src={photo || 'https://via.placeholder.com/100'}
                                                alt={customerEmail}
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-gray-900'>{name || 'Coffee Name'}</h4>
                                            <div className='flex items-center gap-2 text-sm text-gray-600'>
                                                <FaTag />
                                                <span>ID: {coffeeId?.slice(-6)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 gap-3'>
                                        <div className='p-3 bg-gray-50 rounded-lg'>
                                            <div className='text-sm text-gray-500 mb-1'>Price</div>
                                            <div className='font-bold text-lg text-gray-900'>${price || '0.00'}</div>
                                        </div>
                                        <div className='p-3 bg-gray-50 rounded-lg'>
                                            <div className='text-sm text-gray-500 mb-1'>Quantity</div>
                                            <div className='font-bold text-lg text-gray-900'>{quantity || 1}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className='space-y-4'>
                                <div className='space-y-4'>
                                    <div className='p-4 bg-blue-50 rounded-lg'>
                                        <div className='flex items-center gap-3 mb-3'>
                                            <div className='p-2 bg-white rounded-full'>
                                                <FaEnvelope className='text-blue-600' />
                                            </div>
                                            <div>
                                                <div className='text-sm text-gray-500'>Email Address</div>
                                                <div className='font-medium text-gray-900 truncate'>{customerEmail}</div>
                                            </div>
                                        </div>

                                        <div className='space-y-2'>
                                            <div className='flex items-center justify-between text-sm'>
                                                <span className='text-gray-500'>Order Status</span>
                                                <span className='font-semibold text-emerald-600'>Processing</span>
                                            </div>
                                            <div className='flex items-center justify-between text-sm'>
                                                <span className='text-gray-500'>Payment</span>
                                                <span className='font-semibold text-green-600'>Paid</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Timeline */}
                            <div className='space-y-4'>
                                <div className='space-y-4'>
                                    <div className='relative pl-8'>
                                        <div className='absolute left-0 top-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center'>
                                            <FaCalendarAlt className='text-purple-600 text-sm' />
                                        </div>
                                        <div>
                                            <div className='font-semibold text-gray-900'>Order Placed</div>
                                            <div className='text-sm text-gray-600 mt-1'>
                                                {new Date(createdAt).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className='text-sm text-gray-500'>
                                                {new Date(createdAt).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='space-y-2'>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-sm text-gray-500'>Estimated Delivery</span>
                                            <span className='font-semibold text-gray-900'>2-3 Business Days</span>
                                        </div>
                                        <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                                            <div className='h-full bg-purple-600 w-2/3 rounded-full'></div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='flex gap-2 pt-4'>
                                        <button onClick={() => cancelOrder(_id)} className='btn btn-sm flex-1 gap-2'>

                                            Cancel Order
                                        </button>
                                        <button className='btn btn-primary btn-sm flex-1 gap-2'>
                                            <GiCoffeeBeans />
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Empty State */}
            {coffee.length === 0 && (
                <div className='text-center py-16'>
                    <GiCoffeeBeans className='text-6xl text-gray-300 mx-auto mb-4' />
                    <h3 className='text-2xl font-bold text-gray-700 mb-2'>No Orders Yet</h3>
                    <p className='text-gray-600 mb-6'>Start your coffee journey with our premium selections</p>
                    <button className='btn btn-primary gap-2'>
                        <GiCoffeeBeans />
                        Browse Coffee Collection
                    </button>
                </div>
            )}
        </div>


    )

};

// Helper function to format time ago
const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    return 'over a month ago';

};
export default OrderCard;