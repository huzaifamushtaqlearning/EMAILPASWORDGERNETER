import React, { useState, useCallback, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(4); // Default password length
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [simplePassword, setSimplePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Password Generator
 const passwordGenerator = useCallback(() => {
  let pass = '';
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  if (simplePassword) {
    // Sequential letters like abcd, mnop
    const startIndex = Math.floor(Math.random() * (letters.length - length));
    pass = letters.slice(startIndex, startIndex + length);
  } else {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*(){}[]';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
  }

  setPassword(pass);
}, [length, numberAllowed, characterAllowed, simplePassword]);


  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, simplePassword, passwordGenerator]);

  // Email Generator
  const generateRandomEmail = () => {
    const usernames = ['ali', 'devx', 'reactking', 'codepro', 'jsninja'];
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

    const randomName = usernames[Math.floor(Math.random() * usernames.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    const generatedEmail = `${randomName}${randomNum}@${randomDomain}`;
    setEmail(generatedEmail);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Password Generator */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🔐 Password Generator</h2>

          <input
            type="text"
            readOnly
            value={password}
            className="w-full p-3 border border-gray-300 rounded mb-4 text-lg"
          />

          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-600">Password Length: {length}</label>
            <input
              type="range"
              min="4"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-4 space-y-2">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(!numberAllowed)}
                disabled={simplePassword}
              />
              <span>Include Numbers</span>
            </label>

            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed(!characterAllowed)}
                disabled={simplePassword}
              />
              <span>Include Symbols</span>
            </label>

            <label className="flex items-center space-x-2 text-blue-700 font-medium">
              <input
                type="checkbox"
                checked={simplePassword}
                onChange={() => setSimplePassword(!simplePassword)}
              />
              <span>Use Simple Password (A–Z only)</span>
            </label>
          </div>

          <button
            onClick={passwordGenerator}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Generate Password
          </button>
        </div>

        {/* Email Generator */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📧 Email Generator</h2>

          <input
            type="text"
            readOnly
            value={email}
            placeholder="Click Generate"
            className="w-full p-3 border border-gray-300 rounded mb-4 text-lg"
          />

          <button
            onClick={generateRandomEmail}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg"
          >
            Generate Email
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
