const { join } = require("path");
const { Worker } = require("worker_threads");
const js2xmlparser = require("js2xmlparser");
const { getContents } = require("./helper");

async function parseFiles() {
  const files = await getContents(join(__dirname, "workload/json"));
  const start = process.hrtime.bigint();

  console.log("File count: ", files.length);
  const set1 = files.slice(0, 250);
  const set2 = files.slice(250, 500);
  const set3 = files.slice(500, 750);
  const set4 = files.slice(750, files.length - 1);
  const batches = [set1, set2, set3, set4];
  const results = [];
  for (let batch of batches) {
    const worker = new Worker("./worker.js");
    // Send the contents to the worker
    worker.postMessage(batch);

    // Get result from the worker
    worker.on("message", (result) => {
      /* Execution time end */
      results.push(result);
      console.log(`Result count ${result.length}`);
      // `result` has the converted XML
      if (results.length == batches.length) {
        const end = process.hrtime.bigint();
        console.info(`Execution time: ${(end - start) / BigInt(10 ** 6)}ms`);
        process.exit();
      }
    });
  }
}

parseFiles();
