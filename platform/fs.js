const fs = require('fs');

class FileSystem {

  mkdir(folder) {
    folder = folder.toLowerCase();
    if (fs.existsSync(folder) === false) {
      fs.mkdirSync(folder);
    }
  }

  write(path, data) {
    try {
      path = path.toLowerCase();
      if (typeof data === 'object') {
        return fs.writeFileSync(path, JSON.stringify(data), 'utf8');
      } else {
        return fs.writeFileSync(path, data, 'utf8');
      }
    } catch (err) {
      throw err;
    }
  }

  read(path) {
    try {
      path = path.toLowerCase();
      let data = fs.readFileSync(path, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new FileSystem();