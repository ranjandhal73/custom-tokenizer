import { useState } from 'react'
import { CustomTokenizer } from '../utils/tokenizer';


const tokenizer = new CustomTokenizer();

export const TokenizerForm = () => {
    const [text, setText] = useState("");
    const [encoded, setEncoded] = useState<number[]>([]);
    const [tokenMap, setTokenMap] = useState<[string, number][]> ([]);
    const [decodeInput, setDecodeInput] = useState("");
    const [decoded, setDecoded] = useState("");

    const handleEncode = () => {
    if (!text.trim()) {
      alert("Please enter text first!");
      return;
    }
    tokenizer.learnVocab(text);
    const ids = tokenizer.encode(text);
    setEncoded(ids);
    setTokenMap(
      tokenizer.tokenize(text).map(t => [t, tokenizer.getVocab()[t]])
    );
  };

  const handleDecode = () => {
    if (!decodeInput.trim()) {
      alert("Please enter token IDs!");
      return;
    }
    const ids = decodeInput.split(",").map(n => parseInt(n.trim(), 10));
    setDecoded(tokenizer.decode(ids));
  };

  const handleReset = () => {
    tokenizer.reset();
    setText("");
    setEncoded([]);
    setTokenMap([]);
    setDecodeInput("");
    setDecoded("");
  };
  return (
     <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-blue-700 text-center">Custom Tokenizer Tool</h1>
      <p className="text-gray-600 text-center">
        Paste text to see how it’s split into tokens and IDs. You can also decode IDs back into text.
      </p>

      {/* Text Input */}
      <div>
        <textarea
          className="w-full border rounded p-3"
          rows={3}
          placeholder="Type text here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1">{text.length} characters</p>
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          onClick={handleEncode}
          disabled={!text.trim()}
        >
          Encode Text
        </button>
        <button
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* Token → ID Mapping */}
      {tokenMap.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Token → ID Mapping:</h2>
          <ul className="mt-2 border rounded p-3 bg-gray-50 ">
            {tokenMap.map(([token, id], i) => (
              <li key={i} className="flex items-center space-x-2">
                <span className="font-mono text-blue-700">"{token}"</span>
                <span className="text-gray-500">→</span>
                <span className="font-bold">{id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Encoded Sequence */}
      {encoded.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Encoded Sequence:</h2>
          <p className="font-mono bg-gray-100 p-2 rounded">{`[${encoded.join(", ")}]`}</p>
        </div>
      )}

      {/* Decode */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Token Decoding</h2>
        <input
          className="w-full border rounded p-2 mt-1"
          placeholder="e.g., 5, 6, 7"
          value={decodeInput}
          onChange={e => setDecodeInput(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
          onClick={handleDecode}
          disabled={!decodeInput.trim()}
        >
          Decode
        </button>
        {decoded && <p className="mt-2 text-green-700 font-mono">{decoded}</p>}
      </div>
    </div>
  )
}
