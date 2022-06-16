/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./NavBar.css";
import "boxicons";
import { AiOutlineHome } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "../router";
import { Redirect } from "react-router";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      openNav: false,
      chooseHome: true,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    };
  }

  componentDidMount() {
    this.setState({
      role: sessionStorage.getItem("role"),
    });
  }

  open = () => {
    this.setState({
      openNav: !this.state.openNav,
    });
  };

  chooseHome = () => {
    this.setState({
      chooseHome: true,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseNoti = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: true,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseChat = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: true,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseList = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseList: true,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseChart = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: true,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseProfile = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: true,
    });
  };

  chooseLogout = () => {
    // this.setState({
    //   chooseHome: false,
    //   chooseNoti: false,
    //   chooseChat: false,
    //   chooseList: false,
    //   chooseChart: false,
    //   chooseInfoTeacher: false,
    //   chooseProfile: false,
    // });
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("msv");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("lop");
    sessionStorage.removeItem("item");
  };

  chooseInfoTeacher = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: true,
      chooseProfile: false,
    });
  };

  render() {
    if (localStorage.getItem("accessToken") == null) {
      return <Redirect to='/login' />;
    }
    var {
      role,
      openNav,
      chooseHome,
      chooseNoti,
      chooseChat,
      chooseList,
      chooseChart,
      chooseInfoTeacher,
      chooseProfile,
    } = this.state;
    return (
      <Router>
        <section className='body'>
          <div className={openNav ? "sidebar open" : "sidebar"}>
            <div className='logo-details'>
              {/* cai 3 gach */}
              <div className='logo_name'>MENU</div>
              <div id='btn' onClick={this.open}>
                <box-icon name='menu' color='#ffffff'></box-icon>
              </div>
            </div>
            <ul className='nav-list'>
              <li
                className={chooseHome ? "home" : ""}
                onClick={this.chooseHome}>
                <Link to='/home'>
                  <div className='icon'>
                    <AiOutlineHome />
                  </div>
                  <span className='links_name'>Trang chủ</span>
                </Link>
                <span className='tooltip'>Trang chủ</span>
              </li>

              <li
                className={chooseNoti ? "home" : ""}
                onClick={this.chooseNoti}>
                <Link to='/home/notification'>
                  {/* thong bao */}
                  <div className='icon'>
                    <IoMdNotificationsOutline />
                  </div>
                  <span className='links_name'>Thông Báo</span>
                </Link>
                <span className='tooltip'>Thông Báo</span>
              </li>
              <li
                className={chooseChat ? "home" : ""}
                onClick={this.chooseChat}>
                <Link to='/home/chat'>
                  <div className='icon'>
                    <span className='fa fa-comment-dots'></span>
                  </div>
                  <span className='links_name'>Chat</span>

                  <span className='tooltip'>Chat</span>
                </Link>
              </li>
              <li
                id='bangdiem'
                className={
                  (chooseList ? "home" : "") +
                  (role === "student" ? "student" : "")
                }
                onClick={this.chooseList}>
                <Link to='/home/list-students'>
                  {/* danh sach sinh vien */}
                  <div className='icon'>
                    <BsClipboardData />
                  </div>
                  <span className='links_name'>DS Sinh viên</span>
                </Link>
                <span className='tooltip'>DS Sinh viên</span>
              </li>
              <li
                className='chart'
                className={
                  (chooseChart ? "home" : "") +
                  (role === "student" ? "student" : "")
                }
                onClick={this.chooseChart}>
                <Link to='/home/chart'>
                  <div className='icon'>
                    <span className='fa fa-chart-bar'></span>
                  </div>
                  <span className='links_name'>Biểu đồ điểm</span>
                </Link>
                <span className='tooltip'>Biểu đồ điểm</span>
              </li>
              <li
                className='profile'
                className={
                  (chooseProfile ? "home" : "") +
                  (role === "student" ? "" : "student")
                }
                onClick={this.chooseProfile}>
                <Link to='/home/profile'>
                  <div className='icon'>
                    <span className='fa fa-id-card'></span>{" "}
                  </div>
                  <span className='links_name'>Hồ sơ</span>

                  <span className='tooltip'>Hồ sơ</span>
                </Link>
              </li>
              <li className='logout' onClick={this.chooseLogout}>
                <a href='/'>
                  {/* Log out */}
                  <div className='icon'>
                    <BiLogOut />
                  </div>
                  <span className='links_name'>Đăng Xuất</span>
                </a>
                <span className='tooltip'>Đăng Xuất</span>
              </li>
            </ul>
          </div>
          <div className={openNav ? "nav_open" : "nav_close"}>
            <div>{this.show(routes)}</div>
          </div>
        </section>
      </Router>
    );
  }

  show = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default NavBar;
