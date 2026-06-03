import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaClipboardList, FaEdit, FaHeart, FaHeartBroken, FaRegHeart, FaShoppingCart, FaBoxOpen, FaInfoCircle, FaTag } from 'react-icons/fa';
import CartButton from '../contexts/CartButton';

const CoffeeDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: coffee } = useLoaderData();

  const {
    name, photo, supplier, details, taste, price, quantity,
    _id, email, likedBy = []
  } = coffee || {};

  const [liked, setLiked] = useState(likedBy.includes(user?.email));
  const [likeCount, setLikeCount] = useState(likedBy?.length || 0);

  const otherUser = user && user.email !== coffee?.email;

  useEffect(() => {
    if (user && likedBy) {
      setLiked(likedBy.includes(user.email));
    }
  }, [likedBy, user]);

  const handleLike = () => {
    if (!user) return Swal.fire('Error', 'Please login to like', 'error');

    axios.patch(`${import.meta.env.VITE_URL}/like/${_id}`, { email: user?.email })
      .then(data => {
        const isLiked = data?.data?.liked;
        setLiked(isLiked);
        setLikeCount(num => (isLiked ? num + 1 : num - 1));
      })
      .catch(err => console.error(err));
  };

  const handleOrder = () => {
    Swal.fire({
      title: "Confirm Order?",
      text: "Do you want to place this coffee order?",
      showCancelButton: true,
      confirmButtonText: "Yes, Order",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/checkout`, {
          state: {
            orderType: 'single',
            coffeeId: _id,
            price,
            productName: name,
            customerEmail: user?.email,
          }
        });
      }
    });
  };

  if (!coffee) return <div className="text-center py-20">Loading product details...</div>;

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>

        {/* Navigation Header */}
        <div className='mb-6'>
          <Link to='/allCoffees' className='inline-flex items-center gap-2 text-gray-500 hover:text-amber-700 transition-colors font-medium'>
            <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-12 gap-8 p-6 md:p-10'>

            {/* Left Column: Image & Stats */}
            <div className='flex flex-col gap-6'>
              <div className='relative rounded-xl overflow-hidden bg-gray-100 aspect-square shadow-inner group'>
                <img
                  src={photo}
                  alt={name}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                {/* Floating Like Button */}
                {otherUser && (
                  <button
                    onClick={handleLike}
                    className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all shadow-sm"
                  >
                    {liked ?
                      <FaHeart className="text-2xl text-amber-700 drop-shadow-sm" /> :
                      <FaRegHeart className="text-2xl text-white drop-shadow-sm" />
                    }
                  </button>
                )}
              </div>

              {/* Stat Cards */}
              <div className='grid grid-cols-3 gap-3'>
                <div className='bg-amber-50/50 p-4 rounded-xl text-center border border-amber-100'>
                  <div className='text-lg md:text-2xl font-bold text-amber-700'>${price}</div>
                  <div className='text-xs text-amber-900/60 font-medium uppercase tracking-wide'>Price</div>
                </div>
                <div className={`p-4 rounded-xl text-center border ${quantity > 0 ? 'bg-blue-50/50 border-blue-100' : 'bg-red-50/50 border-red-100'}`}>
                  <div className={`text-lg md:text-2xl font-bold ${quantity > 0 ? 'text-blue-700' : 'text-red-600'}`}>
                    {quantity}
                  </div>
                  <div className='text-xs text-gray-500 font-medium uppercase tracking-wide'>In Stock</div>
                </div>
                <div className='bg-emerald-50/50 p-4 rounded-xl text-center border border-emerald-100'>
                  <div className='text-lg md:text-2xl font-bold text-emerald-700'>{likeCount}</div>
                  <div className='text-xs text-emerald-900/60 font-medium uppercase tracking-wide'>Likes</div>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className='flex flex-col justify-center'>
              <div className='mb-6 border-b border-gray-100 pb-6'>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Premium Coffee
                  </span>
                  {quantity === 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Sold Out
                    </span>
                  )}
                </div>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight'>{name}</h1>
                <p className='text-gray-500 font-medium flex items-center gap-2'>
                  <FaBoxOpen className="text-amber-500" /> {supplier}
                </p>
              </div>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>Description</h3>
                  <p className='text-gray-600 leading-relaxed text-base'>{details}</p>
                </div>

                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-3'>Flavor Notes</h3>
                  <div className='flex flex-wrap gap-2'>
                    {taste?.split(',').map((flavor, index) => (
                      <span key={index} className='px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 capitalize'>
                        {flavor.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className='bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3'>
                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-gray-500 flex items-center gap-2'><FaTag className="text-gray-400" /> Supplier Email</span>
                    <span className='font-medium text-gray-900'>{email}</span>
                  </div>
                  <div className='flex justify-between items-center text-sm'>
                    <span className='text-gray-500 flex items-center gap-2'><FaInfoCircle className="text-gray-400" /> Availability</span>
                    <span className={`font-medium ${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {quantity > 0 ? 'Ready to Ship' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4">
                  {otherUser ? (
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">

                      {/* Add to Cart */}
                      <div className="w-full sm:w-1/2">
                        <div className="[&>button]:w-full [&>button]:h-12 [&>button]:rounded-xl [&>button]:font-bold">
                          <CartButton coffee={coffee} />
                        </div>
                      </div>

                      {/* Order Button */}

                      <button
                        onClick={handleOrder}
                        className="w-full sm:w-1/2 btn bg-amber-600 hover:bg-amber-700 text-white border-none gap-2 rounded-xl h-12 font-semibold shadow-md shadow-amber-200"
                      >
                        <FaShoppingCart /> Order
                      </button>
                    </div>

                  ) : (
                    <div className='flex justify-end'>
                      <Link to={`/updateCoffee/${_id}`} className='btn bg-gray-900 hover:bg-gray-800 text-white border-none w-full sm:w-auto gap-2 rounded-xl h-12 px-8 font-semibold shadow-lg'>
                        <FaEdit /> Edit Coffee Details
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Specs Section */}
        <div className='mt-8 grid md:grid-cols-3 gap-6'>
          {[
            { title: 'Roast Level', desc: 'Medium roast with balanced acidity.', color: 'amber' },
            { title: 'Origin Source', desc: 'Ethically sourced organic farms.', color: 'green' },
            { title: 'Quality Check', desc: 'Triple tested for premium quality.', color: 'blue' }
          ].map((spec, idx) => (
            <div key={idx} className={`bg-white p-6 rounded-xl shadow-sm border border-${spec.color}-100 hover:shadow-md transition-shadow`}>
              <h3 className={`font-bold text-${spec.color}-700 mb-2 flex items-center gap-2`}>
                <div className={`w-2 h-2 rounded-full bg-${spec.color}-500`}></div>
                {spec.title}
              </h3>
              <p className='text-gray-600 text-sm leading-relaxed'>{spec.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CoffeeDetails;