import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className='border-t pt-14'>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-gray-500 hover:text-black mb-5 text-base'
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Title */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Content */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img
          className='w-full md:max-w-[450px]'
          src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800'
          alt="About SAH E-Commerce"
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>SAH E-Commerce ki shuruaat ek sapne se hui — ek aisi jagah banane ka sapna jahan har koi apni pasand ka fashion asaani se dhoondh sake. Hum maante hain ki style sirf ameer logon ke liye nahi, balki har insaan ke liye hai.</p>
          <p>Hamare paas Men, Women aur Kids ke liye latest collection hai. Har product carefully select kiya jaata hai taaki aapko best quality mile. Aapka style, hamaari zimmedaari — yahi hamaara vaada hai.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Hamaara mission hai ki hum aapko best quality products affordable prices pe provide karein. SAH E-Commerce — jahan quality ki koi compromise nahi.</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Har product ko quality check se guzarna padta hai. Hum sirf best deliver karte hain.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Ghar baithe shop karein. Easy returns, fast delivery aur 24/7 customer support.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Aapki koi bhi problem ho, hum hamesha available hain. Aapki satisfaction hamaari priority hai.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About