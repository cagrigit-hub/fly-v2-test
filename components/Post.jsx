import React, { useState  , useContext} from 'react';
import {IoTrashBin} from "react-icons/io5";
import {MdOutlineReportGmailerrorred} from "react-icons/md"
import { doc, deleteDoc, getFirestore, updateDoc, setDoc } from "firebase/firestore";
import app from '../lib/firebase';
import {ImCross} from "react-icons/im"
import toast,{ Toaster } from 'react-hot-toast';
import moment from 'moment';
import { MyContext } from '../pages/_app';
function Post({post}) {
    const {user , userId} = useContext(MyContext);
    const textStyle = {
        "fontFamily": "'Gloria Hallelujah', cursive"
     }

  const handleDelete = async () => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, "Posts", post.id)).then((err) => {
      if(err){
        toast.error("We couldn't able to delete.");
      } else {
        toast.success("Succesfully deleted!");
      }
    });
  }
  const banUser  = async () => { 
    const db = getFirestore(app);
    const bannedUser = doc(db,"BannedUsers",post.from);
    await setDoc(bannedUser, {
      "id" : post.from,
      "date" : Date.now(),
      "postId" : post.id,
    })
    const bannedPost = doc(db,"Posts" , post.id);
    await updateDoc(bannedPost, {
      banned: true,
    })
   const user = doc(db,"users" , post.from);
   await updateDoc(user,{
     banned: true
   })
    
  }

  const handleReport = async () => {
    const db = getFirestore(app);
    const reportedPosts = doc(db,"Posts" , post.id);
    await updateDoc(reportedPosts, {
      reported: true,
    })
    toast.success("Succesfully reported!")
    window.location.href = "/user"+ post.to
  }
  useState(() => {
      const db = getFirestore(app);
      const postRef = doc(db,"Posts",post.id);
      updateDoc(postRef, {
        opened: true
      })
  }, []);
  return (
    <div className=' mt-12 md:mt-0 min-h-[30rem] md:min-h-[50rem] max-w-xs sm:max-w-sm md:max-w-7xl  mx-auto bg-white rounded-3xl border-black p-4 text-center relative'>
        <p style={textStyle} className='text-2xl md:text-4xl text-black font-bold mb-4'>{post.title}</p>
        <hr />
         <p className='text-base md:text-2xl mt-4 mb-12 indent-4' style={textStyle}>{post.content}</p>
        <MdOutlineReportGmailerrorred onClick={handleReport} cursor="pointer" className='absolute bottom-2 ml-12 text-4xl text-red-400' />
        <IoTrashBin onClick={handleDelete} cursor="pointer" className="absolute bottom-2 left-0 ml-5 text-[2em] text-gray-800 " />
        {userId === "4vdEmW09vEaGoFQU12DYaNDGxpA2" && (
          <ImCross onClick={banUser} style={textStyle} className='absolute bottom-12 left-0 ml-7 font-bold text-base md:text-lg cursor-pointer' />
        )}

        <p style={textStyle} className='absolute bottom-4 right-0 mr-5 font-bold text-base md:text-lg'>{moment(post.time).format('MMMM Do YYYY, h:mm a')}</p>
        <Toaster />
    </div>
  )
}

export default Post