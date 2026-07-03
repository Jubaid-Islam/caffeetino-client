import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CoffeeCard = ({ coffee }) => {
    const { _id, name, details, photo, price, quantity } = coffee;

    return (
        <div className="group bg-stone-50 shadow-xl rounded-2xl overflow-hidden border border-amber-900/10 h-full flex flex-col ">

            {/* image*/}
            <figure className="relative h-68 w-full overflow-hidden">
                <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Out of Stock Overlay */}
                {quantity === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-bold text-xs uppercase tracking-wider  px-6 py-3 ">
                            Out of Stock
                        </span>
                    </div>
                )}
            </figure>

            {/* Content Section  */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow transition-all duration-300 group-hover:bg-white/80">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg sm:text-xl font-bold leading-snug ">
                        {name}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-amber-900">
                        {price} $
                    </p>
                </div>

                <p className="text-sm mt-2 leading-relaxed line-clamp-3 text-stone-600 transition-all duration-300 group-hover:text-stone-800">
                    {details}
                </p>

                <Link
                    to={`/coffee/${_id}`}
                    className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-amber-900 uppercase group/link w-fit transition-all duration-300 hover:gap-3"
                >
                    Shop the coffee
                    <FaArrowRight className="text-xs transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

export default CoffeeCard;