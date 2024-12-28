import { create } from "zustand";

export const createcounter=create((set)=>({
    count:0,
    amount:10,
    incremnt:() => {
        set((state)=>({count:state.count +1}))
    }
}))