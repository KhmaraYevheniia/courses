import '../scss/main.scss';
import '../scss/tweets-list.scss';
import sendNotification from './notification';
import drawTweetsList from './tweets-list';

const $cancelBtn = document.getElementById('cancelBtn');
const $saveBtn = document.getElementById('saveBtn');
const $goToLikedBtn = document.getElementById('likedTweetBtn');
const $backBtn = document.getElementById('backBtn');
const $addTweetBtn = document.getElementById('addTweetBtn');
const $tweetContainer = document.getElementById('tweetContainer');
const $editTweetContainer = document.getElementById('editTweetContainer');
const $editTweetHeader = document.getElementById('editTweetHeader');
const $editTweetInput = document.getElementById('editTweetInput');
const $mainHeader = document.getElementById('mainHeader');

locationResolver();

window.addEventListener('popstate', () => {
    locationResolver();
});

$goToLikedBtn.addEventListener('click', () => {
    window.location.href = '#/liked';
})

$backBtn.addEventListener('click', () => {
    window.location.href = '';
})

$addTweetBtn.addEventListener('click', () => {
    window.location.href = '#/add';
})

$cancelBtn.addEventListener('click', () => {
    window.location.href = '';
})

$saveBtn.addEventListener('click', () => {
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    const existingTweet = tweets.find(tweet => tweet.message.toLowerCase() === $editTweetInput.value.toLowerCase());

    if (existingTweet || !$editTweetInput.value) {
        return sendNotification('Error! You can\'t tweet about that');
    }

    if (window.location.href.includes('#/add')) {
        let counter = +localStorage.getItem('counter') || 1;
        const newTweet = {
            id: counter++,
            message: $editTweetInput.value,
            isLiked: false
        };
        tweets.push(newTweet);
        localStorage.setItem('counter', JSON.stringify(counter));
    } else {
        let tweetEditId = +window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
        const findedEditTweet = tweets.find(tweet => tweet.id === tweetEditId);
        findedEditTweet.message = $editTweetInput.value;
    }

    localStorage.setItem('tweets', JSON.stringify(tweets));
    window.location.href = '';
})

function locationResolver() {
    const location = window.location.hash;

    if (location.includes('#/edit')) {
        const id = +location.slice(location.lastIndexOf('/') + 1);
        displayEditPage(id)
    } else if (location === '#/add') {
        $editTweetContainer.classList.remove('hidden');
        $tweetContainer.classList.add('hidden');
        $editTweetHeader.innerHTML = 'Add tweet';
        $editTweetInput.value = '';
    } else if (location === '') {
        const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        const isAnyLiked = tweets.some(tweet => tweet.isLiked);
        isAnyLiked ? $goToLikedBtn.classList.remove('hidden') : $goToLikedBtn.classList.add('hidden');
        drawTweetsList(tweets);
        $backBtn.classList.add('hidden');
        $addTweetBtn.classList.remove('hidden');
    } else if (location === '#/liked') {
        const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        const likedTweets = tweets.filter(tweet => tweet.isLiked);
        $mainHeader.textContent = 'Liked tweets';
        $addTweetBtn.classList.add('hidden');
        $goToLikedBtn.classList.add('hidden');
        $backBtn.classList.remove('hidden');
        drawTweetsList(likedTweets);
    }
}

function displayEditPage(tweetId) {
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    const findedTweetMessage = tweets.find(tweet => tweet.id === tweetId);
    $editTweetInput.value = findedTweetMessage.message;

    $tweetContainer.classList.add('hidden');
    $editTweetContainer.classList.remove('hidden');
    $editTweetHeader.innerHTML = 'Edit tweet';
    console.log('findedTweetMessage', findedTweetMessage);
}