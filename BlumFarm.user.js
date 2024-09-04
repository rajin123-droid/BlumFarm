// ==UserScript==
// @name         BlumFarm
// @version      1.6
// @match        https://telegram.blum.codes/*
// @grant        none
// @icon         https://raw.githubusercontent.com/rajin123-droid/BlumFarm/main/logo.webp
// @updateURL    https://github.com/rajin123-droid/BlumFarm/raw/main/BlumFarm.user.js
// @downloadURL  https://github.com/rajin123-droid/BlumFarm/raw/main/BlumFarm.user.js
// ==/UserScript==

let GAME_SETTINGS = {
    BombHits: Math.floor(Math.random() * 2),
    IceHits: Math.floor(Math.random() * 2) + 2,
    flowerSkipPercentage: Math.floor(Math.random() * 11) + 15,
    minDelayMs: 2000,
    maxDelayMs: 5000,
};

let isGamePaused = true;
let isSettingsOpen = false;

try {
    console.log('Script started');

    let gameStats = {
        score: 0,
        bombHits: 0,
        iceHits: 0,
        flowersSkipped: 0,
        isGameOver: false,
    };

    const originalPush = Array.prototype.push;
    Array.prototype.push = function (...items) {
        if (!isGamePaused) {
            items.forEach(item => handleGameElement(item));
        }
        return originalPush.apply(this, items);
    };

    function handleGameElement(element) {
        if (!element || !element.item) return;

        const { type } = element.item;
        switch (type) {
            case "CLOVER":
                processFlower(element);
                break;
            case "BOMB":
                processBomb(element);
                break;
            case "FREEZE":
                processIce(element);
                break;
        }
    }

    function processFlower(element) {
        const shouldSkip = Math.random() < (GAME_SETTINGS.flowerSkipPercentage / 100);
        if (shouldSkip) {
            gameStats.flowersSkipped++;
        } else {
            gameStats.score++;
            clickElement(element);
        }
    }

    function processBomb(element) {
        if (gameStats.bombHits < GAME_SETTINGS.BombHits) {
            gameStats.score = 0;
            clickElement(element);
            gameStats.bombHits++;
        }
    }

    function processIce(element) {
        if (gameStats.iceHits < GAME_SETTINGS.IceHits) {
            clickElement(element);
            gameStats.iceHits++;
        }
    }

    function clickElement(element) {
        element.onClick(element);
        element.isExplosion = true;
        element.addedAt = performance.now();
    }

    function checkGameCompletion() {
        const rewardElement = document.querySelector('#app > div > div > div.content > div.reward');
        if (rewardElement && !gameStats.isGameOver) {
            gameStats.isGameOver = true;
            logGameStats();
            resetGameStats();
            findAndClickPlayButton();
        }
    }

    function logGameStats() {
        console.log(`Game Over. Stats: Score: ${gameStats.score}, Bombs: ${gameStats.bombHits}, Ice: ${gameStats.iceHits}, Flowers Skipped: ${gameStats.flowersSkipped}`);
    }

    function resetGameStats() {
        gameStats = {
            score: 0,
            bombHits: 0,
            iceHits: 0,
            flowersSkipped: 0,
            isGameOver: false,
        };
    }

    function getRandomDelay() {
        return Math.random() * (GAME_SETTINGS.maxDelayMs - GAME_SETTINGS.minDelayMs) + GAME_SETTINGS.minDelayMs;
    }

    function clickPlayButton() {
        const playButton = Array.from(document.querySelectorAll('button')).find(btn => 
            btn.textContent.trim().startsWith('Play')
        );

        if (playButton) {
            playButton.click();
            console.log('Play button clicked. Starting new game...');
            checkGameCompletion();
            setTimeout(findAndClickPlayButton, 32000); // Restart the loop after 32 seconds for next round
        } else {
            console.log('No Play button found. Will retry...');
            setTimeout(findAndClickPlayButton, 3000); // Retry every 3 seconds if not found
        }
    }

    function findAndClickPlayButton() {
        console.log('Attempting to find and click the Play button...');
        clickPlayButton();
    }

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                checkGameCompletion();
            }
        }
    });

    const appElement = document.querySelector('#app');
    if (appElement) {
        observer.observe(appElement, { childList: true, subtree: true });
    }

    const controlsContainer = document.createElement('div');
    controlsContainer.style.position = 'fixed';
    controlsContainer.style.top = '0';
    controlsContainer.style.left = '50%';
    controlsContainer.style.transform = 'translateX(-50%)';
    controlsContainer.style.zIndex = '9999';
    controlsContainer.style.backgroundColor = 'black';
    controlsContainer.style.padding = '10px 20px';
    controlsContainer.style.borderRadius = '10px';
    document.body.appendChild(controlsContainer);

    const OutGamePausedTrue = document.createElement('a');
    OutGamePausedTrue.href = 'https://t.me/HotCastr';
    OutGamePausedTrue.textContent = 'CodeVoygers';
    OutGamePausedTrue.style.color = 'white';
    controlsContainer.appendChild(OutGamePausedTrue);

    const lineBreak = document.createElement('br');
    controlsContainer.appendChild(lineBreak);

    const pauseButton = document.createElement('button');
    pauseButton.textContent = '▶';
    pauseButton.style.padding = '4px 8px';
    pauseButton.style.backgroundColor = '#FFD700'; // Premium Gold
    pauseButton.style.color = '#00BFFF'; // Sky Blue
    pauseButton.style.border = 'none';
    pauseButton.style.borderRadius = '10px';
    pauseButton.style.cursor = 'pointer';
    pauseButton.style.marginRight = '5px';
    pauseButton.onclick = function() {
        toggleGamePause();
        if (!isGamePaused) {
            findAndClickPlayButton(); // Start the loop to find and click the Play button
        }
    };
    controlsContainer.appendChild(pauseButton);

    const settingsButton = document.createElement('button');
    settingsButton.textContent = 'Settings';
    settingsButton.style.fontWeight = 'bold'; // Make the font bold
    settingsButton.style.fontFamily = 'Arial, sans-serif'; // Stylish font
    settingsButton.style.color = 'black'; // Font color set to black
    settingsButton.style.padding = '4px 8px';
    settingsButton.style.backgroundColor = '#FFD700'; // Premium Gold
    settingsButton.style.border = 'none';
    settingsButton.style.borderRadius = '10px';
    settingsButton.style.cursor = 'pointer';
    settingsButton.onclick = toggleSettings;
    controlsContainer.appendChild(settingsButton);

    const settingsContainer = document.createElement('div');
    settingsContainer.style.display = 'none';
    settingsContainer.style.marginTop = '10px';
    controlsContainer.appendChild(settingsContainer);

    function createSettingInput(label, settingName, min, max) {
        const settingDiv = document.createElement('div');
        settingDiv.style.marginBottom = '5px';
        settingDiv.style.color = 'white';

        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.style.display = 'block';
        labelElement.style.color = 'white';
        settingDiv.appendChild(labelElement);

        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.value = GAME_SETTINGS[settingName];
        inputElement.min = min;
        inputElement.max = max;
        inputElement.style.width = '50px';
        inputElement.addEventListener('input', () => {
            GAME_SETTINGS[settingName] = parseInt(inputElement.value, 10);
        });
        settingDiv.appendChild(inputElement);

        return settingDiv;
    }

    function toggleSettings() {
        isSettingsOpen = !isSettingsOpen;
        if (isSettingsOpen) {
            settingsContainer.style.display = 'block';
            settingsContainer.innerHTML = '';
            settingsContainer.appendChild(createSettingInput('Bomb:', 'BombHits', 0, 10));
            settingsContainer.appendChild(createSettingInput('Ice:', 'IceHits', 0, 10));
            settingsContainer.appendChild(createSettingInput('Flower Skip %:', 'flowerSkipPercentage', 0, 100));
        } else {
            settingsContainer.style.display = 'none';
        }
    }

    function toggleGamePause() {
        isGamePaused = !isGamePaused;
        pauseButton.textContent = isGamePaused ? '▶' : '❚❚';
        console.log(`Game ${isGamePaused ? 'paused' : 'resumed'}`);
    }

} catch (error) {
    console.error('An error occurred:', error);
}
