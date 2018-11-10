import React, {useState} from 'react'

export default ({ onChangeCode, code }) => {
  return (
    <textarea
      className='editor'
      value={code}
      onChange={onChangeCode}
    />
  )
}
