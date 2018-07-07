const fs = require('fs');

const FILE_PATH = './dist/index.html';
let fileData = fs.readFileSync(FILE_PATH, 'utf8');

fileData = fileData.replace(/src=\//g, 'src=');
fileData = fileData.replace(/href=\//g, 'href=');

fs.writeFileSync(FILE_PATH, fileData);