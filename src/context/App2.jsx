import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CounterContext } from './context/Context'
import Card from './components/Card'
import { createcounter } from './context/sotre'
function App2() {
  const profile={
    name:"moahemd",
    age:18
  }
  const [count, setCount] = useState(0)
  const ZustandCountIncrement=createcounter((state)=>state.incremnt)
  const zustandCount=createcounter((state)=>state.count)
  return (
    <>
      <CounterContext.Provider value={{value:[count,setCount],value2:profile.name}}>
      <h1>hello react and vite</h1>
      <button onClick={()=>{setCount((count)=>count+1)}}> contextApi+</button>
      <Card/>
      <h2>{zustandCount}</h2>
      <button onClick={ZustandCountIncrement}>ZustandCountIncrement+</button>
      </CounterContext.Provider>
    </>
  )
}

export default App2
