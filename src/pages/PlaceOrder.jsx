import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { ArrowLeft } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const { currency, getCartAmount, delivery_fee, cartItems, products, token, backendUrl, setCartItems, navigate } = useContext(ShopContext)
  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'SAH E-Commerce',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            setCartItems({})
            navigate('/orders')
            toast.success('Payment Successful!')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      if (method === 'cod') {
        const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
        if (response.data.success) {
          setCartItems({})
          navigate('/orders')
          toast.success('Order Placed Successfully!')
        } else {
          toast.error(response.data.message)
        }
      }

      if (method === 'razorpay') {
        const response = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
        if (response.data.success) {
          initPay(response.data.order)
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
    <div className='border-t pt-14'>

      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-gray-500 hover:text-black mb-5 text-base'
      >
        <ArrowLeft size={20} /> Back
      </button>

      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5'>

        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
            <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode (Optional)' />
            <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />
        </div>

        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <Title text1={'CART'} text2={'TOTAL'} />
            <div className='flex flex-col gap-2 mt-2 text-sm'>
              <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}{getCartAmount()}</p>
              </div>
              <hr />
              <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency}{delivery_fee}</p>
              </div>
              <hr />
              <div className='flex justify-between font-bold text-lg'>
                <p>Total</p>
                <p>{currency}{getCartAmount() + delivery_fee}</p>
              </div>
            </div>
          </div>

          <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='flex gap-3 flex-col lg:flex-row mt-4'>
              <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'razorpay' ? 'border-green-400' : ''}`}>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>RAZORPAY</p>
              </div>
              <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'cod' ? 'border-green-400' : ''}`}>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>

            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder