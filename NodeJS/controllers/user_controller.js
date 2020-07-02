const JWT = require('jsonwebtoken');

const User = require('../models/user_model');

const { JWT_SECRET } = require('../configuration');

signToken = user => {
    return JWT.sign({
      iss: 'Shayaan',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
  }

module.exports = {

    //USER CONTROLS

    index: async (req, res, next) => {
        const users = await User.find({}).populate('education').populate('work');
        res.status(200).json(users);
    },

    //Validation: DONE
    newUser: async (req, res, next) => {
        const {username, password} = req.value.body;

        const foundUser = await User.findOne({username});
        if(foundUser){
            return res.status(403).json({error: 'Username is already in use'})
        }

        const newUser = new User({username, password});
        await newUser.save();

        const token = signToken(newUser);

        res.status(200).json({ token });
    },

    signIn: async (req, res, next) =>{
        const token = signToken(req.user);
        res.status(200).json({ token });
        console.log("succesfull login");
    },

    secret: async (req, res, next) => {
        console.log('I managed to get here!')
        res.json({ secret: "resource" });
    },

    //Validation: DONE

    getUser: async (username,res, done) => {
        
    try{
        const user = await User.findOne( { username } );
        if (!user) {
            return done(null, false);
        }
        res.status(200).json(user);

    }catch(error){
        done(error, false);
    }
        // const  user = signToken(req.user)
        // const { username } = req.value.body;
        // const user = await User.findOne(username);
        // res.status(200).json(user);
    },
    // getUser: async (req,res, next) => {
    //     const { username } = req.value.body;
    //     const user = await User.findOne(username);
    //     res.status(200).json(user);
    // },


    resetUser: async (req, res, next) => {
        const { userId } = req.value.params;
        const newUser = req.value.body;

        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    updateUser: async (req, res, next) => {
        const { userId } = req.value.params;
        const newUser = req.value.body;

        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },


   

};