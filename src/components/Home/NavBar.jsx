import { useContext, useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { GiCoffeeBeans, GiCoffeeCup } from 'react-icons/gi'
import { FaHome, FaCoffee, FaPlusCircle, FaShoppingBag, FaSignOutAlt, FaUserCircle, FaBars, FaTimes, FaSearch, FaCog, FaShoppingCart } from 'react-icons/fa'
import { IoMdNotifications } from 'react-icons/io'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { AuthContext } from '../../contexts/AuthContext'
import { CartContext } from '../../contexts/CartContext'

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const { cartItems } = useContext(CartContext)
    const location = useLocation()
    const navigate = useNavigate()

    // State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [scrolled, setScrolled] = useState(false)

    // Refs for click outside
    const userDropdownRef = useRef(null)
    const searchRef = useRef(null)

    // Navigation Data
    const navItems = [
        { path: '/', label: 'Home', icon: <FaHome className="w-4 h-4" /> },
        { path: '/allCoffees', label: 'All Coffees', icon: <FaCoffee className="w-4 h-4" /> },
        ...(user ? [
            { path: '/addCoffee', label: 'Add Coffee', icon: <FaPlusCircle className="w-4 h-4" /> },
            { path: `/myCoffees/${user?.email}`, label: 'My Coffees', icon: <GiCoffeeCup className="w-4 h-4" /> },
            { path: '/myOrders', label: 'My Orders', icon: <FaShoppingBag className="w-4 h-4" /> },
        ] : [])
    ]

    const userMenuItems = [
        { path: '/profile', label: 'My Profile', icon: <FaUserCircle className="w-4 h-4" /> },
        { path: '/settings', label: 'Settings', icon: <FaCog className="w-4 h-4" /> },
        { path: '/notifications', label: 'Notifications', icon: <IoMdNotifications className="w-4 h-4" /> },
    ]

    const isActive = (path) => location.pathname === path

    // Scroll & Click Outside Effects
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)

        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false)
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        document.addEventListener('mousedown', handleClickOutside)

        // Lock body scroll when mobile menu is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen, setScrolled])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
            setIsSearchOpen(false)
            setSearchQuery('')
        }
    }

    const handleLogout = () => {
        logOut()
        setIsUserDropdownOpen(false)
        setIsMobileMenuOpen(false)
        navigate('/')
    }

    // Animation Styles for Dropdown
    const slideDownStyle = {
        animation: 'slideDown 0.2s ease-out forwards'
    }

    return (
        <div className=''>
            <style>{`
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>

            {/* Main Navbar */}
            <nav className="fixed top-0 left-0 z-50 w-full bg-gray-50 transition-all duration-300 py-3">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-3 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >

                            <div className="relative">
                                <div className="absolute inset-0 bg-amber-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div className="relative p-2 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-all duration-300">
                                    <GiCoffeeBeans className="text-2xl" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-none group-hover:text-amber-700 transition-colors">
                                    BeanBliss
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                        ? 'text-amber-700 bg-amber-50'
                                        : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {item.icon}
                                        {item.label}
                                    </span>
                                    {isActive(item.path) && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-600 rounded-full"></span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-4">

                            {/* Search Toggle */}
                            <div className="relative" ref={searchRef}>
                                <button
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className={`p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:bg-gray-100'}`}
                                >
                                    <FaSearch className="w-5 h-5" />
                                </button>
                                {/* Search Dropdown */}
                                {isSearchOpen && (
                                    <div style={slideDownStyle} className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                                        <form onSubmit={handleSearch} className="relative">
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Search..."
                                                className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <FaSearch className="absolute left-3 top-2.5 text-gray-400 w-3.5 h-3.5" />
                                        </form>
                                    </div>
                                )}
                            </div>

                            {/* Cart & Notifications */}
                            {user && (
                                <>
                                    <NavLink to={'/addToCartPage'}>
                                        <button className="btn btn-primary relative p-2 hover:bg-gray-600 rounded-xl transition-colors hover:scale-110 hover:shadow-lg">
                                            <FaShoppingCart className="w-5 h-5" />
                                            {cartItems.length > 0 && (
                                                <span className="absolute bottom-7 left-6 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                                    {cartItems.length}
                                                </span>
                                            )}
                                        </button>
                                    </NavLink>
                                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                                        <IoMdNotifications className="w-5 h-5" />
                                        <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                                    </button>
                                </>
                            )}

                            {/* User Dropdown */}
                            {user ? (
                                <div className="relative" ref={userDropdownRef}>
                                    <button
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-gray-200 hover:border-amber-300 hover:shadow-sm transition-all bg-white"
                                    >
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm uppercase">
                                                {user.displayName ? user.displayName.charAt(0) : 'U'}
                                            </div>
                                        )}
                                        <RiArrowDropDownLine className={`w-5 h-5 text-gray-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div style={slideDownStyle} className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden">
                                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user.displayName || 'User'}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <div className="py-1">
                                                {userMenuItems.map((item) => (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        onClick={() => setIsUserDropdownOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                                                    >
                                                        <span className="text-gray-400">{item.icon}</span>
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="border-t border-gray-100 pt-1 pb-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                                >
                                                    <FaSignOutAlt className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/signin"
                                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-full shadow-lg shadow-amber-600/30 hover:bg-amber-700 hover:shadow-amber-700/40 transition-all"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-4">
                            {user && (
                                <NavLink to={'/addToCartPage'}>
                                    <button className="btn btn-primary relative p-2 hover:bg-gray-600 rounded-xl transition-colors hover:scale-110 hover:shadow-lg">
                                        <FaShoppingCart className="w-5 h-5" />
                                        {cartItems.length > 0 && (
                                            <span className="absolute bottom-7 left-6 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                                {cartItems.length}
                                            </span>
                                        )}
                                    </button>
                                </NavLink>
                            )}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FaBars className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer (Fixed Overlay) */}
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Drawer Panel */}
                <div
                    className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col h-full">

                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <span className="text-lg font-bold text-gray-900">Menu</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto py-4 px-5">

                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="mb-6 relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search coffees..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20"
                                />
                                <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                            </form>

                            {/* Navigation Links */}
                            <div className="space-y-1 mb-8">
                                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Navigation</p>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(item.path)
                                            ? 'bg-amber-50 text-amber-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className={isActive(item.path) ? 'text-amber-600' : 'text-gray-400'}>
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* User Account Section */}
                            {user && (
                                <div className="space-y-1">
                                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</p>
                                    {userMenuItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                                        >
                                            <span className="text-gray-400">{item.icon}</span>
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors shadow-sm"
                                >
                                    <FaSignOutAlt />
                                    Log Out
                                </button>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        to="/signin"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex justify-center px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 shadow-sm"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex justify-center px-4 py-3 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 shadow-lg shadow-amber-600/20"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
