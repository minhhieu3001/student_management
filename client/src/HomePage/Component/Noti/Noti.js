/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import NotiForm from "./NotiForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { FaReplyAll } from "react-icons/fa";

const Noti_element = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  background-color: #0c67b3;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  margin-top: 10px;
  min-height: 8rem;
  box-sizing: border-box;
  border-radius: 20px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #0b5592;
    cursor: pointer;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2),
      6px 6px 20px 0px rgba(0, 0, 0, 0.19);
  }
`;
const Noti_content = styled.div`
  width: 90%;
  color: white;
`;
const Noti_icon = styled.div`
  width: 8rem;
  height: 2rem;
  margin-top: auto;
  margin-bottom: auto;
  float: right;
`;
const Noti_reply = styled.div`
  width: 75%;
  display: flex;
  // background-color: blue;
  margin-right: auto;
  margin-left: auto;
`;
const Reply_content = styled.textarea`
  width: 85%;
  // height: 5rem;
  max-height: 5rem;
  resize: none;
  border: none;
  padding: 0.5rem 0.5rem;
  border-radius: 0 0 0 5px;
  &:focus {
    outline: none;
  }
`;
const SendRep_btn = styled.button`
  opacity: 0.9;
  width: 15%;
  border: none;
  background-color: rgb(22, 82, 150);
  color: white;
  transition: all 0.3s ease;
  border-radius: 0 0 5px 0;
  &:hover {
    cursor: pointer;
    opacity: 1;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2),
      6px 6px 20px 0px rgba(0, 0, 0, 0.19);
  }
`;

const Todo = ({ role, todos, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [comment, setComment] = useState();
  const [cmt, setCmt] = useState("");

  useEffect(() => {
    setComment(false);
  }, []);

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };
  const [showReply, setShow] = useState(false);

  const handleChange = (e) => {
    setCmt(e.target.value);
  };

  const handleSubmit = (id) => {
    console.log(id);
    axios.patch(`http://localhost:5000/post/comment/${id}`, {
      msv: sessionStorage.getItem("msv"),
      cmt: cmt,
    });
    const newCmt = { msv: sessionStorage.getItem("msv"), cmt: cmt };
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos[i].comment.push(newCmt);
      }
    }
    setCmt("");
    document.getElementById("input_cmt").value = "";
  };

  if (edit.id) {
    return <NotiForm todos={todos} edit={edit} onSubmit={submitUpdate} />;
  }
  if (role !== "student") {
    if (comment) {
      return todos.map((todo, index) => (
        <div>
          <Noti_element className='todo-row' key={index}>
            <Noti_content key={todo.id}>{todo.content}</Noti_content>
            <Noti_icon className='icons'>
              {/* <TiEdit
                style={{ width: "2rem", height: "2rem", color: "white" }}
                onClick={() => setEdit({ id: todo.id, value: todo.content })}
                className="edit-icon"
              /> */}
              <FaReplyAll
                className='fas fa-reply'
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "white",
                  marginLeft: "0.5rem",
                }}
                onClick={() => setComment(!comment)}></FaReplyAll>
              <RiCloseCircleLine
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "white",
                  marginLeft: "0.5rem",
                }}
                onClick={() => removeTodo(todo.id)}
                className='delete-icon'
              />
            </Noti_icon>
          </Noti_element>
          <Comment comments={todo.comment} />
          <Noti_reply>
            <Reply_content
              id='input_cmt'
              placeholder='Thêm phản hồi cho thông báo trên ...'
              onChange={handleChange}></Reply_content>
            <SendRep_btn onClick={() => handleSubmit(todo.id)}>GỬI</SendRep_btn>
          </Noti_reply>
        </div>
      ));
    } else {
      return todos.map((todo, index) => (
        <div>
          <Noti_element className='todo-row' key={index}>
            <Noti_content key={todo.id}>{todo.content}</Noti_content>
            <Noti_icon className='icons'>
              {/* <TiEdit
                style={{ width: "2rem", height: "2rem", color: "white" }}
                onClick={() => setEdit({ id: todo.id, value: todo.content })}
                className="edit-icon"
              /> */}
              <FaReplyAll
                className='fas fa-reply'
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "white",
                  marginLeft: "0.5rem",
                }}
                onClick={() => setComment(!comment)}></FaReplyAll>
              <RiCloseCircleLine
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "white",
                  marginLeft: "0.5rem",
                }}
                onClick={() => removeTodo(todo.id)}
                className='delete-icon'
              />
            </Noti_icon>
          </Noti_element>
        </div>
      ));
    }
  } else {
    if (comment === false) {
      return todos.map((todo, index) => (
        <div>
          <Noti_element className='todo-row' key={index}>
            <Noti_content key={todo.id}>{todo.content}</Noti_content>
            <Noti_icon>
              <FaReplyAll
                className='fas fa-reply'
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "white",
                  marginLeft: "2rem",
                }}
                onClick={() => setComment(!comment)}></FaReplyAll>{" "}
            </Noti_icon>
          </Noti_element>
          <Noti_reply></Noti_reply>
        </div>
      ));
    } else {
      return todos.map((todo, index) => (
        <div>
          <Noti_element className='todo-row' key={index}>
            <Noti_content key={todo.id}>{todo.content}</Noti_content>
            <Noti_icon>
              <FaReplyAll
                className='fas fa-reply'
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "white",
                  marginLeft: "2rem",
                }}
                onClick={() => setComment(!comment)}></FaReplyAll>{" "}
            </Noti_icon>
          </Noti_element>
          <Comment comments={todo.comment} />
          <Noti_reply>
            <Reply_content
              id='input_cmt'
              placeholder='Thêm phản hồi cho thông báo trên ...'
              onChange={handleChange}></Reply_content>
            <SendRep_btn onClick={() => handleSubmit(todo.id)}>GỬI</SendRep_btn>
          </Noti_reply>
        </div>
      ));
    }
  }
};

export default Todo;
