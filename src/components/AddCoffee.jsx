import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCoffee,
  FaBoxes,
  FaUserTie,
  FaTint,
  FaDollarSign,
  FaAlignLeft,
  FaImage,
  FaPlusCircle,
} from "react-icons/fa";
import Button from "../ui/Button";


const AddCoffee = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newCoffee = Object.fromEntries(formData.entries());

    newCoffee.email = user?.email;
    newCoffee.likedBy = [];

    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_URL}/addCoffee`, newCoffee, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        }).fire({
          icon: "success",
          title: "Coffee added successfully",
        });
        navigate("/allCoffees");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
          err: err,
        });
      })
      .finally(() => setLoading(false));
  };

  const inputFields = [
    { name: "name", label: "Coffee Name", icon: FaCoffee, placeholder: "Ethiopian Yirgacheffe", required: true },
    { name: "quantity", label: "Quantity", icon: FaBoxes, placeholder: "50", required: true },
    { name: "supplier", label: "Supplier", icon: FaUserTie, placeholder: "Blue Mountain Estate", required: true },
    { name: "taste", label: "Taste Profile", icon: FaTint, placeholder: "Fruity, Floral", required: false },
    { name: "price", label: "Price ($)", icon: FaDollarSign, placeholder: "24.99", required: true },
    { name: "details", label: "Details", icon: FaAlignLeft, placeholder: "Brief description", required: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
            List Your Coffee
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Share your premium coffee with the world. Fill in the details below
            and get your coffee listed in our collection.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-6 sm:p-8 md:p-10">
          <form onSubmit={handleAddCoffee} className="space-y-6">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {inputFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div
                    key={field.name}
                    className={`${field.name === "details" ? "md:col-span-2" : ""}`}
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-stone-700 mb-1.5"
                    >
                      {field.label} {field.required && <span className="text-amber-900">*</span>}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                        <Icon className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-900 focus:ring-2 focus:ring-amber-900/20 outline-none transition-all bg-stone-50/50 hover:bg-white"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* image */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-stone-700 mb-1.5">
                Photo URL <span className="text-stone-400 text-xs font-normal">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <FaImage className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="photo"
                  name="photo"
                  placeholder="https://example.com/coffee.jpg"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-900 focus:ring-2 focus:ring-amber-900/20 outline-none transition-all bg-stone-50/50 hover:bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 text-base py-3 px-6 rounded-xl shadow-lg shadow-amber-900/10 hover:shadow-amber-900/20"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <FaPlusCircle />
                    Add Coffee
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AddCoffee;