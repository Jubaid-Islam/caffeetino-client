import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import OrderCard from './OrderCard';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true) //1


  const handleCancel = (id) => {
    setOrders((prev) => prev.filter((order) => order._id !== id))
  }

  useEffect(() => {
    if (user?.email) {
      setLoading(true)  //2

      axiosSecure
        .get(`/myOrders/${user.email}`)
        .then((res) => {
          setOrders(res?.data || [])
        })
        .catch((err) => {
          console.log(err)
          setOrders([])
        })
        .finally(() => {  //3
          setLoading(false)
        })
    }
  }, [user, axiosSecure])

  if (loading) {  //4
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-7 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          My Orders
        </h1>
        <p className="text-gray-600">
          Track and manage your coffee purchases
        </p>
      </div>

      {/* Orders List */}
      <div className="grid gap-6 mt-10">
        {orders.length > 0 ? (
          [...orders].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          ).map((order) => (
            <OrderCard key={order._id} coffee={order} onCancel={handleCancel} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
