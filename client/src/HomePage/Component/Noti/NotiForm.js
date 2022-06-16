/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form``;

const Add_site = styled.div`
  width: 70%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: flex;
`;
const Upd_site = styled.div`
  width: 70%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 2rem;
  display: flex;
`;
const Noti_add = styled.textarea`
  border: 1px solid #0b5592;
  min-height: 6.5rem;
  box-sizing: border-box;
  width: 85%;
  resize: none;
  border-radius: 10px 0 0 10px;
  padding: 1rem 1rem;
  &:focus {
    outline: none;
  }
`;

const Add_btn = styled.button`
  width: 15%;
  background-color: #117ed8;
  border: none;
  color: white;
  border-radius: 0 10px 10px 0;
  transition: all 0.3s ease;
  &:hover {
    background-color: #0f5fa0;
  }
`;

const Noti_update = styled.textarea`
  border: 1px solid #0b5592;
  min-height: 6.5rem;
  box-sizing: border-box;
  width: 85%;
  resize: none;
  border-radius: 10px 0 0 10px;
  padding: 1rem 1rem;
  &:focus {
    outline: none;
  }
`;

const Upd_btn = styled.button`
  width: 15%;
  background-color: #117ed8;
  border: none;
  color: white;
  border-radius: 0 10px 10px 0;
  transition: all 0.3s ease;
  &:hover {
    background-color: #0f5fa0;
  }
`;

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!props.edit) {
    const id = Math.floor(Math.random() * 10000);
    axios.post("http://localhost:5000/post/create", {
      id: id,
      content: input,
      lop: sessionStorage.getItem("item"),
    });

    props.onSubmit({
      id: id,
      content: input,
      comment: [],
    });
    // } else {
    //   axios.patch(`http://localhost:5000/post/update/${props.edit.id}`, {
    //     content: input,
    //   });
    //   const cmt = [];
    //   console.log(props.todos[0].id, ",", props.edit.id);
    //   for (let i = 0; i < props.todos.length; i++) {
    //     if (props.todos[i].id === props.edit.id) {
    //       cmt.push(props.todos.comment);
    //     }
    //   }
    //   props.onSubmit({
    //     id: props.edit.id,
    //     content: input,
    //     comment: cmt,
    //   });
    // }
    setInput("");
  };

  return (
    <Form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <Upd_site>
            <Noti_update
              placeholder='Cập nhật thông báo ...'
              value={input}
              onChange={handleChange}
              name='content'
              ref={inputRef}
              className='todo-input edit'
            />
            <Upd_btn onClick={handleSubmit} className='todo-button edit'>
              Cập nhật
            </Upd_btn>
          </Upd_site>
        </>
      ) : (
        <>
          <Add_site>
            <Noti_add
              placeholder='Thêm thông báo ...'
              value={input}
              onChange={handleChange}
              name='content'
              className='todo-input'
              ref={inputRef}
            />
            <Add_btn onClick={handleSubmit} className='todo-button'>
              Thêm
            </Add_btn>
          </Add_site>
        </>
      )}
    </Form>
  );
}

export default TodoForm;
