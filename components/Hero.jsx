import React from 'react'
import Link from "next/link"
function Hero() {
    const textStyle = {
        "fontFamily": "'Gloria Hallelujah', cursive"
     }
  return (
    <div className='text-white max-w-7xl mx-auto flex items-center text-center justify-center md:justify-between'>
    
    <div className="logo hidden md:inline-block p-20 mt-20 relative hover:scale-125 ease-in-out transition-all">
        <Link href="/">
        <a><img width="300px" src="mail.png"></img></a>
        </Link>
      
    </div>
    <div style={textStyle} className="slogan text-[1.5rem] md:text-[2.5rem] mt-32 sm:mt-48 md:mt-24 font-bold w-[75%] md:w-[50%] flex flex-col">
        <p>
        Just post something <span className='underline text-red-300'>anonymously</span>, trust us, someone will read it.
        </p>
        <Link href="post">
    <a className='border-4 mt-12 rounded-xl hover:bg-white hover:text-blue-900 hover:border-0 hover:py-1 '>Post Now!</a>

        </Link>
    </div>
    </div>
  )
}

export default Hero