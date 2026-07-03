import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaSpinner, FaCoffee } from 'react-icons/fa';
import logo from "../assets/more/logo.png";

const SignUp = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    createUser(email, password)
      .then((result) => {
        updateUser({ displayName: name })
          .then(() => {
            setUser({ ...result?.user, displayName: name, photoURL: null });
            Swal.fire({
              icon: 'success',
              title: 'Welcome to Caffeetino!',
              text: 'Your account has been created successfully.',
              timer: 2000,
              showConfirmButton: false,
              customClass: { popup: 'rounded-2xl' },
            });
            navigate('/');
          })
          .catch((err) => {
            setError(err.message ||'Failed to update profile. Please try again.');
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-stone-200/60 border border-stone-100/80 p-8 md:p-10 transition-all duration-300 hover:shadow-stone-300/40">

          {/* Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2">
              <img src={logo} alt="Caffeetino logo" className="h-10 w-auto" />
              <span className="text-xl font-medium text-stone-800 tracking-[0.1em] transition-colors">
                Caffeetino
              </span>
            </div>
            <p className="text-stone-500 text-sm mt-1">
              Create your account to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  <FaUser className="text-sm" />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 outline-none transition-all duration-200 bg-stone-50/50 placeholder:text-stone-400 text-stone-800 text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  <FaEnvelope className="text-sm" />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 outline-none transition-all duration-200 bg-stone-50/50 placeholder:text-stone-400 text-stone-800 text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  <FaLock className="text-sm" />
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-stone-400 outline-none transition-all duration-200 bg-stone-50/50 placeholder:text-stone-400 text-stone-800 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs leading-relaxed">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-stone-200" />
            <span className="flex-shrink mx-4 text-xs text-stone-400 uppercase tracking-wider">
              or
            </span>
            <div className="flex-grow border-t border-stone-200" />
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-stone-500">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="font-semibold text-amber-900 hover:underline transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Decorative note */}
        <p className="text-center text-xs text-stone-400 mt-5">
          Secure • Encrypted • Free
        </p>
      </div>
    </div>
  );
};

export default SignUp;