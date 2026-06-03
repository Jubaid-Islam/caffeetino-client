import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"
import useAxiosSecure from "../Hooks/useAxiosSecure"
import { AuthContext } from "../contexts/AuthContext"

const UpdateCoffee = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  const [coffee, setCoffee] = useState({})

  // Load coffee data
  useEffect(() => {
    axiosSecure.get(`/coffee/${id}`)
      .then(res => setCoffee(res.data))
      .catch(err => console.log(err))
  }, [id, axiosSecure])

  // Update handler
  const handleUpdateCoffee = (e) => {
    e.preventDefault()

    const form = e.target

    const updatedCoffee = {
      name: form.name.value,
      quantity: form.quantity.value,
      supplier: form.supplier.value,
      taste: form.taste.value,
      price: form.price.value,
      details: form.details.value,
      photo: form.photo.value,
    }

    axiosSecure.patch(`/coffee/${id}`, updatedCoffee)
      .then(res => {
        console.log("Updated:", res.data)
        navigate(`/myCoffees/${user.email}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="py-24 container">
      <div className="p-12 text-center space-y-4">
        <h1 className="text-6xl font-bold">Update Coffee</h1>
      </div>

      <form onSubmit={handleUpdateCoffee} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Coffee Name</label>
            <input
              type="text"
              name="name"
              defaultValue={coffee?.name}
              className="input w-full"
              placeholder="Coffee Name"
            />
          </fieldset>

          {/* Quantity */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Quantity</label>
            <input
              type="text"
              name="quantity"
              defaultValue={coffee?.quantity}
              className="input w-full"
              placeholder="Quantity"
            />
          </fieldset>

          {/* Supplier */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Supplier</label>
            <input
              type="text"
              name="supplier"
              defaultValue={coffee?.supplier}
              className="input w-full"
              placeholder="Supplier Name"
            />
          </fieldset>

          {/* Taste */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Taste</label>
            <input
              type="text"
              name="taste"
              defaultValue={coffee?.taste}
              className="input w-full"
              placeholder="Taste"
            />
          </fieldset>

          {/* Price */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Price</label>
            <input
              type="text"
              name="price"
              defaultValue={coffee?.price}
              className="input w-full"
              placeholder="Price per Cup"
            />
          </fieldset>

          {/* Details */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Details</label>
            <input
              type="text"
              name="details"
              defaultValue={coffee?.details}
              className="input w-full"
              placeholder="Details"
            />
          </fieldset>

        </div>

        {/* Photo */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border my-6 p-4">
          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photo"
            defaultValue={coffee?.photo}
            className="input w-full"
            placeholder="Photo URL"
          />
        </fieldset>

        {/* Submit */}
        <input
          type="submit"
          className="btn w-full bg-amber-600 text-white hover:bg-amber-700"
          value="Update Coffee"
        />
      </form>
    </div>
  )
}

export default UpdateCoffee
