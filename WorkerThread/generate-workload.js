const { join } = require("path");
const { writeFileSync, createReadStream, createWriteStream } = require("fs");
const Chance = require("chance");

function generateWorkLoad() {
  const chance = new Chance();
  const users = [];
  for (let i = 1; i <= 1000; i++) {
    const firstname = chance.name();
    const lastname = chance.name();
    const email = chance.email();
    const phone = chance.phone();
    const currentUser = { id: i, firstname, lastname, email, phone };
    users.push(currentUser);
  }
  const sampleCollection = join(__dirname, "workload/json/sample-users.json");
  writeFileSync(sampleCollection, JSON.stringify(users, null, 2));

  const readStream = createReadStream(sampleCollection);
  readStream.on("error", (err) => {
    console.error("Error reading the source file:", err);
  });
  for (let i = 1; i <= 1000; i++) {
    const filename = `workload/json/users-collection-${i}.json`;
    const writeStream = createWriteStream(join(__dirname, filename));
    readStream.pipe(writeStream);
    writeStream.on("error", (err) => {
      console.error(`Error writing to ${filename}:`, err);
    });
    writeStream.on("finish", () => {
      console.log(`Successfully copied ${filename}`);
    });
  }
}

generateWorkLoad();
