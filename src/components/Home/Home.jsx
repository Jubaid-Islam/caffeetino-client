import {
  FaCoffee,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaLeaf,
  FaHeart,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaUserFriends,
} from "react-icons/fa";
import {
  GiCoffeeBeans,
  GiCoffeeCup,
  GiCoffeePot,
} from "react-icons/gi";
import { BiCoffeeTogo } from "react-icons/bi";
import { IoMdTimer } from "react-icons/io";
import { RiPlantLine } from "react-icons/ri";
import { BsArrowRight, BsShieldCheck } from "react-icons/bs";
import { NavLink, useLoaderData } from "react-router-dom";
import bgImage from "../../assets/more/bgImage.jpeg";
import Button from "../../ui/Button";
import CoffeeCard from "../CoffeeCard";
import Comparison from "../Comparison";

// data 
const features = [
  {
    icon: GiCoffeeBeans,
    title: "Premium Beans",
    desc: "Single-origin specialty beans",
    color: "text-amber-900",
    bgColor: "bg-stone-100",
  },
  {
    icon: IoMdTimer,
    title: "Fresh Roasted",
    desc: "Roasted daily, shipped fresh",
    color: "text-amber-900",
    bgColor: "bg-stone-100",
  },
  {
    icon: FaTruck,
    title: "Fast Delivery",
    desc: "Free shipping on orders $25+",
    color: "text-amber-900",
    bgColor: "bg-stone-100",
  },
  {
    icon: BsShieldCheck,
    title: "Quality Guarantee",
    desc: "100% satisfaction guarantee",
    color: "text-amber-900",
    bgColor: "bg-stone-100",
  },
];


const Home = () => {
  const { data: coffees } = useLoaderData();
  const latestCoffees = coffees.slice(-4).reverse();

  return (
    <div className="min-h-screen w-full bg-gray-50">

      <section className="relative text-white overflow-hidden ">
        {/* image   */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="container px-4 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
          <div className="flex  items-center">

            {/* content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-sm sm:text-base">
                <BiCoffeeTogo className="text-lg sm:text-xl" />
                <span className="font-semibold">Premium Coffee Since 1995</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Savor the Perfect
                <span className="block text-amber-100">Coffee Experience</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-amber-100 leading-relaxed">
                Freshness guaranteed, delivered to your doorstep.
              </p>

              <div>
                <NavLink
                  to="/allCoffees"
                  className="btn btn-lg shadow-none gap-2 justify-center"
                >
                  <FaCoffee />
                  <span >Shop Coffee</span>
       
                  <BsArrowRight />
                </NavLink>
               
              </div>

              <div className="mt-8 sm:mt-12 flex items-start sm:items-center gap-6 sm:gap-8">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold">4.9</div>
                  <div className="text-xs sm:text-sm text-amber-100">
                    Customer Rating
                  </div>
                </div>

                <div className="h-12 w-px bg-white/30 hidden sm:block" />
                <div>
                  <div className="text-3xl sm:text-4xl font-bold">10K+</div>
                  <div className="text-xs sm:text-sm text-amber-100">
                    Happy Customers
                  </div>
                </div>

                <div className="h-12 w-px bg-white/30 hidden sm:block" />
                <div>
                  <div className="text-3xl sm:text-4xl font-bold">50+</div>
                  <div className="text-xs sm:text-sm text-amber-100">
                    Coffee Varieties
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>




      {/* Features Section */}
      <section className="section-padding ">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Caffeetino
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              We're committed to delivering exceptional coffee experiences with
              every cup
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} rounded-xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`p-3 sm:p-4 rounded-2xl ${feature.bgColor} mb-4 sm:mb-6 w-fit`}
                >
                  <feature.icon className={`text-3xl sm:text-4xl ${feature.color}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="hidden sm:block text-gray-600 text-sm sm:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Latest Products */}
      <section className="container section-padding">
        <div className="flex  justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Latest Arrivals
          </h2>
          <Button
            as={NavLink}
            to="/allCoffees"
          >
            Show All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {latestCoffees.map((coffee) => (
            <CoffeeCard key={coffee._id} coffee={coffee} />
          ))}
        </div>
      </section>

      <Comparison/>
      
    </div>
  );
};

export default Home;