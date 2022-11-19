function counter() {
  let targetZeroAchieved = '';
  let counterPaused = '';
  let counterStarted = '';
  if (localStorage.getItem('zeroState')) {
    targetZeroAchieved = localStorage.getItem('zeroState');
  } else {
    targetZeroAchieved = 'false';
  }
  if (localStorage.getItem('pause')) {
    counterPaused = localStorage.getItem('pause');
  } else {
    counterPaused = 'false';
  }
  if (localStorage.getItem('started')) {
    counterStarted = localStorage.getItem('started');
  } else {
    counterStarted = 'false';
  }
  let buffer = 'false';
  let start = document.getElementById('btn-start');
  const stop = document.getElementById('btn-stop');
  const reset = document.getElementById('btn-reset');
  const oneMinButton = document.getElementById('btn-minute');
  const fiveMinButton = document.getElementById('btn-5minutes');
  const tenMinButton = document.getElementById('btn-10minutes');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');
  const DEFAULT_VALUES = {
    minutes: 0,
    seconds: 5,
  };
  let interval;
  let totalSeconds = 5;
  let setDefaultValues = function () {
    minutesInput.value = DEFAULT_VALUES.minutes;
    secondsInput.value = DEFAULT_VALUES.seconds;
  };
  function initiateCounter() {
    document.body.style.backgroundColor = 'rgb(161, 100, 223)';
    targetZeroAchieved = 'false';
    localStorage.setItem('zeroState', targetZeroAchieved);
    document.getElementById('melody').pause();
    minutesInput.removeAttribute('readonly');
    secondsInput.removeAttribute('readonly');
    /*----switch off music here--*/
    setDefaultValues();
  }
  /*-----events for buttons-------*/
  start.addEventListener('click', function () {
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    totalSeconds = minutes * 60 + seconds;
    localStorage.setItem('totalSeconds', JSON.stringify(totalSeconds));
    if (totalSeconds < 0) {
      return;
    }
    counterPaused = 'false';
    localStorage.setItem('pause', counterPaused);
    startCountdown();
  });
  stop.addEventListener('click', function () {
    stopCountdown();
  });
  reset.addEventListener('click', function () {
    resetCountdown();
  });
  oneMinButton.onclick = function () {
    let addedMinute = parseInt(minutesInput.value) + 1;
    minutesInput.value = addedMinute;
  };
  fiveMinButton.onclick = function () {
    let addedFiveMinutes = parseInt(minutesInput.value) + 5;
    minutesInput.value = addedFiveMinutes;
  };
  tenMinButton.onclick = function () {
    let addedTenMinutes = parseInt(minutesInput.value) + 10;
    minutesInput.value = addedTenMinutes;
  };
  /*----start of timer-------*/
  function startCountdown() {
    interval = clearInterval(interval);
    minutesInput.setAttribute('readonly', true);
    secondsInput.setAttribute('readonly', true);
    counterStarted = 'true';
    localStorage.setItem('started', counterStarted);
    countDown();
  }
  /*---execution of counting down----*/
  function countDown() {
    interval = setInterval(() => {
      if (counterPaused === 'true') return;
      totalSeconds--;
      localStorage.setItem('totalSeconds', JSON.stringify(totalSeconds));
      updateInputValues();
      if (totalSeconds <= 0) {
        showZeroState();
        interval = clearInterval(interval);
      }
    }, 1000);
  }
  /*---adjustments for zero state achieved---*/
  function showZeroState() {
    document.body.style.backgroundColor = 'red';
    targetZeroAchieved = 'true';
    localStorage.setItem('zeroState', targetZeroAchieved);
    counterStarted = 'false';
    localStorage.setItem('started', counterPaused);
    document.getElementById('melody').loop = true;
    document.getElementById('melody').play();
    minutesInput.setAttribute('readonly', true);
    secondsInput.setAttribute('readonly', true);
  }
  /*----update minutes and seconds by the input forms----*/
  function updateInputValues() {
    if (localStorage.getItem('totalSeconds')) {
      totalSeconds = Number(localStorage.getItem('totalSeconds'));
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    minutesInput.value = minutes;
    secondsInput.value = seconds;
  }
  /*---pausing the timer----*/
  function stopCountdown() {
    if (counterStarted === 'true') {
      counterPaused = 'true';
      localStorage.setItem('pause', counterPaused);
      minutesInput.setAttribute('readonly', true);
      secondsInput.setAttribute('readonly', true);
      interval = clearInterval(interval);
    }
  }
  /*reseting of the timer-----*/
  function resetCountdown() {
    if (targetZeroAchieved === 'true' || counterPaused === 'true') {
      counterPaused = 'false';
      localStorage.setItem('pause', counterPaused);
      counterStarted = 'false';
      localStorage.setItem('started', counterStarted);
      initiateCounter();
    }
  }
  if (targetZeroAchieved === 'false' && counterPaused === 'false') {
    initiateCounter();
  } else if (targetZeroAchieved === 'true') {
    totalSeconds = Number(localStorage.getItem('totalSeconds'));
    updateInputValues();
    showZeroState();
  }
  if (counterPaused === 'true' && counterStarted === 'true') {
    totalSeconds = Number(localStorage.getItem('totalSeconds'));
    updateInputValues();
  }
  if (counterStarted === 'true' && counterPaused === 'false') {
    totalSeconds = Number(localStorage.getItem('totalSeconds'));
    updateInputValues();
    countDown();
  }
}
window.onload = function () {
  counter();
};
