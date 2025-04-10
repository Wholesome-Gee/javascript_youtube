const video = document.querySelector('video')
const playBtn = document.getElementById("play")
const muteBtn = document.getElementById("mute")
const time = document.getElementById("time")
const volume = document.getElementById("volume")

function clickPlayBtn (e) {
  video.paused ? video.play() : video.pause()
}
function clickMuteBtn (e) {
  console.log('mute')
}
function pauseVideo (e) {
  playBtn.innerText = 'Play'
  console.log('play');
}
function playVideo (e) {
  playBtn.innerText = 'Pause'
}


playBtn.addEventListener('click', clickPlayBtn )
muteBtn.addEventListener('click', clickMuteBtn )
video.addEventListener('pause', pauseVideo)
video.addEventListener('play', playVideo)