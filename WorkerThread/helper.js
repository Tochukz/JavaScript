const { join } = require("path");
const { readdir, readFileSync } = require("fs");

function getContents(dir) {
  return new Promise((resolve, reject) => {
    readdir(dir, (err, files) => {
      if (err) {
        return reject(err);
      }
      const jsonFiles = files.map((file) => {
        const fileBlob = readFileSync(`${dir}/${file}`);
        return fileBlob.toString();
      });
      return resolve(jsonFiles);
    });
  });
}

module.exports = {
  getContents,
};
