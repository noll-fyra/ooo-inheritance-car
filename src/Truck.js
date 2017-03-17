var Car = require('./Car.js')

// Implement your Truck here
function Truck (make, model, year, color, seats = 3, passengers) {
  Car.call(this, make, model, year, color, seats, passengers)
}

Truck.prototype = Object.create(Car.prototype)

module.exports = Truck
