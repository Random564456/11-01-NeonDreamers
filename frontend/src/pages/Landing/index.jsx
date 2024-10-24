import React from 'react'

const Landing = () => {
  return (
    <div className='w-screen h-screen bg-black'>


      {/* TEXT DIV */}
      <div className='flex flex-col gap-7 h-[750px]'>
        <div>
          <h1 className='font-semibold text-[50px] leading-tight text-white mt-10'>Smarter Housing <br/> Insights with Machine <br/> Learning.</h1>
        </div>
        <div>
          <p className='text-[20px] text-white'>Investigate and analyze housing prices using <br/> advanced machine learning techniques</p>
        </div>
        <div>
          <button className='h-[60px] w-[200px] bg-green-600 rounded-sm'>Get Started</button>
        </div>
      </div>


      {/* IMAGE DIV */}
      <div>

      </div>
    </div>
  )
}

export default Landing
