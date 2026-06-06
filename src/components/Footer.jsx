import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Left Section */}
        <div>
          <p className='text-2xl font-bold text-[#4f46e5] mb-5'>SAH E-Commerce</p>
          <p className='w-full md:w-2/3 text-gray-600'>
            SAH E-Commerce — jahan quality ki koi compromise nahi. 
            Aapka style, hamaari zimmedaari. Shop with confidence!
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <Link to='/'><li>Home</li></Link>
            <Link to='/about'><li>About Us</li></Link>
            <Link to='/collection'><li>Collection</li></Link>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 9876543210</li>
            <li>sah@ecommerce.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-500'>
          &copy; 2026 SAH E-Commerce — All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer