/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("// watch.pug에서 html 구조를 참고할 것\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst videoControls = document.getElementById(\"videoControls\");\nconst video = document.querySelector('video');\nconst playBtn = document.getElementById(\"play\");\nconst muteBtn = document.getElementById(\"mute\");\nconst volume = document.getElementById(\"volume\");\nconst currentTime = document.getElementById(\"currentTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst timeline = document.getElementById(\"timeline\");\nconst fullScreenBtn = document.getElementById(\"fullScreen\");\nlet timerRemoveShowing = null;\nlet timerStopMouseMovingOnVideo = null;\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\nfunction clickPlayBtn() {\n  video.paused ? video.play() : video.pause();\n  playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\n}\nfunction clickMuteBtn() {\n  video.muted ? video.muted = false : video.muted = true;\n  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';\n  volume.value = video.muted ? 0 : volumeValue;\n}\nfunction pauseVideo() {\n  playBtn.innerText = 'Play';\n}\nfunction playVideo() {\n  playBtn.innerText = 'Pause';\n}\nfunction changeVolume(e) {\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = 'Mute';\n  } else if (e.target.value === '0') {\n    muteBtn.innerText = 'Unmute';\n    video.muted = true;\n  } else {\n    muteBtn.innerText = 'Mute';\n    video.muted = false;\n  }\n  volumeValue = e.target.value;\n  video.volume = volumeValue;\n}\nfunction formatTime(second) {\n  return new Date(second * 1000).toISOString().substring(11, 19); // #11.5\n}\nfunction loadedmetadataVideo() {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n}\nfunction timeUpdateVideo() {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n}\nfunction changeTimeline(e) {\n  video.currentTime = e.target.value;\n}\nfunction handleFullscreen() {\n  const fullscreen = document.fullscreenElement; // #11.7\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenBtn.innerText = \"Enter Full Screen\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenBtn.innerText = \"Exit Full Screen\";\n  }\n}\n;\n/*\r\n61. document.fullscreenElement는 문서상에 전체화면 된 태그를 리턴해준다.\r\n63. 전체화면을 나가는 메서드\r\n67. DOM요소(노드).requestFullscreen()은 해당 DOM요소(노드)를 전체화면으로 만들어준다.\r\n*/\nfunction removeShowing() {\n  videoControls.classList.remove(\"showing\");\n}\nfunction mouseMoveOnVideo() {\n  if (timerRemoveShowing) {\n    clearTimeout(timerRemoveShowing);\n    timerRemoveShowing = null;\n  }\n  if (timerStopMouseMovingOnVideo) {\n    clearTimeout(timerStopMouseMovingOnVideo);\n    timerStopMouseMovingOnVideo = null;\n  }\n  videoControls.classList.add(\"showing\");\n  timerStopMouseMovingOnVideo = setTimeout(removeShowing, 3000);\n}\n;\nfunction mouseLeaveOnVideo() {\n  timerRemoveShowing = setTimeout(removeShowing, 3000);\n}\n;\nconst endedVideo = () => {\n  // #11.1\n  const {\n    id\n  } = videoContainer.dataset;\n  fetch(`/api/videos/${id}/view`, {\n    method: \"POST\"\n  });\n};\n/*\r\n94. dataset은 html 태그에 정의된 data-xxx속성들을 불러온다.\r\n*/\n\nplayBtn.addEventListener('click', clickPlayBtn);\nmuteBtn.addEventListener('click', clickMuteBtn);\nvideo.addEventListener('pause', pauseVideo);\nvideo.addEventListener('play', playVideo);\nvideo.addEventListener('loadedmetadata', loadedmetadataVideo);\nvideo.addEventListener('timeupdate', timeUpdateVideo);\ntimeline.addEventListener('input', changeTimeline);\nvolume.addEventListener('input', changeVolume);\nfullScreenBtn.addEventListener(\"click\", handleFullscreen);\nvideo.addEventListener(\"mousemove\", mouseMoveOnVideo);\nvideo.addEventListener(\"mouseleave\", mouseLeaveOnVideo);\nvideo.addEventListener(\"ended\", endedVideo);\n/*\r\n93. loadedmetadata는 HTMLMediaElement의 이벤트 중 하나로, 비디오/오디오 파일이 로드 된 후에 콜백함수가 실행된다.\r\n\r\n@ video태그는 HTMLVideoElement를 상속받고 HTMLVideoElement는 HTMLMediaElement를 상속받는다.\r\n  video.muted / video.paused / video.volume / video.duration 등은 HTMLMediaElement에서 확인 가능하다. (https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)\r\n*/\n\n//# sourceURL=webpack://javascript_youtube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;