import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  FaEdit, FaHeart, FaRegHeart, FaShoppingCart,
  FaBoxOpen, FaInfoCircle, FaTag, FaArrowLeft
} from 'react-icons/fa';
import CartButton from '../contexts/CartButton';
import Button from '../ui/Button';
import Modal from './Checkout/Modal';
import Checkout from './Checkout/Checkout';


const CoffeeDetails = () => {
  const { user } = useContext(AuthContext);
  const { data: coffee } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    name, photo, supplier, details, taste, price, quantity,
    _id, email, likedBy = []
  } = coffee || {};

  const [liked, setLiked] = useState(likedBy.includes(user?.email));
  const [likeCount, setLikeCount] = useState(likedBy?.length || 0);

  const otherUser = user && user.email !== coffee?.email;
  const inStock = quantity > 0;

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
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Like Failed",
          text: "Something went wrong. Please try again.",
        });
      });
  };


  if (!coffee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-amber-900"></span>
          <p className="text-stone-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16 ">
      <div className="container">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/allCoffees"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-900 transition-colors font-medium text-sm"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back </span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl overflow-hidden border border-stone-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10">
            {/* Left: Image & Stats */}
            <div className="flex flex-col gap-6">
              <div className="relative rounded-xl overflow-hidden bg-stone-100 aspect-square shadow-inner group">
                <img
                  src={photo}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {!inStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg tracking-wide">Sold Out</span>
                  </div>
                )}
                {otherUser && (
                  <button
                    onClick={handleLike}
                    aria-label={liked ? 'Unlike' : 'Like'}
                    className="absolute top-4 right-4 p-3 bg-white/25 backdrop-blur-md rounded-full hover:bg-white/40 transition-all shadow-sm"
                  >
                    {liked ? (
                      <FaHeart className="text-xl text-white drop-shadow-sm" />
                    ) : (
                      <FaRegHeart className="text-xl text-white drop-shadow-sm" />
                    )}
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 bg-white border border-gray-100 rounded-2xl overflow-hidden ">

                {/* Price */}
                <div className="flex flex-col items-center justify-center py-4 px-3 gap-0.5">
                  <span className="text-xl font-bold text-amber-900">${price}</span>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Price</span>
                </div>

                {/* In Stock */}
                <div className="flex flex-col items-center justify-center py-4 px-3 gap-0.5">
                  <span className={`text-xl  font-bold ${inStock ? "text-gray-800" : "text-red-500"}`}>
                    {quantity}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Likes */}
                <div className="flex flex-col items-center justify-center py-4 px-3 gap-0.5">
                  <span className="text-xl font-bold text-gray-800">{likeCount}</span>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Likes</span>
                </div>

              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 border-b border-stone-100 pb-6">
                <div className="flex items-center gap-2 mb-3">
                  {!inStock && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Sold Out
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2 leading-tight">{name}</h1>
                <p className="text-stone-500 font-medium flex items-center gap-2">
                  <FaBoxOpen className="text-amber-700" /> {supplier}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">Description</h3>
                  <p className="text-stone-600 leading-relaxed text-base">{details}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-3">Flavor Notes</h3>
                  <div className="flex flex-wrap gap-2">
                    {taste?.split(',').map((flavor, index) => (
                      <span
                        key={index}
                        className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded-lg text-sm font-medium border border-stone-200 capitalize"
                      >
                        {flavor.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-stone-50 rounded-xl p-5 border border-stone-100 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-500 flex items-center gap-2">
                      <FaTag className="text-stone-400" /> Supplier Email
                    </span>
                    <span className="font-medium text-stone-900 truncate max-w-[60%]">{email}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-500 flex items-center gap-2">
                      <FaInfoCircle className="text-stone-400" /> Availability
                    </span>
                    <span className={`font-medium ${inStock ? 'text-emerald-600' : 'text-red-600'}`}>
                      {inStock ? 'Ready to Ship' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                {/* Actions – reusable Button */}
                <div className="pt-4">
                  {otherUser ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-1/2">
                        <div className="[&>button]:w-full [&>button]:h-12 [&>button]:rounded-xl [&>button]:font-bold">
                          <CartButton coffee={coffee} />
                        </div>
                      </div>

                      <Button
                        onClick={() => setIsModalOpen(true)}
                        disabled={!inStock}
                        className="w-full sm:w-1/2 h-12 text-base shadow-md shadow-amber-900/20"
                      >
                        <FaShoppingCart />
                        Order
                      </Button>

                      <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                      >
                        <Checkout
                          price={coffee.price}
                          coffeeId={coffee._id}
                          orderType="single"
                        />
                      </Modal>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Button
                        as={Link}
                        to={`/updateCoffee/${_id}`}
                        className="w-full sm:w-auto h-12 px-8 text-base shadow-lg"
                      >
                        <FaEdit /> Update Details
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;