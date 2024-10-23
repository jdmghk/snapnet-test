const express = require('express')
// const connectDB = require('./config/database');
const dotenv = require("dotenv").config()
const cors = require('cors');


const port = process.env.PORT || 4000

// connectDB();

const app = express()

// Enable CORS for all routes
app.use(cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
});

// app.use('/api/event', require('./routes/eventRoutes'));
// app.use('/api/user', require('./routes/userRoutes'));
// app.use('/api/ticket', require('./routes/ticketRoutes'));
// app.use('/api/paystack', require('./routes/paystackRoutes'));
// app.use('/', require('./routes/slugRoutes'));


//Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

