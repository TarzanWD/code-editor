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
      opened: ['node_modules', 'abc', 'index.js'],
      files: {
        'node_modules': {
          type: 'FOLDER',
          children: {
            'abc': {
              type: 'FOLDER',
              children: {
                'index.js': {
                  type: 'FILE',
                  content: 'Hello World'
                }
              }
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    socket.on('onUpdateFile', data => {
      console.log(data)
      this.setState({
        files: R.assocPath(
          [...data.path, 'content'],
          data.newContent,
          this.state
        )
      })
    })
  }

  onChangeCode = (e) => {
    const newCode = e.target.value
    console.log(newCode)
    const pathWithChildren = getPathWIthChildren(this.state.opened)
    // this.setState({
    //   files: R.assocPath(pathWithChildren, newCode, this.state.files)
    // })
    socket.emit('updateFile', {
      path: pathWithChildren,
      newContent: newCode
    })
  }
 
  getCurrentContent = () => {
    const pathWithChildren = getPathWIthChildren(this.state.opened)
    return R.path([...pathWithChildren, 'content'], this.state.files)
  }

  getFile () {
    return this.state.opened.reduce((acc, part) => {
      return acc.children ? acc.children[part] : acc[part]
    }, this.state.files)
  }

  render () {
    return (
      <div className='App'>
        <div className='files'>
          <File file={this.state.files} name='node_modules' />
        </div>
        <Editor
          file={this.getFile()}
          code={this.getCurrentContent()}
          onChangeCode={this.onChangeCode}
        />
      </div>
    )
  }
}
