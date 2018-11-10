import React, {useState} from 'react'
import HighLight from 'react-syntax-highlight';
require('highlight.js/styles/default.css');


export default ({ onChangeCode, code }) => {
  return (
    <>
    {/*
      <textarea
        className='editor'
        value={code}
        onChange={onChangeCode}
      />
      */}
      <div style={{marginLeft: '100px'}}>
        <HighLight
          className='editor'
          lang={'javascript'}
          value={code || ''}
        />
        <pre>
          <code
            className='hljs textarea editor'
            contentEditable='true'
            spellCheck='false'
            onInput={onChangeCode}
          />
        </pre>
      </div>
    </>
  )
}
