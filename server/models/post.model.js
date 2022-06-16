import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  lop: {
    type: String,
    required: true,
  },
  comment: [
    {
      msv: String,
      cmt: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("posts", postSchema);
export default Posts;
