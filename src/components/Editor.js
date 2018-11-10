import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import * as R from 'ramda'
const topBurgerStyle = {
  width: '100%',
  color: '#EEE',
  background: '#999'
}

export default ({ lang, onChangeCode, code, filePath }) => {
  if (R.isNil(code)) {
    return <div />
  }
  return (
    <div style={{ background: '#f5f2f0' }}>
      <div style={topBurgerStyle}>{ filePath && filePath.join('/') }</div>
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
