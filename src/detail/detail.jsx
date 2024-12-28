import React from 'react'
import "./detail.css"
import { auth } from '../lib/firebase';
import { useUserStore } from '../context/Userstore';
export default function Detail() {
  const handleLogout = () => {
    auth.signOut();
  };
  const {currentuser}=useUserStore();
  return (
    <div className='detail'>
      <div className="user">
        <img src={currentuser?.photo || './avatar.png'}  alt="" />
        <h2>{currentuser.username}</h2>
        <p>{currentuser.email}</p>

        <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settinges</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy % help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Share photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoitem">
              <div className="photodetail">
              <img src="./favicon.png" alt="" />
              <span>dsjsjssj</span>
              </div>
            </div>
            <img src="./dawnload.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      </div>
    </div>
  )
}
