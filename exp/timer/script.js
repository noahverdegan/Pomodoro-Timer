let timerStarted = false;
let timerSeconds, intervalID, button, readout;
const DURATION = 60; // seconds for timer

function startTimer() {
    intervalID = setInterval(tick, 1000);
    button.innerHTML = 'Stop';
    timerStarted = true;
}
function stopTimer() {
    clearInterval(intervalID);
    button.innerHTML = 'Start';
    timerStarted = false;
    timerSeconds = DURATION;
    readout.innerHTML = timerSeconds;
}
function tick() {
    readout.innerHTML = --timerSeconds;
    if (timerSeconds == 0) stopTimer();
}

window.addEventListener('DOMContentLoaded', () => {
    button = document.getElementById('toggle');
    readout = document.getElementById('readout');
    button.onclick = () => {
        if (timerStarted) {
            stopTimer();
        } else {
            startTimer();
        }
        timerSeconds = DURATION;
    };
});