const fs = require('fs/promises');
const path = require('path');
const { stdout } = require('process');
const folderPath = path.join(__dirname, 'secret-folder\\');

async function showFiles(directoryPath) {
  const filesWithTypes = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });
  for (let fileWithType of filesWithTypes) {
    const fileStats = await fs.stat(`${directoryPath + fileWithType.name}`);
    if (fileWithType.isFile()) {
      stdout.write(fileWithType.name.split('.')[0] + ' - ');
      stdout.write(fileWithType.name.split('.').at(-1) + ' - ');
      stdout.write((fileStats.size / 1024).toFixed(3) + 'kb\n');
    }
  }
}

showFiles(folderPath);
