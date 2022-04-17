const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const auth = require('./middleware/auth');
const app = express();

// Connecting DB
connectDB();

app.use(cookieSession({
    maxAge: 24*60*60,
    keys:['oaiwdaowndaow']
}));

app.use(passport.initialize());
app.use(passport.session());

// Init Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.send("Welcome");
})

// Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/product", require("./routes/api/product"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/orders", require("./routes/api/order"));
app.use('/api/auth', require("./routes/api/auth"));
app.listen(8000, () => {
    console.log("[Info] Server started successfully! Listening at 8000");
});