import { useState } from "react";
import { useLoaderData } from "react-router-dom"
import CoffeeCard from "./CoffeeCard";

const MyCoffees = () => {
  const data = useLoaderData()
  const [coffees] = useState(data?.data || [])
  console.log(coffees);
  return (
    <div>
      <div className="text-2xl flex justify-center py-4"> My Coffee's </div>
      <div className='container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-6 py-12'>
        {
          coffees.map(coffee => (
            <CoffeeCard key={coffee._id} coffee={coffee} />
          ))
        }
      </div>
    </div>
  )
}

export default MyCoffees

