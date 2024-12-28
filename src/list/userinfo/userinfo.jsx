import React from 'react'
import "./userinfo.css"
import { useUserStore } from '../../context/Userstore'
export default function Userinfo() {
  const {currentuser}=useUserStore();
  return (
    <div className='userinfo'>
        <div className="user">
          <img src={currentuser?.photo || './avatar.png'} alt="" />
          <h2>{currentuser.username}</h2>
        </div> 
        <div className="icons">
            <img src="./more.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./edit.png" alt="" />
        </div>
    </div>
  )
}
