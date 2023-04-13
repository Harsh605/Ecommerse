import React from 'react'
import { useSelector } from 'react-redux'

const Secret = ({userData}) => {

  return (
    <div>{userData.name}</div>
  )
}

export default Secret