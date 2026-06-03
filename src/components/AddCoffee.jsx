import axios from 'axios'
import Swal from 'sweetalert2'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCoffee = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleAddCoffee = e => {
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)
    const newCoffee = Object.fromEntries(formData.entries())

    newCoffee.email = user?.email
    newCoffee.likedBy = []

    axios.post(`${import.meta.env.VITE_URL}/addCoffee`, newCoffee,
      { withCredentials: true }
    )
      .then(res => {
        console.log(res.data)
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "  Coffee added successfully"
        })
        navigate('/')
      })
      .catch(err => { console.error(err) })


    // console.log(newCoffee)
  }

  return (
    <div className='py-24 container'>
      <div className='p-12 text-center space-y-4'>
        <h1 className='text-6xl'>Add Coffee</h1>
        <p>
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
      </div>
      <form onSubmit={handleAddCoffee}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
            <label className='label'>Name</label>
            <input required
              type='text'
              name='name'
              className='input w-full'
              placeholder='Coffee Name'
            />
          </fieldset>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
            <label className='label'>Quantity</label>
            <input required
              type='text'
              name='quantity'
              className='input w-full'
              placeholder='Quantity Name'
            />
          </fieldset>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
            <label className='label'>Supplier</label>
            <input required
              type='text'
              name='supplier'
              className='input w-full'
              placeholder='Supplier Name'
            />
          </fieldset>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
            <label className='label'>Taste</label>
            <input
              type='text'
              name='taste'
              className='input w-full'
              placeholder='Taste Name'
            />
          </fieldset>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
            <label className='label'>Price</label>
            <input required
              type='text'
              name='price'
              className='input w-full'
              placeholder='Price per Cup'
            />
          </fieldset>
          <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border p-4'>
            <label className='label'>Details</label>
            <input
              type='text'
              name='details'
              className='input w-full'
              placeholder='Details Name'
            />
          </fieldset>
        </div>
        <fieldset className='fieldset bg-base-200 border-base-300 rounded-box border my-6 p-4'>
          <label className='label'>Photo</label>
          <input
            type='text'
            name='photo'
            className='input w-full'
            placeholder='Photo URL'
          />
        </fieldset>

        <input type='submit' className='btn w-full btn-primary' value='Add Coffee' />
      </form>
    </div>
  )
}

export default AddCoffee
