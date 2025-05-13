// PythonEditor.jsx
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';

const CodeEditore = () => {
  const [code, setCode] = useState(`#start code here`);

  const runCode = async () => {
    try {
      //  backend API: /api/student/check-code
      const response = await fetch('http://localhost:3000/api/student/check-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
    } catch (error) {
       console.log(error);
    }
  };

  return (
    <div>
      <CodeMirror
        value={code}
        height="200px"
        width="80%"
        theme={dracula}
        extensions={[python()]}
        onChange={(value) => setCode(value)}
      />
      <button  onClick={runCode}
      className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
      >Run code</button>
    </div>
  );
};

export default CodeEditore;
