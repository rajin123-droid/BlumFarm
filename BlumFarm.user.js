// ==UserScript==
// @name         BlumFarm
// @version      1.5
// @namespace    Codevoyger
// @author       Codevoyger
// @match        https://telegram.blum.codes/*
// @grant        none
// @icon         https://raw.githubusercontent.com/ilfae/ilfae/main/logo.webp
// @updateURL    http://m90237h7.beget.tech/private_files/BlumFarm.user.js
// @downloadURL  http://m90237h7.beget.tech/private_files/BlumFarm.user.js
// ==/UserScript==

(function() {
    'use strict';

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    container.style.backgroundColor = '#2c3e50';
    container.style.padding = '20px 30px';
    container.style.borderRadius = '12px';
    container.style.color = 'white';
    container.style.textAlign = 'center';
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    container.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    container.style.maxWidth = '90%';
    container.style.minWidth = '300px';
    document.body.appendChild(container);

    const message = document.createElement('p');
    message.textContent = 'You are using a pirated version. Click the button below to get more information.';
    message.style.margin = '0';
    message.style.fontSize = '16px';
    container.appendChild(message);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'More Info';
    toggleButton.style.padding = '10px 20px';
    toggleButton.style.backgroundColor = '#3498db';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '6px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.marginTop = '15px';
    toggleButton.style.fontSize = '14px';
    toggleButton.style.transition = 'background-color 0.3s ease';
    toggleButton.onmouseover = function() {
        toggleButton.style.backgroundColor = '#2980b9';
    };
    toggleButton.onmouseout = function() {
        toggleButton.style.backgroundColor = '#3498db';
    };
    container.appendChild(toggleButton);

    const purchaseBlock = document.createElement('div');
    purchaseBlock.style.display = 'none';
    purchaseBlock.style.marginTop = '15px';
    purchaseBlock.style.color = 'white';
    purchaseBlock.style.fontSize = '14px';
    purchaseBlock.innerHTML = `
        Go <a href="https://t.me/HotCastr" style="color: #1abc9c; text-decoration: none;">@HotCastr</a> to join the Telegram group.<br>
        To purchase the script and get updates, please DM <a href="https://t.me/iaminalongjurney" style="color: #1abc9c; text-decoration: none;">@iaminalongjurney</a>.
    `;
    container.appendChild(purchaseBlock);

    toggleButton.onclick = function() {
        purchaseBlock.style.display = purchaseBlock.style.display === 'none' ? 'block' : 'none';
    };
})();
