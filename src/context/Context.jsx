import { createContext, useContext } from "react";
export  const CounterContext=createContext();

export  function useCounterContext(){
    const user=useContext(CounterContext)
    if(user===undefined)
        throw new Error ("not working")
    return user
}