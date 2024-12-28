import React from 'react'
import "./list.css"
import Userinfo from './userinfo/userinfo'
import Chatlist from './chatlist/chatlist'
export default function List() {
  return (
    <div className='list'>
        <Userinfo/>
        <Chatlist/>
    </div>
  )
}
