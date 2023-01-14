const NoteModel = require("../models/notes.models");

exports.homeroute = async (req, res) => {
    try {
        const notes = await NoteModel.find({ user: req.body.userID });
        res.json(notes);
    } catch (error) {
        res.send({ err: error.message });
    }
};

exports.addnote = async (req, res) => {
    const { title, note, category } = req.body;
    let user = req.body.userID;
    try {
        const new_note = new NoteModel({ title, note, category, user });
        await new_note.save();
        res.json({ msg: "created" });
    } catch (err) {
        res.json({ msg: err.message });
    }
};

exports.update = async (req, res) => {
    const payload = req.body;
    const _id = req.params.id;
    const userID = req.body.userID;

    // find the note
    const note = await NoteModel.findOne({ _id });
    // and match the userID to note.userid
    try {
        if (userID !== note.user) {
            res.json({ message: "Not authorised" });
        } else {
            const data = await NoteModel.findByIdAndUpdate({ _id }, payload);
            res.json({ message: "Note updated" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    const _id = req.params.id;
    const userID = req.body.userID;

    // find the note
    const note = await NoteModel.findOne({ _id });
    // and match the userID to note.userid
    try {
        if (userID !== note.user) {
            res.json({ message: "Not authorised" });
        } else {
            await NoteModel.findByIdAndDelete({ _id });
            res.json({ message: "Note deleted" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
