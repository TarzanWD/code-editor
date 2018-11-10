import React from 'react'
import glamorous from 'glamorous'

const StyledFile = glamorous('div')({
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

const File = ({ file, name, addNew }) => {
  const thisFile = file[name]
  return (
    <React.Fragment>
      <StyledFile>
        {thisFile.type === 'FOLDER' ? 'folder' : 'file' } - {name}
      </StyledFile>
      <FileChildren>
        {
          thisFile.type === 'FOLDER' &&
          Object.keys(thisFile.children).map((file) => (
            <File file={thisFile.children} name={file} />
          ))
        }
      </FileChildren>
    </React.Fragment>
  )
}

export default File
