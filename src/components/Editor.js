import React, {useState} from 'react'
import HighLight from 'react-syntax-highlight';
require('highlight.js/styles/default.css');


export default ({ lang, onChangeCode, code }) => {
  return (
    <>
    
      <div className='editor' style={{marginLeft: '100px'}}>
        <HighLight
          lang={'js'}
          value={code || ''}
          style={{ width: '75vw', height: '60vh' }}
        />
        <pre style={{ width: '75vw', height: '60vh' }}>
          <code
            className='hljs textarea editor'
            contentEditable='true'
            spellCheck='false'
            onInput={e => onChangeCode(e.target.innerText)}
          />
        </pre>
      </div>
    </>
  )
}
