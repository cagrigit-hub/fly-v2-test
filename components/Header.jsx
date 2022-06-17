
import  Head  from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import app from '../lib/firebase';
import { collection, query, where, getDocs, getFirestore, orderBy, QuerySnapshot } from "firebase/firestore";





function Header({page,authed,userInfo,userId}) {
    const [notifications,setNotifications] = useState(0);
    const sOut = () => {
        window.location.href = "/";
        const auth = getAuth(app);
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
    const bringNotifications = async () => {
        if(userId){
            const db = getFirestore(app);
            const q = query(collection(db,"Posts"),where("to","==",userId),orderBy("time" , "desc"));
            const querySnapshot = await getDocs(q);
           
            const unOpenedPosts = querySnapshot.docs.filter((post) => post.data().opened == false);
            const notificationNumber = unOpenedPosts.length;
            
            setNotifications(notificationNumber);
        }
       
    }
        
 const textStyle = {
    "fontFamily": "'Gloria Hallelujah', cursive"
 }
   if(page==="register" || page=== "login"){
        return (
            <>
      <Head>
        <title>Fly</title>
        <meta name="description" content="just tell something, trust us, someone will read it." />
        <link rel="icon" href="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Roboto:wght@500&family=Tangerine:wght@700&display=swap" rel="stylesheet"></link>
      </Head>
    
    <div className='text-center max-w-7xl mx-auto flex justify-center items-center md:p-8 text-white flex-col space-y-8'>
        <div style={textStyle} className='brand text-5xl md:text-7xl py-2 md:px-8 font-bold  hover:scale-125 ease-in-out transition-all'>
            <Link href="/">
                <a>Fly</a>
            </Link>
    
            
    </div>
        <div style={textStyle} >
            <p className='font-bold text-xl'>write <span className='text-red-200'>anonymously</span>, share <span className='text-red-200'>anonymously</span></p>
        
        </div>
    </div>
    </>
        )
   } else {
       if(authed) {
        bringNotifications();
        return (
            
            <>
            
          
          <div className=' max-w-7xl mx-auto flex justify-between items-center p-4 md:p-8 text-white '>
              <div style={textStyle} className='brand text-5xl p-4 md:px-8 font-bold  hover:scale-125 ease-in-out transition-all'>
                  <Link href="/">
                      <a>Fly</a>
                  </Link>
              </div>
              <div style={textStyle} className='flex space-x-8  text-lg font-bold'>
                  <div className='relative' >
                    <Link  href={`/user/${userId}`}>
                    <a className="mr-4 z-10">{userInfo}</a>
                    </Link>
                    <div className='w-6 h-6  bg-indigo-900 absolute bottom-3 right-0 -z-40 rounded-full text-center text-white'>
                        {notifications}
                    </div>
                  </div>
                  
                  
                  <p className='cursor-pointer text-sm md:text-base' onClick={sOut}>Log Out</p>
              </div>
          </div>
          </>
          )
       } else {
        return (
            <>
            <Head>
              <title>Fly</title>
              <meta name="description" content="just tell something, trust us, someone will read it." />
              <link rel="icon" href="" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Roboto:wght@500&family=Tangerine:wght@700&display=swap" rel="stylesheet"></link>
            </Head>
          
          <div className=' max-w-7xl mx-auto flex justify-between items-center p-4 md:p-8 text-white '>
              <div style={textStyle} className='brand text-5xl p-4 md:px-8 font-bold  hover:scale-125 ease-in-out transition-all'>
                  <Link href="/">
                      <a>Fly</a>
                  </Link>
              </div>
              <div style={textStyle} className='flex space-x-8  text-lg font-bold'>
                  <Link href="/register">
                  <a>
                      Register
                  </a>
                  </Link>
                  <Link href="/login">
                  <a>
                      Log In
                  </a>
                  </Link>
              </div>
          </div>
          </>
          )
       }
  
   }
  
}

export default Header