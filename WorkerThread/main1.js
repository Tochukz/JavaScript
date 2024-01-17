const { join } = require("path");
const js2xmlparser = require("js2xmlparser");
const { getContents } = require("./helper");

async function parseFiles() {
  const files = await getContents(join(__dirname, "workload/json"));
  const start = process.hrtime.bigint();
  const result = files.map((content) => {
    content = JSON.parse(content);
    return js2xmlparser.parse("user", content);
  });

  const end = process.hrtime.bigint();
  console.info(`Execution time: ${(end - start) / BigInt(10 ** 6)}ms`);
}

parseFiles();
