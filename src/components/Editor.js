import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
 
export default ({ lang, onChangeCode, code }) => {
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
