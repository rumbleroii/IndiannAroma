const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connecting DB
connectDB();

// Init Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome");
})

// Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/product", require("./routes/api/product"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/orders", require("./routes/api/order"));

app.listen(8000, () => {
    console.log("[Info] Server started successfully! Listening at 8000");
});