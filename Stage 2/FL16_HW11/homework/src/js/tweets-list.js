import { sendNotification } from './notification';

const $list = document.getElementById('list');
const $goToLikedBtn = document.getElementById('likedTweetBtn');

export const drawTweetsList = tweetsList => {
    $list.innerHTML = '';
    tweetsList.forEach(tweet => {
        $list.insertAdjacentHTML('beforeend', `
            <li data-tweet-id="${tweet.id}" class="tweet-item ${tweet.isLiked ? 'liked-tweet' : null}">
                ${tweet.message}
                <div class="btns-tweet-item">
                    <button type="submit" 
                            data-like-tweet-id="${tweet.id}"
                            class="btn btn-liked-tweet">
                        ${tweet.isLiked ? 'unlike' : 'like'}
                    </button>
                    <button 
                        type="submit" 
                        data-remove-tweet-id="${tweet.id}" 
                        class="btn btn-remove-tweet">
                        delete
                    </button>
                </div>
            </li>
        `)
    });
}

$list.addEventListener('click', (e) => {
    const tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    const editTweetId = +e.target.dataset.tweetId;
    const likeTweeteId = +e.target.dataset.likeTweetId;
    const removeTweetId = +e.target.dataset.removeTweetId;

    if (editTweetId) {
        window.location.href = `#/edit/${editTweetId}`;
        return;
    }

    if (removeTweetId) {
        const filteredTweets = tweets.filter(tweet => tweet.id !== removeTweetId);
        localStorage.setItem('tweets', JSON.stringify(filteredTweets));

        if (window.location.hash === '') {
            return drawTweetsList(filteredTweets);
        } else {
            const likedTweets = filteredTweets.filter(tweet => tweet.isLiked);
            return drawTweetsList(likedTweets);
        }
    }

    if (likeTweeteId) {

        const findedTweet = tweets.find(tweet => tweet.id === likeTweeteId);
        if (!findedTweet) {
            return
        }

        findedTweet.isLiked = !findedTweet.isLiked;
        tweets.isLiked
            ? sendNotification(`Hooray! You liked tweet with id ${findedTweet.id}`)
            : sendNotification(`Sorry you no longer like tweet with id ${findedTweet.id} !!`);
        localStorage.setItem('tweets', JSON.stringify(tweets));
        if (window.location.hash === '') {
            const isAnyLiked = tweets.some(tweet => tweet.isLiked);
            isAnyLiked ? $goToLikedBtn.classList.remove('hidden') : $goToLikedBtn.classList.add('hidden')
            return drawTweetsList(tweets);
        } else {
            const likedTweets = tweets.filter(tweet => tweet.isLiked);
            return drawTweetsList(likedTweets);
        }
    }
})

export { drawTweetsList as default };