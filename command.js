class Command {
  // At this time, note that a command type will be one of the following: 
  // MODE_CHANGE, MOVE, or STATUS_CHECK.
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }
}

module.exports = Command;