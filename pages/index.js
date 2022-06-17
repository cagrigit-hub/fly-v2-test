
import Header from '../components/Header'
import Hero from '../components/Hero'

import { MyContext } from './_app'
import {useContext, useEffect} from "react";
import Headtag from '../components/Headtag'

export default function Home() {
  const {authed , userInfo,userId} = useContext(MyContext);
  
  return (
    <div>
      <Headtag />
      <main>
      <Header page="home" authed={authed} userInfo={userInfo} userId={userId}/>
      <Hero />
      </main>
     
     
    </div>
  )
}
