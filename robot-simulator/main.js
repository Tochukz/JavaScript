const readline = require("readline");
const Robot = require('./robot');


const rd = readline.createInterface({
  input: process.stdin, 
  output: process.stadout,
});

const robot = new Robot();
// robot.parseCommand(cmd)

rd.on('line', input => {
  process.stdout.write('\n> ');
  const cmd = robot.parseCommand(input);
  robot.executeCommand(cmd);
});
rd.on('close', () => {
  console.log('Thanks for playing robot!');
});

// const cmd = process.argv[2];

