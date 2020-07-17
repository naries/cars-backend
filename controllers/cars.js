const Car = require('../models/car')
const User = require('../models/user')

module.exports = {
    index: async (req, res, next) => {
        const cars = await Car.find({})
        res.status(200).json(cars)
    },
    newCar: async (req, res, next) => {
        // Find the seller
        const seller = await User.findById(req.value.body.seller)
        const newCar = req.value.body
        delete newCar.seller

        const car = new Car(newCar)
        await car.save()

        seller.cars.push(car)
        await seller.save()

        res.status(200).json(car)
    },
    getCar: async (req, res, next) => {
        const car = await Car.findById(req.value.params.carId)
        res.status(200).json(car)
    },
    replaceCar: async (req, res, next) => {
        const { carId } = req.value.params
        const car = await Car.findByIdAndUpdate(carId, req.value.body)
        res.status(200).json(car)
    },
    deleteCar: async (req, res, next) => {
        const { carId } = req.value.params
        const car = await Car.findById(carId)

        const sellerId = car.seller
        const seller = await User.findById(sellerId)

        await car.remove()
        seller.cars.pull(car)
        await seller.save()

        res.status(200).json(car)
    }
}