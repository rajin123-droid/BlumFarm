// ==UserScript==
// @name         BlumFarm
// @version      3.0
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

    // Create and style the container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.backgroundColor = '#2c3e50'; // Darker background for contrast
    container.style.padding = '20px 30px';
    container.style.borderRadius = '12px';
    container.style.color = 'white';
    container.style.textAlign = 'center';
    container.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    container.style.width = '90%'; // Adjust width
    container.style.maxWidth = '400px'; // Maximum width for responsiveness
    document.body.appendChild(container);

    // Create the message
    const message = document.createElement('p');
    message.textContent = 'You are using a pirated version, click below for more info';
    container.appendChild(message);

    // Create the toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'More Info';
    toggleButton.style.padding = '10px 20px';
    toggleButton.style.backgroundColor = '#5d2a8f'; // Purple color
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '6px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.marginTop = '15px';
    toggleButton.style.fontSize = '14px';
    toggleButton.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
    toggleButton.onmouseover = function() {
        toggleButton.style.backgroundColor = '#8e44ad'; // Hover effect
        toggleButton.style.transform = 'scale(1.05)';
    };
    toggleButton.onmouseout = function() {
        toggleButton.style.backgroundColor = '#5d2a8f';
        toggleButton.style.transform = 'scale(1)';
    };
    container.appendChild(toggleButton);

    // Create the purchase block
    const purchaseBlock = document.createElement('div');
    purchaseBlock.style.display = 'none';
    purchaseBlock.style.marginTop = '10px';
    purchaseBlock.style.color = 'white';
    purchaseBlock.style.fontSize = '14px';
    purchaseBlock.style.lineHeight = '1.5';
    purchaseBlock.innerHTML = `
        <p>Visit <a href="https://t.me/kittenwof" style="color: #00bfff;">@kittenwof</a> to purchase the script.</p>
        <p>New updates are waiting for you after payment!</p>
    `;
    container.appendChild(purchaseBlock);

    // Toggle the purchase block on button click
    toggleButton.onclick = function() {
        purchaseBlock.style.display = purchaseBlock.style.display === 'none' ? 'block' : 'none';
    };

    // Show "Script is running" message when purchase block is revealed
    function showScriptRunningMessage() {
        const runningMessage = document.createElement('div');
        runningMessage.textContent = 'Script is running...';
        runningMessage.style.position = 'fixed';
        runningMessage.style.bottom = '10px';
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

    purchaseBlock.style.display = 'none';
    toggleButton.onclick = function() {
        const isVisible = purchaseBlock.style.display === 'block';
        purchaseBlock.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            showScriptRunningMessage();
        }
    };
})();
