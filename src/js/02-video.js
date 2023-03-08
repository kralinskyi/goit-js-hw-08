import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const TIME_KEY = 'videoplayer-current-time';

const onPlay = ({ seconds }) => {
  localStorage.setItem(TIME_KEY, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.on('play', () => {
  player.setVolume(0.5);
});

player.setCurrentTime(localStorage.getItem(TIME_KEY));
