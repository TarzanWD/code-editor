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
      console.log({ files, opened })
      this.setState({ files, opened })
    })
    socket.on('onUpdateFile', data => {
      console.log(data)
      this.setState({
        files: R.assocPath([...data.path, 'content'], data.newContent, this.state)
      })
    })
  }

  onChangeCode = (e) => {
    const newCode = e.target.value
    console.log(newCode)
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

  render () {
    if (R.isNil(this.state.opened) || R.isNil(this.state.files)) {
      return <div className='App' style={{ color: '#fff' }}>
        loading your workspace
      </div>
    }
    
    return (
      <div className='App'>
        <div className='files'>
          <File file={this.state.files} name='node_modules' />
        </div>
        <Editor
          code={this.getCurrentContent()}
          onChangeCode={this.onChangeCode}
        />
      </div>
    )
  }
}
