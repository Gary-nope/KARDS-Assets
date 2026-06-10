const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['.git', '.github', 'scripts', 'node_modules'];
const ROOT_DIR = path.resolve(__dirname, '..');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (IGNORE_DIRS.includes(file)) continue;
    
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walk(filePath, fileList);
    } else {
      // Calculate relative path using forward slashes for URL compatibility
      let relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
      if (relPath !== 'assets_index.json' && relPath !== 'package.json' && relPath !== 'package-lock.json') {
        fileList.push({
          path: relPath,
          type: 'blob',
          size: stat.size
        });
      }
    }
  }
  return fileList;
}

function generateIndex() {
  console.log('Scanning assets directory...');
  const tree = walk(ROOT_DIR);
  
  const indexData = {
    tree: tree
  };
  
  const outputPath = path.join(ROOT_DIR, 'assets_index.json');
  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));
  console.log(`Successfully generated assets_index.json with ${tree.length} files.`);
}

generateIndex();
