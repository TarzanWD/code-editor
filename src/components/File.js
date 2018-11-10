import React, { useState } from 'react'
import glamorous from 'glamorous'

const StyledFile = glamorous('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.25rem 1rem',
  color: '#fff',
  borderBottom: '0.05rem solid #fff',
  cursor: 'pointer',
  ':hover': {
    background: '#373a49'
  }
})

const FileChildren = glamorous('div')({
  paddingLeft: '1rem',
  display: 'flex',
  flexDirection: 'column'
})

const File = ({ file, name, addNewFile, path }) => {
  const thisFile = file[name]
  const [showChildren, setShowChildren] = useState(true)
  const isFolder = thisFile.type === 'FOLDER'

  return (
    <React.Fragment>
      <StyledFile>
        {name}
        {isFolder &&
          <React.Fragment>
            <button onClick={() => setShowChildren(!showChildren)}>
              \|
            </button>
            <button onClick={() => addNewFile(path)}>
              +
            </button>
          </React.Fragment>
        }
      </StyledFile>
      <FileChildren>
        {
          isFolder &&
          showChildren &&
          Object.keys(thisFile.children).map((file, index) => (
            <File key={index} file={thisFile.children} name={file} path={[...path, file]} />
          ))
        }
      </FileChildren>
    </React.Fragment>
  )
}

export default File
