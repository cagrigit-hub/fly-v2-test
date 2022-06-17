import '../styles/globals.css'
import { createContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../lib/firebase';
import { Toaster } from 'react-hot-toast';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Header from '../Components/Header';
const MyContext = createContext({authed : false,userInfo : ""});


function MyApp({ Component, pageProps }) {
    const [authed,setAuth] = useState(false)
    const [userInfo,setUser] = useState(null);
    const [userId,setId] = useState(null);
    const [banned,setBan] = useState(false);
    const auth = getAuth(app);
    const db = getFirestore(app);
    useState(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setAuth(true);
          setUser(user.email);
          setId(user.uid);
          const userRef = doc(db,"users",user.uid);
          const userx = await getDoc(userRef);
          if(userx.data().banned){
            setBan(true);
          }
  
          
          // ...
        } else {
          // User is signed out
          // ...
          setAuth(false);
        }
      })
    },[])
    


  return (
    <MyContext.Provider value={{authed:authed,userInfo:userInfo,userId:userId }}>
      {!banned && (
        <>
        <Component {...pageProps} />
        <Toaster />
        </>
      )}
      {banned && (
        <div className='h-screen flex flex-col justify-center items-center'> 
          <Header authed={true}/>
         <h1 className='text-5xl font-bold text-red-900'> YOU ARE BANNED!</h1>

        </div>
      )}
      
    </MyContext.Provider>
  )
}
export {MyContext};
export default MyApp

