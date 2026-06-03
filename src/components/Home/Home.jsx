
import { FaCoffee, FaShoppingCart, FaStar, FaTruck, FaLeaf, FaHeart, FaInstagram, FaFacebook, FaTwitter, FaUserFriends } from 'react-icons/fa';
import { GiCoffeeBeans, GiCoffeeCup, GiCoffeePot } from 'react-icons/gi';
import { BiCoffeeTogo } from 'react-icons/bi';
import { IoMdTimer } from 'react-icons/io';
import { RiPlantLine } from 'react-icons/ri';
import { BsArrowRight, BsShieldCheck } from 'react-icons/bs';
import { NavLink, useLoaderData } from 'react-router-dom';
import FeaturedCoffee from './FeaturedCoffee';

const Home = () => {
  const { data: coffees } = useLoaderData()
  const latestCoffees = coffees.slice(-4).reverse();
  return (
    <div className='min-h-screen w-full'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-amber-900 to-amber-700 text-white overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0' style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 2px)', backgroundSize: '50px 50px' }}></div>
        </div>

        <div className='container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10'>
          <div className='grid lg:grid-cols-2 gap-8 md:gap-12 items-center'>
            <div>
              <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-sm sm:text-base'>
                <BiCoffeeTogo className='text-lg sm:text-xl' />
                <span className='font-semibold'>Premium Coffee Since 1995</span>
              </div>

              <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight'>
                Savor the Perfect
                <span className='block text-amber-200'>Coffee Experience</span>
              </h1>

              <p className='text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-amber-100 leading-relaxed'>
                Discover hand-roasted specialty coffee from sustainable farms.
                Freshness guaranteed, delivered to your doorstep.
              </p>

              <div className='flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4'>
                <NavLink to='/allCoffees' className='btn btn-primary btn-lg gap-2 justify-center'>
                  <FaCoffee />
                  <span className='hidden sm:inline'>Shop Coffee</span>
                  <span className='sm:hidden'>Shop</span>
                  <BsArrowRight />
                </NavLink>
                <button className='btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-amber-900 gap-2 justify-center'>
                  <GiCoffeePot />
                  <span className='hidden sm:inline'>Our Story</span>
                </button>
              </div>

              <div className='mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8'>
                <div>
                  <div className='text-3xl sm:text-4xl font-bold'>4.9</div>
                  <div className='flex text-amber-200 text-sm sm:text-base'>
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <div className='text-xs sm:text-sm text-amber-100'>Customer Rating</div>
                </div>
                <div className='h-12 w-px bg-white/30 hidden sm:block'></div>
                <div>
                  <div className='text-3xl sm:text-4xl font-bold'>10K+</div>
                  <div className='text-xs sm:text-sm text-amber-100'>Happy Customers</div>
                </div>
                <div className='h-12 w-px bg-white/30 hidden sm:block'></div>
                <div>
                  <div className='text-3xl sm:text-4xl font-bold'>50+</div>
                  <div className='text-xs sm:text-sm text-amber-100'>Coffee Varieties</div>
                </div>
              </div>
            </div>

            <div className='relative hidden lg:block'>
              <div className='relative z-10'>
                <img
                  src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  alt='Premium Coffee'
                  className='rounded-2xl shadow-2xl w-full'
                />
              </div>

              <div className='absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 sm:p-6 rounded-2xl shadow-xl max-w-xs'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='p-2 bg-amber-100 rounded-lg flex-shrink-0'>
                    <IoMdTimer className='text-2xl text-amber-700' />
                  </div>
                  <div>
                    <div className='font-bold text-lg'>Freshly Roasted</div>
                    <div className='text-sm text-gray-600'>Delivered within 24h</div>
                  </div>
                </div>
              </div>

              <div className='absolute -top-6 -right-6 bg-white text-gray-900 p-4 sm:p-6 rounded-2xl shadow-xl max-w-xs'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='p-2 bg-emerald-100 rounded-lg flex-shrink-0'>
                    <RiPlantLine className='text-2xl text-emerald-700' />
                  </div>
                  <div>
                    <div className='font-bold text-lg'>Sustainable</div>
                    <div className='text-sm text-gray-600'>Ethically sourced beans</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='section-padding bg-gray-50'>
        <div className='container mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4'>Why Choose BeanBliss</h2>
            <p className='text-gray-600 max-w-2xl mx-auto px-4 text-sm sm:text-base'>
              We're committed to delivering exceptional coffee experiences with every cup
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
            {[
              { icon: GiCoffeeBeans, title: 'Premium Beans', desc: 'Single-origin specialty beans', color: 'text-amber-600', bgColor: 'bg-amber-50' },
              { icon: IoMdTimer, title: 'Fresh Roasted', desc: 'Roasted daily, shipped fresh', color: 'text-red-600', bgColor: 'bg-red-50' },
              { icon: FaTruck, title: 'Fast Delivery', desc: 'Free shipping on orders $25+', color: 'text-blue-600', bgColor: 'bg-blue-50' },
              { icon: BsShieldCheck, title: 'Quality Guarantee', desc: '100% satisfaction guarantee', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
            ].map((feature, index) => (
              <div key={index} className={`${feature.bgColor} rounded-xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-all`}>
                <div className={`p-3 sm:p-4 rounded-2xl ${feature.bgColor} mb-4 sm:mb-6 w-fit`}>
                  <feature.icon className={`text-3xl sm:text-4xl ${feature.color}`} />
                </div>
                <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>{feature.title}</h3>
                <p className='text-gray-600 text-sm sm:text-base'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <div className="container mx-auto section-padding">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900'>Latest Arrivals</h2>
          <NavLink to={'/allCoffees'} className="btn btn-primary btn-sm sm:btn-lg">
            Show All
          </NavLink>
        </div>

        {/* Coffee Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {
            latestCoffees.map((coffee) => (
              <FeaturedCoffee key={coffee._id} coffee={coffee} />
            ))
          }
        </div>

      </div>

      {/* Subscription CTA */}
      <section className='section-padding bg-gradient-to-r from-amber-50 to-amber-100'>
        <div className='container mx-auto'>
          <div className='grid lg:grid-cols-2 gap-8 md:gap-12 items-center'>
            <div>
              <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6'>Coffee Subscription</h2>
              <p className='text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed'>
                Never run out of your favorite coffee. Our subscription service delivers fresh,
                perfectly roasted beans to your door every month. Cancel or modify anytime.
              </p>

              <div className='space-y-4 sm:space-y-6'>
                <div className='flex items-start sm:items-center gap-3 sm:gap-4'>
                  <div className='p-2 sm:p-3 bg-white rounded-lg shadow-sm flex-shrink-0'>
                    <GiCoffeeCup className='text-2xl text-amber-700' />
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-900 text-sm sm:text-base'>Flexible Plans</h4>
                    <p className='text-gray-600 text-xs sm:text-sm'>Choose frequency and quantity</p>
                  </div>
                </div>

                <div className='flex items-start sm:items-center gap-3 sm:gap-4'>
                  <div className='p-2 sm:p-3 bg-white rounded-lg shadow-sm flex-shrink-0'>
                    <FaLeaf className='text-2xl text-emerald-700' />
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-900 text-sm sm:text-base'>Sustainable Choice</h4>
                    <p className='text-gray-600 text-xs sm:text-sm'>Eco-friendly packaging</p>
                  </div>
                </div>

                <div className='flex items-start sm:items-center gap-3 sm:gap-4'>
                  <div className='p-2 sm:p-3 bg-white rounded-lg shadow-sm flex-shrink-0'>
                    <FaUserFriends className='text-2xl text-blue-700' />
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-900 text-sm sm:text-base'>Member Benefits</h4>
                    <p className='text-gray-600 text-xs sm:text-sm'>Exclusive discounts & early access</p>
                  </div>
                </div>
              </div>

              <button className='btn btn-primary btn-lg gap-2 mt-6 sm:mt-8 w-full sm:w-auto'>
                <GiCoffeeBeans />
                Start Subscription
              </button>
            </div>

            <div className='relative'>
              <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8'>
                <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6'>Subscription Plans</h3>

                <div className='space-y-3 sm:space-y-4'>
                  {[
                    { name: 'Casual Sip', price: 19.99, desc: '1 bag per month', popular: false },
                    { name: 'Coffee Lover', price: 35.99, desc: '2 bags per month', popular: true },
                    { name: 'Connoisseur', price: 49.99, desc: '3 bags + 1 surprise', popular: false },
                  ].map((plan, index) => (
                    <div key={index} className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${plan.popular ? 'border-amber-500 bg-amber-50' : 'border-gray-200'} hover:border-amber-500`}>
                      <div className='flex justify-between items-start sm:items-center gap-4'>
                        <div>
                          <h4 className='font-bold text-gray-900 text-sm sm:text-base'>{plan.name}</h4>
                          <p className='text-gray-600 text-xs sm:text-sm'>{plan.desc}</p>
                        </div>
                        <div className='text-right'>
                          <div className='text-xl sm:text-2xl font-bold text-gray-900'>${plan.price}<span className='text-xs sm:text-sm font-normal text-gray-600'>/mo</span></div>
                          {plan.popular && (
                            <span className='inline-block badge badge-primary text-xs mt-1'>Most Popular</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

    </div>
  );
};

export default Home;