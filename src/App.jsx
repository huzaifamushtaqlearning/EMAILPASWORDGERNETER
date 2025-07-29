import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

const passwordRef = useRef(null);

const copyPasswordToClipBoard = useCallback(() => {
  if (passwordRef.current) {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password);
  }
}, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*(){}[]';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left side: password display */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">🔐 Your Generated Password</h1>
          <input
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
            className="text-lg p-3 border border-gray-300 rounded-lg w-full mb-4"
          />
        </div>

        {/* Right side: controls */}
        
        <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
           <button
            onClick={copyPasswordToClipBoard}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            copy
          </button>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Customize Settings</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-600">Password Length: {length}</label>
            <input
              type="range"
              min="4"
              max="100"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full"
            />
          </div>
          

          <div className="mb-4 space-y-2">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(!numberAllowed)}
              />
              <span>Include Numbers</span>
            </label>

            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed(!characterAllowed)}
              />
              <span>Include Symbols</span>
            </label>
          </div>

          <button
            onClick={passwordGenerator}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
