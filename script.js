let coinCount = 0;
let clickValue = 1;
let energy = 1500;
const maxEnergy = 1500;
let clickCount = 0;
const clicksForFullBar = 300;
let upgradeCost= 10;

document.getElementById('coin-img').addEventListener('click', mineCoin);
document.getElementById('upgrade-btn').addEventListener('click', upgradeClick);
document.getElementById('coin-img').addEventListener('contextmenu', disableContextMenu); // Disable context menu

function mineCoin(event) {
    if (energy > 0) {
        coinCount += clickValue;
        energy -= clickValue;
        clickCount++;
        document.getElementById('coin-count').innerText = coinCount;
        document.getElementById('energy-display').innerText = `⚡️ ${energy} / ${maxEnergy}`;
        updateEnergyBar();
        showPlusOne(event);
        createParticles(event);
        animateCoin(event);
    } else {
        alert('Не хватает энергии!');
    }
}
 // Изменяем объявление переменной на let, чтобы можно было изменять ее значение

function upgradeClick() {
    if (coinCount >= upgradeCost) {
        coinCount -= upgradeCost;
        clickValue++;
        document.getElementById('coin-count').innerText = coinCount;
        document.getElementById('current-upgrade').innerText = `За клик  ${clickValue}`;
        updateUpgradeCost(); // Обновляем цену улучшения
    } else {
        alert('Не хватает монет для улучшения!');
    }
}

function updateUpgradeCost() {
    upgradeCost *= 4; // Увеличиваем цену улучшения
    document.getElementById('upgrade-cost').innerText = upgradeCost;
}
function animateCoin(event) {
    const coinImg = document.getElementById('coin-img');
    const rect = coinImg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 20; // Adjust rotation strength
    const rotateY = (x - centerX) / 20; // Adjust rotation strength

    coinImg.style.transform = `scale(1.01) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; // Adjust scale
    setTimeout(() => {
        coinImg.style.transform = '';
    }, 200); // Adjust animation time
}
function showPlusOne(event) {
    const coinDisplay = document.getElementById('coin-display');
    const plusOne = document.createElement('div');
    plusOne.className = 'plus-one';
    plusOne.innerText = `+${clickValue}`;
    const x = event.clientX - coinDisplay.getBoundingClientRect().left;
    const y = event.clientY - coinDisplay.getBoundingClientRect().top;
    plusOne.style.left = `${x}px`;
    plusOne.style.top = `${y}px`;
    coinDisplay.appendChild(plusOne);

    plusOne.addEventListener('animationend', () => {
        plusOne.remove();
    });
}


function regenerateEnergy() {
    if (energy < maxEnergy) {
        const regenAmount = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
        energy = Math.min(energy + regenAmount, maxEnergy);
        document.getElementById('energy-display').innerText = `⚡️ ${energy} / ${maxEnergy}`;
        updateEnergyBar();
    }
}

function updateEnergyBar() {
    const energyBarFill = document.getElementById('energy-bar-fill');
    const energyPercentage = (clickCount / clicksForFullBar) * 100;
    energyBarFill.style.width = `${energyPercentage}%`;
}

function disableContextMenu(event) {
    event.preventDefault();
}

function createParticles(event) {
    const coinDisplay = document.getElementById('coin-display');
    const numParticles = 10;
    const rect = coinDisplay.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        coinDisplay.appendChild(particle);

        // Generate random direction and distance for particle
        const angle = Math.random() * 2 * Math.PI; // Random angle
        const distance = Math.random() * 100; // Random distance
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;

        particle.style.setProperty('--x', `${translateX}px`);
        particle.style.setProperty('--y', `${translateY}px`);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Initialize energy regeneration timer
setInterval(regenerateEnergy, 1000);
