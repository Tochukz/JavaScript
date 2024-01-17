const { parentPort } = require("worker_threads");
const js2xmlparser = require("js2xmlparser");

// Receive message from the parent
parentPort.on("message", (contents) => {
  // Send result back to parent
  parentPort.postMessage(
    contents.map((content) => {
      content = JSON.parse(content);
      return js2xmlparser.parse("user", content);
    })
  );
});
