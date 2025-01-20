const fs = require('fs/promises');
const path = require('path');
const copyFolderPath = path.join(__dirname, 'project-dist\\');
const copiedFolderPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles\\');
const mergedStylesPath = path.join(__dirname, 'project-dist\\', 'style.css');
const htmlTemplatePath = path.join(__dirname, 'template.html');
const indexHtmlPath = path.join(__dirname, 'project-dist\\', 'index.html');
const componentsPath = path.join(__dirname, 'components\\');

async function copyDir(directoryPath) {
  await fs.mkdir(copyFolderPath, { recursive: true });
  const copiedDir = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });
  copiedDir.forEach(async (dir) => {
    if (dir.isDirectory()) {
      await fs.mkdir(
        path.join(copyFolderPath, directoryPath.split('\\').at(-1), dir.name),
        {
          recursive: true,
        },
      );
      await copyDir(path.join(dir.parentPath, dir.name));
    } else {
      await fs.copyFile(
        path.join(directoryPath, dir.name),
        path.join(
          copyFolderPath,
          directoryPath.split('\\').slice(-2).join('\\'),
          dir.name,
        ),
      );
    }
  });
}

async function insertHtmlTemplate(directoryPath) {
  let htmlTemplateData = await fs.readFile(directoryPath, 'utf-8');
  const components = await fs.readdir(componentsPath);
  for (let component of components) {
    const file = await fs.readFile(
      path.join(componentsPath, component),
      'utf-8',
    );
    const fileName = component.split('.')[0];
    htmlTemplateData = htmlTemplateData.replace(`{{${fileName}}}`, '\n' + file);
  }
  await fs.writeFile(indexHtmlPath, htmlTemplateData);
}

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

async function startCopy() {
  await fs.rm(copyFolderPath, { force: true, recursive: true });
  await copyDir(copiedFolderPath);
  await insertHtmlTemplate(htmlTemplatePath);
  await mergeStyles(stylesPath);
}

startCopy();
