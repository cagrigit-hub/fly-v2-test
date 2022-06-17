import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import Link from "next/link";
import { useContext, useState } from "react"
import app from "../../lib/firebase";
import { MyContext } from "../_app"
export default function AdminPage({ }) {
   const {user , userId} = useContext(MyContext);
   const [reportedPosts , setPosts] = useState([]);
   useState(async () => {
    const db = getFirestore(app);
    const q = query(collection(db,"Posts") , where("reported" , "==" , true))
    const posts = await  getDocs(q);
    const reporteds = posts.docs.map(post => post.data());
    setPosts(reporteds);
   }, [])
    if(userId === "4vdEmW09vEaGoFQU12DYaNDGxpA2"){
        return (
            <main className="text-white text-5xl flex justify-center mt-44 flex-col items-center">
                <h1 className="text-3xl text-red-400"> REPORTED POSTS!</h1>
                {reportedPosts.map((post) => (
                    <div key={post.id} onClick={(event) =>{
                      event.stopPropagation();
                      window.location.href = `/posts/${post.id}`;
                      }} className='z-0 relative w-[20rem] sm:w-[25rem] md:w-[50rem]  cursor-pointer p-4 border-4 my-4 rounded-lg transition-all ease-in-out hover:scale-105' >
                        <img className='w-16' src="../airplane.png"/>
                        <p className='text-4xl mb-4'>Post Title: {post.title}</p>
                        <p className='text-2xl mb-4'>Belongs to: {post.from}</p>

                        {post.content.length > 100 && (
                          <p className="text-2xl">Content: {post.content.slice(0,200)}... <Link href={`/posts/${post.id}`}><a className='cursor-pointer text-red-200'>Read More</a></Link></p>

                        )}
                        {post.content.length <= 100 && (
                          <p className="text-2xl">Content: {post.content}</p>
                        )}
                    </div>
                ))}
                
            </main>
        )

    } else {
        return (
            <main className="text-white text-5xl h-screen flex justify-center items-center">
                YOU ARE NOT AN ADMIN!
            </main>
        )
    }
  
}