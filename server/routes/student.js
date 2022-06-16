import express from "express";
import { verifyToken } from "../midleware/login.midleware.js";
import { upload } from "../midleware/upload.midleware.js";
import XLSX from "xlsx";
import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getStudentDetail,
  importFromExcel,
  updateStudent,
} from "../controllers/student.controller.js";
import multer from "multer";

const router = express.Router();

router.post("/student/create/import", upload.single("myFile"), importFromExcel);

router.patch("/student/update/:id", updateStudent);

router.post("/student/create", createStudent);

router.delete("/student/delete/:id", deleteStudent);

//Get 1 student by id
router.get("/student/:id", getStudentDetail);

// Get all students in a class
router.get("/student/all/:lop", getAllStudent);

export default router;
