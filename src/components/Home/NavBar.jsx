import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GiCoffeeBeans, GiCoffeeCup } from "react-icons/gi";
import {
  FaHome,
  FaCoffee,
  FaPlusCircle,
  FaShoppingBag,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaCog,
  FaShoppingCart,
} from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import logo from "../../assets/more/logo.png";


const useScroll = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);
  return scrolled;
};


//  sub‑components
const Logo = memo(({ onClick }) => (
  <Link to="/" className="flex items-center gap-3 group" onClick={onClick}>
    <img src={logo} alt="Caffeetino logo" className="h-10 w-auto" />
    <span className="text-xl font-medium text-stone-800 tracking-[0.1em] transition-colors">
     Caffeetino
    </span>
  </Link>
));
Logo.displayName = "Logo";



const NavLinkItem = memo(({ to, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-amber-900"
        : "text-stone-900 hover:text-amber-900"
    }`}
  >
    <span className="flex items-center gap-2">{label}</span>
    {isActive && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-900 rounded-full" />
    )}
  </Link>
));
NavLinkItem.displayName = "NavLinkItem";



const UserAvatar = memo(({ user, onClick, isOpen }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-stone-200 hover:border-stone-300 transition-all bg-white"
  >
    {user.photoURL ? (
      <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
    ) : (
      <div className="w-8 h-8 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-sm uppercase">
        {user.displayName ? user.displayName.charAt(0) : "U"}
      </div>
    )}
    <RiArrowDropDownLine
      className={`w-5 h-5 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
    />
  </button>
));



const UserDropdownMenu = memo(({ user, items, onClose, onLogout }) => (
  <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-stone-100 py-1 overflow-hidden animate-slideDown">
    <div className="px-4 py-3 border-b border-stone-50 bg-stone-50/50">
      <p className="text-sm font-semibold text-stone-900 truncate">
        {user.displayName || "User"}
      </p>
      <p className="text-xs text-stone-500 truncate">{user.email}</p>
    </div>
    <div className="py-1">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600  hover:text-amber-900 transition-colors"
        >
          <span className="text-gray-400">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </div>
    <div className="border-t border-stone-100 pt-1 pb-1">
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
      >
        <FaSignOutAlt className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  </div>
));
UserDropdownMenu.displayName = "UserDropdownMenu";



const MobileMenuDrawer = memo(
  ({ isOpen, onClose, navItems, user, userMenuItems, onLogout }) => {
    const location = useLocation();

    // Prevent body scroll
    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "unset";
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);


    return (
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <span className="text-lg font-bold text-stone-800">Menu</span>
              <button
                onClick={onClose}
                className="p-2 text-stone-500 hover:bg-stone-100 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto py-4 px-5">
              <div className="space-y-1 mb-8">
                <p className="px-4 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Navigation
                </p>
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-stone-50 text-amber-900"
                          : "text-stone-600 hover:bg-stone-50 hover:text-amber-900"
                      }`}
                    >
                      <span
                        className={active ? "text-amber-900" : "text-stone-400"}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {user && (
                <div className="space-y-1">
                  <p className="px-4 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    Account
                  </p>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-amber-900 transition-all"
                    >
                      <span className="text-stone-400">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-stone-100 bg-stone-50/50">
              {user ? (
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-stone-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors shadow-sm"
                >
                  <FaSignOutAlt />
                  Log Out
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/signin"
                    onClick={onClose}
                    className="flex justify-center px-4 py-3 bg-white border border-stone-200 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-100 shadow-sm transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={onClose}
                    className="flex justify-center px-4 py-3 bg-amber-900 text-white rounded-xl text-sm font-medium hover:bg-amber-800 shadow-lg shadow-amber-600/20 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
MobileMenuDrawer.displayName = "MobileMenuDrawer";



// Main NavBar
const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  // custom scroll 
  const scrolled = useScroll(20);

  // Memoised navigation items
  const navItems = useMemo(() => {
    const base = [
      { path: "/", label: "Home", icon: <FaHome className="w-4 h-4" /> },
      {
        path: "/allCoffees",
        label: "All Coffees",
        icon: <FaCoffee className="w-4 h-4" />,
      },
    ];
    if (user) {
      base.push(
        {
          path: "/addCoffee",
          label: "Add Coffee",
          icon: <FaPlusCircle className="w-4 h-4" />,
        },
        {
          path: `/myCoffees/${user.email}`,
          label: "My Coffees",
          icon: <GiCoffeeCup className="w-4 h-4" />,
        },
        {
          path: "/myOrders",
          label: "My Orders",
          icon: <FaShoppingBag className="w-4 h-4" />,
        }
      );
    }
    return base;
  }, [user]);

  // Memoised user menu items
  const userMenuItems = useMemo(
    () => [
      {
        path: "/profile",
        label: "My Profile",
        icon: <FaUserCircle className="w-4 h-4" />,
      }

    ],
    []
  );

  // Helpers
  const isActive = useCallback((path) => location.pathname === path, [location]);


  // Handlers
  const handleLogout = useCallback(() => {
    logOut();
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  }, [logOut, navigate]);

  const toggleUserDropdown = useCallback(() => {
    setIsUserDropdownOpen((prev) => !prev);
  }, []);

  const closeUserDropdown = useCallback(() => {
    setIsUserDropdownOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Click‑outside handler for user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        closeUserDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeUserDropdown]);



  return (
    <>
      {/* animation styles */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <div className="container">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Logo onClick={closeMobileMenu} />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLinkItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  isActive={isActive(item.path)}
                />
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Cart */}
              {user && (
                <NavLink
                  to="/addToCartPage"
                  className="relative p-2 text-stone-600 hover:text-amber-900 transition-colors"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>
              )}

              {/* User Dropdown */}
              {user ? (
                <div className="relative" ref={userDropdownRef}>
                  <UserAvatar
                    user={user}
                    onClick={toggleUserDropdown}
                    isOpen={isUserDropdownOpen}
                  />
                  {isUserDropdownOpen && (
                    <UserDropdownMenu
                      user={user}
                      items={userMenuItems}
                      onClose={closeUserDropdown}
                      onLogout={handleLogout}
                    />
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-amber-900 rounded-xl hover:bg-amber-800 hover:shadow-amber-700/40 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-4">
              {user && (
                <NavLink
                  to="/addToCartPage"
                  className="relative p-2 text-stone-600 hover:text-amber-800 transition-colors"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>
              )}
              <button
                onClick={openMobileMenu}
                className="p-2 text-stone-600 hover:text-amber-800 hover:bg-stone-50 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navItems={navItems}
        user={user}
        userMenuItems={userMenuItems}
        onLogout={handleLogout}
      />
    </>
  );
};

export default NavBar;