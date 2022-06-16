/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import styled from "styled-components";
import CallApi from "../API/CallApi";

//css
const Container = styled.div`
  width: 100%;
`;
const Chart1 = styled.div`
  margin: auto;
  width: 75%;
  padding: 0px;
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 10px;
`;
const Chart2 = styled.div`
  width: 75%;
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 10px;
`;
const Center2 = styled.div`
  max-width: 50%;
  margin: auto;
`;
const Center1 = styled.div`
  max-width: 90%;
  margin: auto;
`;
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      lop: [],
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
    });
  }

  ChooseClass = (item) => {
    sessionStorage.setItem("item", item);
    CallApi(`student/all/${item}`, "GET", null).then((res) => {
      console.log(res.data.ListStudents);
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

  render() {
    //bar-chart
    var data_bar_chart = [
      {
        name: "Nguy cơ nghỉ học",
        Số_SV: 0,
      },
      {
        name: "Cảnh báo học vụ",
        Số_SV: 0,
      },
      {
        name: "Thiếu tín chỉ",
        Số_SV: 0,
      },
      {
        name: "Thiếu học phí",
        Số_SV: 0,
      },
      {
        name: "Không",
        Số_SV: 0,
      },
      {
        name: "Khen thưởng",
        Số_SV: 0,
      },
    ];

    //pie-chart
    var data_pie_chart = [
      { name: "Yếu", value: 0 },
      { name: "Trung bình", value: 0 },
      { name: "Khá", value: 0 },
      { name: "Giỏi", value: 0 },
      { name: "Xuất sắc", value: 0 },
    ];
    var COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#413ea0"];
    var RADIAN = Math.PI / 180;
    var renderCustom = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    var { students, lop } = this.state;
    for (let i = 0; i < students.length; i++) {
      if (students[i].gpa < 2.0) {
        data_pie_chart[0].value += 1;
      }
      if (students[i].gpa >= 2.0 && students[i].gpa < 2.5) {
        data_pie_chart[1].value += 1;
      }
      if (students[i].gpa >= 2.5 && students[i].gpa < 3.2) {
        data_pie_chart[2].value += 1;
      }
      if (students[i].gpa >= 3.2 && students[i].gpa < 3.6) {
        data_pie_chart[3].value += 1;
      }
      if (students[i].gpa >= 3.6 && students[i].gpa <= 4.0) {
        data_pie_chart[4].value += 1;
      }
    }

    for (let i = 0; i < students.length; i++) {
      if (students[i].status === "Nguy cơ nghỉ học") {
        data_bar_chart[0].Số_SV += 1;
      }
      if (students[i].status === "Cảnh báo học vụ") {
        data_bar_chart[1].Số_SV += 1;
      }
      if (students[i].status === "Thiếu tín chỉ") {
        data_bar_chart[2].Số_SV += 1;
      }
      if (students[i].status === "Thiếu học phí") {
        data_bar_chart[3].Số_SV += 1;
      }
      if (students[i].status === "Không") {
        data_bar_chart[4].Số_SV += 1;
      }
      if (students[i].status === "Khen thưởng") {
        data_bar_chart[5].Số_SV += 1;
      }
    }

    return (
      <Container>
        <div className="dropdown">
          <button
            type="button"
            className="btn dropdown-toggle"
            id="dropdownMsv"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Chọn lớp &nbsp; <span className="fa fa-caret-square-o-down"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            {lop.map((item) => (
              <li
                to="/home/list-students"
                key={item}
                onClick={() => this.ChooseClass(item)}
              >
                <a role="button">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <label
          style={{
            padding: "5px",
          }}
        >
          {sessionStorage.getItem("item")}
        </label>
        <br /> <br />
        <Chart2>
          <h3 style={{ textAlign: "center" }}>
            BIỂU ĐỒ THỐNG KÊ GPA SINH VIÊN
          </h3>
          <Center2>
            <PieChart width={500} height={450}>
              <Pie
                data={data_pie_chart}
                isAnimationActive={true}
                cx="50%"
                cy="50%"
                label={renderCustom}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data_pie_chart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>{" "}
          </Center2>
        </Chart2>
        <Chart1>
          <h3 style={{ textAlign: "center" }}>
            BIỂU ĐỒ THỐNG KÊ TRẠNG THÁI SINH VIÊN
          </h3>
          <Center1>
            <ComposedChart width={900} height={500} data={data_bar_chart}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Số_SV" barSize={50} fill="#413ea0" />
              <Line type="monotone" dataKey="Số_SV" stroke="#ff7300" />
            </ComposedChart>
          </Center1>
        </Chart1>
      </Container>
    );
  }
}

export default Chart;
