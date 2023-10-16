/*
Rover
Rover receives a message object, updates its properties from the message, and returns the results. Remember to use TDD by first reading the class description, writing tests, and then coding the class.

Rover Class Description

This class builds a rover object with a few properties, and it also contains a function outside of constructor to handle updates to its properties.

constructor(position)

position is a number representing the rover’s position.
Sets this.position to position
Sets this.mode to 'NORMAL'
Sets the default value for generatorWatts to 110
receiveMessage(message)

message is a Message object
Returns an object containing at least two properties:
message: the name of the original Message object
results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
Updates certain properties of the rover object
Details about how to respond to different commands:
   MOVE:
      Number representing the position the rover should move to.
      updates rover position
      result returned: {completed: true}
   STATUS_CHECK:
      No values sent with this command.
      example result: {completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 87382098}}
   MODE_CHANGE:
      String representing rover mode (see modes)
      Updates: this.mode
      result returned: {completed: true}

   The response value for completed will be false if the command could NOT be completed.

   Rover Modes:
      LOW_POWER: Can’t be moved in this state.
      NORMAL: Default state after power up.

   EXAMPLE:
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382);    // Passes 98382 as the rover's position.
      let response = rover.receiveMessage(message);

      OUTPUT:
      {
         message: 'Test message with two commands',
         results: [
            {
               completed: true
            },
            {
               completed: true, 
               roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
            }
         ]
      }
*/
class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];
      for (let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];
         if (command.commandType === 'MOVE') {
            if (this.mode === 'NORMAL') {
               this.position += Number(command.value);
               // get absolute value of command.value
               let absCommandValue = Math.abs(command.value);
               this.generatorWatts -= (absCommandValue / 2);
               if (this.generatorWatts <= 0) {
                  this.generatorWatts = 0;
               }
               if (this.generatorWatts <= 12) {
                  this.mode = 'LOW_POWER';
                  results.push({ completed: false });
                  return;
               }
               results.push({ completed: true });
            } else {
               results.push({ completed: false });
            }
         } else if (command.commandType === 'STATUS_CHECK') {
            results.push({ completed: true, roverStatus: "mode: " + this.mode + " " + "generatorWatts: " + this.generatorWatts + " " + "position: " + this.position });
         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            results.push({ completed: true });
         } else if (command.commandType === "SOLAR_CHARGE") {
            this.mode = "NORMAL";
            this.generatorWatts = 110;
            results.push({ completed: true });
         }
      }
      return { message: message.name, results: results };
   }
}

module.exports = Rover;