# 🧠 CODE CRAFT - Online Code Compiler

**Code Craft** is a real-time online compiler supporting multiple programming languages with live preview, syntax highlighting, and code execution using Judge0 API.

---

## 🚀 Features

- 💻 **Live Code Editor** using CodeMirror
- 🌓 **Dark / Light Theme Toggle**
- 🔧 Supports multiple languages:
  - Python
  - C++
  - Java
  - JavaScript (Live Preview)
  - HTML (Live Preview)
  - CSS (Live Preview)
- ▶️ Run code via [Judge0 API](https://rapidapi.com/judge0-official/api/judge0-ce)
- 📊 Analyze lines, characters, and version
- 📋 Copy code to clipboard
- 💾 Export code as a file



## 🛠️ Tech Stack

- **React.js**
- **CodeMirror** editor (`@uiw/react-codemirror`)
- **Judge0 API** for code execution
- **HTML**, **CSS**, **JavaScript**

---

## 📂 Project Structure

```

online-code-compiler/
├── public/
├── src/
│   ├── components/
│   │   └── Compiler.jsx
│   ├── Compiler.css
│   ├── languageConfig.js
│   ├── languageSupport.js
│   └── App.js
├── package.json
└── README.md

````

---

## ⚙️ Setup & Run

1. **Clone the repo:**
```bash
git clone https://github.com/your-username/online-code-compiler.git
cd online-code-compiler
````

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm start
```

> Make sure to add your **Judge0 API Key** in `Compiler.jsx` file:

```js
const RAPIDAPI_KEY = 'your_api_key_here';
```

---

## 🔐 Judge0 API Setup

* Visit [Judge0 on RapidAPI](https://rapidapi.com/judge0-official/api/judge0-ce)
* Subscribe and get your **X-RapidAPI-Key**
* Replace `RAPIDAPI_KEY` in your code

---

## 🙋‍♀️ Author

**Jahnavi Grandhi**


---

## 📄 License

This project is licensed under the **MIT License**.



## ⭐ Star this repo

If you like this project, show your support by ⭐ starring the repository!


✅ You're ready to paste this directly into your `README.md` file. Let me know if you want the screenshots or deploy instructions too!

