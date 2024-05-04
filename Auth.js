const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./server/models/person')

passport.use(new localStrategy( async (username, password, done)=>{
    try{
        const user = await Person.findOne({username})
        if(!user){
            return done(null, false, {message: "invalid user"})
        }
        var isPasswordCorrect = await user.comparePassword(password)
        console.log(isPasswordCorrect);
        if(isPasswordCorrect){
            return done(null,user)
        }else{
            return done(null,false,{message: "wrong password"})
        }
    }catch(err){
       return done(err)
    }
}))

module.exports = passport;
