import React from 'react'
import "./Block.css"

function Block({num}) {
  return (
    <div className='number_block'>
        {num !==0 ? num : ""}
    </div>
  )
}

export default Block