/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./ListStudent.css";
import ListSV from "./Components/ListSV";
import { Link } from "react-router-dom";
import CallApi from "../API/CallApi";
import ExportToExcel from "./Components/ExportData";
class ListStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      lop: [],
      item: sessionStorage.getItem("item"),
    };
  }

  componentDidMount() {
    this.setState({
      lop: sessionStorage.getItem("lop").split(", "),
    });
    var item = sessionStorage.getItem("item");
    CallApi(`student/all/${item}`, "GET", null).then((res) => {
      if (res.data.ListStudents != null) {
        this.setState({
          students: res.data.ListStudents,

          



          



        });
      } else {
        this.setState({
          students: [],



          
        });
      }
      console.log(this.state.students);
    });
  }
  

  ChooseClass = (item) => {
    sessionStorage.setItem("item", item);
    CallApi(`student/all/${item}`, "GET", null).then((res) => {
      if (res.data.ListStudents != null) {
        this.setState({
          students: res.data.ListStudents,
        });
      } else {
        this.setState({
          students: [],
        });
      }
    });
  };

  findIndex = (_id) => {
    var { students } = this.state;
    var result = -1;
    students.forEach((student, index) => {
      if (student._id === _id) result = index;
    });
    return result;
  };

  onDelete = (_id, msv) => {
    var { students } = this.state;
    CallApi(`student/delete/${_id}`, "DELETE", null).then((res) => {
      if (res.status === 200) {
        var index = this.findIndex(_id);
        if (index !== -1) {
          students.splice(index, 1);
          this.setState({
            students: students,
          });
        }
      }
    });
    CallApi(`delete-student-account/${msv}`, "DELETE", null);
  };

  render() {
    var { lop, students } = this.state;
    return (
      <div className='Container'>
        <div className='text_center'>
          <h1 id='qlsv'>Quản lý sinh viên</h1>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          &nbsp;
          <div className='dropdown'>
            <button
              type='button'
              className='btn dropdown-toggle'
              id='dropdownMsv'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='true'>
              Lớp &nbsp; <span className='fa fa-caret-square-o-down'></span>
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
              {lop.map((item) => (
                <li
                  to='/home/list-students'
                  key={item}
                  onClick={() => this.ChooseClass(item)}>
                  <a role='button'>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <label
            style={{
              paddingTop: "8px",
              paddingBottom: "2px",
              marginRight: "10px",
            }}>
            {sessionStorage.getItem("item")}
          </label>
          <Link to='/home/list-students/add' className='btn btn-primary'>
            <span className='fa fa-plus'></span> &nbsp; Thêm sinh viên
          </Link>{" "}
          &nbsp;
          <div className='data'>
            <ExportToExcel apiData={students} fileName={this.state.item} />
          </div>
          &nbsp;
          <Link
            to='/home/list-students/import-data'
            className='btn btn-primary data'>
            <span className='fa fa-file-import'></span>&nbsp; Nhập dữ liệu từ
            Excel
          </Link>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <ListSV students={students} onDelete={this.onDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListStudent;
