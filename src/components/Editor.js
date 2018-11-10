import React, {useState} from 'react'

export default ({ file }) => {
  const [code, setCode] = useState(file.value)

  const handleEditorChange = (e) => {
    setCode(e.target.value)
  }

  return (
    <textarea
      className='editor'
      value={code}
      onChange={(e) => handleEditorChange(e)}
    />
  )
}
