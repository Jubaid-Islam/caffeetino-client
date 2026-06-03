import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const { silentClearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderType, setOrderType] = useState("cart");
  const [coffeeId, setCoffeeId] = useState(null);

  // Extract order info from navigation state
  useEffect(() => {
    if (location.state) {
      setOrderType(location.state.orderType || "cart");
      setTotalAmount(location.state.price || 0);
      setCoffeeId(location.state.coffeeId || null);
    }
  }, [location.state]);

  // Create order after successful payment
  const createOrder = async (paymentIntentId) => {
    try {
      if (orderType === "single" && coffeeId && user?.email) {
        // Single product order
        const orderData = {
          coffeeId,
          customerEmail: user.email,
          createdAt: new Date(),
          paymentIntentId,
          status: "confirmed",
        };

        await axiosSecure.post(
          `/order/${coffeeId}`,
          orderData
        );
      } else if (orderType === "cart" && user?.email) {
        // Cart checkout - create order for all items
        const cartData = {
          paymentIntentId,
          status: "confirmed",
        };

        await axiosSecure.post(
          `/create-order-from-cart`,
          cartData
        );
      }
    } catch (err) {
      console.error("Error creating order:", err.response?.data || err.message);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Backend → create payment intent
      const paymentPayload = { type: orderType };

      // Include coffeeId for single product orders
      if (orderType === "single" && coffeeId) {
        paymentPayload.coffeeId = coffeeId;
      }

      const res = await axiosSecure.post(
        `/create-payment-intent`,
        paymentPayload
      );

      const clientSecret = res.data.clientSecret;
      const serverTotalAmount = res.data.totalAmount;
      setTotalAmount(serverTotalAmount);

      // 2️⃣ Confirm card payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.message,
        });
        return;
      }

      // 3️⃣ Create order after successful payment
      if (paymentIntent.status === "succeeded") {
        try {
          await createOrder(paymentIntent.id);

          // Clear cart from context after successful order
          await silentClearCart();

          Swal.fire({
            icon: "success",
            title: "Payment Successful 🎉",
            text: `Transaction ID: ${paymentIntent.id}\nAmount: ${serverTotalAmount} TK\n\nYour order has been confirmed!`,
            confirmButtonColor: "#3085d6",
          }).then(() => {
            // Navigate to orders page
            navigate('/myOrders');
          });
        } catch (orderErr) {
          console.error("Order creation error:", orderErr.response?.data || orderErr.message);
          Swal.fire({
            icon: "error",
            title: "Order Creation Failed",
            text: orderErr.response?.data?.message || "Payment succeeded but order creation failed. Please contact support.",
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Checkout Payment
      </h2>

      {/* Order Type Info */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
        <p className="font-semibold">
          {orderType === "single" ? "Single Product Order" : "Cart Checkout"}
        </p>
        <p className="text-xs mt-1">Amount: {totalAmount > 0 ? `USD ${totalAmount}` : "Calculating..."}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={!stripe || loading || totalAmount === 0}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : totalAmount > 0 ? `Pay $${totalAmount}` : "Pay ..."}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
