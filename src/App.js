import React from 'react'
import File from './components/File'
import Editor from './components/Editor'
import './App.css'
import * as R from 'ramda'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:1337');

const getPathWIthChildren = R.pipe(
  R.map(item => [item, 'children']),
  R.flatten,
  R.init,
)

export default class App extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      opened: null,
      files: null,
    }
  }

  componentDidMount() {
    socket.emit('getCurrentState')
    socket.on('onGetCurrentState', ({ files, opened }) => {
      this.setState({ files, opened })
    })
    socket.on('onUpdateFile', data => {
      this.setState({
        files: R.assocPath([...data.path, 'content'], data.newContent, this.state.files)
      })
    })
    socket.on('onDeleteFile', data => {
      this.setState({
        files: R.dissocPath(data.path, this.state.files)
      })
    })

    socket.on('onCreateFile', ({ path, name }) => {
      this.setState({
        files: R.assocPath(
          [...path, 'children', name],
          { type: 'FILE', content: '' },
          this.state.files
        )
      })
    })
  }

  onChangeCode = (newCode) => {
    const pathWithChildren = getPathWIthChildren(this.state.opened)
    socket.emit('updateFile', {
      path: pathWithChildren,
      newContent: newCode
    })
  }
 
  getCurrentContent = () => {
    const pathWithChildren = getPathWIthChildren(this.state.opened)
    return R.path([...pathWithChildren, 'content'], this.state.files)
  }
 
  getCurrentFileExtension = () => {
    const fileName = R.last(this.state.opened)
    const fileExtension = fileName.split('.')[1] || ''
    return fileExtension
  }

  getFile () {
    return this.state.opened.reduce((acc, part) => {
      return acc.children ? acc.children[part] : acc[part]
    }, this.state.files)
  }

  openFile = (path) => {
    this.setState({ opened: path })
  }

  deleteFile = (path) => {
    const pathWithChildren = getPathWIthChildren(this.state.opened)
    socket.emit('deleteFile', { path: pathWithChildren })
  }

  addNewFile = (path) => {
    const newName = `${Math.floor(Math.random() * 10000)}.js`

    const fullPath = getPathWIthChildren(path)
    socket.emit('createFile', {
      path: fullPath,
      name: newName
    })
    
    /*
    const children = R.path([...fullPath, 'children'], this.state.files)
    this.setState((prevState) => R.assocPath([...fullPath, 'children'], {
      ...children,
      'app.js': {
        type: 'FOLDER',
        content: 'Helo'
      }
    }, prevState.files))
    */
  }

  render () {
    console.log(this.state)
    if (R.isNil(this.state.opened) || R.isNil(this.state.files)) {
      return <div className='App' style={{ color: '#fff' }}>
        loading your workspace
      </div>
    }
    
    return (
      <div className='App'>
        <div className='files'>
          <File
            file={this.state.files}
            name='project1'
            addNewFile={this.addNewFile}
            path={['project1']}
            openFile={this.openFile}
            deleteFile={this.deleteFile}
            opened={this.state.opened}
          />
        </div>
        <Editor
          filePath={this.state.opened}
          lang={this.getCurrentFileExtension()}
          code={this.getCurrentContent()}
          onChangeCode={this.onChangeCode}
        />
      </div>
    )
  }
}
