import {  FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { GiCoffeeBeans } from 'react-icons/gi';

const Footer = () => {
    return (
        <div>
                  <footer className='bg-gray-900 text-gray-300 pt-12 sm:pt-16 pb-6 sm:pb-8'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12'>
            <div>
              <div className='flex items-center gap-2 mb-4 sm:mb-6'>
                <GiCoffeeBeans className='text-3xl text-amber-500' />
                <span className='text-xl sm:text-2xl font-bold text-white'>BeanBliss</span>
              </div>
              <p className='text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6'>
                Premium coffee experiences delivered fresh. Savor the difference with every cup.
              </p>
              <div className='flex gap-3'>
                <a href='#' className='btn btn-circle btn-ghost btn-sm sm:btn-md hover:bg-amber-700 transition'>
                  <FaInstagram className='text-lg' />
                </a>
                <a href='#' className='btn btn-circle btn-ghost btn-sm sm:btn-md hover:bg-blue-700 transition'>
                  <FaFacebook className='text-lg' />
                </a>
                <a href='#' className='btn btn-circle btn-ghost btn-sm sm:btn-md hover:bg-sky-500 transition'>
                  <FaTwitter className='text-lg' />
                </a>
              </div>
            </div>

            <div>
              <h4 className='text-base sm:text-lg font-bold text-white mb-4 sm:mb-6'>Quick Links</h4>
              <ul className='space-y-2 sm:space-y-3 text-xs sm:text-sm'>
                <li><a href='#' className='hover:text-amber-400 transition-colors'>All Coffee</a></li>
                <li><a href='#' className='hover:text-amber-400 transition-colors'>Subscription Plans</a></li>
                <li><a href='#' className='hover:text-amber-400 transition-colors'>Brewing Guides</a></li>
                <li><a href='#' className='hover:text-amber-400 transition-colors'>Wholesale</a></li>
              </ul>
            </div>

            <div>
              <h4 className='text-base sm:text-lg font-bold text-white mb-4 sm:mb-6'>Support</h4>
              <ul className='space-y-2 sm:space-y-3 text-xs sm:text-sm'>
                <li><a href='#' className='hover:text-amber-400 transition-colors'>Contact Us</a></li>
                <li><a href='#' className='hover:text-amber-400 transition-colors'>FAQs</a></li>
                <li><a href='#' className='hover:text-amber-400 transition-colors'>Shipping Policy</a></li>
                <li><a href='#' className='hover:text-amber-400 transition-colors'>Returns</a></li>
              </ul>
            </div>

            <div>
              <h4 className='text-base sm:text-lg font-bold text-white mb-4 sm:mb-6'>Newsletter</h4>
              <p className='text-xs sm:text-sm mb-3 sm:mb-4'>Subscribe for exclusive offers and brewing tips</p>
              <div className='join join-vertical w-full sm:join-horizontal'>
                <input type='email' placeholder='Your email' className='input input-bordered input-sm sm:input-md join-item flex-1 text-xs sm:text-sm' />
                <button className='btn btn-primary btn-sm sm:btn-md join-item'>Subscribe</button>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm'>
            <p>&copy; {new Date().getFullYear()} BeanBliss Coffee Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </div>
    );
};

export default Footer;