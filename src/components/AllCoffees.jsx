
import { useState } from "react";
import { useLoaderData } from "react-router-dom"
import CoffeeCard from "./CoffeeCard";
import { FaFilter } from "react-icons/fa";


const AllCoffees = () => {
    const data = useLoaderData()

    const [coffees, setCoffees] = useState(
        [...(data?.data || [])].reverse()
    )
    const [sortBy, setSortBy] = useState('default')


    const handleSort = (sortType) => {
        setSortBy(sortType)

        let sorted = [...coffees]

        switch (sortType) {
            case 'price-asc':
                sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                break

            case 'price-desc':
                sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                break

            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name))
                break

            default:
                sorted = [...(data?.data || [])].reverse()
                break
        }

        setCoffees(sorted)
    }


    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-amber-50'>
            {/* Header Section */}

            <div className='flex flex-col items-center py-6'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-2'>All Coffees</h1>
                <p className='text-sm sm:text-base'>Discover our premium collection of hand-roasted specialty coffee</p>
            </div>


            <div className='container mx-auto py-6 sm:py-12 px-4'>
                {/* Filter and Sort Bar */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8'>
                    <div className='flex items-center gap-2 text-gray-700 text-sm sm:text-base font-semibold'>
                        <FaFilter />
                        <span>Sort by:</span>
                    </div>
                    <div className='flex flex-wrap gap-2 w-full sm:w-auto'>
                        <button
                            onClick={() => handleSort('default')}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${sortBy === 'default' ? 'btn btn-primary' : 'btn btn-outline'}`}
                        >
                            Default
                        </button>
                        <button
                            onClick={() => handleSort('price-asc')}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${sortBy === 'price-asc' ? 'btn btn-primary' : 'btn btn-outline'}`}
                        >
                            Price: Low to High
                        </button>
                        <button
                            onClick={() => handleSort('price-desc')}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${sortBy === 'price-desc' ? 'btn btn-primary' : 'btn btn-outline'}`}
                        >
                            Price: High to Low
                        </button>
                        <button
                            onClick={() => handleSort('name')}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${sortBy === 'name' ? 'btn btn-primary' : 'btn btn-outline'}`}
                        >
                            Name A-Z
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <p className='text-gray-600 text-sm sm:text-base mb-6'>
                    Showing <span className='font-semibold text-gray-900'>{coffees.length}</span> products
                </p>

                {/* Coffee Grid */}
                {coffees.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                        {coffees.map(coffee => (
                            <CoffeeCard key={coffee._id} coffee={coffee} />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12'>
                        <p className='text-gray-600 text-lg'>No coffees found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCoffees;