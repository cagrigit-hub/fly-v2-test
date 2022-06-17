import React ,{useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../lib/firebase';
import toast  from 'react-hot-toast';
import {getFirestore , doc, setDoc} from "firebase/firestore"
function Register() {
  const createUser = (email,password) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then( async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("Succesfully registered!")
        const db = getFirestore(db);
        const ref = doc(db,"users",user.uid)
        await setDoc(ref,{
          "lastActive" : Date.now(),
          "id" : user.uid,
          "email" : user.email
        })
      window.location.href="/"

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Error occured! Try Again")
        // ..
      });
  }
  
  const textStyle = {
    "fontFamily": "'Gloria Hallelujah', cursive"
 }
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  return (
    <div  className='text-black max-w-7xl mx-auto flex justify-center items-center flex-col space-y-8  mt-12  md:mt-24'>
      <h1 style={textStyle} className='text-white text-2xl font-bold'>Register</h1>
      <form onSubmit={(e) => {e.preventDefault()}}>
      <div className='flex flex-col space-y-8  font-bold bg-gray-200 p-12 rounded-xl'>
        
       <div>
        <p style={textStyle} className='text-lg'>Email</p>
         <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" className='rounded-lg px-4 py-2' placeholder='Email'/>
        </div>
        
        <div>
        <p style={textStyle} className='text-lg'>Password</p>

        <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" className='rounded-lg px-4 py-2' placeholder='Password' />

        </div>
       <button type='submit' onClick={() => {createUser(email,password)}} style={textStyle} className='p-4 border-2 border-black rounded-full font-bold transition-all ease-in-out  hover:bg-black hover:text-white'>
         Register
       </button>
       
      </div>
      </form>
     
      </div>
  )
}

export default Register