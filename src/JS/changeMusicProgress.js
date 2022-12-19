const changeMusicProgress = (event, audio) => {
  try {
    let moveProgress =
      (event.offsetX / event.srcElement.clientWidth) * audio.duration;
    audio.currentTime = moveProgress;
  } catch (e) {
    console.log(e);
  }
};

export { changeMusicProgress };
