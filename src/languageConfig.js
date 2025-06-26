// languageConfig.js

export const languageTemplates = {
  javascript: '// JavaScript\nconsole.log("Hello, World!");',
  python: '# Python\nprint("Hello, World!")',
  cpp: `// C++
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  java: `// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  php: `<?php
// PHP
echo "Hello, World!";
?>`,
  html: `<!-- HTML -->
<!DOCTYPE html>
<html>
<body>
    <h1 style="color: white">Hello, World!</h1>
</body>
</html>`,
  css: `/* CSS */
h1 {
    color: blue;
}`,
};

export const languageInfo = {
  javascript: { version: 'ES6', ext: 'js' },
  python: { version: '3.9', ext: 'py' },
  cpp: { version: 'C++17', ext: 'cpp' },
  java: { version: 'Java 11', ext: 'java' },
  php: { version: 'PHP 8', ext: 'php' },
  html: { version: 'HTML5', ext: 'html' },
  css: { version: 'CSS3', ext: 'css' },
};
