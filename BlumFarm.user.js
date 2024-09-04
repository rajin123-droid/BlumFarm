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

    // Game Settings
    let GAME_SETTINGS = {
        BombHits: 0,
        IceHits: 2,
        flowerSkipPercentage: 15,
        minDelayMs: 2000,
        maxDelayMs: 5000,
    };

    let isGamePaused = true;
    let isSettingsOpen = false;

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
    purchaseBlock.innerHTML = 'Go <a href="https://t.me/iaminajourney" style="color: #00bfff;">@iaminajourney</a> to purchase the script, also a new update is waiting for you after payment';
    container.appendChild(purchaseBlock);

    toggleButton.onclick = function() {
        purchaseBlock.style.display = purchaseBlock.style.display === 'none' ? 'block' : 'none';
    };

    // Pause/Resume Button
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
            settingsContainer.appendChild(createSettingInput('Bomb:', 'BombHits', 0, 10));
            settingsContainer.appendChild(createSettingInput('Ice:', 'IceHits', 0, 10));
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

    // Create Setting Input Function
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
        console.log('Script is running...');
        settingsContainer.style.display = 'none';
        isSettingsOpen = false;
        settingsButton.textContent = 'Settings';
    };
})();
        
