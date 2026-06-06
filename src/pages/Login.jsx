import React, { useContext, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Account created successfully!')
          navigate('/')
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email: formData.email,
          password: formData.password
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Login Successful!')
          navigate('/')
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col items-center w-[90%] sm:max-w-96 gap-4 text-gray-800'>

        <div className='flex items-center gap-2 mb-2'>
          <ShoppingBag size={28} color='#4f46e5' />
          <p className='text-2xl font-bold text-[#4f46e5]'>SAH E-Commerce</p>
        </div>

        <div className='flex items-center gap-2 w-full'>
          <p className='text-3xl font-medium'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {currentState === 'Sign Up' && (
          <input
            required
            onChange={onChangeHandler}
            name='name'
            value={formData.name}
            className='w-full px-3 py-2 border border-gray-800 outline-none'
            type='text'
            placeholder='Full Name'
          />
        )}

        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='w-full px-3 py-2 border border-gray-800 outline-none'
          type='email'
          placeholder='Email'
        />

        <input
          required
          onChange={onChangeHandler}
          name='password'
          value={formData.password}
          className='w-full px-3 py-2 border border-gray-800 outline-none'
          type='password'
          placeholder='Password'
        />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer text-[#4f46e5] hover:underline'>Forgot your password?</p>
          {currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-[#4f46e5] hover:underline'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-[#4f46e5] hover:underline'>Login here</p>
          }
        </div>

        <button
          onClick={onSubmitHandler}
          className='bg-[#4f46e5] text-white font-light px-8 py-2 mt-4 w-full hover:bg-[#4338ca] transition'
        >
          {currentState === 'Login' ? 'LOGIN' : 'SIGN UP'}
        </button>

      </div>
    </div>
  )
}

export default Login