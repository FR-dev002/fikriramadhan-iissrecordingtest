let videoElem = document.getElementById("video");
let logElem = document.getElementById("log");
let startElem = document.getElementById("start");
let stopElem = document.getElementById("stop");

document.getElementsByClassName('open-modal')[0].style.visibility = 'hidden';

function toggleFullScreen() {
   var displayMediaOptions = {
      video: {
         cursor: "always"
      },
      audio: false
   };

   if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      document.getElementsByClassName('open-modal')[0].style.visibility = 'visible';
      startCapture(displayMediaOptions);
   } else {
      document.getElementsByClassName('open-modal')[0].style.visibility = 'hidden';
      stopCapture();
      document.exitFullscreen();

   }
}


function dumpOptionsInfo() {
   const videoTrack = videoElem.srcObject.getVideoTracks()[0];
}


function stopCapture(evt) {
   let tracks = videoElem.srcObject.getTracks();

   tracks.forEach(track => track.stop());
   videoElem.srcObject = null;
}

async function startCapture(displayMediaOptions) {
   logElem.innerHTML = "";

   try {
      videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      dumpOptionsInfo();
   } catch (err) {
      console.error("Error: " + err);
   }
}