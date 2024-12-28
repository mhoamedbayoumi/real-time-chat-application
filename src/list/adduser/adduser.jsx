import React, { useState } from 'react';
import './adduser.css';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useUserStore } from '../../context/Userstore';
import { db } from '../../lib/firebase';

export default function Adduser() {
  const [user, setUser] = useState(null);
  const { currentuser } = useUserStore();

  const handeladduser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');

    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const foundUser = querySnapshot.docs[0];
        setUser({ ...foundUser.data(), id: foundUser.id }); // Add id to the user
      } else {
        console.log('User not found.');
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const Add = async () => {
    if (!user || !user.id || !currentuser || !currentuser.id) {
      console.log('User or current user is not properly defined.');
      return;
    }

    const chatRef = collection(db, 'chats');
    const userChatRef = collection(db, 'userschats');

    try {
      // Create a new chat document with an auto-generated ID
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Ensure user chat documents exist
      const userChatDoc = doc(userChatRef, user.id);
      const currentUserChatDoc = doc(userChatRef, currentuser.id);

      if (!(await getDoc(userChatDoc)).exists()) {
        await setDoc(userChatDoc, { chats: [] });
      }

      if (!(await getDoc(currentUserChatDoc)).exists()) {
        await setDoc(currentUserChatDoc, { chats: [] });
      }

      // Update chats for both users
      await updateDoc(userChatDoc, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: currentuser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(currentUserChatDoc, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      console.log('Chat successfully created and linked.');
    } catch (err) {
      console.error('Error adding user to chat:', err);
    }
  };

  return (
    <div className='adduser'>
      <form onSubmit={handeladduser}>
        <input type='text' placeholder='Username' name='username' />
        <button>Search</button>
      </form>
      {user && (
        <div className='user'>
          <div className='detail'>
            <img src={user.photo?user.photo:'./avatar.png'} alt='' />
            <span>{user.username}</span>
          </div>
          <button onClick={Add}>Add User</button>
        </div>
      )}
    </div>
  );
}
