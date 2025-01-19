const fs = require('fs/promises');
const path = require('path');
const copyFolderPath = path.join(__dirname, 'directoryToCopy\\');
const copiedFolderPath = path.join(__dirname, 'files\\');

async function copyFiles(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
  const copiedFiles = await fs.readdir(copiedFolderPath, {
    withFileTypes: true,
  });
  copiedFiles.forEach((file) => {
    if (file.isFile()) {
      fs.copyFile(
        path.join(copiedFolderPath, file.name),
        path.join(directoryPath, file.name),
      );
    }
  });
}

copyFiles(copyFolderPath);
