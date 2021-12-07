const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connection established with server: ${data.connection.host}`);
    })
    //we are handling promise rejection in index.js so we needn't to put catch block here
};
module.exports = connect