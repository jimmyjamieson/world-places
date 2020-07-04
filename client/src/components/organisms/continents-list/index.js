import React from 'react'

const ContinentsList = ({ list }) => {
  return (
    <ul>
      { list.length > 0 ? list.map((item) => <li key={item.id}>{item.id} {item.code} { item.name } {item.nativeName}</li>) : '...loading' }
    </ul>
  )
}

export default ContinentsList