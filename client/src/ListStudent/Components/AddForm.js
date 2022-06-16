import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import axios from "axios";
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msv: "",
      name: "",
      birthday: "",
      gender: "",
      phone: "",
      address: "",
      sum_of_credits: 0,
      gpa: 0,
      status: "",
      lop: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    CallApi("student/create", "POST", {
      msv: this.state.msv,
      name: this.state.name,
      birthday: this.state.birthday,
      gender: this.state.gender,
      phone: this.state.phone,
      address: this.state.address,
      sum_of_credits: this.state.sum_of_credits,
      gpa: this.state.gpa,
      status: this.state.status,
      lop: this.state.lop,
    });
    CallApi("create-student-account", "POST", {
      username: this.state.msv,
      password: this.state.msv,
      lop: this.state.lop,
    });

    const headers = {
      "PRIVATE-KEY": "14bf1d3f-a86c-4b1b-ad74-9675722ee4f8",
    };

    axios.post(
      "https://api.chatengine.io/users/",
      {
        username: this.state.msv.toString(),
        secret: this.state.msv.toString(),
      },
      {
        headers: headers,
      }
    );

    this.setState({
      msv: "",
      name: "",
      birthday: "",
      gender: "",
      phone: "",
      address: "",
      sum_of_credits: "",
      gpa: "",
      status: "",
      lop: "",
    });
    alert("Đã thêm thành công");
  };

  render() {
    return (
      <div className="addForm">
        <div className="back">
          <Link to="/home/list-students" className="btn btn-danger">
            <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
          </Link>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Thêm sinh viên</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>MSV: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="msv"
                    value={this.state.msv}
                    onChange={this.onChange}
                  />
                  <label>Họ và tên: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <label>Ngày sinh: </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChange}
                  />
                  <label>Giới tính:</label>
                  <select
                    className="form-control"
                    name="gender"
                    required
                    value={this.state.gender}
                    onChange={this.onChange}
                  >
                    <option>--Select--</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  <label>Địa chỉ: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  <label>Tổng số tín chỉ: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="sum_of_credits"
                    value={this.state.sum_of_credits}
                    onChange={this.onChange}
                  />
                  <label>GPA: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="gpa"
                    value={this.state.gpa}
                    onChange={this.onChange}
                  />
                  <label>Trạng thái: </label>
                  <select
                    className="form-control"
                    required
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option>--Select--</option>
                    <option value="Không">Không </option>
                    <option value="Nguy cơ nghỉ học">Nguy cơ nghỉ học</option>
                    <option value="Cảnh báo học vụ">Cảnh báo học vụ</option>
                    <option value="Thiếu tín chỉ">Thiếu tín chỉ</option>
                    <option value="Thiếu học phí">Thiếu học phí</option>
                    <option value="Khen thưởng">Khen thưởng</option>
                  </select>{" "}
                  <label>Lớp:</label>
                  <input
                    placeholder="vd: K64-CA-CLC-4"
                    type="text"
                    className="form-control"
                    required
                    name="lop"
                    value={this.state.lop}
                    onChange={this.onChange}
                  />
                  <br />
                  <div className="text_center">
                    <button
                      type="submit"
                      className="button submit btn btn-primary"
                      onClick={this.onSubmit}
                    >
                      <span className="fa fa-plus"></span> &nbsp;Lưu lại
                    </button>{" "}
                    &nbsp;
                    <Link
                      to="/home/list-students"
                      className="button cancle btn btn-primary"
                    >
                      <span className="fa fa-close"></span> &nbsp;Hủy bỏ
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddForm;
