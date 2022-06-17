import React from 'react'
import Header from '../components/Header'
import Headtag from '../components/Headtag'
import Login from '../components/Login'

function login() {
  return (
    <div>
        <Headtag />
        <Header page="login"/>
        <Login />
    </div>
  )
}

export default login