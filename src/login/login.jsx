import React, { useState } from 'react'
import "./login.css"
import { auth, db } from '../lib/firebase'
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
export default function Login() {
    const [avatar,setavatar]=useState({
        file:null,
        url:""
    })
    const handelfile= e =>{
        if(e.target.files[0]){
        setavatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])

        })
        }
    }
    const hundelcreate=async(e)=>{
        e.preventDefault();
        const formData= new FormData(e.target);
        const {username, email, password, photo} =Object.fromEntries(formData)
        try{
            const res=await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,"users",res.user.uid),{
                username:username,
                email:email,
                id:res.user.uid,
                photo:photo,
                blocked:[],
            })

            await setDoc(doc(db,"userschats",res.user.uid),{             
                chats:[],
            })
        }
        catch(err)
        {
            throw err;
        }
    }
    const handellogin=async(e)=>{
        e.preventDefault();
        const formData= new FormData(e.target);
        const {email, password} =Object.fromEntries(formData);
        try{
            const res=await signInWithEmailAndPassword(auth,email,password)
        }
        catch(err)
        {
            throw err;
        }
    }
  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome back</h2>
            <form onSubmit={handellogin}>
                <input type="email" placeholder='Email' name='email' />
                <input type="text" placeholder='password' name='password' />
                <button>Sign In</button>
            </form>
        </div>
        <div className="sperator"></div>
        <div className="item">
            <h2>Create an Account</h2>
            <form onSubmit={hundelcreate}>
                <label htmlFor="file">Upload an Image</label>
                <img src={avatar.url || "./avatar.png"} alt="" />
                <input onChange={handelfile} type="file" id='file' style={{display:'none'}} />
                <input type="text" placeholder='photo' name='photo' />
                <input type="text" placeholder='Username' name='username' />
                <input type="email" placeholder='Email' name='email' />
                <input type="test" placeholder='password' name='password' />
                <button>Sign Up</button>
            </form>
        </div>
    </div>
  )
}
