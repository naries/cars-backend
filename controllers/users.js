const User = require('../models/user')
const Car = require('../models/car')

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({})
        res.status(200).json(users)
    },
    newUser: async (req, res, next) => {
        const newUser = new User(req.value.body)
        const user = await newUser.save()
        res.status(200).json(user)
    },
    getUser: async (req, res, next) => {
        const user = await User.find({})
        res.status(200).json(user)
    },
    replaceUser: async (req, res, next) => {
        const { userId } = req.value.params
        const replaceWith = req.value.body
        const user = await User.findByIdAndUpdate(userId, replaceWith)
        res.status(200).json(user)
    },
    
    getUserCars: async (req, res, next) => {
        const { userId } = req.value.params
        const user = await User.findById(userId).populate('cars')
        res.status(200).json(user.cars)
    },

    newUserCar: async (req, res, next) => {
        const { userId } = req.value.params
        // Create a new car
        const newCar = new Car(req.value.body)
        // Get User
        const user = await User.findById(userId)
        // Add the seller to the car object returned!
        newCar.seller = user;
        //save the car
        await newCar.save()
        // Add car to the user's selling array 'car
        user.cars.push(newCar)
        // Save the user
        await user.save()
        res.status(201).json(newCar)
    }
}