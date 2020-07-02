const express=require('express');
// const router=express.Router();
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const user_controller=require('../controllers/user_controller');
const { validateParam,
        validateBody,
        schemas } = require('../helpers/routeHelpers');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt',{ session: false });

router.route('/').get(user_controller.index)
router.route('/signin').post(validateBody(schemas.authSchema), passportSignIn, user_controller.signIn)
router.route('/signup').post(validateBody(schemas.userSchema), user_controller.newUser)

router.route('/getUser').get(passportJWT, user_controller.getUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'),user_controller.getUser)
    .put([validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userSchema)],
        user_controller.resetUser)
    .patch([validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userOptionalSchema)],
        user_controller.updateUser)


module.exports=router;