const mongoose = require("mongoose");
const validator = require("validator");

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isHexColor(value)) {
        throw new Error("Color is invalid");
      }
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
