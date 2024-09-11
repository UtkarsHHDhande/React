import { useState, useCallback, useEffect, useRef } from 'react';
import { FaCopy, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    evaluateStrength(pass);
  }, [length, numberAllowed, charAllowed]);

  const evaluateStrength = (pass) => {
    let strengthScore = 0;
    if (pass.length >= 8) strengthScore++;
    if (/[A-Z]/.test(pass)) strengthScore++;
    if (/[0-9]/.test(pass)) strengthScore++;
    if (/[^A-Za-z0-9]/.test(pass)) strengthScore++;

    switch (strengthScore) {
      case 0:
      case 1:
        setStrength("Weak");
        break;
      case 2:
        setStrength("Moderate");
        break;
      case 3:
        setStrength("Strong");
        break;
      case 4:
        setStrength("Very Strong");
        break;
      default:
        setStrength("");
    }
  };

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 999);
      navigator.clipboard.writeText(password).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((error) => {
        console.error("Failed to copy password: ", error);
      });
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto shadow-lg rounded-xl p-6 bg-gray-800 text-orange-500">
        <h1 className='text-2xl font-bold text-white text-center mb-6'>Password Generator</h1>
        
        <div className="flex items-center justify-between mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            className="outline-none w-full py-2 px-4 rounded-l-lg text-gray-800"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center justify-center"
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
          <button
            onClick={() => setShowPassword(prev => !prev)}
            className="ml-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center justify-center"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {password && (
          <div className="mb-4">
            <p className="text-white mb-1">Strength: <span className={`font-semibold ${strength === 'Weak' ? 'text-red-500' : strength === 'Moderate' ? 'text-yellow-500' : strength === 'Strong' ? 'text-green-500' : 'text-teal-500'}`}>{strength}</span></p>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${strength === 'Weak' ? 'bg-red-500 w-1/4' : strength === 'Moderate' ? 'bg-yellow-500 w-2/4' : strength === 'Strong' ? 'bg-green-500 w-3/4' : 'bg-teal-500 w-full'}`}
              ></div>
            </div>
          </div>
        )}

        <div className='mb-6'>
          <label className="block text-white mb-2">Password Length: {length}</label>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className='w-full'
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>

        <div className='flex items-center mb-4'>
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed(prev => !prev)}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="numberInput" className="ml-2 text-white">Include Numbers</label>
        </div>

        <div className='flex items-center mb-4'>
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed(prev => !prev)}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="characterInput" className="ml-2 text-white">Include Special Characters</label>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
