let startTime = 0;
let updatedTime = 0;
let difference = 0;
let isRunning = false;
let interval;
let lapsArray = [];
let lapCounter = 1;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

function startPause() {
    if (!isRunning) {
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        isRunning = true;
        startTime = Date.now() - difference;
        interval = setInterval(updateTime, 10);
    } else {
        startPauseBtn.textContent = 'Start';
        isRunning = false;
        difference = Date.now() - startTime;
        clearInterval(interval);
    }
}

function updateTime() {
    updatedTime = Date.now() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = ('0' + date.getUTCMinutes()).slice(-2);
    let seconds = ('0' + date.getUTCSeconds()).slice(-2);
    let milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3, -1);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    display.textContent = '00:00:00.00';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsArray = [];
    laps.innerHTML = '';
    lapCounter = 1;
    startTime = 0;
    difference = 0;
}

function recordLap() {
    const lapTime = formatTime(updatedTime);
    lapsArray.push(lapTime);
    const lapElement = document.createElement('li');
    lapElement.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    laps.appendChild(lapElement);
}
