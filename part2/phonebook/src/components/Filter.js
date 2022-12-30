import React from 'react'

const Filter = ({ filter, changeHandler}) => {
  return (
    <div>
        Filter names: <input value={filter} onChange={changeHandler} />
    </div>
  )
}

export default Filter
