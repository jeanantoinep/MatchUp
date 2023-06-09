const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  user_id : {
    required: true,
    type: Schema.Types.ObjectId,
    ref : "User",
  },
  content : {type: String, required: true, default: ""},
  date : {type :Date, required : true , default : ""},
})

const roomSchema = new Schema({
  event_id: {
    required: true,
    type: Schema.Types.ObjectId,
    ref : "Event",
  },
  messages: {
    required: true,
    type: [messagesSchema],
  },
});

const rooms= mongoose.model("Rooms", roomSchema);
module.exports = rooms;
