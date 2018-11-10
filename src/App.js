import React from 'react'
import File from './components/File'
import Editor from './components/Editor'
import './App.css'

export default class App extends React.Component {
  constructor () {
    super()
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
        <Editor file={this.getFile()} />
      </div>
    )
  }
}
