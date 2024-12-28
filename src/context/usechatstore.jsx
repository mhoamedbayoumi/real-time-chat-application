import { create } from "zustand";
import { db } from "../lib/firebase";
import { useUserStore } from "./Userstore";


export const useChatStore=create((set)=>({
    user:null,
    chatid:null,
    iscurrentuserblocked:false,
    isreceiverblocked:false,
    isLoading:false,
    chatchange:(chatid,user)=>{
        const currentuser=useUserStore.getState().currentuser;
        if(user.blocked.includes(currentuser.id)){
            return set({
                user,
                chatid,
                iscurrentuserblocked:true,
                isreceiverblocked:false,
                isLoading:false,
            });
        }

       else if(currentuser.blocked.includes(user.id)){
            return set({
                user,
                chatid,
                iscurrentuserblocked:false,
                isreceiverblocked:true,
                isLoading:false,
            });
        }
        else{
            return set({
                user,
                chatid,
                iscurrentuserblocked:false,
                isreceiverblocked:false,
                isLoading:false,
            });
        }
    },
    changeblock:()=>{
        set(state=>({...state,isreceiverblocked:!state.isreceiverblocked}))
    },
}))