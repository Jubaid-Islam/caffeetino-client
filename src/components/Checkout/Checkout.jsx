import { useState, useEffect, useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import {
  FaShoppingBag,
  FaShoppingCart,
  FaLock,
  FaCreditCard,
  FaCheckCircle,
  FaSpinner,
} from 'react-icons/fa';

import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Checkout = ({ price, orderType = "cart", coffeeId}) => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  const { silentClearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const [cardFocused, setCardFocused] = useState(false);

  const isSingle = useMemo(() => orderType === 'single', [orderType]);

  
useEffect(() => {
  if (location.state) {
    setTotalAmount(location.state.price || 0);
  } else {
    setTotalAmount(Number(price) || 0);
  }
}, [location.state, price]);


  //  Create order after payment 
const createOrder = async (paymentIntentId) => {
  if (isSingle && coffeeId && user?.email) {
    await axiosSecure.post(`/order/${coffeeId}`, {
      coffeeId,
      customerEmail: user.email,
      createdAt: new Date(),
      paymentIntentId,
      status: "confirmed",
    });
  } else if (!isSingle && user?.email) {
    await axiosSecure.post("/create-order-from-cart", {
      paymentIntentId,
      status: "confirmed",
    });
  }
};

  //  Submit handler 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!stripe || !elements) return;

    try {
      setLoading(true);

      const paymentPayload = { type: orderType };
      if (isSingle && coffeeId) paymentPayload.coffeeId = coffeeId;


      const res = await axiosSecure.post('/create-payment-intent', paymentPayload);
      const { clientSecret, totalAmount: serverTotal } = res.data;
      setTotalAmount(serverTotal);


      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: stripeError.message,
          customClass: { popup: 'rounded-2xl' },
        });
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        try {
          await createOrder(paymentIntent.id);


          if (orderType === "cart") {
            await silentClearCart();
          }

          Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            html: `
              <p class="text-xs text-gray-400 mt-1 font-mono">${paymentIntent.id}</p>
            `,
            confirmButtonColor: '#78350F',
            customClass: { popup: 'rounded-2xl' },
          })
          .then(() => navigate('/myOrders'));
        } catch (orderErr) {
          Swal.fire({
            icon: 'error',
            title: 'Order Creation Failed',
            text: orderErr.response?.data?.message || 'Payment succeeded but order creation failed.',
            customClass: { popup: 'rounded-2xl' },
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Please try again later.',
        customClass: { popup: 'rounded-2xl' },
      });
    } finally {
      setLoading(false);
    }
  };

  // Render 
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-2xl font-bold text-stone-900">Secure Checkout</h1>
          <p className="text-sm text-stone-400 mt-1">Your payment is protected by Stripe</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden">
          {/* Order summary */}
          <div className="p-5 border-b border-stone-100 bg-stone-50/60">
            <div className="flex items-center gap-3">

              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800">
                  {isSingle ? 'Single Product Order' : 'Cart Checkout'}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">{user?.email}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone-400">Total</p>
                <p className="text-lg font-bold text-stone-900">
                  {totalAmount > 0 ? `$${totalAmount}` : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Card form */}
          <div className="p-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">
                  Card Details
                </label>
                <div
                  className={`px-4 py-3.5 rounded-xl border transition-all ${cardFocused
                    ? 'border-gray-300'
                    : 'border-gray-200'
                    } bg-white`}
                >
                  <CardElement
                    onFocus={() => setCardFocused(true)}
                    onBlur={() => setCardFocused(false)}
                    options={{
                      style: {
                        base: {
                          fontSize: '15px',
                          color: '#1f2937',
                          fontFamily: 'inherit',
                          '::placeholder': { color: '#9ca3af' },
                          iconColor: '#d97706',
                        },
                        invalid: { color: '#ef4444', iconColor: '#ef4444' },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-red-600 text-xs leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!stripe || loading || totalAmount === 0}
                className="w-full flex items-center justify-center gap-2 py-3 bg-amber-900 hover:bg-amber-800 text-white text-sm font-semibold rounded-xl transition  
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-base" /> Processing...
                  </>
                ) : (
                  <>
                    <span className="text-sm" > Pay {totalAmount > 0 ? `$${totalAmount}` : '...'}
                    </span>
                  </>
                )}
              </button>

              {/* demo card*/}
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-900 mb-3">
                  Demo Test Card
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Card Number</span>
                    <code className="font-mono font-semibold select-all">
                      4242 4242 4242 4242
                    </code>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-600">Expiry</span>
                    <code className="font-mono select-all">12 / 34</code>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-600">CVC</span>
                    <code className="font-mono select-all">123</code>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-600">ZIP</span>
                    <code className="font-mono select-all">12345</code>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-5">
          By completing your purchase you agree to our{' '}
          <span className="underline cursor-pointer hover:text-stone-600">Terms of Service</span>
        </p>
      </div>
    </div>
  );
};

export default Checkout;