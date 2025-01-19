const fs = require('fs/promises');
const path = require('path');
const stylesPath = path.join(__dirname, 'styles\\');
const mergedStylesPath = path.join(__dirname, 'project-dist\\', 'bundle.css');

async function mergeStyles(directoryPath) {
  await fs.writeFile(mergedStylesPath, '');
  const styles = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });
  styles.forEach(async (style) => {
    if (style.isFile() && path.extname(style.name) === '.css') {
      const readFile = await fs.readFile(path.join(directoryPath, style.name));
      await fs.appendFile(mergedStylesPath, readFile + '\n');
    }
  });
}

mergeStyles(stylesPath);
