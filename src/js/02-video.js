import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const timeKey = 'videoplayer-current-time';

const onPlay = function ({ seconds }) {
  localStorage.setItem(timeKey, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem(timeKey));
