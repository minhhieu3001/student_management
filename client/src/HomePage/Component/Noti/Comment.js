import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Comment_site = styled.div`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(202, 202, 202);
  padding: 1.2rem 2rem;
  box-sizing: border-box;
`;

const Comment_content = styled.p`
  // text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #0c67b3;
  font-size: 1.5rem;
  line-height: 1.6rem;
`;

const Comment_id = styled.p`
  // text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #0c67b3;
  font-size: 1.8rem;
  line-height: 2.1rem;
  font-weight: bold;
`;
const Comment_title = styled.p`
  // text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const Cmt = styled.div`
  background-color: white;
  padding: 1rem 1rem;
  border-radius: 5px;
  transition: 0.3s all ease;
  &:hover {
    box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.2),
      1px 1px 6px 6px rgba(0, 0, 0, 0.19);
  }
`;

const Comment = ({ comments }) => {
  return comments.map((cmt, index) => (
    <Comment_site key={index}>
      <Cmt>
        <Comment_id>{cmt.msv}:</Comment_id>
        <Comment_content>{cmt.cmt}</Comment_content>
      </Cmt>
    </Comment_site>
  ));
};
export default Comment;
