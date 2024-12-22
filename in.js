     // Function to get battery status
     async function getBatteryStatus() {
        const battery = await navigator.getBattery();
        const batteryStatus = {
            percent: battery.level * 100,
            charging: battery.charging // Added charging status
        };

        // Set up event listeners to detect changes in charging status
        battery.addEventListener('chargingchange', () => {
            updateChargingStatus(battery.charging);
        });

        return batteryStatus;
    }

    // Function to update charging status on UI
    function updateChargingStatus(isCharging) {
        const chargingStatusText = isCharging ? 'Charging' : 'Not Charging';
        document.getElementById('chargingStatus').textContent = chargingStatusText;
    }

    // Function to get IP Location
    async function getIpLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                city: data.city,
                country: data.country_name
            };
        } catch (error) {
            return { error: 'Unable to fetch IP location' };
        }
    }

    // Function to get current time
    function getCurrentTime() {
        const date = new Date();
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Function to update UI with all the information
    async function displayDeviceInfo() {
        const batteryStatus = await getBatteryStatus();
        const ipLocation = await getIpLocation();
        const currentTime = getCurrentTime();

        // Update the UI with the information
        document.getElementById('batteryStatus').textContent = 
            `${batteryStatus.percent}%`;

        document.getElementById('ipLocation').textContent = 
            `${ipLocation.country}, ${ipLocation.city}`;

        document.getElementById('currentTime').textContent = 
            currentTime;

        // Update initial charging status
        updateChargingStatus(batteryStatus.charging);
    }

    // Automatically load the information when the page loads
    window.onload = function() {
        displayDeviceInfo();
    };


















    let score = 0;
    let timeLeft = 30;
    let timer;
    let gameStarted = false;
    
    const gameButton = document.getElementById("gameButton");
    const timerDisplay = document.getElementById("timer");
    const scoreDisplay = document.getElementById("score");
    const restartBtn = document.getElementById("restartBtn");

    // Function to start the game
    function startGame() {
      gameStarted = true;
      score = 0;
      timeLeft = 30;
      gameButton.style.display = 'block';
      restartBtn.style.display = 'none';
      updateScore();
      startTimer();
      moveButton();
    }

    // Function to update the score display
    function updateScore() {
      scoreDisplay.textContent = `Score: ${score}`;
    }

    // Function to start the timer
    function startTimer() {
      timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        if (timeLeft === 0) {
          clearInterval(timer);
          gameButton.style.display = 'none';
          restartBtn.style.display = 'block';
        }
      }, 1000);
    }

    // Function to move the button randomly on the screen
    function moveButton() {
      if (gameStarted) {
        const maxWidth = window.innerWidth - gameButton.offsetWidth;
        const maxHeight = window.innerHeight - gameButton.offsetHeight;

        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        gameButton.style.left = randomX + 'px';
        gameButton.style.top = randomY + 'px';
      }
    }

    // Function to handle button click
    gameButton.addEventListener("click", () => {
      if (gameStarted) {
        score++;
        updateScore();
        moveButton();
      }
    });

    // Start game on page load
    startGame();