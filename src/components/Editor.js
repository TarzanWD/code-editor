import React, {useState} from 'react'
import HighLight from 'react-syntax-highlight'
import glamorous from 'glamorous'
require('highlight.js/styles/default.css')

const HighLightSection = glamorous(HighLight)({
  width: '83vw',
  height: '90vh',
  '& code': {
    height: '90vh',
  }
})


export default ({ onChangeCode, code }) => {
  return (
    <>
      <div className='editor'>
        <HighLightSection
          lang={'javascript'}
          value={code || ''}
        />
        <pre style={{
              width: '83vw',
              height: '90vh'
            }}>
          <code
            className='hljs textarea editor'
            contentEditable='true'
            spellCheck='false'
            onInput={onChangeCode}
            style={{
              height: '90vh'
            }}
          />
        </pre>
      </div>
    </>
  )
}
