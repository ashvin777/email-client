const fs = require('fs');

class Thread {
  list() {
    return new Promise(resolve => {
      let threads = [];
      fs.readdir('./data/threads', (err, files) => {
        files.forEach(file => {
          let data = fs.readFileSync(`./data/threads/${file}/thread.json`, 'utf8');
          data = JSON.parse(data);
          threads.push(data);
        });
        resolve(threads);
      });
    });
  }
}


let thread = new Thread();


thread.list().then(res => {
  console.log(res[0]);
});

//module.exports = new Thread();