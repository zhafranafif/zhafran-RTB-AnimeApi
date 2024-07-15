const Fs = require('fs');

const readFromFile = (file, raw = false) =>
  new Promise((resolve, reject) => {
    Fs.readFile(file, (err, content) => {
      if (err) {
        return reject(err);
      }

      if (raw === false) {
        return resolve(JSON.parse(content));
      }

      return resolve(content);
    });
  });

module.exports = { readFromFile };
