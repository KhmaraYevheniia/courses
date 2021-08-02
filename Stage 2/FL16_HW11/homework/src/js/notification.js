const $alertMessage = document.getElementById('alertMessage');
const $alertMessageText = document.getElementById('alertMessageText');
const notificationDelay = 2000;

export const sendNotification = message => {
    $alertMessage.classList.remove('hidden');
    $alertMessageText.textContent = message;
    setTimeout(() => {
        $alertMessage.classList.add('hidden');
    }, notificationDelay);
}

export { sendNotification as default };
