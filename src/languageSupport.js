// languageSupport.js
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { php } from '@codemirror/lang-php';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

export const languageExtensions = {
  javascript: javascript(),
  python: python(),
  cpp: cpp(),
  java: java(),
  php: php(),
  html: html(),
  css: css(),
};

export const judge0LanguageIds = {
  javascript: 63, // JavaScript (Node.js)
  python: 71,     // Python 3
  cpp: 54,        // C++ (GCC 9.2.0)
  java: 62,       // Java (OpenJDK 13.0.1)
  php: 68,        // PHP 7.4.0
  html: null,     // No execution
  css: null,      // No execution
};

export function getJudge0LanguageId(lang) {
  return judge0LanguageIds[lang] || null;
}

// Helper function to call Judge0 API
export async function runCodeOnJudge0(languageId, code, rapidApiKey) {
  const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';

  const response = await fetch(JUDGE0_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      'X-RapidAPI-Key': rapidApiKey,
    },
    body: JSON.stringify({
      language_id: languageId,
      source_code: code,
      stdin: ''
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result;
}
