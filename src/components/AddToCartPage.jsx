import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTrash,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import { GiCoffeeCup } from 'react-icons/gi';
import { BsCartCheck, BsCartX } from 'react-icons/bs';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { TbShieldCheck, TbRefresh } from 'react-icons/tb';

import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import Modal from './Checkout/Modal';
import Checkout from './Checkout/Checkout';

const AddToCartPage = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    cartItems = [],
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);


  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.cartQuantity),
        0
      ),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.cartQuantity, 0),
    [cartItems]
  );

  const shipping = useMemo(() => (subtotal > 50 ? 0 : 5.99), [subtotal]);
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);


  const handleQuantityChange = (id, type) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;
    const newQuantity =
      type === 'increase'
        ? item.cartQuantity + 1
        : Math.max(1, item.cartQuantity - 1);
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => removeFromCart(id);



  // empty 
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-8 sm:py-12 px-4">
        <div className="container">
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center">
                <BsCartX className="text-stone-300 text-4xl" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium text-stone-800 mb-1.5 tracking-tight">
                Your cart is empty
              </h2>
              <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
                Explore our collection and add something delicious.
              </p>
            </div>
            <Link
              to="/allCoffees"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-900 hover:bg-amber-800 text-white text-sm font-medium transition-colors rounded-xl"
            >
              <GiCoffeeCup className="text-base" />
              Browse coffees
            </Link>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 ">
      <div className="container">

        {/* back */}
        <div className="mb-3 sm:mb-2">
          <Link
            to="/allCoffees"
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-amber-900 transition-colors"
          >
            <HiOutlineArrowLeft size={12} className="text-base" />
            Back
          </Link>

        </div>

        {/*  heading */}
        <div className='flex justify-center items-center mb-5'>
          <h1
            className="text-stone-900 text-4xl tracking-tight leading-none " >
            My Cart
          </h1>
        </div>
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>

            <p className="text-xs text-stone-400 tracking-wide">
              {user?.email || 'Guest'}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 hover:text-red-500 transition-colors"
          >
            <FaTrash className="text-[10px]" />
            Clear cart
          </button>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">


          {/* Left column: items */}
          <div>
            {/* Table headers */}
            <div className="hidden sm:grid grid-cols-12 gap-4 text-[10px] uppercase tracking-widest text-stone-400 pb-3 border-b border-stone-200 px-1">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Items list */}
            <div className="flex flex-col divide-y divide-stone-100">
              {cartItems.map((item, index) => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 gap-4 items-center py-4 px-1 group
                             hover:bg-white hover:px-3 hover:-mx-2 transition-all duration-200 rounded-sm"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {/* Product info */}
                  <div className="col-span-12 sm:col-span-5 flex items-center gap-4">
                    <div className="relative w-[72px] h-[72px] shrink-0 overflow-hidden bg-stone-100">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-stone-800 truncate leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5 font-mono tracking-wide">
                        #{item._id?.slice(-6)}
                      </p>
                      {/* Show price on mobile */}
                      <p className="sm:hidden text-sm font-medium text-stone-700 mt-1">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Unit price (desktop) */}
                  <div className="hidden sm:flex col-span-2 justify-center">
                    <span className="text-sm text-stone-600">
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity stepper */}
                  <div className="col-span-7 sm:col-span-2 flex items-center justify-start sm:justify-center gap-0">
                    <button
                      onClick={() => handleQuantityChange(item._id, 'decrease')}
                      disabled={item.cartQuantity <= 1}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 flex items-center justify-center border border-stone-200
                                 text-stone-500 hover:border-amber-800 hover:text-amber-800
                                 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaMinus className="text-[8px]" />
                    </button>
                    <span className="w-9 text-center text-sm font-medium text-stone-900 tabular-nums select-none">
                      {item.cartQuantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item._id, 'increase')}
                      aria-label="Increase quantity"
                      className="w-8 h-8 flex items-center justify-center border border-stone-200
                                 text-stone-500 hover:border-amber-800 hover:text-amber-800
                                 transition-colors"
                    >
                      <FaPlus className="text-[8px]" />
                    </button>
                  </div>

                  {/* Line total, remove */}
                  <div className="col-span-5 sm:col-span-3 flex items-center justify-end gap-4">
                    <span className="text-sm font-semibold text-stone-800 tabular-nums">
                      ${(Number(item.price) * Number(item.cartQuantity)).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      aria-label={`Remove ${item.name}`}
                      className="w-7 h-7 flex items-center justify-center text-stone-800
                                 hover:text-gray-700 hover:bg-gray-100 rounded-sm
"
                    >
                      <FaTrash className="text-[10px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column- order summary */}
          <div className=" flex flex-col gap-3">
            <div className="bg-white border border-stone-100">
              <div className="px-5 py-4 border-b border-stone-100">
                <h2 className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                  Order summary
                </h2>
              </div>

              <div className="px-5 py-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-500">
                    Subtotal
                    <span className="text-stone-400 ml-1">
                      ({totalItems} item{totalItems !== 1 ? 's' : ''})
                    </span>
                  </span>
                  <span className="text-sm font-medium text-stone-800 tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-500">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-sm font-medium text-emerald-600">Free</span>
                  ) : (
                    <span className="text-sm font-medium text-stone-800 tabular-nums">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-500">Tax (8%)</span>
                  <span className="text-sm font-medium text-stone-800 tabular-nums">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-stone-100 flex justify-between items-baseline">
                <span className="text-sm font-medium text-stone-700">Total</span>
                <span
                  className="text-stone-900 tracking-tight tabular-nums"
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="px-5 pb-5">
                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={cartItems.length === 0}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5
             bg-amber-900 hover:bg-amber-800 text-white
             text-xs uppercase tracking-wider
             disabled:opacity-40 disabled:cursor-not-allowed
             transition-colors rounded-xl"
                >
                  <BsCartCheck className="text-base" />
                  Proceed to checkout
                </button>

                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <Checkout
                    orderType="cart"
                    price={total}
                  />
                </Modal>

              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-stone-100 px-4 py-3.5">
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                  Items
                </p>
                <p
                  className="text-2xl font-medium text-stone-800 leading-none tabular-nums"
                >
                  {totalItems}
                </p>
              </div>
              <div className="bg-white border border-stone-100 px-4 py-3.5">
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                  Coffees
                </p>
                <p
                  className="text-2xl font-medium text-amber-900 leading-none tabular-nums"
                >
                  {cartItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPage;