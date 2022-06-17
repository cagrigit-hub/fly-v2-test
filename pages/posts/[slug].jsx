import { getFirestore, doc, getDoc, updateDoc , collection, getDocs,query } from "firebase/firestore";
import React ,{useContext} from 'react'
import Header from "../../components/Header";
import Headtag from "../../components/Headtag";
import Post from "../../components/Post";
import app from '../../lib/firebase'
import { MyContext } from "../_app";
import Link from "next/link"
export async function getServerSideProps({query}) {
    const { slug } = query
    const db = getFirestore(app);
    const docRef = doc(db, "Posts", slug);
    const docSnap = await getDoc(docRef);
    var data;
        if (docSnap.exists()) {
        data = docSnap.data();
        } else {
        // doc.data() will be undefined in this case
        data = null
        }

        
    return {
      props: {
          data: data
      }, // will be passed to the page component as props
    }
  }


function Slug({data}) {


  const {userId , userInfo, authed} = useContext(MyContext);
  if(data === null) {
    return (
      <div>
          <Headtag />
          <Header authed={authed} userInfo={userInfo} userId={userId}/>
          <div className="flex flex-col space-y-4 h-[50vh] justify-center items-center text-white text-3xl font-bold">
            <p> Any post couldn&apos;t be found.</p>
            
            <Link href={`/user/${userId}`}><a className="ml-4 text-red-300">to return posts.</a></Link>
          </div>
      </div>
    )
  } else {
    return (
      <div>
          <Headtag />
          <Header authed={authed} userInfo={userInfo} userId={userId}/>
          <Post post={data}/>
          
          <div className="h-[20vh]"></div>
      </div>
    )
  }
  
}

export default Slug