// ==UserScript==
// @name         BlumFarm Enhanced AI Anti-Cheat with Advanced Fingerprinting Evasion
// @version      4.3
// @match        https://telegram.blum.codes/*
// @grant        none
// @icon         https://raw.githubusercontent.com/rajin123-droid/BlumFarm/main/logo.webp
// @updateURL    https://github.com/rajin123-droid/BlumFarm/raw/main/BlumFarm.user.js
// @downloadURL  https://github.com/rajin123-droid/BlumFarm/raw/main/BlumFarm.user.js
// ==/UserScript==

(function() {
    // Advanced fingerprinting evasion logic with detection and randomization improvements
    function applyAdvancedEvasion() {
        function spoofScreenResolution() {
            const screenWidth = Math.floor(Math.random() * (1920 - 1280) + 1280);
            const screenHeight = Math.floor(Math.random() * (1080 - 720) + 720);
            Object.defineProperty(window.screen, 'width', { value: screenWidth });
            Object.defineProperty(window.screen, 'height', { value: screenHeight });
            console.log(`Screen resolution set to: ${screenWidth}x${screenHeight}`);
        }

        function spoofTimezone() {
            const timeOffset = Math.floor(Math.random() * 24) - 12;
            const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
            Date.prototype.getTimezoneOffset = function() {
                return timeOffset * 60;
            };
            console.log(`Timezone offset spoofed to: ${timeOffset} hours`);
        }

        function spoofNavigatorProperties() {
            const platforms = ['Win32', 'Linux x86_64', 'MacIntel', 'Android', 'iPhone'];
            const languages = ['en-US', 'fr-FR', 'es-ES', 'de-DE', 'zh-CN'];
            Object.defineProperty(navigator, 'platform', {
                get: () => platforms[Math.floor(Math.random() * platforms.length)]
            });
            Object.defineProperty(navigator, 'language', {
                get: () => languages[Math.floor(Math.random() * languages.length)]
            });
            console.log(`Navigator properties spoofed: platform=${navigator.platform}, language=${navigator.language}`);
        }

        function spoofCanvasFingerprint() {
            const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
            HTMLCanvasElement.prototype.toDataURL = function() {
                const context = this.getContext('2d');
                context.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                context.fillRect(0, 0, this.width, this.height);
                return originalToDataURL.apply(this, arguments);
            };
            console.log('Canvas fingerprinting spoofed with randomized color.');
        }

        function spoofWebGLFingerprint() {
            const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(param) {
                if (param === this.RENDERER) {
                    return 'AI-WebGL Renderer Enhanced';
                }
                if (param === this.VENDOR) {
                    return 'AI-WebGL Vendor Enhanced';
                }
                return originalGetParameter.apply(this, arguments);
            };
            console.log('WebGL fingerprinting spoofed with custom renderer and vendor.');
        }

        // Combine all evasion methods
        spoofScreenResolution();
        spoofTimezone();
        spoofNavigatorProperties();
        spoofCanvasFingerprint();
        spoofWebGLFingerprint();
    }

    // Updated gameplay logic with enhanced randomness and behavior
    let GAME_SETTINGS = {
        BombHits: Math.floor(Math.random() * 2),
        IceHits: Math.floor(Math.random() * 2) + 2,
        flowerSkipPercentage: Math.floor(Math.random() * 11) + 15,
        minDelayMs: Math.random() * (3000 - 1500) + 1500,  // Min delay randomized
        maxDelayMs: Math.random() * (6000 - 4000) + 4000,  // Max delay randomized
    };

    let isGamePaused = true;
    let isSettingsOpen = false;

    try {
        console.log('Script started with advanced anti-detection mechanisms.');

        let gameStats = {
            score: 0,
            bombHits: 0,
            iceHits: 0,
            flowersSkipped: 0,
            isGameOver: false,
        };

        const originalPush = Array.prototype.push;
        Array.prototype.push = function(...items) {
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

        // UI Controls
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

        const codeVoygerLabel = document.createElement('div');
        codeVoygerLabel.innerHTML = '<strong>🔥CODEVOYGER🔥</strong>';
        codeVoygerLabel.style.fontSize = '24px';
        codeVoygerLabel.style.color = 'white';
        codeVoygerLabel.style.fontFamily = 'Arial, sans-serif';
        codeVoygerLabel.style.fontWeight = 'bold';
        codeVoygerLabel.style.textAlign = 'center';
        codeVoygerLabel.style.marginBottom = '10px';
        controlsContainer.appendChild(codeVoygerLabel);

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
        settingsButton.textContent = 'Settings';
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

        // Apply enhanced fingerprinting evasion
        applyAdvancedEvasion();

    } catch (e) {
        console.log('Failed to initiate the game script due to error:', e);
    }
})();
