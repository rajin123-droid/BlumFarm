// ==UserScript==
// @name         BlumFarm
// @version      1.8
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
    container.style.transition = 'transform 0.3s ease-in-out';
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
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.style.padding = '8px 16px';
    backButton.style.backgroundColor = '#e67e22'; // Orange color
    backButton.style.color = 'white';
    backButton.style.border = 'none';
    backButton.style.borderRadius = '6px';
    backButton.style.cursor = 'pointer';
    backButton.style.marginTop = '10px';
    backButton.style.fontSize = '14px';
    backButton.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
    backButton.onmouseover = function() {
        backButton.style.backgroundColor = '#d35400'; // Darker orange
        backButton.style.transform = 'scale(1.05)';
    };
    backButton.onmouseout = function() {
        backButton.style.backgroundColor = '#e67e22'; // Orange color
        backButton.style.transform = 'scale(1)';
    };
    backButton.onclick = function() {
        window.history.back();
    };
    header.appendChild(backButton);

    // Create and style message
    const message = document.createElement('p');
    message.textContent = 'You are using a pirated version. Click below for more information.';
    message.style.margin = '0';
    message.style.fontSize = '16px';
    message.style.color = '#34495e'; // Darker text color for readability
    container.appendChild(message);

    // Create and style toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'More Info';
    toggleButton.style.padding = '10px 20px';
    toggleButton.style.backgroundColor = '#3498db'; // Blue color
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '6px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.marginTop = '15px';
    toggleButton.style.fontSize = '14px';
    toggleButton.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
    toggleButton.onmouseover = function() {
        toggleButton.style.backgroundColor = '#2980b9'; // Darker blue
        toggleButton.style.transform = 'scale(1.05)';
    };
    toggleButton.onmouseout = function() {
        toggleButton.style.backgroundColor = '#3498db'; // Blue color
        toggleButton.style.transform = 'scale(1)';
    };
    container.appendChild(toggleButton);

    // Create and style purchase block
    const purchaseBlock = document.createElement('div');
    purchaseBlock.style.display = 'none';
    purchaseBlock.style.marginTop = '15px';
    purchaseBlock.style.color = 'black';
    purchaseBlock.style.fontSize = '14px';
    purchaseBlock.style.lineHeight = '1.5';
    purchaseBlock.innerHTML = `
        Join the Telegram group for updates: <a href="https://t.me/HotCastr" style="color: #1abc9c; text-decoration: none; font-weight: bold;">@HotCastr</a><br>
        To purchase the script and get updates, please DM <a href="https://t.me/iaminalongjurney" style="color: #1abc9c; text-decoration: none; font-weight: bold;">@iaminalongjurney</a>.
    `;
    container.appendChild(purchaseBlock);

    // Toggle button action
    toggleButton.onclick = function() {
        purchaseBlock.style.display = purchaseBlock.style.display === 'none' ? 'block' : 'none';
    };

    // Responsive adjustments
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 600px) {
            .dashboard-container {
                padding: 15px;
                font-size: 14px;
            }
            .dashboard-container h1 {
                font-size: 18px;
            }
            .dashboard-btn {
                padding: 8px 14px;
                font-size: 12px;
            }
        }
        @media (max-width: 400px) {
            .dashboard-container {
                padding: 10px;
                font-size: 12px;
            }
            .dashboard-container h1 {
                font-size: 16px;
            }
            .dashboard-btn {
                padding: 6px 12px;
                font-size: 11px;
            }
        }
    `;
    document.head.appendChild(style);

    // Additional CSS animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        div, button, p {
            animation: fadeIn 0.5s ease-out;
        }
        button {
            animation: slideUp 0.5s ease-out;
        }
    `;
    document.head.appendChild(animationStyle);

})();
