import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
 
export default ({ lang, onChangeCode, code }) => {
  console.log(code)
  console.log(onChangeCode)
  return (
    <div style={{ background: '#f5f2f0' }}>
      <Editor
        value={code}
        onValueChange={newCode => onChangeCode(newCode)}
        highlight={newCode => highlight(newCode, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>
  );
}

/*
import React, {useState} from 'react'
import HighLight from 'react-syntax-highlight'
import glamorous from 'glamorous'
import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
require('highlight.js/styles/default.css')

const HighLightSection = glamorous(HighLight)({
  width: '83vw',
  height: '90vh',
  '& code': {
    height: '90vh',
  }
})


export default ({ lang, onChangeCode, code }) => {
  return (
    <>
    <Editor
        value={code}
        onValueChange={newCode => onChangeCode(newCode)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <div className='editor'>
        <HighLightSection
          lang={'javascript'}
          value={code || ''}
        />
        <pre style={{ width: '83vw', height: '90vh' }}>
          <code
            className='hljs textarea editor'
            contentEditable='true'
            spellCheck='false'
            onInput={e => onChangeCode(e.target.innerText)}
            style={{ height: '90vh' }}
          />
        </pre>
      </div>
      
    </>
  )
}

    {/*
*/
