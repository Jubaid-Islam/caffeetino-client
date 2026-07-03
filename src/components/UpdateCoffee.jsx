import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../contexts/AuthContext";
import {
  FaCoffee,
  FaBoxes,
  FaUserTie,
  FaTint,
  FaDollarSign,
  FaAlignLeft,
  FaImage,
  FaSave,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { HiOutlineArrowLeft } from "react-icons/hi";

const UpdateCoffee = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [coffee, setCoffee] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  // Load coffee data
  useEffect(() => {

    axiosSecure
      .get(`/coffee/${id}`)
      .then((res) => {
        setCoffee(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not load coffee details.",
        });
        navigate(-1);
      })
  }, [id, axiosSecure, navigate]);

  // Update handler
  const handleUpdateCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCoffee = {
      name: form.name.value,
      quantity: form.quantity.value,
      supplier: form.supplier.value,
      taste: form.taste.value,
      price: form.price.value,
      details: form.details.value,
      photo: form.photo.value,
    };

    setSubmitting(true);
    axiosSecure
      .patch(`/coffee/${id}`, updatedCoffee)
      .then(() => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        }).fire({
          icon: "success",
          title: " Coffee updated",
        });
        navigate(`/myCoffees/${user.email}`);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Something went wrong. Please try again.",
        });
      })
      .finally(() => setSubmitting(false));
  };

  // Input field config
  const inputFields = [
    { name: "name", label: "Coffee Name", icon: FaCoffee, placeholder: "e.g., Ethiopian Yirgacheffe", required: true },
    { name: "quantity", label: "Quantity", icon: FaBoxes, placeholder: "e.g., 50", required: true },
    { name: "supplier", label: "Supplier", icon: FaUserTie, placeholder: "e.g., Blue Mountain Estate", required: true },
    { name: "taste", label: "Taste Profile", icon: FaTint, placeholder: "e.g., Fruity, Floral", required: false },
    { name: "price", label: "Price ($)", icon: FaDollarSign, placeholder: "e.g., 24.99", required: true },
    { name: "details", label: "Details", icon: FaAlignLeft, placeholder: "Brief description", required: false },
  ];



  if (!coffee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-500">Coffee not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="mb-3 sm:mb-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-amber-900 transition-colors"
          >
            <HiOutlineArrowLeft size={12} className="text-base" />
            Back
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
            Update Your Coffee
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto mt-3 text-sm sm:text-base">
            Edit the details of your listed coffee. All fields marked with * are required.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-6 sm:p-8 md:p-10">
          <form onSubmit={handleUpdateCoffee} className="space-y-6">
            {/* Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {inputFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div
                    key={field.name}
                    className={field.name === "details" ? "md:col-span-2" : ""}
                  >
                    <label
                      htmlFor={`update-${field.name}`}
                      className="block text-sm font-medium text-stone-700 mb-1.5"
                    >
                      {field.label}{" "}
                      {field.required && <span className="text-amber-900">*</span>}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                        <Icon className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        id={`update-${field.name}`}
                        name={field.name}
                        defaultValue={coffee?.[field.name] || ""}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-900 focus:ring-2 focus:ring-amber-900/20 outline-none transition-all bg-stone-50/50 hover:bg-white"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Image  */}
            <div>
              <label htmlFor="update-photo" className="block text-sm font-medium text-stone-700 mb-1.5">
                Photo URL <span className="text-stone-400 text-xs font-normal">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <FaImage className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="update-photo"
                  name="photo"
                  defaultValue={coffee?.photo || ""}
                  placeholder="https://example.com/coffee.jpg"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-900 focus:ring-2 focus:ring-amber-900/20 outline-none transition-all bg-stone-50/50 hover:bg-white"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-900 text-white rounded-xl font-medium hover:bg-amber-800 transition shadow-lg shadow-amber-900/10 disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    Update Coffee
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 text-stone-700 rounded-xl font-medium hover:bg-stone-200 transition"
              >

                Cancel
              </button>
            </div>
          </form>
        </div>


      </div>
    </div>
  );
};

export default UpdateCoffee;