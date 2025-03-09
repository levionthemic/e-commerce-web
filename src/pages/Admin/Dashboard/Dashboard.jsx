import { IoIosMore } from 'react-icons/io'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { FaArrowTrendDown } from 'react-icons/fa6'

function Dashboard() {
  return (
    <div className='grid grid-cols-4 p-4'>
      <div className="col-span-3">
        <div className='grid grid-cols-2 2xl:grid-cols-4 gap-4 mb-4'>
          <div className='bg-white rounded-2xl h-fit p-6'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-md'>Total Products</span>
              <IoIosMore className='text-gray-400'/>
            </div>
            <div className="flex items-center justify-between">
              <span className='font-bold text-3xl'>4,892</span>
              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-2 text-[#AAB264] bg-[#F7FCD0] w-fit px-2 py-1 rounded-xl font-medium'>
                  <FaArrowTrendUp />
                  <span>+6.53%</span>
                </div>
                <span className='text-gray-400 text-sm'>from last week</span>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-2xl h-fit p-6'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-md'>Available Stock</span>
              <IoIosMore className='text-gray-400'/>
            </div>
            <div className="flex items-center justify-between">
              <span className='font-bold text-3xl'>2,137</span>
              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-2 text-[#EA6072] bg-[#FFF0F3] w-fit px-2 py-1 rounded-xl font-medium'>
                  <FaArrowTrendDown />
                  <span>-6.24%</span>
                </div>
                <span className='text-gray-400 text-sm'>from last week</span>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-2xl h-fit p-6'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-md'>Low Stock</span>
              <IoIosMore className='text-gray-400'/>
            </div>
            <div className="flex items-center justify-between">
              <span className='font-bold text-3xl'>1,952</span>
              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-2 text-[#AAB264] bg-[#F7FCD0] w-fit px-2 py-1 rounded-xl font-medium'>
                  <FaArrowTrendUp />
                  <span>+1.53%</span>
                </div>
                <span className='text-gray-400 text-sm'>from last week</span>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-2xl h-fit p-6'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-md'>Out of Stock</span>
              <IoIosMore className='text-gray-400'/>
            </div>
            <div className="flex items-center justify-between">
              <span className='font-bold text-3xl'>803</span>
              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-2 text-[#EA6072] bg-[#FFF0F3] w-fit px-2 py-1 rounded-xl font-medium'>
                  <FaArrowTrendDown />
                  <span>-1.95%</span>
                </div>
                <span className='text-gray-400 text-sm'>from last week</span>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='bg-white rounded-2xl p-6 h-fit'>
            <div className='flex items-center justify-between'>
              <span className='font-semibold text-lg'>Profit by Category</span>
              <span className='text-gray-400'>This year</span>
            </div>
          </div>


        </div>
      </div>

      <div className="col-span-1">
        Alo
      </div>

    </div>
  )
}

export default Dashboard