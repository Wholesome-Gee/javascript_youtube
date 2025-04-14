// watch.pug에서 html 구조를 참고할 것
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const video = document.querySelector('video')
const playBtn = document.getElementById("play")
const muteBtn = document.getElementById("mute")
const volume = document.getElementById("volume")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")
const timeline = document.getElementById("timeline")
const fullScreenBtn = document.getElementById("fullScreen");

let timerRemoveShowing = null;
let timerStopMouseMovingOnVideo = null;
let volumeValue = 0.5
video.volume = volumeValue

function clickPlayBtn() {
  video.paused ? video.play() : video.pause()
  playBtn.innerText = video.paused ? "Play" : "Pause" 
}
function clickMuteBtn() {
  video.muted ? video.muted=false : video.muted=true
  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute'
  volume.value = video.muted ? 0 : volumeValue
}
function pauseVideo() {
  playBtn.innerText = 'Play'
}
function playVideo() {
  playBtn.innerText = 'Pause'
}
function changeVolume(e) {
  if(video.muted) {
    video.muted = false
    muteBtn.innerText = 'Mute'
  } else if(e.target.value==='0') {
    muteBtn.innerText = 'Unmute'
    video.muted = true
  } else {
    muteBtn.innerText = 'Mute'
    video.muted = false
  } 
  volumeValue = e.target.value
  video.volume = volumeValue
}
function formatTime(second) {
  return new Date(second*1000).toISOString().substring(11,19) // #11.5
}
function loadedmetadataVideo() {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration)
}
function timeUpdateVideo() {
  currentTime.innerText = formatTime(Math.floor(video.currentTime))
}
function changeTimeline(e) {
  video.currentTime = e.target.value
}
function handleFullscreen() {
  const fullscreen = document.fullscreenElement; // #11.7
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};
/*
61. document.fullscreenElement는 문서상에 전체화면 된 태그를 리턴해준다.
63. 전체화면을 나가는 메서드
67. DOM요소(노드).requestFullscreen()은 해당 DOM요소(노드)를 전체화면으로 만들어준다.
*/
function removeShowing() {
  videoControls.classList.remove("showing");
}
function mouseMoveOnVideo() {
  if (timerRemoveShowing) {
    clearTimeout(timerRemoveShowing)
    timerRemoveShowing = null
  }
  if (timerStopMouseMovingOnVideo) {
    clearTimeout(timerStopMouseMovingOnVideo)
    timerStopMouseMovingOnVideo = null
  }
  videoControls.classList.add("showing");
  timerStopMouseMovingOnVideo = setTimeout(removeShowing, 3000);
};
function mouseLeaveOnVideo() {
  timerRemoveShowing = setTimeout(removeShowing, 3000);
};
const endedVideo = () => {      // #11.1
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};
/*
94. dataset은 html 태그에 정의된 data-xxx속성들을 불러온다.
*/

playBtn.addEventListener('click', clickPlayBtn)
muteBtn.addEventListener('click', clickMuteBtn)
video.addEventListener('pause', pauseVideo) 
video.addEventListener('play', playVideo)
video.addEventListener('loadedmetadata', loadedmetadataVideo)
video.addEventListener('timeupdate', timeUpdateVideo)
timeline.addEventListener('input', changeTimeline)
volume.addEventListener('input', changeVolume)
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("mousemove", mouseMoveOnVideo);
video.addEventListener("mouseleave", mouseLeaveOnVideo);
video.addEventListener("ended", endedVideo);
/*
93. loadedmetadata는 HTMLMediaElement의 이벤트 중 하나로, 비디오/오디오 파일이 로드 된 후에 콜백함수가 실행된다.

@ video태그는 HTMLVideoElement를 상속받고 HTMLVideoElement는 HTMLMediaElement를 상속받는다.
  video.muted / video.paused / video.volume / video.duration 등은 HTMLMediaElement에서 확인 가능하다. (https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)
*/