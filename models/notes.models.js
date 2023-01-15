const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  note: {
    type: String,
  },
  priority: {
    type: String,
  },
  user : String,
});

const NoteModel = mongoose.model("notes",noteSchema)

module.exports = NoteModel;


//  {"title": "nature", "note": "lovee plants",  "category":"ii","user": "me}


