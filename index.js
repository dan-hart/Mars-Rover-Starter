const Rover = require('./rover.js');
const Message = require('./message.js');
const Command = require('./command.js');

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let message = new Message('Test message with two commands', commands);
// let testRover = new Rover(98382);    // Passes 98382 as the rover's position.
// let response = testRover.receiveMessage(message);
// console.log(response);

const readline = require('readline');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

let rover = new Rover(98382);
const askForInput = () => {
   rl.question('Please enter a command (MODE_CHANGE (NORMAL or LOW_POWER), MOVE, SOLAR_CHARGE, or STATUS_CHECK.). Enter -1 to stop: ', (input) => {
      if (input === '-1') {
         console.log('You entered -1, so the program has stopped.');
         rl.close();
      } else {
         console.log(`---------------------------------`);
         console.log(`Rover position: ${rover.position}`);
         console.log(`Rover mode: ${rover.mode}`);
         console.log(`Rover generatorWatts: ${rover.generatorWatts}`);
         console.log(`---------------------------------`);

         console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
         console.log(`>>> Processing: ${input}`);
         console.log(`>>> Received: ${input}`);
         console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
         
         // Split input on spaces (to allow for parameters)
         let inputArr = input.split(' ');
         // verify only two parameters were entered
         if (inputArr.length !== 2) {
            console.log('Invalid input. Please enter two parameters separated by a space.');
            askForInput();
            return;
         }
         let commands = [new Command(inputArr[0], inputArr[1])];
         let message = new Message(input, commands);
         let response = rover.receiveMessage(message);
         // console.log(response);
         console.log(`---------------------------------`);
         console.log(`Rover position: ${rover.position}`);
         console.log(`Rover mode: ${rover.mode}`);
         console.log(`Rover generatorWatts: ${rover.generatorWatts}`);
         console.log(`---------------------------------`);
         askForInput(); // Continue asking for input
      }
   });
};

askForInput();

