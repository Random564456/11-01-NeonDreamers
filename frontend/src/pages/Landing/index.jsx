import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {

  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-center h-[700px] w-screen bg-black'>


      {/* TEXT DIV */}
      <div className='flex flex-col justify-center gap-7 h-auto'>
        <div>
          <h1 className='font-semibold text-[50px] leading-tight text-white mt-10'>Smarter Housing <br/> Insights with Machine <br/> Learning.</h1>
        </div>
        <div>
          <p className='text-[20px] text-white'>Investigate and analyze housing prices using <br/> advanced machine learning techniques</p>
        </div>
        <div>
          <button onClick={() => navigate("/analytics")} className='h-[60px] w-[200px] bg-green-600 rounded-md'>Get Started</button>
        </div>
      </div>


      {/* IMAGE DIV */}
      <div className='ml-20 h-[500px] w-[500px] bg-red-400'>
            Add Image here
      </div>
    </div>
  )
}

export default Landing
