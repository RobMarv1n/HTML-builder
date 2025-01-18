const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = require('process');
const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath);

stdout.write('Hello, write something:\n');
stdin.on('data', (data) => {
  const dataString = data.toString();
  if (dataString.trim() === 'exit') {
    exit();
  } else {
    output.write(data);
  }
});

process.on('SIGINT', () => exit());
process.on('exit', () => stdout.write('Goodbye! Very well written!'));
