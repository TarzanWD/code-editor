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
  paddingLeft: '1rem'
})

const File = ({ file, name }) => {
  return (
    <React.Fragment>
      <StyledFile>
        {file.type === 'FOLDER' ? 'folder' : 'file' } - {name}
      </StyledFile>
      <FileChildren>
        {
          file.type === 'FOLDER' &&
          Object.keys(file.children).map((file) => (
            <File file={file.children[file]} name={file} />
          ))
        }
      </FileChildren>
    </React.Fragment>
  )
}

export default File
