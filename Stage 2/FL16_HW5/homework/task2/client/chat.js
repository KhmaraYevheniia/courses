const message = document.getElementById('input-message');
const sendBtn = document.getElementById('send-btn');
const windowChat = document.getElementsByClassName('widow-chat')[0];
const userName = prompt('What is your name?');
const ws = new WebSocket('ws://localhost:8080');

sendBtn.addEventListener('click', () => {
    const messageData = {
        name: userName,
        message: message.value,
        time: new Date().toLocaleTimeString()
    }
    windowChat.insertAdjacentHTML('beforeend', `
    <div class="my-message">
        <span class="user-name">${messageData.name}</span>
        <div class="user-message">${messageData.message}</div>
        <span class="message-time">${messageData.time}</span>
    </div>
    `)
    ws.send(JSON.stringify(messageData))
    message.value = '';
})

function printMessage(value) {
    console.log('value', value);
    const parsedValue = JSON.parse(value);
    windowChat.insertAdjacentHTML('beforeend', `
    <div class="style-message">
        <span class="user-name">${parsedValue.name}</span>
        <div class="user-message">${parsedValue.message}</div>
        <span class="message-time">${parsedValue.time}</span>
    </div>
    `)
}

ws.onmessage = response => printMessage(response.data);
