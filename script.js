document.addEventListener('DOMContentLoaded', () => {
    let stopwatchTimer;
    let stopwatchElapsedTime = 0;
    let stopwatchIsRunning = false;
    let stopwatchIsPaused = false;

    let countdownTimer;
    let countdownEndTime = 0;
    let countdownRemainingTime = 0;
    let countdownIsPaused = false;


    window.startStopwatch = function() {
        if (stopwatchIsRunning) return;
        stopwatchIsRunning = true;
        stopwatchIsPaused = false;
        stopwatchTimer = setInterval(updateStopwatchDisplay, 10);
        document.getElementById('start').disabled = true;
        document.getElementById('pause').style.display = 'inline-block';
        document.getElementById('resume').style.display = 'none';
    }

    function updateStopwatchDisplay() {
        stopwatchElapsedTime += 10;
        const hours = String(Math.floor(stopwatchElapsedTime / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((stopwatchElapsedTime % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((stopwatchElapsedTime % 60000) / 1000)).padStart(2, '0');
        const milliseconds = String(Math.floor((stopwatchElapsedTime % 1000) / 10)).padStart(2, '0');
        document.getElementById('display').innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    window.togglePauseResumeStopwatch = function() {
        if (stopwatchIsRunning && !stopwatchIsPaused) {
            clearInterval(stopwatchTimer);
            stopwatchIsPaused = true;
            document.getElementById('pause').style.display = 'none';
            document.getElementById('resume').style.display = 'inline-block';
        } else if (stopwatchIsPaused) {
            stopwatchTimer = setInterval(updateStopwatchDisplay, 10);
            stopwatchIsPaused = false;
            document.getElementById('pause').style.display = 'inline-block';
            document.getElementById('resume').style.display = 'none';
        }
    }

    window.resetStopwatch = function() {
        clearInterval(stopwatchTimer);
        stopwatchElapsedTime = 0;
        stopwatchIsRunning = false;
        stopwatchIsPaused = false;
        document.getElementById('display').innerText = '00:00:00:0000';
        document.getElementById('start').disabled = false;
        document.getElementById('pause').style.display = 'inline-block';
        document.getElementById('resume').style.display = 'none';
    }

    window.recordLap = function() {
        if (!stopwatchIsRunning) return;
        const lapTime = document.getElementById('display').innerText;
        const lapElement = document.createElement('div');
        lapElement.innerText = `Lap: ${lapTime}`;
        document.getElementById('laps').appendChild(lapElement);
    }

    







    
    window.startCountdown = function() {
        const hours = parseInt(document.getElementById('hoursInput').value) || 0;
        const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
        const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

        if (hours === 0 && minutes === 0 && seconds === 0) return;

        const now = new Date().getTime();
        const totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
        countdownEndTime = now + totalTime;
        countdownRemainingTime = totalTime;

        countdownTimer = setInterval(updateCountdownDisplay, 10);
        document.getElementById('startTimer').disabled = true;
        document.getElementById('pauseTimer').style.display = 'inline-block';
        document.getElementById('resumeTimer').style.display = 'none';
        document.getElementById('stopTimer').style.display = 'inline-block';
    }

    function updateCountdownDisplay() {
        const now = new Date().getTime();
        countdownRemainingTime = countdownEndTime - now;

        if (countdownRemainingTime <= 0) {
            clearInterval(countdownTimer);
            countdownRemainingTime = 0;
            document.getElementById('timerDisplay').innerText = '00:00:00:0000';
            const alarm = document.getElementById('alarmSound');
            alarm.play().catch(error => {
                console.log('Error playing audio:', error);
            });
            document.getElementById('startTimer').disabled = false;
            document.getElementById('pauseTimer').style.display = 'none';
            document.getElementById('resumeTimer').style.display = 'none';
            document.getElementById('stopTimer').style.display = 'none';
            return;
        }

        const hours = String(Math.floor(countdownRemainingTime / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((countdownRemainingTime % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((countdownRemainingTime % 60000) / 1000)).padStart(2, '0');
        const milliseconds = String(Math.floor((countdownRemainingTime % 1000) / 10)).padStart(2, '0');
        document.getElementById('timerDisplay').innerText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    window.pauseCountdown = function() {
        clearInterval(countdownTimer);
        countdownIsPaused = true;
        document.getElementById('pauseTimer').style.display = 'none';
        document.getElementById('resumeTimer').style.display = 'inline-block';
    }

    window.resumeCountdown = function() {
        countdownEndTime = new Date().getTime() + countdownRemainingTime;
        countdownTimer = setInterval(updateCountdownDisplay, 10);
        countdownIsPaused = false;
        document.getElementById('pauseTimer').style.display = 'inline-block';
        document.getElementById('resumeTimer').style.display = 'none';
    }

    window.stopCountdown = function() {
        clearInterval(countdownTimer);
        countdownRemainingTime = 0;
        document.getElementById('timerDisplay').innerText = '00:00:00:0000';
        document.getElementById('startTimer').disabled = false;
        document.getElementById('pauseTimer').style.display = 'none';
        document.getElementById('resumeTimer').style.display = 'none';
        document.getElementById('stopTimer').style.display = 'none';
    }
});
