const fs = require('fs');
const path = require('path');

const assetsDir = __dirname;
const excludeDirs = ['.git', '.github', 'scripts'];
let filesList = [];

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        walk(fullPath);
      }
    } else {
      const relativePath = fullPath.substring(assetsDir.length + 1).replace(/\\/g, '/');
      filesList.push({
        path: relativePath,
        type: 'blob',
        size: stat.size
      });
    }
  }
}

walk(assetsDir);

const json = JSON.stringify({ tree: filesList }, null, 2);
fs.writeFileSync('assets_index.json', json, 'utf8');
console.log('JSON generated successfully.');
