// load the assert plugin (for testing)
var assert = require('assert')
var success = require('./helpers/success')

// load the Motorcycle class
var Motorcycle = require('../src/Motorcycle')
var Car = require('../src/Car')

// Your tests will go below here
// //// TEST PHASE 1 /////////////////////////////////////////

// test instanceof
console.log('Testing instanceof')
var myMotorcycle = new Motorcycle('Acura', 'Integra', 1999, 'Red')
assert.strictEqual(myMotorcycle instanceof Motorcycle, true, 'myMotorcycle is not an instance of Motorcycle')
assert.strictEqual(myMotorcycle instanceof Car, true, 'myMotorcycle is not an instance of Car')
success()

// test constructor
console.log('Testing Constructor')

assert.strictEqual(myMotorcycle.make, 'Acura', 'Constructor did not set make.')
assert.strictEqual(myMotorcycle.model, 'Integra', 'Constructor did not set model.')
assert.strictEqual(myMotorcycle.year, 1999, 'Constructor did not set year.')
assert.strictEqual(myMotorcycle.color, 'Red', 'Constructor did not set color.')
assert.strictEqual(myMotorcycle.seats, 2, 'Constructor did not set seats.')
success()

// test sell
console.log('Testing selling a Motorcycle')
myMotorcycle.sell('Lenny')
assert.strictEqual(myMotorcycle.owner, 'Lenny', 'Failed to sell the Motorcycle to Lenny. Motorcycle owner is: "' + myMotorcycle.owner + '"')
assert.deepEqual(myMotorcycle.previousOwners, ['manufacturer'], 'Previous owners not updated.')
success()

// test paint
console.log('Testing painting a Motorcycle')
myMotorcycle.paint('Blue')
assert.strictEqual(myMotorcycle.color, 'Blue', 'Failed to paint the Motorcycle Blue. Motorcycle is: "' + myMotorcycle.color + '"')
success('YAY!!! You finished phase 1. Continue to phase 2.')

// //// TEST PHASE 2 /////////////////////////////////////////

// test start
console.log('Testing starting the Motorcycle')
assert.equal(typeof (myMotorcycle.start), 'function', 'there is no start() function')
myMotorcycle.start()
assert.strictEqual(myMotorcycle.running, true, 'Failed to start the Motorcycle. running should = true')
success()

// test start
console.log('Testing turning off the Motorcycle')
assert.equal(typeof (myMotorcycle.off), 'function', 'there is no off function')
myMotorcycle.off()
assert.strictEqual(myMotorcycle.running, false, 'Failed to turn off the Motorcycle. running should = false')
success()

// test driveTo
console.log('Testing driving the Motorcycle')
assert.equal(typeof (myMotorcycle.driveTo), 'function', 'there is no driveTo function')
assert.strictEqual(typeof (myMotorcycle.driveTo('place')), 'boolean', 'DriveTo function did not return a boolean value')
assert.strictEqual(myMotorcycle.driveTo('place'), false, 'Motorcycle allowed driving while NOT running.')
myMotorcycle.start()
assert.strictEqual(myMotorcycle.driveTo('place'), true, 'Motorcycle did not allow driving while running.')
success()

// test driveTo
console.log('Testing parking the Motorcycle')
assert.equal(typeof (myMotorcycle.park), 'function', 'there is no park function')
assert.strictEqual(typeof (myMotorcycle.park()), 'boolean', 'park function did not return a boolean value')
assert.strictEqual(myMotorcycle.park(), false, 'Motorcycle did not allow parking while NOT running.')
myMotorcycle.off()
assert.strictEqual(myMotorcycle.park(), true, 'Motorcycle allowed parking while running.')
success('YAY!!! You finished phase 2. Continue to phase 3. Almost done.')

// //// TEST PHASE 3 /////////////////////////////////////////

