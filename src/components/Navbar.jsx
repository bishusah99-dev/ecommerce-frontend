import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, token, setToken, navigate } = useContext(ShopContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/login')
    setVisible(false)
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      {/* Logo */}
      <Link to='/' className='flex items-center gap-2'>
        <ShoppingBag size={32} color='#4f46e5' />
        <p className='text-4xl font-bold text-[#4f46e5]'>SAH E-Commerce</p>
      </Link>

      {/* Desktop Nav Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          {({isActive}) => (
            <>
              <p>HOME</p>
              <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? 'block' : 'hidden'}`}/>
            </>
          )}
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          {({isActive}) => (
            <>
              <p>COLLECTION</p>
              <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? 'block' : 'hidden'}`}/>
            </>
          )}
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          {({isActive}) => (
            <>
              <p>ABOUT</p>
              <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? 'block' : 'hidden'}`}/>
            </>
          )}
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          {({isActive}) => (
            <>
              <p>CONTACT</p>
              <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? 'block' : 'hidden'}`}/>
            </>
          )}
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className='flex items-center gap-6'>
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt="search"
        />

        <div className='relative group'>
          <Link to='/login'>
            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile" />
          </Link>
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer'
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/orders'>ORDERS</NavLink>
          {token
            ? <p onClick={logout} className='py-2 pl-6 border cursor-pointer'>LOGOUT</p>
            : <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/login'>LOGIN</NavLink>
          }
        </div>
      </div>

    </div>
  )
}

export default Navbar