import { doc, setDoc,getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";

export const useUserStore=create((set)=>({
    currentuser:null,
    isLoading:false,
    fetchCurrentUser:async(uid)=>{
        if(!uid)
            return set({currentuser:null})
        try{
            const docref=doc(db,"users",uid);
            const snaodoc=await getDoc(docref);
            if(snaodoc.exists())
            {
                set({ currentuser: snaodoc.data(), isLoading: false });
            }
            else {
                set({ currentUser: null, isLoading: false });
            }
        }
        catch(err){
            console.log(err);
            throw new err;
        }
    }
}))