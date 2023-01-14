const express = require("express");
const controller = require("../controllers/note.controller");
const noteRouter = express.Router();

noteRouter.get("/", controller.homeroute);

noteRouter.post("/addnote", controller.addnote);

noteRouter.patch("/update/:id", controller.update);

noteRouter.delete("/delete/:id", controller.delete);

module.exports = {
  noteRouter,
};

// patch and delete not working
