import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaUser, FaTag, FaCoffee, FaArrowLeft } from 'react-icons/fa';
import { GiCoffeeBeans, GiCoffeeCup } from 'react-icons/gi';
import { BsCartCheck, BsCartX } from 'react-icons/bs';
import { MdOutlineLocalOffer, MdDiscount } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

const AddToCartPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { cartItems = [], loading, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

    const handleQuantityChange = (id, type) => {
        const item = cartItems.find(item => item._id === id);
        if (item) {
            const newQuantity = type === 'increase' ? item.cartQuantity + 1 : Math.max(1, item.cartQuantity - 1);
            updateQuantity(id, newQuantity);
        }
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4'></div>
                    <p className='text-gray-600'>Loading your cart...</p>
                </div>
            </div>
        );
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (Number(item.price) * Number(item.cartQuantity)), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shipping = subtotal > 50 ? 0 : 5.99;
        const tax = subtotal * 0.08;
        return subtotal + shipping + tax;
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-8 px-4'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                        <div>
                            <div className='flex items-center gap-2 text-gray-600 mb-2'>
                                <Link to='/allCoffees' className='py-4 flex items-center gap-2 hover:text-amber-700 transition-colors'>
                                    <FaArrowLeft />
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
                            <h1 className='text-4xl font-bold text-gray-900 flex items-center gap-3'>
                                <FaShoppingCart className='text-amber-600' />
                                Your Shopping Cart
                            </h1>
                        </div>

                        <div className='flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm'>
                            <div className='p-3 bg-amber-100 rounded-lg'>
                                <FaUser className='text-amber-600 text-xl' />
                            </div>
                            <div>
                                <div className='text-sm text-gray-500'>Shopping as</div>
                                <div className='font-semibold text-gray-900 truncate max-w-[200px]'>{user?.email || 'Guest User'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid lg:grid-cols-3 gap-8'>
                    {/* Cart Items Section */}
                    <div className='lg:col-span-2'>
                        {/* Cart Header */}
                        <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
                            <div className='grid grid-cols-12 gap-4 text-gray-700 font-semibold pb-4 border-b border-gray-200'>
                                <div className='col-span-6'>Product</div>
                                <div className='col-span-2 text-center'>Price</div>
                                <div className='col-span-2 text-center'>Quantity</div>
                                <div className='col-span-2 text-center'>Total</div>
                            </div>

                            {/* Cart Items */}
                            {cartItems.length > 0 ? (
                                <div className='space-y-4 mt-4'>
                                    {cartItems.map(item => (
                                        <div key={item._id} className='grid grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg hover:bg-white transition-colors'>
                                            {/* Product Info */}
                                            <div className='col-span-6'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='relative'>
                                                        <div className='w-20 h-20 rounded-lg overflow-hidden bg-gray-200'>
                                                            <img
                                                                src={item.photo}
                                                                alt={item.name}
                                                                className='w-full h-full object-cover'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='flex-1'>
                                                        <h3 className='font-bold text-gray-900'>{item.name}</h3>
                                                        <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
                                                            <FaTag className='text-xs' />
                                                            <span>ID: {item._id?.slice(-6) || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className='col-span-2'>
                                                <div className='text-center'>
                                                    <div className='text-xl font-bold text-gray-900'>${(Number(item?.price) || 0).toFixed(2)}</div>
                                                    <div className='text-sm text-gray-500'>per unit</div>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className='col-span-2'>
                                                <div className='flex items-center justify-center gap-3'>
                                                    <button
                                                        onClick={() => handleQuantityChange(item._id, 'decrease')}
                                                        className='w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center hover:bg-gray-600 transition-colors disabled:opacity-50'
                                                        disabled={item.cartQuantity <= 1}
                                                    >
                                                        <FaMinus className='text-white text-xs' />
                                                    </button>

                                                    <div className='w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center'>
                                                        <span className='font-bold text-gray-900'>{item.cartQuantity}</span>
                                                    </div>

                                                    <button
                                                        onClick={() => handleQuantityChange(item._id, 'increase')}
                                                        className='w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center hover:bg-gray-600 transition-colors'
                                                    >
                                                        <FaPlus className='text-white text-xs' />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total */}
                                            <div className='col-span-2'>
                                                <div>
                                                    <div className='text-xl font-bold text-emerald-700'>
                                                        ${((Number(item?.price) || 0) * (Number(item?.cartQuantity) || 0)).toFixed(2)}
                                                    </div>

                                                </div>
                                                <div className='flex justify-end'>
                                                    <button
                                                        onClick={() => handleRemoveItem(item._id)}
                                                        className='mt-1 absolute bg-gray-400 text-white hover:bg-gray-700 border px-3 py-2 rounded-xl  gap-1  transition-colors' >
                                                        <FaTrash className='text-xs' />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty Cart */
                                <div className='text-center py-12'>
                                    <div className='w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6'>
                                        <BsCartX className='text-gray-400 text-4xl' />
                                    </div>
                                    <h3 className='text-2xl font-bold text-gray-700 mb-2'>Your cart is empty</h3>
                                    <p className='text-gray-600 mb-6'>Add some delicious coffee to your cart!</p>
                                    <Link to='/allCoffees' className='btn btn-primary gap-2'>
                                        <GiCoffeeCup />
                                        Browse Coffee
                                    </Link>
                                </div>
                            )}

                            {/* Cart Actions */}
                            {cartItems.length > 0 && (
                                <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-200'>

                                    <button className='btn bg-amber-500 hover:bg-amber-700 text-white gap-2'>
                                        <MdDiscount />
                                        Apply Coupon
                                    </button>
                                    <div className='flex items-center gap-4'>
                                        <button
                                            onClick={() => clearCart()}
                                            className='btn btn-outline bg-gray-400 hover:bg-gray-700 text-white gap-2' >
                                            <FaTrash />
                                            Clear All
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User's Cart Summary */}
                        <div className='bg-white rounded-xl shadow-lg p-6'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                                <FaUser className='text-amber-600' />
                                Your Cart Summary
                            </h3>
                            <div className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='p-4 bg-blue-50 rounded-lg'>
                                        <div className='text-sm text-gray-500 mb-1'>Total Items</div>
                                        <div className='text-2xl font-bold text-blue-700'>
                                            {cartItems.reduce((sum, item) => sum + item.cartQuantity, 0)}
                                        </div>
                                    </div>
                                    <div className='p-4 bg-emerald-50 rounded-lg'>
                                        <div className='text-sm text-gray-500 mb-1'>Unique Coffees</div>
                                        <div className='text-2xl font-bold text-emerald-700'>
                                            {cartItems.length}
                                        </div>
                                    </div>
                                </div>

                                <div className='p-4 bg-amber-50 rounded-lg'>
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 bg-amber-100 rounded-lg'>
                                            <FaShoppingCart className='text-amber-600' />
                                        </div>
                                        <div>
                                            <div className='font-semibold text-gray-900'>Your Cart is Saved</div>
                                            <div className='text-sm text-gray-600'>Items are automatically saved to your account</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-xl shadow-lg p-6 sticky top-6'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                                <BsCartCheck className='text-amber-600' />
                                Order Summary
                            </h3>

                            {/* Price Breakdown */}
                            <div className='space-y-4 mb-6'>
                                <div className='flex justify-between text-gray-600'>
                                    <span>Subtotal</span>
                                    <span className='font-semibold'>${calculateSubtotal().toFixed(2)}</span>
                                </div>

                                <div className='flex justify-between text-gray-600'>
                                    <span>Shipping</span>
                                    <span className='font-semibold'>
                                        {calculateSubtotal() > 50 ? (
                                            <span className='text-emerald-600'>FREE</span>
                                        ) : (
                                            '$5.99'
                                        )}
                                    </span>
                                </div>

                                <div className='flex justify-between text-gray-600'>
                                    <span>Tax (8%)</span>
                                    <span className='font-semibold'>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                                </div>

                                <div className='pt-4 border-t border-gray-200'>
                                    <div className='flex justify-between text-lg font-bold text-gray-900'>
                                        <span>Total</span>
                                        <span>${calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className='text-sm text-gray-500 mt-1'>Including all taxes</div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className='mb-6'>
                                <div className='flex items-center gap-2 mb-3'>
                                    <MdOutlineLocalOffer className='text-amber-600' />
                                    <span className='font-semibold text-gray-700'>Promo Code</span>
                                </div>
                                <div className='flex gap-2'>
                                    <input
                                        type='text'
                                        placeholder='Enter code'
                                        className='input input-bordered flex-1'
                                    />
                                    <button className='btn btn-outline'>Apply</button>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={() => navigate('/checkout', { state: { orderType: 'cart', price: calculateTotal() } })}
                                className='btn btn-primary btn-lg w-full gap-2 mb-4'>
                                <BsCartCheck />
                                Proceed to Checkout
                            </button>

                            {/* Payment Methods */}
                            <div className='text-center text-sm text-gray-500 mt-4'>
                                <div className='mb-2'>Secure Payment</div>
                                <div className='flex justify-center gap-3'>
                                    <div className='w-10 h-6 bg-gray-200 rounded'></div>
                                    <div className='w-10 h-6 bg-gray-200 rounded'></div>
                                    <div className='w-10 h-6 bg-gray-200 rounded'></div>
                                </div>
                            </div>

                            {/* Order Benefits */}
                            <div className='mt-6 pt-6 border-t border-gray-200'>
                                <h4 className='font-semibold text-gray-700 mb-3'>Order Benefits</h4>
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-2 text-sm'>
                                        <div className='w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center'>
                                            <GiCoffeeBeans className='text-emerald-600 text-xs' />
                                        </div>
                                        <span>Free shipping on orders over $50</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-sm'>
                                        <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
                                            <FaCoffee className='text-blue-600 text-xs' />
                                        </div>
                                        <span>Fresh roasted coffee delivered</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-sm'>
                                        <div className='w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center'>
                                            <BsCartCheck className='text-amber-600 text-xs' />
                                        </div>
                                        <span>Easy returns within 30 days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToCartPage;