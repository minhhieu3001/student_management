import mongoose from "mongoose";
const Schema = mongoose.Schema;
const studentSchema = new mongoose.Schema({
  msv: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ"],
    default: "Nam",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  sum_of_credits: {
    type: Number,
  },
  gpa: {
    type: Number,
  },
  status: {
    type: String,
    enum: [
      "Không",
      "Nguy cơ nghỉ học",
      "Cảnh báo học vụ",
      "Thiếu tín chỉ",
      "Thiếu học phí",
      "Khen thưởng",
    ],
    default: "Không",
  },
  lop: {
    type: String,
    required: true,
  },
});
//export collection name 'student' storing student info
const Student = mongoose.model("students", studentSchema);
export default Student;
