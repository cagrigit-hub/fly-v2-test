import React , {useContext,useEffect,useState} from 'react'
import Header from '../components/Header'
import Headtag from '../components/Headtag'
import { doc, setDoc, getFirestore , query,where,getDocs, collection, orderBy, limit , addDoc} from "firebase/firestore"; 
import { MyContext } from './_app'
import app from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

function Post() {
    const {authed,userInfo,userId} = useContext(MyContext)
    useEffect(() => {
        
        if(!authed){
            window.location.href = "/login"
        }
    }, [])
    const shareContent = async () => {
        const db = getFirestore(app);
        const userRef = collection(db,"users");
        const q = query(
            userRef, 
            where("lastActive" , ">=" , Date.now() - 1000 * 60 * 60 * 24 * 7),
            );
    
        const querySnapshot = await getDocs(q);
        var currentUsers = querySnapshot.docs
        var notBannedUsers = currentUsers.filter(user => user.banned != true);
        var randomNumber = Math.floor(Math.random() * notBannedUsers.length);
        var randomUser = notBannedUsers[randomNumber];
        if(randomUser.id === userId){
            delete notBannedUsers[randomNumber]
            randomNumber = Math.floor(Math.random() * currentUsers.length);
            randomUser = currentUsers[randomNumber]
        }
        const postId = uuidv4();
        if(randomUser) {
           
            const ref = doc(db,"Posts",postId);
        await setDoc(ref,{
            "id" : postId,
            "title" : title,
            "content" : content,
            "to" : randomUser.id,
            "from" : userId,
            "time" : Date.now(),
            "opened" : false

        }).then((err) => {
           
            if (!err) {
                toast.success("Succesfully Posted!")
                console.log("Content shared!");
            } else {
                toast.error("Failed!")
                
            }
        })
        } else {
            toast.success("Succesfully Posted!")
            const ref = doc(db,"Unsends",postId);
            await setDoc(ref,{
                "id" : postId,
                "title" : title,
                "content" : content,
                "to" : null,
                "from" : userId,
                "time" : Date.now(),
            })
        }
        setTimeout(() => {
            toast.loading("Redirecting...")
            setTimeout(() => {
                toast.success("Success..")
                    
                }, 500)
            }, 500)
        
        setTimeout(() => {
        window.location.href = "/";
            
        }, 1000)
        
    }
    const textStyle = {
        "fontFamily": "'Gloria Hallelujah', cursive"
     }
     const [title,setTitle] = useState("");
     const [content,setContent] = useState("");
    return (
        <>
        <Headtag />
        <div className='max-w-7xl mx-auto'>
            <Header page="register" />

            <div className='flex items-center justify-center md:mt-24 text-center space-y-4 '>
                <form onSubmit={(e) => {
            e.preventDefault();
            }
            } className='space-y-4 flex flex-col items-center justify-center '>
                    <p style={textStyle} className="text-white font-bold text-lg md:text-3xl">Let&apos;s share whatever you want!</p>
                    <textarea value={title} onChange={(e) => {setTitle(e.target.value)}}  style={textStyle} rows={1} cols={5} className="focus:outline-none p-4 rounded-lg font-bold w-[75%] md:w-full" placeholder='Title'>

                    </textarea>
                    <textarea value={content} onChange={(e) => {setContent(e.target.value)}}  style={textStyle} rows={10} cols={5} className="focus:outline-none p-4 rounded-lg font-bold w-[75%] md:w-full" placeholder='Content'>

                    </textarea>
                    <button type='submit' onClick={() => {shareContent()}} style={textStyle} className='p-4 w-[75%] md:w-full border-2 text-2xl border-white text-white rounded-full font-bold transition-all ease-in-out  hover:bg-white hover:text-black'>
                        Share
                    </button>
                    <p style={textStyle} className="text-white font-bold mr-4 text-sm md:text-base">Your writings will be shared anonymously, with completely random people. Be aware what you write.</p>
                    <p style={textStyle} className=" font-bold text-red-200 mr-4 text-sm md:text-base">sexual or harmful content is prohibited</p>
                </form>

            </div>
            
        </div>
        </>
    )
    


  
}

export default Post