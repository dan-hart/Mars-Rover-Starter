/*
This class builds an object with two properties.
constructor(name, commands)
name is a string that is the name of the message.
commands is an array of Command objects.
**Example**
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
*/
class Message {
   constructor(name, commands) {
      this.name = name;
      if (!name) {
         throw Error("Name required.");
      }
      this.commands = commands;
   }
}

module.exports = Message;