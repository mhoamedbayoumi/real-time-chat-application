import React, { useContext } from 'react'
import { CounterContext, useCounterContext } from '../context/Context'
export default function Card() {
 const counter=useCounterContext();
  return (
    <div>
        <h2>{counter.value}</h2>
        <h6>{counter.value2}</h6>
    </div>
  )
}

