import React from 'react'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

      <div className='flex flex-col items-center gap-3'>
        <img src='https://cdn-icons-png.flaticon.com/512/1611/1611179.png' className='w-12' alt='exchange' />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy</p>
      </div>

      <div className='flex flex-col items-center gap-3'>
        <img src='https://cdn-icons-png.flaticon.com/512/679/679821.png' className='w-12' alt='return' />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
      </div>

      <div className='flex flex-col items-center gap-3'>
        <img src='https://cdn-icons-png.flaticon.com/512/597/597177.png' className='w-12' alt='support' />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>

    </div>
  )
}

export default OurPolicy