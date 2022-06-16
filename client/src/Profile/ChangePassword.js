import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../API/CallApi";
import styled from "styled-components";
import { HiKey } from "react-icons/hi";
import { HiOutlineKey } from "react-icons/hi";
import { MdOutlineVerified } from "react-icons/md";

const ChangePassSite = styled.div`
  width: 30%;
  margin: auto;
  text-align: center;
  background-color: rgba(233, 233, 233, 0.986);
  padding: 3rem 0 3rem 0;
  margin-top: 5vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ChangePassTitle = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  color: #2573b3;
`;

const ChangePassForm = styled.form`
  width: 90%;
  margin: auto;
  // background-color: lightgray;
`;

const InforInput = styled.input`
  border: none;
  border-bottom: 2px solid #09599b;
  outline: none;
  background-color: transparent;
`;

const Icon = styled.i`
  border-bottom: 2px solid #09599b;
  padding: 0.4rem 0.4rem 0.2rem 0.3rem;
  box-sizing: border-box;
  color: #09599b;
`;

const Input_container = styled.div`
  display: flex;
  max-width: 53%;
  margin-left: auto;
  margin-right: auto;
  // background-color: whitesmoke;
`;

const Btn = styled.button`
  opacity: 0.8;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
    box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const btnName = styled.span``;
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_pass: "",
      new_pass: "",
      cf_new_pass: "",
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

  onSubmit = () => {
    var { old_pass, new_pass, cf_new_pass } = this.state;
    var username = sessionStorage.getItem("msv");

    if (new_pass !== cf_new_pass) {
      alert("Xác nhận mật khẩu không khớp");
    } else if (old_pass === new_pass) {
      alert("Mật khẩu mới không được trùng mật khẩu cũ");
    } else {
      CallApi("change-password", "PATCH", {
        username,
        old_pass,
        new_pass,
      }).then((res) => {
        alert(res.data.message);
      });
    }
  };
  render() {
    return (
      <ChangePassSite>
        <ChangePassTitle>ĐỔI MẬT KHẨU</ChangePassTitle>
        <ChangePassForm>
          <Input_container>
            <Icon>
              <HiKey></HiKey>
            </Icon>
            <InforInput
              placeholder='Nhập mật khẩu cũ...'
              type='password'
              name='old_pass'
              onChange={this.onChange}
              required
            />
          </Input_container>
          <br />
          <Input_container>
            <Icon>
              <HiOutlineKey></HiOutlineKey>
            </Icon>
            <InforInput
              placeholder='Nhập mật khẩu mới...'
              type='password'
              name='new_pass'
              onChange={this.onChange}
              required
              id='password'
            />
          </Input_container>
          <br />
          <Input_container>
            <Icon>
              <MdOutlineVerified></MdOutlineVerified>
            </Icon>
            <InforInput
              placeholder='Xác nhận mật khẩu mới...'
              type='password'
              name='cf_new_pass'
              onChange={this.onChange}
              id='cf_password'
            />
          </Input_container>
        </ChangePassForm>
        <br />
        <Btn type='submit' className='btn btn-primary' onClick={this.onSubmit}>
          <btnName className='fa fa-save'>&nbsp;</btnName> Ghi nhận
        </Btn>{" "}
        <Link to='/home/profile' className='btn btn-danger'>
          <btnName className='fa fa-close'>&nbsp; Hủy bỏ</btnName>
        </Link>
      </ChangePassSite>
    );
  }
}

export default ChangePassword;
