// load the assert plugin (for testing)
var assert = require('assert')
var success = require('./helpers/success')

// load the Truck class
var Truck = require('../src/Truck')
var Car = require('../src/Car')

// Your tests will go below here
// //// TEST PHASE 1 /////////////////////////////////////////

// test instanceof
console.log('Testing instanceof')
var myTruck = new Truck('Acura', 'Integra', 1999, 'Red')
assert.strictEqual(myTruck instanceof Truck, true, 'myTruck is not an instance of Truck')
assert.strictEqual(myTruck instanceof Car, true, 'myTruck is not an instance of Car')
success()

// test constructor
console.log('Testing Constructor')

assert.strictEqual(myTruck.make, 'Acura', 'Constructor did not set make.')
assert.strictEqual(myTruck.model, 'Integra', 'Constructor did not set model.')
assert.strictEqual(myTruck.year, 1999, 'Constructor did not set year.')
assert.strictEqual(myTruck.color, 'Red', 'Constructor did not set color.')
assert.strictEqual(myTruck.seats, 3, 'Constructor did not set seats.')
success()

// test sell
console.log('Testing selling a truck')
myTruck.sell('Lenny')
assert.strictEqual(myTruck.owner, 'Lenny', 'Failed to sell the truck to Lenny. Truck owner is: "' + myTruck.owner + '"')
assert.deepEqual(myTruck.previousOwners, ['manufacturer'], 'Previous owners not updated.')
success()

// test paint
console.log('Testing painting a truck')
myTruck.paint('Blue')
assert.strictEqual(myTruck.color, 'Blue', 'Failed to paint the truck Blue. Truck is: "' + myTruck.color + '"')
success('YAY!!! You finished phase 1. Continue to phase 2.')

// //// TEST PHASE 2 /////////////////////////////////////////

// test start
console.log('Testing starting the truck')
assert.equal(typeof (myTruck.start), 'function', 'there is no start() function')
myTruck.start()
assert.strictEqual(myTruck.running, true, 'Failed to start the truck. running should = true')
success()

// test start
console.log('Testing turning off the truck')
assert.equal(typeof (myTruck.off), 'function', 'there is no off function')
myTruck.off()
assert.strictEqual(myTruck.running, false, 'Failed to turn off the truck. running should = false')
success()

// test driveTo
console.log('Testing driving the truck')
assert.equal(typeof (myTruck.driveTo), 'function', 'there is no driveTo function')
assert.strictEqual(typeof (myTruck.driveTo('place')), 'boolean', 'DriveTo function did not return a boolean value')
assert.strictEqual(myTruck.driveTo('place'), false, 'Truck allowed driving while NOT running.')
myTruck.start()
assert.strictEqual(myTruck.driveTo('place'), true, 'Truck did not allow driving while running.')
success()

// test driveTo
console.log('Testing parking the truck')
assert.equal(typeof (myTruck.park), 'function', 'there is no park function')
assert.strictEqual(typeof (myTruck.park()), 'boolean', 'park function did not return a boolean value')
assert.strictEqual(myTruck.park(), false, 'Truck did not allow parking while NOT running.')
myTruck.off()
assert.strictEqual(myTruck.park(), true, 'Truck allowed parking while running.')
success('YAY!!! You finished phase 2. Continue to phase 3. Almost done.')

// //// TEST PHASE 3 /////////////////////////////////////////

// test constructor with passengers
console.log('Testing Constructor (with passsengers)')
myTruck = new Truck('Acura', 'Integra', 1999, 'Red', 4)
assert.deepEqual(myTruck.passengers, [], 'Passengers does not default to an empty array if left blank.')
myTruck = new Truck('Acura', 'Integra', 1999, 'Red', 4, ['Anil', 'Sarah'])
assert.deepEqual(myTruck.passengers, ['Anil', 'Sarah'], "Passengers array not updated. Expected ['Anil','Sarah']")
success()

// test pickUp
console.log('Testing picking up a passenger')
assert.equal(typeof (myTruck.pickUp), 'function', 'there is no pickUp function')
assert.strictEqual(typeof (myTruck.pickUp()), 'boolean', 'pickUp function did not return a boolean value')
assert.strictEqual(myTruck.pickUp('Randall'), false, 'Truck did allowed picking up a passenger while NOT running (returned true).')
myTruck.start()
assert.strictEqual(myTruck.pickUp('Randall'), true, 'Truck did not allow picking up a passenger (returned false).')
assert.deepEqual(myTruck.passengers, ['Anil', 'Sarah', 'Randall'], "Passengers array not updated. Expected ['Anil','Sarah','Randall']")
success()

// test pickUp
console.log('Testing seat limit')
assert.strictEqual(myTruck.pickUp('Jane Doe'), false, 'Truck allowed picking up a passenger despite all seats being filled.')
assert.deepEqual(myTruck.passengers, ['Anil', 'Sarah', 'Randall'], "Passengers array updated despite all seats being filled. Expected ['Anil','Sarah','Randall']")
success()

// test dropOff
console.log('Testing dropping off a passenger')
assert.equal(typeof (myTruck.dropOff), 'function', 'there is no dropOff function')
var badDrop = myTruck.dropOff('NotInTheTruck')
assert.strictEqual(typeof (badDrop), 'boolean', 'dropOff function did not return a boolean value')
assert.strictEqual(badDrop, false, 'Truck allowed drop-off despite passenger not being in the truck. (returned true)')
assert.deepEqual(myTruck.passengers, ['Anil', 'Sarah', 'Randall'], "Passengers array updated despite being called with an invalid passenger. Expected ['Anil','Sarah','Randall']")
myTruck.off()
assert.strictEqual(myTruck.dropOff('Anil'), false, 'Truck allowed dropping off a passenger when the truck was off.')
assert.deepEqual(myTruck.passengers, ['Anil', 'Sarah', 'Randall'], "Passengers array updated despite truck being off. Expected ['Anil','Sarah','Randall']")
myTruck.start()
assert.strictEqual(myTruck.dropOff('Anil'), true, 'Truck did NOT allow dropping off up a passenger when the truck was running.')
assert.deepEqual(myTruck.passengers, ['Sarah', 'Randall'], "Passengers array not updated. Expected ['Anil','Sarah','Randall','Aaron']")
success()

// test pickUp
console.log('Testing seat after drop off')
assert.strictEqual(myTruck.pickUp('Jana Doe'), true, 'Truck did not allow picking up a passenger after freeing a seat.')
assert.deepEqual(myTruck.passengers, ['Sarah', 'Randall', 'Jana Doe'], "Passengers array not updated. Expected ['Sarah','Randall','Jana Doe']")
success()

// testing passenger count
console.log('Testing passenger count')
assert.equal(typeof (myTruck.passengerCount), 'function', 'there is no passengerCount function')
assert.strictEqual(typeof (myTruck.passengerCount()), 'number', 'passengerCount function did not return a number value')
assert.strictEqual(myTruck.passengerCount(), 3, 'Passenger count seems inaccurate. Expected 3.')
success('Your Truck is ready. Now it\'s time to implement the Motorcyle')
