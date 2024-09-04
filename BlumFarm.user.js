// ==UserScript==
// @name         BlumFarm
// @version      2.9
// @namespace    Codevoyger
// @author       Codevoyger
// @match        https://telegram.blum.codes/*
// @grant        none
// @icon         https://raw.githubusercontent.com/ilfae/ilfae/main/logo.webp
// @updateURL    https://github.com/rajin123-droid/BlumFarm/raw/main/BlumFarm.user.js
// @downloadURL  https://github.com/rajin123-droid/BlumFarm/raw/main/BlumFarm.user.js
// ==/UserScript==

(function() {
    'use strict';

    let GAME_SETTINGS = {
        BombHits: 0,
        IceHits: 0,
        FlowerHits: 1, // Default to 1 if none
    };

    let isSettingsComplete = false;
    let isGameStarted = false;

    // Function to start the game script
    function startGameScript() {
        if (!isGameStarted) {
            isGameStarted = true;
            console.log('Game script started!');
            // Add your game script logic here

            // Show "Script is running" message
            const runningMessage = document.createElement('div');
            runningMessage.textContent = 'Script is running...';
            runningMessage.style.position = 'fixed';
            runningMessage.style.top = '10px';
            runningMessage.style.left = '50%';
            runningMessage.style.transform = 'translateX(-50%)';
            runningMessage.style.backgroundColor = '#27ae60';
            runningMessage.style.color = 'white';
            runningMessage.style.padding = '10px 20px';
            runningMessage.style.borderRadius = '6px';
            runningMessage.style.zIndex = '10000';
            runningMessage.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            document.body.appendChild(runningMessage);

            setTimeout(() => {
                runningMessage.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(runningMessage);
                }, 300);
            }, 2000);
        }
    }

    function showDashboard() {
        container.style.display = 'block';
    }

    function hideDashboard() {
        container.style.display = 'none';
    }

    function createButton(text, color, hoverColor, onClick, additionalStyles = {}) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.padding = '10px 20px';
        button.style.backgroundColor = color;
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '6px';
        button.style.cursor = 'pointer';
        button.style.marginTop = '15px';
        button.style.fontSize = '14px';
        button.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
        Object.assign(button.style, additionalStyles);
        button.onmouseover = function() {
            button.style.backgroundColor = hoverColor;
            button.style.transform = 'scale(1.05)';
        };
        button.onmouseout = function() {
            button.style.backgroundColor = color;
            button.style.transform = 'scale(1)';
        };
        button.onclick = onClick;
        return button;
    }

    // Create and style container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.backgroundColor = '#f5c518'; // Gold color
    container.style.padding = '20px 30px';
    container.style.borderRadius = '12px';
    container.style.color = 'black';
    container.style.textAlign = 'center';
    container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    container.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    container.style.maxWidth = '90%';
    container.style.minWidth = '280px'; // Adjusted minimum width
    container.style.boxSizing = 'border-box';
    container.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    container.style.display = 'none'; // Initially hidden
    document.body.appendChild(container);

    // Create and style header
    const header = document.createElement('div');
    header.style.marginBottom = '15px';
    container.appendChild(header);

    const title = document.createElement('h1');
    title.textContent = 'BlumFarm Premium';
    title.style.margin = '0';
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    title.style.color = '#2c3e50'; // Dark color for contrast
    header.appendChild(title);

    // Create and style back button
    function createBackButton(callback) {
        const backButton = createButton('Back', '#e67e22', '#d35400', callback, {
            marginTop: '10px',
        });
        return backButton;
    }

    // Create and style settings container
    const settingsContainer = document.createElement('div');
    settingsContainer.style.display = 'none';
    settingsContainer.style.marginTop = '15px';
    settingsContainer.style.color = 'black';
    settingsContainer.style.fontSize = '14px';
    settingsContainer.style.lineHeight = '1.5';
    settingsContainer.style.textAlign = 'left';
    container.appendChild(settingsContainer);

    function createSettingInput(label, settingName, min, max) {
        const settingDiv = document.createElement('div');
        settingDiv.style.marginBottom = '10px';

        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.style.display = 'block';
        labelElement.style.color = 'black';
        settingDiv.appendChild(labelElement);

        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.value = GAME_SETTINGS[settingName];
        inputElement.min = min;
        inputElement.max = max;
        inputElement.style.width = '60px';
        inputElement.style.padding = '4px';
        inputElement.style.marginTop = '5px';
        inputElement.addEventListener('input', () => {
            GAME_SETTINGS[settingName] = parseInt(inputElement.value, 10) || 0;
        });
        settingDiv.appendChild(inputElement);

        return settingDiv;
    }

    function toggleSettings() {
        settingsContainer.style.display = settingsContainer.style.display === 'none' ? 'block' : 'none';
        if (settingsContainer.style.display === 'block') {
            settingsContainer.innerHTML = '';
            settingsContainer.appendChild(createSettingInput('Bombs to Click:', 'BombHits', 0, 10));
            settingsContainer.appendChild(createSettingInput('Ice to Click:', 'IceHits', 0, 10));
            settingsContainer.appendChild(createSettingInput('Green Leaves to Click:', 'FlowerHits', 1, 20)); // Default to 1 if none
            settingsContainer.appendChild(createBackButton(() => {
                settingsContainer.style.display = 'none'; // Hide settings
                showDashboard(); // Show main dashboard
            }));
        }
    }

    function finishSettings() {
        isSettingsComplete = true;
        settingsContainer.style.display = 'none';
        playButton.style.display = 'block'; // Show play button after finishing settings
    }

    function startScript() {
        if (isSettingsComplete) {
            startGameScript();
        } else {
            alert('Please complete the settings first.');
        }
    }

    // Create and style play button
    const playButton = createButton('Start Script', '#e74c3c', '#c0392b', startScript);
    playButton.style.display = 'none'; // Initially hidden
    container.appendChild(playButton);

    // Automatically show the dashboard on page load
    window.addEventListener('load', function() {
        showDashboard();
    });

    // Observer to start the script when the page loads
    const observer = new MutationObserver(() => {
        if (!isGameStarted) {
            showDashboard();
        }
    });

    const appElement = document.querySelector('#app');
    if (appElement) {
        observer.observe(appElement, { childList: true, subtree: true });
    }

    // Back button functionality
    const backButton = createBackButton(() => {
        if (settingsContainer.style.display === 'none') {
            // If not in settings, show settings and hide dashboard
            toggleSettings();
        } else {
            // If in settings, show dashboard and hide settings
            settingsContainer.style.display = 'none';
            showDashboard();
        }
    });
    header.appendChild(backButton);

})();
            
