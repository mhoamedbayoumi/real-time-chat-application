import React, { useEffect, useState } from 'react'
import "./chatlist.css"
import Adduser from '../adduser/adduser'
import "../adduser/adduser.css"
import { useUserStore } from '../../context/Userstore'
import { doc, getDoc, getDocs,onSnapshot,collection,arrayUnion,query,serverTimestamp,setDoc,updateDoc,where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../context/usechatstore'
export default function Chatlist() {
  const [Addmode,setAddmode]=useState(false)
  const {currentuser}=useUserStore();
  const {chatid,chatchange}=useChatStore();
  const [chats,setchats]=useState([]);
  useEffect(()=>{
    const unsub=onSnapshot(doc(db,"userschats",currentuser.id),async(res)=>{
      const items=res?.data()?.chats;
      const promrisses=items.map(async(item)=>{
        const userdocref=doc(db,"users",item.receiverId);
        const userdocsnap=await getDoc(userdocref);
        const user =userdocsnap.data();
        return{...item,user};
      });
      const chatdata=await Promise.all(promrisses);
      setchats(chatdata.sort((a,b)=>b.updatedAt - a.updatedAt))
    })
    return ()=>{unsub()}
  },[currentuser])

  const handleSelect = async(chat) => {
     chatchange(chat.chatId,chat.user)
      console.log(chat.chatId)
  };
  return (
    <div className='chatlist'>
      <div className="search">
        <div className="searchbar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder='Search' />
        </div> 
        <img className="add" onClick={() => setAddmode((prev) => !prev)} src={Addmode?"./minus.png":"./plus.png"} alt="" />
      </div>
      {chats.map((chat)=>{
        return(
          <div className="items" key={chat.chatId} onClick={()=>handleSelect(chat)}>
          <img src={chat.user?.photo || './avatar.png'} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>)
      })}
      {Addmode&&<Adduser/>}
    </div>
  )
}
