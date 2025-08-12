# Custom Tokenizer Tool

Welcome to the **Custom Tokenizer Tool** — a simple, interactive tokenizer built with TypeScript and React! This project lets you see how raw text is broken down into tokens and mapped to unique IDs, and then decode those IDs back into text. Perfect for understanding the basics of tokenization in NLP (Natural Language Processing).

---

## Features

- **Custom Vocabulary** with special tokens `<PAD>` and `<UNK>`
- Tokenizes input text into words, spaces, and punctuation using regex
- Learns vocabulary dynamically from your input text
- Encodes tokens into unique numeric IDs
- Decodes sequences of token IDs back into readable text
- Clean, responsive React UI with live token-to-ID mapping and encoding/decoding controls
- Reset functionality to clear vocabulary and start fresh

---

## How to Use

1. **Type or paste any text** into the text box.
2. Click **Encode Text** to tokenize and encode the text.
3. View the list of tokens and their assigned IDs.
4. Enter a comma-separated list of token IDs in the decoding box.
5. Click **Decode** to see the original text from those IDs.
6. Use **Reset** anytime to clear everything and start over.

---

## Technologies Used

- TypeScript — type-safe JavaScript for robust code
- React — for building the interactive user interface
- Vite — lightning-fast development environment and build tool
- Tailwind CSS — utility-first styling for a clean, modern look

---

## Project Structure

- `CustomTokenizer.ts` — core tokenizer class handling vocab, encode, decode
- `TokenizerForm.tsx` — React component for the interactive form and UI
- `App.tsx` — main app component that loads the form
- `vite.config.ts` — config for Vite with React and Tailwind plugins
- `package.json` — dependencies and scripts

---

## Installation & Running Locally

```bash
git clone https://github.com/yourusername/custom-tokenizer.git
cd custom-tokenizer
npm install
npm run dev
