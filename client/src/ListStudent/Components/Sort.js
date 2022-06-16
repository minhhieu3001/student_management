/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortby: "msv",
      sortvalue: 1,
    };
  }

  onSort = (sortBy, sortValue) => {
    this.setState(
      {
        sortby: sortBy,
        sortvalue: sortValue,
      },
      () => this.props.onSort(this.state.sortby, this.state.sortvalue)
    );
    //this.props.onSort(sortBy, sortValue);
  };

  render() {
    return (
      <thead>
        <tr>
          <th className="text_center" width="50px">
            <button className="btn text_center">STT</button>
          </th>
          <th className="text_center">
            <div className="dropdown">
              <button
                type="button"
                className="btn dropdown-toggle"
                id="dropdownMsv"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                MSV &nbsp; <span className="fa fa-caret-square-o-down"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick={() => this.onSort("msv", -1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "msv" && this.state.sortvalue === -1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-angle-double-down">
                      {" "}
                      &nbsp; Lớn đến bé
                    </span>
                  </a>
                </li>
                <li onClick={() => this.onSort("msv", 1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "msv" && this.state.sortvalue === 1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-angle-double-up">
                      {" "}
                      &nbsp; Bé đến lớn
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </th>
          <th className="text_center">
            <div className="dropdown">
              <button
                type="button"
                className="btn dropdown-toggle"
                id="dropdownName"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Họ và tên &nbsp;{" "}
                <span className="fa fa-caret-square-o-down"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownName">
                <li onClick={() => this.onSort("name", -1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "name" &&
                      this.state.sortvalue === -1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-sort-alpha-down">
                      {" "}
                      &nbsp; A -&gt; Z
                    </span>
                  </a>
                </li>
                <li onClick={() => this.onSort("name", 1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "name" && this.state.sortvalue === 1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-sort-alpha-up">
                      {" "}
                      &nbsp; Z -&gt; A
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </th>
          <th className="text_center">
            <button className="btn text_center">Ngày sinh</button>
          </th>
          <th className="text_center">
            <button className="btn text_center">Giới tính</button>
          </th>
          <th className="text_center">
            <div className="dropdown">
              <button
                type="button"
                className="btn dropdown-toggle"
                id="dropdownMark"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                GPA &nbsp; <span className="fa fa-caret-square-o-down"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMark">
                <li onClick={() => this.onSort("mark", -1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "mark" &&
                      this.state.sortvalue === -1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-sort-numeric-down-alt">
                      {" "}
                      &nbsp; Cao -&gt; Thấp
                    </span>
                  </a>
                </li>
                <li onClick={() => this.onSort("mark", 1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "mark" && this.state.sortvalue === 1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-sort-numeric-up-alt">
                      {" "}
                      &nbsp; Thấp -&gt; Cao
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </th>
          <th className="text_center">
            <button className="btn text_center">Trạng thái</button>
          </th>
          <th className="text_center">
            <button className="btn text_center">Hành động</button>
          </th>
        </tr>
      </thead>
    );
  }
}

export default Sort;
