// ==UserScript==
// @name         BlumFarm
// @version      1.3
// @namespace    iaminajourney
// @author       iaminajourney
// @match        https://telegram.blum.codes/*
// @grant        none
// @icon         https://raw.githubusercontent.com/ilfae/ilfae/main/logo.webp
// @updateURL    https://github.com/rajin123-droid/BlumFarm/raw/main/BlumFarm.user.js
// @downloadURL  https://github.com/rajin123-droid/BlumFarm/raw/main/BlumFarm.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Initial Settings
    let GAME_SETTINGS = {
        BombHits: 0,
        IceHits: 2,
        flowerSkipPercentage: 15,
        minDelayMs: 2000,
        maxDelayMs: 5000,
    };

    let isGamePaused = true;
    let isSettingsOpen = false;
    let isGameRunning = false;

    // Create Dashboard UI
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.backgroundColor = '#1e1e1e';
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.color = 'white';
    container.style.textAlign = 'center';
    container.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(container);

    const header = document.createElement('h2');
    header.textContent = 'BlumFarm Dashboard';
    header.style.color = '#FFD700';
    container.appendChild(header);

    const message = document.createElement('p');
    message.textContent = 'You are using a pirated version, click on ↓';
    container.appendChild(message);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = '↓';
    toggleButton.style.padding = '5px 10px';
    toggleButton.style.backgroundColor = '#5d2a8f';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '5px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.marginTop = '10px';
    container.appendChild(toggleButton);

    const purchaseBlock = document.createElement('div');
    purchaseBlock.style.display = 'none';
    purchaseBlock.style.marginTop = '10px';
    purchaseBlock.style.color = 'white';
    purchaseBlock.innerHTML = 'Go <a href="https://t.me/kittenwof" style="color: #00bfff;">@kittenwof</a> to purchase the script, also a new update is waiting for you after payment';
    container.appendChild(purchaseBlock);

    toggleButton.onclick = function() {
        purchaseBlock.style.display = purchaseBlock.style.display === 'none' ? 'block' : 'none';
    };

    // Play/Pause Button
    const pauseButton = document.createElement('button');
    pauseButton.textContent = '▶';
    pauseButton.style.padding = '4px 8px';
    pauseButton.style.backgroundColor = '#5d2a8f';
    pauseButton.style.color = 'white';
    pauseButton.style.border = 'none';
    pauseButton.style.borderRadius = '10px';
    pauseButton.style.cursor = 'pointer';
    pauseButton.style.marginRight = '5px';
    container.appendChild(pauseButton);

    pauseButton.onclick = function() {
        isGamePaused = !isGamePaused;
        pauseButton.textContent = isGamePaused ? '▶' : '❚❚';
    };

    // Settings Button
    const settingsButton = document.createElement('button');
    settingsButton.textContent = 'Settings';
    settingsButton.style.padding = '4px 8px';
    settingsButton.style.backgroundColor = '#5d2a8f';
    settingsButton.style.color = 'white';
    settingsButton.style.border = 'none';
    settingsButton.style.borderRadius = '10px';
    settingsButton.style.cursor = 'pointer';
    container.appendChild(settingsButton);

    // Settings Container
    const settingsContainer = document.createElement('div');
    settingsContainer.style.display = 'none';
    settingsContainer.style.marginTop = '10px';
    container.appendChild(settingsContainer);

    settingsButton.onclick = function() {
        isSettingsOpen = !isSettingsOpen;
        settingsContainer.style.display = isSettingsOpen ? 'block' : 'none';
        if (isSettingsOpen) {
            settingsContainer.innerHTML = '';
            settingsContainer.appendChild(createSettingInput('Bomb Hits:', 'BombHits', 0, 10));
            settingsContainer.appendChild(createSettingInput('Ice Hits:', 'IceHits', 0, 10));
            settingsContainer.appendChild(createSettingInput('Flower Skip %:', 'flowerSkipPercentage', 0, 100));

            // Back Button
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.style.padding = '4px 8px';
            backButton.style.backgroundColor = '#FFD700';
            backButton.style.color = '#1e1e1e';
            backButton.style.border = 'none';
            backButton.style.borderRadius = '5px';
            backButton.style.cursor = 'pointer';
            backButton.style.marginTop = '10px';
            settingsContainer.appendChild(backButton);

            backButton.onclick = function() {
                settingsContainer.style.display = 'none';
                isSettingsOpen = false;
                settingsButton.textContent = 'Settings';
            };
        }
    };

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

    // Start Button
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.style.padding = '4px 8px';
    startButton.style.backgroundColor = '#FFD700';
    startButton.style.color = '#1e1e1e';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '5px';
    startButton.style.cursor = 'pointer';
    startButton.style.marginTop = '10px';
    container.appendChild(startButton);

    startButton.onclick = function() {
        isGameRunning = true;
        settingsContainer.style.display = 'none';
        isSettingsOpen = false;
        settingsButton.textContent = 'Settings';
        startGame();
    };

    function startGame() {
        console.log('Script started with settings:', GAME_SETTINGS);

        let gameStats = {
            score: 0,
            bombHits: 0,
            iceHits: 0,
            flowersSkipped: 0,
            isGameOver: false,
        };

        const originalPush = Array.prototype.push;
        Array.prototype.push = function (...items) {
            if (!isGamePaused && isGameRunning) {
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
                if (window.__NUXT__.state.$s$0olocQZxou.playPasses > 0) {
                    startNewGame();
                }
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

        function startNewGame() {
            setTimeout(() => {
                const newGameButton = document.querySelector("#app > div > div > div.buttons > button:nth-child(2)");
                if (newGameButton) {
                    newGameButton.click();
                }
                gameStats.isGameOver = false;
            }, getRandomDelay());
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

        // Controls UI
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
        OutGamePausedTrue.href = atob('aHR0cHM6Ly90Lm1lL1NOVHJpY2tzQkQ=');
        OutGamePausedTrue.textContent = atob('VEc6IFNOIFRyaWNrcw==');
        OutGamePausedTrue.style.color = 'white';
        controlsContainer.appendChild(OutGamePausedTrue);

        const lineBreak = document.createElement('br');
        controlsContainer.appendChild(lineBreak);

        const pauseButton = document.createElement('button');
        pauseButton.textContent = '▶';
        pauseButton.style.padding = '4px 8px';
        pauseButton.style.backgroundColor = '#5d2a8f';
        pauseButton.style.color = 'white';
        pauseButton.style.border = 'none';
        pauseButton.style.borderRadius = '10px';
        pauseButton.style.cursor = 'pointer';
        pauseButton.style.marginRight = '5px';
        pauseButton.onclick = toggleGamePause;
        controlsContainer.appendChild(pauseButton);

        const settingsButton = document.createElement('button');
        settingsButton.textContent = atob('U2V0dGluZ3M=');
        settingsButton.style.padding = '4px 8px';
        settingsButton.style.backgroundColor = '#5d2a8f';
        settingsButton.style.color = 'white';
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
                settingsContainer.appendChild(createSettingInput('Bomb Hits:', 'BombHits', 0, 10));
                settingsContainer.appendChild(createSettingInput('Ice Hits:', 'IceHits', 0, 10));
                settingsContainer.appendChild(createSettingInput('Flower Skip %:', 'flowerSkipPercentage', 0, 100));
            } else {
                settingsContainer.style.display = 'none';
            }
        }

        function toggleGamePause() {
            isGamePaused = !isGamePaused;
            pauseButton.textContent = isGamePaused ? '▶' : '❚❚';
        }

    } catch (e) {
        console.log('Failed to initiate the game script');
    }
})();
            
