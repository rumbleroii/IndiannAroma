const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require("config");
const User = require('../models/User');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done)=> {
    User.findById(id).then((user)=> {
        done(null,user);
    })
});

passport.use(
    new GoogleStrategy({
        callbackURL: 'http://localhost:8000/api/auth/google/redirect',
        clientID: "602173929394-ttomb3vvervngalqvhjtvtvn6gdt6qh7.apps.googleusercontent.com",
        clientSecret: config.get("clientSecret")

    },(accessToken, refreshToken, profile, done) => {
        
        User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
                // already have a user
                console.log('user is: ' + currentUser);
                done(null, currentUser);
            } else {
                new User({
                    name: profile.displayName,
                    googleId: profile.id
                })
                .save()
                .then( (newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null,newUser);
                });
            }
        });
    })
);