import React, { useState } from 'react'
import glamorous from 'glamorous'
import { Menu, Item, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import * as R from 'ramda'
const StyledFile = glamorous('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.25rem 1rem',
  color: '#fff',
  cursor: 'pointer',
  ':hover': {
    background: 'rgba(55, 58, 73, 0.3)'
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

// create your menu first
const MyAwesomeMenu = () => (
  <Menu id='menu_id'>
    <Item onClick={() => console.log('y')}>Delete file</Item>
  </Menu>
);

const File = ({ file, name, addNewFile, path, openFile, deleteFile, opened }) => {
  const thisFile = file[name]
  if (!thisFile) {
    return <div />
  }
  const [showChildren, setShowChildren] = useState(true)
  const isFolder = thisFile.type === 'FOLDER'
  const isCurrentActiveFile = R.equals(opened, path)
  return (
    <div  {...(isCurrentActiveFile ? { style: { background: 'rgba(255, 40, 30, 0.5)' } } : {} )}>
      <React.Fragment>
        <StyledFile onClick={() => !isFolder ? openFile(path) : ''}>
          <div {...(isCurrentActiveFile ? { background: '#444' } : {} )}>
            {isFolder ? (
              <i className='fas fa-folder' style={{marginRight: '1rem'}} />
            ) : (
              <i className='far fa-file' style={{marginRight: '1rem'}} />
            )}
            {name}
          </div>
          <div>
            {isFolder &&
              <React.Fragment>
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
                {/*
                <IconButton>
                  <i className='fas fa-folder-plus' />
                </IconButton>
                */}
              </React.Fragment>
            }
            {!isFolder &&
              <IconButton onClick={() => deleteFile(path)}>
                <i className='fas fa-ban' />
              </IconButton>
            }
          </div>
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
                addNewFile={addNewFile}
                openFile={openFile}
                deleteFile={deleteFile}
                opened={opened}
              />
            ))
          }
        </FileChildren>
      </React.Fragment>
    </div>
  )
}

export default File
