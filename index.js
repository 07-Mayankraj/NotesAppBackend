require("dotenv").config();
const express = require("express");
const dbconnection = require("./config/db");
const cors = require("cors");
const userRoute = require("./routes/users.route");
const bodyParser = require("body-parser");
const { noteRouter } = require("./routes/note.route");
const authentication = require("./middlewwares/authentication.middleware");
const app = express();

// ----------> middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------> routes

app.get("/", (req,res)=>res.send('<h1>Homeroute</h1>'));

app.use("/users", userRoute);
app.use(authentication);
app.use("/notes", noteRouter);

app.listen(process.env.Port, async () => {
  try {
    dbconnection;
    console.log("Connected and server running on port", process.env.port);
  } catch (error) {
    console.log("connection failed", error);
  }
});
