const socket = io();

const sendBtn = document.querySelector(".container__body__type--icon");
const input = document.querySelector(".container__body__type--input");
const name = document.querySelector(".container__head__start--title");

let myName = name.value;
if (myName === "") {
  myName = "Anonymous";
}
name.addEventListener("change", () => {
  myName = name.value;
});

// console.log(socket);
sendBtn.addEventListener("click", () => {
  socket.emit("Hello", "Hello from client");

  const message = input.value;
  const time = new Date().toLocaleTimeString();
  const senderName = myName;

  const data = {
    message,
    time,
    senderName,
  };
  const html = `<div class="container__body__chats__chatlist__chat sender">
  <p class="container__body__chats__chatlist__chat--text">
        ${message}
        </p>
        <div class="container__body__chats__chatlist__chat--details">
        <p class="container__body__chats__chatlist__chat--details--sender"> 
        You
        </p>
        <p class="container__body__chats__chatlist__chat--details--time">
        ${time}
        </p>
        </div>
        </div>`;
  document
    .querySelector(".container__body__chats__chatlist")
    .insertAdjacentHTML("beforeend", html);
  socket.emit("message", data);
  input.value = "";
});

// socket.on("users", (data) => {
//   document.getElementById("users").innerHTML = data;
// });

socket.on("message", (data) => {
  console.log(data);
  const html = `<div class="container__body__chats__chatlist__chat received">
    <p class="container__body__chats__chatlist__chat--text">
      ${data.message}
    </p>
    <div class="container__body__chats__chatlist__chat--details">
      <p
        class="container__body__chats__chatlist__chat--details--sender"
      >
        ${data.senderName}
      </p>
      <p
        class="container__body__chats__chatlist__chat--details--time"
      >
        ${data.time}
      </p>
    </div>
  </div>`;
  document
    .querySelector(".container__body__chats__chatlist")
    .insertAdjacentHTML("beforeend", html);
});
