class Robot {
  position = { x: 0, y: 0, facing: "" };

  cardinalPoints = ["north", "east", "south", "west"];

  tableDimension = [4, 3]; //[x, y]

  constructor() {
    console.log("Welcome to robot rover!");
    process.stdout.write(
      "Start with a place command: eg PLACE 0,0,NORTH  \n> "
    );
  }

  parseCommand(command) {
    const cmdLower = command?.toLowerCase().trim();
    const bits = cmdLower.split(",");
    const first = bits[0];
    const firstNumber = first.replace("place ", "");
    const secondNumber = bits[1];
    const facing = bits[2];
    const simpleActions = ["move", "left", "right", "report"];
    const cmd = {};
    let isPlaceCmd = false;
    if (
      cmdLower.includes("place") &&
      !isNaN(firstNumber) &&
      !isNaN(secondNumber) &&
      this.cardinalPoints.includes(facing)
    ) {
      cmd.place = {
        x: parseInt(firstNumber),
        y: parseInt(secondNumber),
        facing,
      };
      isPlaceCmd = true;
    } else if (simpleActions.includes(cmdLower)) {
      cmd.action = cmdLower;
    } else {
      console.log(`Invalid command: "${command}"`);
      return;
    }
    return cmd;
  }

  executeCommand(cmd) {
    if (cmd.action && !this.position.facing) {
      console.log("Please start with a place command, e.g PLACE 0,0,NORTH");
      return;
    }
    if (cmd.place) {
      this.place(cmd.place);
    } else {
      this.action(cmd.action);
    }
  }

  place(place) {
    const { x, y } = place;
    if (x < 0 || x > this.tableDimension[0]) {
      return;
    }
    if (y < 0 || y > this.tableDimension[1]) {
      return;
    }
    this.position = place;
  }

  action(act) {
    switch (act) {
      case "move":
        this.move();
        break;
      case "left":
        this.turnLeft();
        break;
      case "right":
        this.turnRight();
        break;
      case "report":
        this.report();
        break;
    }
  }

  move() {
    const position = this.position;
    const { x, y, facing } = position;
    const [xMax, yMax] = this.tableDimension;
    if (facing == "north" && y < yMax) {
      position.y = position.y + 1;
    } else if (facing == "south" && y > 0) {
      position.y = position.y - 1;
    } else if (facing == "west" && x > 0) {
      position.x = position.x - 1;
    } else if (facing == "east" && x < xMax) {
      position.x = position.x + 1;
    }
    return position;
  }

  turnLeft() {
    const position = this.position;
    const cardinalPoints = this.cardinalPoints;
    const index = cardinalPoints.findIndex((cardr) => cardr == position.facing);
    if (index > 0) {
      position.facing = cardinalPoints[index - 1];
    } else {
      position.facing = cardinalPoints[cardinalPoints.length - 1];
    }
    return position;
  }

  turnRight() {
    const position = this.position;
    const cardinalPoints = this.cardinalPoints;
    const index = cardinalPoints.findIndex((cardr) => cardr == position.facing);
    if (index < cardinalPoints.length - 1) {
      position.facing = cardinalPoints[index + 1];
    } else {
      position.facing = cardinalPoints[0];
    }
    return position;
  }

  report() {
    console.log(this.position);
  }

  getPosition() {
    return this.position;
  }
}

module.exports = Robot;
