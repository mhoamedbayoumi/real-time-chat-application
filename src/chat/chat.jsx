import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react'
import { onSnapshot,doc, setDoc, updateDoc,arrayUnion } from 'firebase/firestore'
import { useUserStore } from '../context/Userstore';
import { useChatStore } from '../context/usechatstore';
import { db } from '../lib/firebase';
import { format } from "timeago";
export default function Chat() {
  const[open,setopen]=useState(false);
  const [text,settext]=useState("");
  const endref=useRef(null);
  const handelemoji=(e)=>{
        settext((prev)=>prev+e.emoji);
        setopen(false);
  }

  const handelsend=async()=>{
    if(text=="") return;
    try{
        await updateDoc(doc(db,"chats",chatid),{
          messages: arrayUnion({
            senderId: currentuser.id,
            text,
            createdAt: new Date(),
          }),
        })
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    endref.current?.scrollIntoView({behavior:"smooth"})
  },[]);
  const [chat,setchat]=useState();
  const{chatid,user}=useChatStore();
  const {currentuser}=useUserStore()

  useEffect(()=>{
    console.log(chatid);
    const unSub = onSnapshot(doc(db, "chats", chatid), (res) => {
        setchat(res.data());
      });
      return () => {
        unSub();
      };
  },[chatid])
  console.log(chat);
  return (
    <div className='chat'>
        <div className="top">
            <div className="user">
                <img src={user?.photo || './avatar.png'} alt="" />
                <div className="texts">
                    <span>{user.username}</span>
                    <p>{user.email}</p>
                </div>
            </div>
            <div className="icons">
                <img src="./phone.png" alt="" />
                <img src="./video.png" alt="" />
                <img src="./info.png" alt="" />
            </div>
        </div>
        <div className="center">
        {
            chat?.messages?.map(message=>{
                return(
                <div className={message.senderId==currentuser.id?"message own":"message"} key={message.createdAt}>
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <p>{message.text}</p> 
                    <span>{message.senderId==currentuser.id?<>{currentuser.username}</>:<>{user.username}</>}</span>
                </div>
                </div>
                )
            })
        }
        <div ref={endref}></div>
        </div>
        <div className="bottom">
            <div className="icons">
                <img src="./img.png" alt="" />
                <img src="./camera.png" alt="" />
                <img src="./mic.png" alt="" />
            </div>
            <input value={text} onChange={e=>settext(e.target.value)} type="text" placeholder='Type a message...' />
            <div className="emoji">
                <img onClick={()=>setopen(prev=>!prev)} src="./emoji.png" alt="" />
                <EmojiPicker open={open} onEmojiClick={handelemoji}/>
            </div>
            <button className='sendbutton' onClick={handelsend}>Send</button>
        </div>
    </div> 
  )
}
