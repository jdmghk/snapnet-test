const express = require('express')
const dotenv = require("dotenv").config()
const cors = require('cors');


const port = process.env.PORT || 4000



const app = express()

// Enable CORS for all routes
app.use(cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));


//Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

