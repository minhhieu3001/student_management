import Users from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";

// @Router: /login
// @desc: user login
// @access: public
export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await Users.findOne({ username: username });
    const student = await Student.findOne({ msv: username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng!",
      });
    }

    const verifiedPassword = await argon2.verify(user.password, password);

    if (!verifiedPassword) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng!",
      });
    } else {
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      if (user.role === "student") {
        res.json({
          success: true,
          message: "Student logged in successfully",
          userId: student._id,
          username,
          role: user.role,
          lop: user.lop,
          accessToken,
        });
      } else {
        res.json({
          success: true,
          message: "Manager logged in successfully",
          role: user.role,
          username,
          lop: user.lop,
          accessToken,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// @Router: POST /create-student-account
// @desc: Teacher create new account for student
// @access: Only teacher can do
export const createStudentAccount = async (req, res) => {
  const { username, password, lop } = req.body;

  try {
    // Check for existing user
    const user = await Users.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already exist" });

    // If user is ok -> save to the db
    const hashedPassword = await argon2.hash(password);
    const newUser = new Users({
      username,
      password: hashedPassword,
      role: "student",
      lop: lop,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteStudentAccount = async (req, res) => {
  try {
    const acc = await Users.findOneAndDelete({ username: req.params.msv });
    if (acc) {
      res.json({ message: "Delete successfully" });
    } else {
      res.json({ message: "Delete fail" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ deleteStudentAccount" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { username, old_pass, new_pass } = req.body;
    const user = await Users.findOne({
      username: username,
    });
    const verifiedPassword = await argon2.verify(user.password, old_pass);
    console.log(verifiedPassword);
    if (!verifiedPassword) {
      return res.json({ message: "Mật khẩu cũ không đúng" });
    } else {
      const UpdatedPassword = await Users.findOneAndUpdate(
        { username: username },
        { password: await argon2.hash(new_pass.toString()) }
      );
      if (UpdatedPassword) {
        res.json({ message: "Thay đổi mật khẩu thành công" });
      } else {
        res.json({ message: "Thay đổi mật khẩu thất bại" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error ~ changePassword" });
  }
};
