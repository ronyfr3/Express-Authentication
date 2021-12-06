require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
//require db
const connect = require('./config/db');
connect();

//cors
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//destructure env object
let { SERVER_DEV_NAME } = process.env;

app.get('/', (req, res) => {
  res
    .status(200)
    .send(`${SERVER_DEV_NAME} is running the server at port: ${PORT}`);
});

// Routes
app.use('/user', require('./routes/Users'));
app.use('/stationary', require('./routes/Stationary'));

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
