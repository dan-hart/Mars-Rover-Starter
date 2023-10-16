const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {
  
/*
Test 7

“constructor sets position and default values for mode and generatorWatts”. Refer to the Rover Class description above for these default values.
*/
    it("constructor sets position and default values for mode and generatorWatts", function() {
        let rover = new Rover(98382);
        expect(rover.position).toEqual(98382);
        expect(rover.mode).toEqual('NORMAL');
        expect(rover.generatorWatts).toEqual(110);
    });

/*
Test 8

“response returned by receiveMessage contains the name of the message”
*/
    it("response returned by receiveMessage contains the name of the message", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);
        let response = rover.receiveMessage(message);
        expect(response.message).toEqual(message.name);
    });
  
/*
Test 9

“response returned by receiveMessage includes two results if two commands are sent in the message”
*/
    it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);
        let response = rover.receiveMessage(message);
        expect(response.results.length).toEqual(2);
    });

    /*
Test 10

“responds correctly to the status check command”

For the STATUS_CHECK command, receiveMessage(message).results includes a roverStatus object describing the current state of the rover object — mode, generatorWatts, and position. The test should check each of these for accuracy.
See the Rover Command Types table for more details.
*/
    it("responds correctly to the status check command", function() {
        let commands = [new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);
        let response = rover.receiveMessage(message);
        expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
        expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
        expect(response.results[0].roverStatus.position).toEqual(98382);
    });

    /*
Test 11

“responds correctly to the mode change command”

The test should check the completed property and rover mode for accuracy.
The rover has two modes that can be passed as values to a mode change command: ‘LOW_POWER’ and ‘NORMAL’.
*/
    it("responds correctly to the mode change command", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);
        let response = rover.receiveMessage(message);
        expect(response.results[0].completed).toEqual(true);
        expect(rover.mode).toEqual('LOW_POWER');
    });

    /*
Test 12

“responds with a false completed value when attempting to move in LOW_POWER mode”

The test should check the completed property for accuracy and confirm that the rover’s position did not change.
Use the Rover Modes table for guidance on how to handle move commands in different modes.
*/
    it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 20)];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);
        let response = rover.receiveMessage(message);
        expect(response.results[1].completed).toEqual(false);
        expect(rover.position).toEqual(98382);
    });

    /*
Test 13

“responds with the position for the move command”

A MOVE command will update the rover’s position with the position value in the command.
*/
    it("responds with the position for the move command", function() {
        let commands = [new Command('MOVE', 20)];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);
        let response = rover.receiveMessage(message);
        expect(rover.position).toEqual(20);
    });

});