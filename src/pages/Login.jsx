import React, { useContext, useState } from 'react'
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
  const [isFlipping, setIsFlipping] = useState(false)

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const switchState = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
      setIsFlipping(false)
    }, 300)
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
    <div className='min-h-[80vh] flex items-center justify-center relative overflow-hidden'>

      {/* 3D Animated Background */}
      <div className='absolute inset-0 z-0'>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}></div>

        {/* Floating 3D Shapes */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            borderRadius: i % 2 === 0 ? '50%' : '12px',
            background: `rgba(255,255,255,${0.05 + i * 0.02})`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 15}%`,
            animation: `float${i} ${3 + i}s ease-in-out infinite alternate`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transform: `rotate(${i * 15}deg)`,
          }}></div>
        ))}
      </div>

      <style>{`
        @keyframes float0 { from { transform: translateY(0px) rotate(0deg); } to { transform: translateY(-20px) rotate(10deg); } }
        @keyframes float1 { from { transform: translateY(0px) rotate(15deg); } to { transform: translateY(-30px) rotate(25deg); } }
        @keyframes float2 { from { transform: translateY(0px) rotate(30deg); } to { transform: translateY(-15px) rotate(40deg); } }
        @keyframes float3 { from { transform: translateY(0px) rotate(45deg); } to { transform: translateY(-25px) rotate(55deg); } }
        @keyframes float4 { from { transform: translateY(0px) rotate(60deg); } to { transform: translateY(-20px) rotate(70deg); } }
        @keyframes float5 { from { transform: translateY(0px) rotate(75deg); } to { transform: translateY(-35px) rotate(85deg); } }
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-3d:hover {
          transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02);
          box-shadow: 20px 20px 60px rgba(0,0,0,0.3), -20px -20px 60px rgba(255,255,255,0.1);
        }
        .flip-card {
          transition: transform 0.3s ease;
        }
        .flip-card.flipping {
          transform: perspective(1000px) rotateY(90deg);
        }
      `}</style>

      {/* 3D Floating Card */}
      <div className={`card-3d flip-card relative z-10 w-[90%] sm:max-w-md ${isFlipping ? 'flipping' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          padding: '40px',
        }}>

        {/* Title */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>
            {currentState === 'Login' ? '👋 Welcome Back' : '🚀 Join Us'}
          </h1>
          <p className='text-white/70 text-sm'>SAH E-Commerce</p>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>

          {currentState === 'Sign Up' && (
            <input
              required
              onChange={onChangeHandler}
              name='name'
              value={formData.name}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'white',
                outline: 'none',
              }}
              type='text'
              placeholder='Full Name'
              className='placeholder-white/60'
            />
          )}

          <input
            required
            onChange={onChangeHandler}
            name='email'
            value={formData.email}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: 'white',
              outline: 'none',
            }}
            type='email'
            placeholder='Email Address'
            className='placeholder-white/60'
          />

          <input
            required
            onChange={onChangeHandler}
            name='password'
            value={formData.password}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: 'white',
              outline: 'none',
            }}
            type='password'
            placeholder='Password'
            className='placeholder-white/60'
          />

          <div className='flex justify-between text-sm text-white/70 mt-1'>
            <p className='cursor-pointer hover:text-white transition'>Forgot password?</p>
            <p onClick={switchState} className='cursor-pointer hover:text-white transition'>
              {currentState === 'Login' ? 'Create account' : 'Login here'}
            </p>
          </div>

          <button
            type='submit'
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #764ba2)',
              borderRadius: '12px',
              padding: '14px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '8px',
              boxShadow: '0 4px 15px rgba(79,70,229,0.5)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(79,70,229,0.6)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 15px rgba(79,70,229,0.5)'
            }}
          >
            {currentState === 'Login' ? 'LOGIN' : 'SIGN UP'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login