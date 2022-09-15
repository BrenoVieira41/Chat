const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const userName = urlSearch.get("username");
const room = urlSearch.get("select_room");

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${userName} - você está na sala (${room})`;

socket.emit('selected_room', {
  userName,
  room
}, messages => {
  messages.forEach(message => createMessage(message));
});

document.getElementById("message_input").addEventListener('keypress', event => {
  if(event.key === 'Enter') {
    const message = event.target.value;

    const data = {
      room,
      message,
      userName
    }

    socket.emit('message', data);

    event.target.value = "";
  }
});

socket.on('message', data => {
  createMessage(data);
});

document.getElementById('logout').addEventListener('click', (event) => {
  window.location.href = 'index.html'
})

function createMessage(data) {
  const messageDiv = document.getElementById('messages');

  messageDiv.innerHTML += `
  <div class="new_message">
  <label class="form-label">
    <strong>${data.userName} </strong> <span> ${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
  </label>
  </div>
  `;
}
