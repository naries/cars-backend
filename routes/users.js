const router = require('express-promise-router')()

const UsersController = require('../controllers/users')
const {
    validateParam,
    validateBody,
    schemas
} = require('../helpers/routeHelpers')

router
    .route('/')
    .get(UsersController.index)
    .post(validateBody(schemas.putUserSchema), UsersController.newUser)

router
    .route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUser)
    .put([
        validateParam(schemas.idSchema, 'userId'), 
        validateBody(schemas.putUserSchema)
    ], UsersController.replaceUser)
    .patch([
        validateParam(schemas.idSchema, 'userId'), 
        validateBody(schemas.patchUserSchema)
    ], UsersController.replaceUser)
    // .delete()

router
    .route('/:userId/cars')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUserCars)
    .post([
        validateParam(schemas.idSchema, 'userId'),  
        validateBody(schemas.userCarSchema)],
        UsersController.newUserCar)

module.exports = router