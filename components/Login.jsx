import React ,{useState,useContext} from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../lib/firebase';
import { MyContext } from '../pages/_app';
import toast, { Toaster } from 'react-hot-toast';
import {getFirestore, doc, updateDoc } from "firebase/firestore";
function Login() {
    const {authed , userInfo} = useContext(MyContext);
   
    const signIn = (email,password) => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const db = getFirestore(app);
            const userRef = doc(db,"users",user.uid);
            updateDoc(userRef,{
              "lastActive" :  Date.now()
            })
            toast.success('Successfully Logged In! Now redirecting..')
            setTimeout(() => {window.location.href = "/"} , 1000)
            
            
            // ...
        })
        .catch((error) => {
          const db = getFirestore(app);
          const userRef = doc(db,"BannedUsers",)
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error('Invalid Email or Password Try Again!')
            
        });
            }
    const textStyle = {
        "fontFamily": "'Gloria Hallelujah', cursive"
     }
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      return (
          
        <div  className='text-black max-w-7xl mx-auto flex justify-center items-center mt-12  md:mt-24 flex-col space-y-8'>
          <h1 style={textStyle} className='text-white text-2xl font-bold'>Log In</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            }
            }>
          <div className='flex flex-col space-y-8  font-bold bg-gray-200 p-12 rounded-xl'>
           <div>
            <p style={textStyle} className='text-lg'>Email</p>
             <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" className='rounded-lg px-4 py-2' placeholder='Email'/>
            </div>
            
            <div>
            <p style={textStyle} className='text-lg'>Password</p>
    
            <input value={password} onChange={(e) => {
              
              setPassword(e.target.value)}
              } type="password" className='rounded-lg px-4 py-2' placeholder='Password' />
            
            </div>
            
           <button type='submit' onClick={() => {signIn(email,password)}} style={textStyle} className='p-4 border-2 border-black rounded-full font-bold transition-all ease-in-out  hover:bg-black hover:text-white'>
             Log In
           </button>
          </div>
         
          </form>
          </div>
  )
}

export default Login