import React from 'react'

export default ({ file, onChangeCode, code }) => {
  return (
    <textarea
      className='editor'
      value={code}
      onChange={onChangeCode}
    />
  )
}
