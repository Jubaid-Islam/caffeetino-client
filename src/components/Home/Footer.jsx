// Footer.jsx
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaCoffee,
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import logo from "../../assets/more/logo.png";



const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-stone-200 pt-16 pb-8 px-4 sm:px-6">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-stone-200">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src={logo} alt="Caffeetino logo" className="h-10 w-auto" />
              <span className="text-xl font-medium text-stone-800 tracking-[0.1em] transition-colors">
                Caffeetino
              </span>
            </Link>
            <p className="text-sm text-stone-500 max-w-xs leading-relaxed">
              Hand‑roasted specialty coffee, delivered fresh to your doorstep. Experience the bliss in every cup.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-stone-900 font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[{ label: 'About Us', to: '/about' },
              { label: 'All Coffees', to: '/allCoffees' },
              { label: 'My Coffees', to: '/myCoffees' },
              { label: 'Contact', to: '/contact' }].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-stone-600 hover:text-amber-600 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-stone-900 font-bold text-sm uppercase tracking-wider mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-amber-900 hover:text-white transition-all duration-300">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-stone-900 font-bold text-sm uppercase tracking-wider mb-4">Stay Caffeinated</h4>
            <p className="text-sm text-stone-500 mb-4">Get the latest drops and exclusive offers.</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none   transition-all"
              />
              <button type="submit" className="w-full px-5 py-2.5 bg-amber-900 hover:bg-amber-800 text-white text-sm font-semibold rounded-lg transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>&copy; {currentYear} Caffeetino. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;