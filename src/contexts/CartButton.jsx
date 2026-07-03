import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ coffee }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    Swal.fire({
      title: "Add to Cart?",
      text: `Do you want to add "${coffee.name}" to your cart?`,
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
      confirmButtonColor: '#78350F',
      cancelButtonText: "No",

    }).then((result) => {
      if (result.isConfirmed) {
        addToCart(coffee);

        const Toast = Swal.mixin({
          toast: true, position: "top-end", showConfirmButton: false, timer: 1500, timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: "success", title: "  Cart added successfully"
        })
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={coffee.quantity === 0}
      className={`btn rounded-lg bg-white font-semibold flex gap-2
        ${coffee.quantity === 0
          ? "btn-disabled py-3 bg-gray-300 text-gray-500 cursor-not-allowed"
          : " text-amber-900"
        }`}
    >
      <FaShoppingCart />
      <span className="sm:inline">
        {coffee.quantity === 0 ? "Out of Stock" : "Add to Cart"}
      </span>
    </button>
  );
};

export default CartButton;
