const express=require("express");
const passport=require("passport")
const colors=require('colors')
const morgan=require('morgan')
const cors=require('cors')
const connectDB=require("./config/db")
const path = require('path');
const session=require('express-session');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb=require("./model/usermodel");



const app=express();

require("dotenv").config();

const PORT= process.env.PORT || 4000;
app.use(express.json());

connectDB();



//middewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


const user1=require("./routes/authroute");
const inventory=require("./routes/inventoryroute");

app.use("/api/v1/auth1", user1);
app.use("/api/v1/invent", inventory);
app.use("/api/v1/analytics", require("./routes/analyticsroute"));
app.use("/api/v1/admin", require("./routes/adminroutes"));

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    // async(accessToken,refreshToken,profile,done)=>{
    //     try {
    //         let user = await userdb.findOne({user_id:profile.id});

    //         if(!user){
    //             user = new userdb({
    //                 role:profile.role,
    //                 name:profile.name,
    //                 email:profile.emails[0].value,
    //                 password:profile.password
    //             });

    //             await user.save();
    //         }
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await userdb.findOne({ email: profile.emails[0].value });
    
            if (!user) {
                // Prompt user for missing information or set default values
                // For demonstration, we will use some default values for role and password
                const defaultRole = 'user'; // You can adjust the default role as needed
                const defaultPassword = 'temporarypassword'; // Set a temporary password or prompt user to set a password
    
                user = new userdb({
                    role: defaultRole,
                    name: `${profile.name.givenName} ${profile.name.familyName}`, // Combine givenName and familyName
                    email: profile.emails[0].value,
                    password: defaultPassword // This should ideally be hashed, use a strong temporary password
                });
    
                await user.save();
            }
            const token = jwt.sign({ userId: profile._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));


app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:8080/api/v1/auth1/current-user",
    failureRedirect:"http://localhost:3000/api/v1/auth1/login"
}))

app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
});