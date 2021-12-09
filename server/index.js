//handling uncaught exceptions, if something is undefined/uncaught then this will handled
process.on("uncaughtException", (err) => {
  console.log(
    `server is shutting down due to uncaught exception: ${err.message}`
  );
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middlewares/error");
const sendEmail = require("./utils/sendMail")

//app initialization
const app = express();

//require db
const connect = require("./config/db");
connect();
//body-parser
app.use(express.json());
//cors
app.use(cors());
//cookieParser
app.use(cookieParser());

//destructure env object
let { SERVER_DEV_NAME } = process.env;

app.get("/", (req, res) => {
  res
    .status(200)
    .send(`${SERVER_DEV_NAME} is running the server at port: ${PORT}`);
});

// Routes
app.use("/user", require("./routes/Users"));
app.use("/stationary", require("./routes/Stationary"));
app.use("/enmedium", require("./routes/EnglishMedium"));
app.use("/storybook", require("./routes/WriterStoryBook"));
app.use("/childrenstorybook", require("./routes/ChildrenStoryBook"));
app.use("/alevel", require("./routes/ALevel"));
//mail
app.post("/sendemail",(req,res) => {
  sendEmail()
  res.status(200).send({message:"send"})
})

//error middleware
app.use(errorMiddleware);

let PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`server is running at port ${PORT}`)
);

//unhandled promise rejection handling
process.on("unhandledRejection", (err) => {
  console.log(
    "shutting down server due to unhandled promise rejection. Error: " +
      err.message
  );
  server.close(() => {
    process.exit(1);
  });
});
