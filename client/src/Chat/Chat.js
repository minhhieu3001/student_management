// import React from "react";
// import { db } from "./Firebase.js";
// import moment from "moment";

// // export const Chat = () => {
//   // var Message = ``;
//   // var savedMessage = true;
//   const username = sessionStorage.getItem("msv");
//   // var showChat = document.getElementById("messages");
//   const sendMessage = async (e) => {
//     e.preventDefault();
//     // get values to be submitted
//     const timestamp = Date.now();
//     const messageInput = document.getElementById("message-input");
//     const message = messageInput.value;
//     console.log(message);

//     // clear the input box
//     messageInput.value = "";

//     //auto scroll to bottom
//     document
//       .getElementById("messages")
//       .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

//     // create db collection and send in the data
//     await db.ref("messages/" + timestamp).set({
//       username,
//       message,
//       timestamp,
//     });

//     // savedMessage = true;
//   };
//   var message = "";
//   // const displayChat = () => {
//   const fetchChat = db.ref("messages/");
//   // check for new messages using the onChildAdded event listener
//   fetchChat.on("child_added", function (snapshot) {
//     const messages = snapshot.val();
//     message += `<li class=${
//       username === messages.username ? "sent" : "receive"
//     }><span>${messages.username}:${moment(
//       messages.timestamp
//     ).calendar()}: </span>${messages.message}</li>`;

//     // if (savedMessage) {
//     //   document.getElementById("messages").append(message);
//     // }
//     var messageElement = document.createElement("div");
//     messageElement.innerText = message;
//     document.getElementById("messages").append(messageElement);
//   });
//   // };
//   return (
//     <div id="chat">
//       <ul id="messages"></ul>
//       <form id="message-form" onSubmit={(e) => sendMessage(e)}>
//         <input id="message-input" type="text" />
//         <button id="message-btn" type="submit">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };
import React from "react";
import { ChatEngine } from "react-chat-engine";
import { PeopleSettings } from "react-chat-engine";
export const Chat = () => {
  const username = sessionStorage.getItem("msv");
  return (
    <div style={{ overflow: "hidden" }}>
      <ChatEngine
        height="100vh"
        projectID="458c42a0-f2ff-4ffa-bafa-b0f1066903ee"
        userName={username}
        userSecret={username}

        // onNewMessage={() =>
        //   new Audio(
        //     "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
        //   ).play()
        // }
      />
    </div>
  );
};
