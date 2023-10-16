const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
/*
Test 4

This test description is “throws error if a name is NOT passed into the constructor as the first parameter”. 
Review the first test in command.spec.js for an example of how this test works.
Look at the code in command.js. Use that to help you write the Message class in message.js so that your test passes.
*/
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name required.'));
    });

    /*
Test 5

The description is “constructor sets name”. 
The test confirms that the constructor in the Message class correctly sets the name property in a new message object.
    */
    it("constructor sets name", function() {
        let message = new Message('Test message with two commands');
        expect(message.name).toEqual('Test message with two commands');
    });

    /*
    Test 6

The description reads “contains a commands array passed into the constructor as the 2nd argument”. 
This test confirms that the commands property of a new message object contains the data passed in from the Message(name, commands) call.
*/
    it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        expect(message.commands).toEqual(commands);
    });
});
