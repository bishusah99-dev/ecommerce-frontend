import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <div className='text-center py-16 px-4'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe & Get 20% Off</p>
      <p className='text-gray-400 mt-3'>
        Join SAH E-Commerce newsletter and get exclusive deals straight to your inbox.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 pl-4'>
        <input
          className='w-full sm:flex-1 outline-none py-3 text-sm'
          type='email'
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='bg-black text-white text-xs px-8 py-4'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox