import {
    FaEdit,
    FaHeart,
    FaShoppingCart,
    FaStar
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CartButton from "../../contexts/CartButton";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

const FeaturedCoffee = ({ coffee }) => {
    const { _id, name, price, quantity, photo, rating, email } = coffee;
    const { user } = useContext(AuthContext)
    const otherUser = user && user.email !== email;

    return (
        <div className="card bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-200 h-full flex flex-col hover:scale-105">

            {/* Image Section */}
            <figure className="relative h-40 sm:h-48 w-full overflow-hidden bg-gray-100">
                <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />

                {/* Stock Badge */}
                {quantity <= 5 && quantity > 0 && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Low Stock
                    </div>
                )}
            </figure>

            {/* Content Section */}
            <div className="p-4 sm:p-5 space-y-3 flex flex-col flex-grow">

                {/* Title + Stock */}
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-snug">
                            {name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            <span className="font-medium text-gray-700">
                                {quantity} pcs
                            </span>
                        </p>
                    </div>

                    {/* Price */}
                    <p className="text-lg sm:text-xl font-bold text-amber-600 whitespace-nowrap">
                        ${parseFloat(price).toFixed(2)}
                    </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={`text-xs sm:text-sm ${i < Math.floor(rating)
                                    ? "fill-current"
                                    : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                        {rating || "0.0"}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-3 mt-auto justify-center">

                    {/* user logged out */}
                    {!user && (
                        <Link
                            to={`/coffee/${_id}`}
                            className="btn btn-sm sm:btn-md flex-1 rounded-lg bg-gray-100 hover:bg-gray-200 py-1"
                        >
                            Details
                        </Link>
                    )}

                    {/* user + otherUser */}
                    {user && otherUser && (
                        <div className="flex flex-col sm:flex-row gap-2 w-full">

                            <CartButton coffee={coffee} />

                            <Link
                                to={`/coffee/${_id}`}
                                className="btn btn-sm sm:btn-md flex-1 rounded-lg bg-gray-100 hover:bg-gray-200 py-1"
                            >
                                Details
                            </Link>
                        </div>
                    )}

                    {/*  user */}
                    {user && !otherUser && (
                        <Link to={`/coffee/${_id}`}
                            className="btn btn-sm sm:btn-md py-1 text-sm flex-1 rounded-lg bg-gray-100 hover:bg-gray-200" >
                            Details
                        </Link>
                    )}

                </div>

            </div>
        </div>
    );
};

export default FeaturedCoffee;
