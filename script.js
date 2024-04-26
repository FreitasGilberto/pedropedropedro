const circle = document.getElementById("circle");
const audio = document.getElementById("audio");
const toggleButton = document.getElementById("toggleButton");
const fileInput = document.getElementById("fileInput");

let isPlaying = false;

circle.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;

    image.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const circleSize = circle.offsetWidth;
      canvas.width = circleSize;
      canvas.height = circleSize;
      ctx.drawImage(image, 0, 0, circleSize, circleSize);

      const imgData = canvas.toDataURL("image/png");
      circle.querySelector("img").src = imgData;
      circle.style.animation = "none";
      void circle.offsetWidth;
      circle.style.animation = "rotation 2s linear infinite";
      audio.play();
      isPlaying = true;
      toggleButton.textContent = "Stop Music";
    };
  };

  reader.readAsDataURL(file);
});

toggleButton.addEventListener("click", () => {
  toggleMusic();
});

function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    toggleButton.textContent = "Play Music";
    circle.style.animationPlayState = "paused";
  } else {
    audio.play();
    isPlaying = true;
    toggleButton.textContent = "Stop Music";
    circle.style.animationPlayState = "running";
  }
}

function restartAudio() {
  audio.currentTime = 0;
  audio.play();
}
