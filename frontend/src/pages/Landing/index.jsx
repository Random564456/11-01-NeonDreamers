import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {

  const navigate = useNavigate()



  return (
    <div className='flex items-center justify-center h-screen w-screen bg-white'>
      <div className='flex flex-col justify-center gap-7 h-auto'>
        <div>
          <h1 className='font-semibold text-[50px] leading-tight text-black mt-10'>Smarter Housing <br/> Insights with Machine <br/> Learning.</h1>
        </div>
        <div>
          <p className='text-[20px] text-black'>Investigate and analyze housing prices using <br/> advanced machine learning techniques</p>
        </div>
        <div>
        <a
          className="m-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-400 hover:text-black focus:outline-none focus:ring active:text-indigo-500"
          href="#"
          onClick={() => navigate("/analytics")}
        >
          Go to prediction model
        </a>
        </div>
      </div>


      {/* IMAGE DIV */}
      <div className='ml-20 h-[500px] w-[450px]'>
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/computers-mobile-hardware/artificial-intelligence-ai-chip-icon.png" alt="" />
      </div>
    </div>
  )
}

export default Landing
