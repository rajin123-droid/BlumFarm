<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BlumFarm Premium Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        #dashboard {
            position: fixed;
            top: 0;
            right: 0;
            padding: 20px;
            background-color: #333;
            color: white;
            border-radius: 0 0 0 10px;
            z-index: 9999;
            width: 300px;
        }
        .dashboard-header {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .setting-group {
            margin-bottom: 10px;
        }
        .setting-group label {
            display: block;
            margin-bottom: 5px;
        }
        .setting-group input {
            width: 100px;
            padding: 5px;
        }
        .button {
            display: block;
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            color: white;
            font-size: 16px;
        }
        .button.start {
            background-color: #4CAF50;
        }
        .button.pause {
            background-color: #FF5722;
        }
        .button.settings {
            background-color: #2196F3;
        }
        .settings-container {
            display: none;
        }
    </style>
</head>
<body>
    <div id="dashboard">
        <div class="dashboard-header">BlumFarm Premium Dashboard</div>
        <div class="setting-group">
            <label for="bombHits">Bomb Hits:</label>
            <input type="number" id="bombHits" min="0" max="10" value="0">
        </div>
        <div class="setting-group">
            <label for="iceHits">Ice Hits:</label>
            <input type="number" id="iceHits" min="0" max="10" value="2">
        </div>
        <div class="setting-group">
            <label for="flowerSkip">Flower Skip %:</label>
            <input type="number" id="flowerSkip" min="0" max="100" value="15">
        </div>
        <button id="startButton" class="button start">Start</button>
        <button id="pauseButton" class="button pause">▶</button>
        <button id="settingsButton" class="button settings">Settings</button>
        <div id="settingsContainer" class="settings-container">
            <!-- Additional settings can go here -->
        </div>
    </div>
    <script>
        const GAME_SETTINGS = {
            BombHits: 0,
            IceHits: 2,
            flowerSkipPercentage: 15,
            minDelayMs: 2000,
            maxDelayMs: 5000,
        };

        const startButton = document.getElementById('startButton');
        const pauseButton = document.getElementById('pauseButton');
        const settingsButton = document.getElementById('settingsButton');
        const settingsContainer = document.getElementById('settingsContainer');

        // Update game settings based on input fields
        function updateSettings() {
            GAME_SETTINGS.BombHits = parseInt(document.getElementById('bombHits').value, 10);
            GAME_SETTINGS.IceHits = parseInt(document.getElementById('iceHits').value, 10);
            GAME_SETTINGS.flowerSkipPercentage = parseInt(document.getElementById('flowerSkip').value, 10);
        }

        // Start the game
        startButton.onclick = function() {
            updateSettings();
            if (window.gameScript) {
                window.gameScript.startGame(GAME_SETTINGS);
            }
        };

        // Pause/Resume the game
        pauseButton.onclick = function() {
            if (window.gameScript) {
                window.gameScript.togglePause();
                pauseButton.textContent = window.gameScript.isGamePaused ? '▶' : '❚❚';
            }
        };

        // Toggle settings visibility
        settingsButton.onclick = function() {
            settingsContainer.style.display = settingsContainer.style.display === 'none' ? 'block' : 'none';
        };

        // Expose game script control to the global window object
        window.gameScript = {
            startGame: function(settings) {
                // Implement logic to start the game with settings
            },
            togglePause: function() {
                // Implement logic to toggle pause
            },
            isGamePaused: false
        };
    </script>
</body>
</html>
        
