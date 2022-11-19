function automaticImageSlider() {
  let prev = document.getElementById('prev');
  let next = document.getElementById('next');
  let slides = document.getElementsByClassName('slide');
  let slideIndex;
  if (sessionStorage.getItem('index') == undefined) {
    console.log('LocalSotrage is empty');
    slideIndex = 0;
  } else {
    slideIndex = sessionStorage.getItem('index');
  }
  function showActualSlide(index) {
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[index].style.display = 'block';
  }
  function switchFromKey(event) {
    if (event.keyCode == '39') {
      console.log('Key pressed');
      nextSlide();
    }
    if (event.keyCode == '32') {
      console.log('Key pressed');
      nextSlide();
    }
    if (event.keyCode == '37') {
      console.log('Key pressed');
      previousSlide();
    }
  }
  function nextSlide() {
    slideIndex++;
    if (slideIndex === slides.length) {
      slideIndex = 0;
    }
    sessionStorage.setItem('index', slideIndex);
    showActualSlide(slideIndex);
    console.log('slide forward');
  }
  function previousSlide() {
    slideIndex--;
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
    sessionStorage.setItem('index', slideIndex);
    showActualSlide(slideIndex);
    console.log('slide back');
  }
  next.addEventListener('click', function () {
    nextSlide();
  });
  prev.addEventListener('click', function () {
    previousSlide();
  });
  showActualSlide(slideIndex);
  setInterval(function () {
    nextSlide();
  }, 5000);
  this.addEventListener('keydown', switchFromKey, false);
}
window.onload = function () {
  automaticImageSlider();
};
