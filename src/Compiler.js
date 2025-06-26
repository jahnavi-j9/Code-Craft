// Compiler.jsx
import React, { useState, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion } from '@codemirror/autocomplete';
import { lintGutter } from '@codemirror/lint';

import { languageTemplates, languageInfo } from './languageConfig';
import { languageExtensions, getJudge0LanguageId } from './languageSupport';

import { oneDark } from '@codemirror/theme-one-dark';
import { githubLight } from '@uiw/codemirror-theme-github';

import './Compiler.css';

const themes = {
  dark: oneDark,
  light: githubLight
};

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
const RAPIDAPI_KEY = 'e388ef22dcmshfa57802d4286138p12978bjsn46afbcf86078';

const Compiler = () => {
  const [code, setCode] = useState(languageTemplates.python);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('python');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleLanguageChange = useCallback((e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(languageTemplates[newLanguage]);
    setOutput('');
    setError('');
  }, []);

  const runCodeOnJudge0 = async (code, language) => {
    const language_id = getJudge0LanguageId(language);
    if (!language_id) {
      throw new Error(`Execution not supported for language: ${language}`);
    }

    const response = await fetch(JUDGE0_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
      },
      body: JSON.stringify({
        language_id,
        source_code: code,
        stdin: '',
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  };

  const runCode = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      if (language === 'javascript' || language === 'html' || language === 'css') {
        setOutput('Preview updated below');
      } else {
        const result = await runCodeOnJudge0(code, language);

        if (result.stdout) setOutput(result.stdout);
        else if (result.compile_output) setError(result.compile_output);
        else if (result.stderr) setError(result.stderr);
        else setOutput('No output returned');
      }
    } catch (err) {
      setError(`Execution Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const clearOutput = useCallback(() => {
    setOutput('');
    setError('');
  }, []);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code)
      .then(() => setOutput('Code copied to clipboard!'))
      .catch(() => setError('Failed to copy code'));
  }, [code]);

  const analyzeCode = useCallback(() => {
    const lines = code.split('\n').length;
    const chars = code.length;
    setOutput(`Lines: ${lines} | Chars: ${chars} | Language: ${languageInfo[language].version}`);
  }, [code, language]);

  const exportCode = useCallback(() => {
    try {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code.${languageInfo[language].ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Export failed: ' + err.message);
    }
  }, [code, language]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'Enter') runCode();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [runCode]);

  const createPreviewSrcDoc = () => {
    if (language === 'javascript') {
      return `
        <html><body><pre id="output"></pre><script>
          (function() {
            const outputEl = document.getElementById('output');
            console.log = function(...args) {
              outputEl.textContent += args.join(' ') + '\n';
            };
            try {
              ${code}
            } catch(e) {
              outputEl.textContent += 'Error: ' + e.message;
            }
          })();
        </script></body></html>
      `;
    } else if (language === 'html') {
      return code;
    } else if (language === 'css') {
      return `
        <html><head><style>${code}</style></head>
        <body><h1>CSS Preview</h1></body></html>
      `;
    }
    return '';
  };

  return (
    <div className={`compiler-container ${theme}`}>
      <div className="header">
        <h1>CODE CRAFT</h1>
        <div className="controls">
          <div className="language-selector">
            <select value={language} onChange={handleLanguageChange}>
              <option disabled>Select Language</option>
              {Object.keys(languageTemplates).map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
            <span className="custom-arrow">▼</span>
          </div>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <div className="editor-output-wrapper">
        <div className="code-editor">
          <CodeMirror
            value={code}
            height="400px"
            extensions={[languageExtensions[language], autocompletion(), lintGutter()]}
            theme={themes[theme]}
            onChange={setCode}
          />
        </div>

        <div className={`output-container ${error ? 'error' : ''}`}>
          <h3>Output:</h3>
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="output-box">
              {(language === 'javascript' || language === 'html' || language === 'css') ? (
                <iframe
                  title="preview"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  className="preview-iframe"
                  srcDoc={createPreviewSrcDoc()}
                />
              ) : (
                <pre>{output || 'Your output will appear here...'}</pre>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="button-group">
        <div className="action-buttons">
          <button onClick={runCode} disabled={isLoading}>
            {isLoading ? 'Running...' : '▶ Run (Ctrl+Enter)'}
          </button>
          <button onClick={clearOutput}>🗑️ Clear</button>
        </div>
        <div className="utility-buttons">
          <button onClick={copyCode}>📋 Copy</button>
          <button onClick={analyzeCode}>📊 Analyze</button>
          <button onClick={exportCode}>💾 Export</button>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
