import React from 'react'
import { useSelector } from 'react-redux'

function Item() {

  const current=useSelector((store)=> store.current)

  return (
    <div className='shadow-md bg-green-200 text-center'>
      <h2 className='font-bold'>{current.type.toUpperCase()}</h2>
      <p className='text-2xl p-10'>{current.activity}</p>
    </div>
  )
}

export default Item