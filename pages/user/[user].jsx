import { useRouter } from 'next/router';
import React , {useContext,useEffect, useState} from 'react';
import Header from '../../Components/Header';
import Headtag from '../../Components/Headtag';
import {MyContext} from "../_app"
import Link from "next/link";
import { doc, getFirestore,  limit,  orderBy,  startAfter,  updateDoc } from 'firebase/firestore';
import { collection, query as que, where, getDocs } from "firebase/firestore";
import app from '../../lib/firebase';
import {BsArrowDownCircle} from 'react-icons/bs';
import {IoMdInformationCircle} from "react-icons/io";

import BasicMenu from '../../Components/BasicMenu';

const LIMIT = 2;
export async function getServerSideProps({query}) {
    const {user} = query;
    const db = getFirestore(app);
    const q = que(collection(db,"Posts"),where("to","==",user),orderBy("time" , "desc"),limit(3));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(post => post.data());
    const notReported = posts.filter(post => post.reported != true);
    
    return {
      props: {
          posts: notReported,
          
      }, // will be passed to the page component as props
    }
  }


function User({posts}) {
  const [show,setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [currentPosts, setPosts] = useState(posts)
  const [end,setEnd] = useState(false);
  const {userInfo,userId} = useContext(MyContext);
  const router = useRouter()
  const { user } = router.query
  const textStyle = {
    "fontFamily": "'Gloria Hallelujah', cursive"
 } 
    useEffect(() => {

      setTimeout(async () => {
        if(userId) {
          const db =  getFirestore(app);
          const userRef =  doc(db,"users",userId);
          await updateDoc(userRef,{
            "lastActive" :  Date.now()
          },[])
        }
      },1000)
              
    
    },[userId])

  const getPosts = async () => {

    const db = getFirestore(app);
    const postsRef = collection(db,"Posts")
    const last = currentPosts[currentPosts.length - 1];
    const q = que(postsRef, where("to" , "==" , userId) ,orderBy("time" , "desc"),limit(LIMIT),startAfter(last.time));
    const querySnapshot = await getDocs(q);
    const newPosts = querySnapshot.docs.map(post => post.data());
    const notReported = newPosts.filter(post => post.reported != true);
    setPosts(currentPosts.concat(notReported));

    if(LIMIT > notReported.length) {
        setEnd(true);
      } 
  }

  if(user === userId){
    return (
   
        <div>
             <Headtag />
            <Header authed={true} userInfo={userInfo} userId={userId}/>
            <div className='flex  justify-center items-center space-y-4 space-x-4'>
                <p style={textStyle} className='text-4xl font-bold text-white'>Letters </p>
                <img className="w-16" src="../mail.png" />
            </div>
            {currentPosts.length === 0 && <p style={textStyle} className='mt-4 text-center text-4xl font-bold text-white'>No letters here... :(</p>}
            <div style={textStyle} className=' flex flex-col justify-center items-center font-bold text-white mt-12 '>
                {currentPosts.map((post) => (
                    <div key={post.id} onClick={(event) =>{
                      event.stopPropagation();
                      window.location.href = `/posts/${post.id}`;
                      }} className='z-0 relative w-[20rem] sm:w-[25rem] md:w-[50rem]  cursor-pointer p-4 border-4 my-4 rounded-lg transition-all ease-in-out hover:scale-105' >
                        <img className='w-16' src="../airplane.png"/>
                        <p className='text-4xl mb-4'>{post.title}</p>

                        {post.content.length > 100 && (
                          <p>{post.content.slice(0,200)}... <Link href={`/posts/${post.id}`}><a className='cursor-pointer text-red-200'>Read More</a></Link></p>

                        )}
                        {post.content.length <= 100 && (
                          <p>{post.content}</p>
                        )}
                        
                        
                        {!post.opened && (
                          <IoMdInformationCircle fontSize={52} className='absolute text-blue-600  top-4 right-4' />
                        )}
                        {post.opened && (
                          <BasicMenu id={post.id}/>
                        )}
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center'>

                
              {!end && (
                <BsArrowDownCircle onClick={getPosts} fontSize={52} className="text-white mt-2 cursor-pointer hover:animate-bounce">
                </BsArrowDownCircle>
              )} 
              

              {end && (
                <h1 style={textStyle}  className='text-white text-2xl font-bold '>
                  All posts has been displayed..
                </h1>
              )} 
              
            </div>
            <div className='h-[25vh]'></div>
        </div>
      )
  } else {
      return (
          <div className='text-red-200 text-3xl font-bold font-sans h-screen flex items-center justify-center'>
           
            <span onClick={() => {window.location.href=`/login` }} className='cursor-pointer underline'>  INVALID USER! CLICK HERE TO LOG IN</span>
          </div>
      )
  }
  
}

export default User;