window.onload = () => {
  /* Pomodoro */
  let workTime;
  let breakTime;
  let timesCompleted; /* Times up*/
  let cyclesGoal;
  let cyclesCompleted = 0;

  /* frontend connection */
  let clock = document.getElementById("clock");
  let cyclesInput = document.getElementById("cycles-input");
  let startButton = document.getElementById("start-button");
  let workTimeInput = document.getElementById("work-time");
  let breakTimeInput = document.getElementById("break-time");
  let restTimeInput = document.getElementById("rest-time");

  function populateVariables() {
    console.log("populated variables");
    workTime = workTimeInput.value; /* minutes */
    breakTime = breakTimeInput.value;
    restTime = restTimeInput.value;
    cyclesGoal = cyclesInput.value;
    timesCompleted = 0;
  }

  /* button functionality */
  startButton.onclick = () => {
    populateVariables();
    startPomodoro();
  };
  function startPomodoro() {
    console.log("Pomodoro started");
    pomodoroController();
  }

  function pomodoroController() {
    if (isRestTime()) {
      cyclesCompleted++;
      if (!goalReached()) {
        currentTime = restTime;
        timer();
        timesCompleted = 0;
      } else {
        console.log("Pomodoro finished!");
      }
      return;
    }
    if (timesCompleted % 2 == 0) {
      /* time to get back to work */
      currentTime = workTime;
      timesCompleted++;
      timer();
      console.log(
        "Time to work!:" + timesCompleted + ", cycles:" + cyclesCompleted
      );
    } else {
      /* rest time */
      currentTime = breakTime;
      timesCompleted++;
      timer();
      console.log(
        "Time for a break!:" + timesCompleted + ", cycles:" + cyclesCompleted
      );
    }
  }
};

/* clock */
let clockMinutes;
let clockSeconds;

function updateClock() {
  clockMinutes = formatNumbers(currentTime);
  clockSeconds = formatNumbers(seconds);
  clock.innerHTML = clockMinutes + ":" + clockSeconds;
}

function formatNumbers(time) {
  let formattedDigits;
  if (time < 10) {
    formattedDigits = "0" + time;
  } else {
    formattedDigits = time;
  }
  return formattedDigits;
}

/* Timer */
let currentTime; /* setting minutes */
let seconds = 0;

function timer() {
  if (currentTime > 0 || seconds > 0) {
    if (seconds == 0) {
      seconds = 59;
      currentTime--;
    } else {
      seconds--;
    }
    updateClock();
    console.log(currentTime, seconds);
    setTimeout(timer, 1000);
  } else {
    pomodoroController();
    console.log("Timer has ended!");
  }
}
timer();