// test constructor with passengers
console.log('Testing Constructor (with passsengers)')
myMotorcycle = new Motorcycle('Acura', 'Integra', 1999, 'Red', 4)
assert.deepEqual(myMotorcycle.passengers, [], 'Passengers does not default to an empty array if left blank.')
myMotorcycle = new Motorcycle('Acura', 'Integra', 1999, 'Red', 4, ['Anil', 'Sarah'])
assert.deepEqual(myMotorcycle.passengers, ['Anil', 'Sarah'], "Passengers array not updated. Expected ['Anil','Sarah']")
success()

// test pickUp
console.log('Testing picking up a passenger')
assert.equal(typeof (myMotorcycle.pickUp), 'function', 'there is no pickUp function')
assert.strictEqual(typeof (myMotorcycle.pickUp()), 'boolean', 'pickUp function did not return a boolean value')
assert.strictEqual(myMotorcycle.pickUp('Randall'), false, 'Motorcycle did allowed picking up a passenger while NOT running (returned true).')
myMotorcycle.start()
assert.strictEqual(myMotorcycle.pickUp('Randall'), true, 'Motorcycle did not allow picking up a passenger (returned false).')
assert.deepEqual(myMotorcycle.passengers, ['Anil', 'Sarah', 'Randall'], "Passengers array not updated. Expected ['Anil','Sarah','Randall']")
success()

// test pickUp
console.log('Testing seat limit')
assert.strictEqual(myMotorcycle.pickUp('Jane Doe'), false, 'Motorcycle allowed picking up a passenger despite all seats being filled.')
assert.deepEqual(myMotorcycle.passengers, ['Anil', 'Sarah', 'Randall'], "Passengers array updated despite all seats being filled. Expected ['Anil','Sarah','Randall']")
success()

// test dropOff
console.log('Testing dropping off a passenger')
assert.equal(typeof (myMotorcycle.dropOff), 'function', 'there is no dropOff function')
var badDrop = myMotorcycle.dropOff('NotInTheMotorcycle')
assert.strictEqual(typeof (badDrop), 'boolean', 'dropOff function did not return a boolean value')
assert.strictEqual(badDrop, false, 'Motorcycle allowed drop-off despite passenger not being in the Motorcycle. (returned true)')
assert.deepEqual(myMotorcycle.passengers, ['Anil', 'Sarah', 'Randall'], "Passengers array updated despite being called with an invalid passenger. Expected ['Anil','Sarah','Randall']")
myMotorcycle.off()
assert.strictEqual(myMotorcycle.dropOff('Anil'), false, 'Motorcycle allowed dropping off a passenger when the Motorcycle was off.')
assert.deepEqual(myMotorcycle.passengers, ['Anil', 'Sarah', 'Randall'], "Passengers array updated despite Motorcycle being off. Expected ['Anil','Sarah','Randall']")
myMotorcycle.start()
assert.strictEqual(myMotorcycle.dropOff('Anil'), true, 'Motorcycle did NOT allow dropping off up a passenger when the Motorcycle was running.')
assert.deepEqual(myMotorcycle.passengers, ['Sarah', 'Randall'], "Passengers array not updated. Expected ['Anil','Sarah','Randall','Aaron']")
success()

// test pickUp
console.log('Testing seat after drop off')
assert.strictEqual(myMotorcycle.pickUp('Jana Doe'), true, 'Motorcycle did not allow picking up a passenger after freeing a seat.')
assert.deepEqual(myMotorcycle.passengers, ['Sarah', 'Randall', 'Jana Doe'], "Passengers array not updated. Expected ['Sarah','Randall','Jana Doe']")
success()

// testing passenger count
console.log('Testing passenger count')
assert.equal(typeof (myMotorcycle.passengerCount), 'function', 'there is no passengerCount function')
assert.strictEqual(typeof (myMotorcycle.passengerCount()), 'number', 'passengerCount function did not return a number value')
assert.strictEqual(myMotorcycle.passengerCount(), 3, 'Passenger count seems inaccurate. Expected 3.')
success()

// testing wheelie
console.log('Testing wheelie')
assert.equal(typeof (myMotorcycle.wheelie), 'function', 'there is no wheelie function')
assert.strictEqual(typeof (myMotorcycle.wheelie()), 'boolean', 'passengerCount function did not return a boolean value')
success('Your Motorcycle is ready. Go get them!')
