import React from 'react'

const Contact = () => {
  return (
    <div className='py-10'>

      <div className='text-center text-3xl pt-10 border-t'>
        <h1>CONTACT US</h1>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28'>

        <div className='flex-1'>
          <img
            className='w-full rounded-lg'
            src='https://images.unsplash.com/photo-1521791136064-7986c2920216'
            alt='Contact'
          />
        </div>

        <div className='flex flex-col justify-center items-start gap-6 flex-1'>
          <p className='font-semibold text-xl text-gray-700'>
            Our Store
          </p>

          <p className='text-gray-500'>
            123 Main Street <br />
            New Delhi, India
          </p>

          <p className='text-gray-500'>
            Tel: +91 9876543210 <br />
            Email: support@shop.com
          </p>

          <p className='font-semibold text-xl text-gray-700'>
            Careers at Forever
          </p>

          <p className='text-gray-500'>
            Learn more about our teams and job openings.
          </p>

          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>

      </div>

    </div>
  )
}

export default Contact