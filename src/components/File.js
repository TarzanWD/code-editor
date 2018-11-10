import React, { useState } from 'react'
import glamorous from 'glamorous'

const StyledFile = glamorous('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.25rem 1rem',
  color: '#fff',
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

const IconButton = glamorous('button')({
  cursor: 'pointer',
  marginRight: '0.5rem',
  background: 'transparent',
  border: 0,
  padding: 0,
  color: '#fff'
})

const File = ({ file, name, addNewFile, path, openFile }) => {
  const thisFile = file[name]
  const [showChildren, setShowChildren] = useState(true)
  const isFolder = thisFile.type === 'FOLDER'

  return (
    <React.Fragment>
      <StyledFile onClick={() => openFile(path)}>
        <div>
          {isFolder ? (
            <i className='fas fa-folder' style={{marginRight: '1rem'}} />
          ) : (
            <i className='far fa-file' style={{marginRight: '1rem'}} />
          )}
          {name}
        </div>
        {isFolder &&
          <div>
            <IconButton
              onClick={() => setShowChildren(!showChildren)}>
              {showChildren
                ? <i className='fas fa-chevron-down' />
                : <i className='fas fa-chevron-up' />}
            </IconButton>
            <IconButton
              onClick={() => addNewFile(path)}>
              <i className='fas fa-plus' />
            </IconButton>
          </div>
        }
      </StyledFile>
      <FileChildren>
        {
          isFolder &&
          showChildren &&
          Object.keys(thisFile.children).map((file, index) => (
            <File
              key={index}
              file={thisFile.children}
              name={file}
              path={[...path, file]}
              openFile={openFile}
            />
          ))
        }
      </FileChildren>
    </React.Fragment>
  )
}

export default File
