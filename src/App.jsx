import { useEffect, useState } from 'react'
import List from './list/list'
import Detail from './detail/detail'
import Chat from './chat/chat'
import Login from './login/login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './context/Userstore'
import { useChatStore } from './context/usechatstore'
function App() {
  const [user,setuser]=useState(false);
  const {currentuser,fetchCurrentUser}=useUserStore();
  useEffect(()=>{
    const onsub=onAuthStateChanged(auth,user=>{
      fetchCurrentUser(user?.uid)
    });
    return ()=>{onsub()};
  },[fetchCurrentUser])
  const {chatid}=useChatStore();
  return (
    <div className='container'>
      {
        currentuser?
        <>
        <List/>
        {chatid&&<Chat/>}
        {chatid&&<Detail/>}
        </>:<Login/>
      }
    </div>
  )
}

export default App
