import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Headtag from '../components/Headtag'
import Register from '../components/Register'

function register() {
    
  return (
      
    <div>
    <Headtag />
    <Header page="register"  />
    <Register/>
   
    </div>
  )
}

export default register