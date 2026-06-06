import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'
import { ArrowLeft } from 'lucide-react'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const item = products.find((item) => item._id === productId)
    if (item) {
      setProductData(item)
      setImage(item.image[0])
    }
    window.scrollTo(0, 0)
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10'>

      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-gray-500 hover:text-black mb-5 text-base'
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className='flex gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          {/* Out of Stock Badge */}
          {!productData.inStock && (
            <div className='inline-block mt-2 bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded'>
              Out of Stock
            </div>
          )}

          <div className='flex items-center gap-1 mt-2'>
            <span className='text-yellow-400'>★★★★☆</span>
            <p className='pl-2 text-gray-500'>(122 reviews)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p className='font-medium'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => productData.inStock && setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500 bg-orange-50' : ''} ${!productData.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  key={index}
                  disabled={!productData.inStock}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {productData.inStock ? (
            <button
              onClick={() => addToCart(productData._id, size)}
              className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
            >
              ADD TO CART
            </button>
          ) : (
            <button
              disabled
              className='bg-gray-300 text-gray-500 px-8 py-3 text-sm cursor-not-allowed'
            >
              OUT OF STOCK
            </button>
          )}

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm text-gray-500'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>{productData.description}</p>
          <p>SAH E-Commerce — jahan quality ki koi compromise nahi.</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='text-center py-20 text-gray-400'>Loading...</div>
  )
}

export default Product