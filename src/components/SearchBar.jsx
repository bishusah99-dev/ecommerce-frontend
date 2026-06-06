import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'
import { Search, X } from 'lucide-react'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setVisible(true)
  }, [location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center py-3 px-4'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search products...'
        />
        <Search size={18} className='text-gray-400 cursor-pointer' />
      </div>
      <X
        size={20}
        onClick={() => setShowSearch(false)}
        className='cursor-pointer text-gray-400 inline ml-3'
      />
    </div>
  ) : null
}

export default SearchBar