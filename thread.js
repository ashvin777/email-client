const fs = require('fs');

class Thread {
  list() {
    return new Promise(resolve => {
      let threads = [];
      fs.readdir('./data/threads', (err, files) => {
        if (files instanceof Array) {
          files.sort((a, b) => {
            if (a < b) //sort string ascending
              return -1;
            if (a > b)
              return 1;
            return 0;
          });
          files.forEach(file => {
            try {
              let data = fs.readFileSync(`./data/threads/${file}/thread.json`, 'utf8');
              data = JSON.parse(data);
              threads.push(data);
            } catch (e) {
              console.log('thread not avaialel', e);
            }
          });
        }
        resolve(threads);
      });
    });
  }

  get(thread) {
    return new Promise(resolve => {
      try {
        thread.messages.forEach((message, index) => {
          let data = fs.readFileSync(`./data/threads/${thread.historyId}/${message.id}.json`, 'utf8');
          let headers = thread.messages[index].headers;
          thread.messages[index] = JSON.parse(data);
          delete thread.messages[index].payload.headers;
          thread.messages[index].headers = headers;
        });
        resolve(thread);
      } catch (e) {
        console.log('reading message error - ', e);
      }
    });
  }
}

// let thread = new Thread();
// thread.list().then(res => {
//   console.log(res[0]);
// });

module.exports = new Thread();