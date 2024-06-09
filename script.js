let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
let energy = parseInt(localStorage.getItem('energy')) || 1500;
const maxEnergy = 1500;
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
const clicksForFullBar = 300;
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;

document.getElementById('coin-count').innerText = coinCount;
document.getElementById('current-upgrade').innerText = `За клик ${clickValue}`;
document.getElementById('energy-display').innerText = `⚡️ ${energy} / ${maxEnergy}`;
document.getElementById('upgrade-cost').innerText = upgradeCost;

document.getElementById('coin-img').addEventListener('click', mineCoin);
document.getElementById('upgrade-btn').addEventListener('click', upgradeClick);
document.getElementById('coin-img').addEventListener('contextmenu', disableContextMenu); // Disable context menu

function saveProgress() {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('energy', energy);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('upgradeCost', upgradeCost);
}
document.getElementById('leaderboard-btn').addEventListener('click', openLeaderboardModal);

// При клике на кнопку "Топ", открываем модальное окно с лидербордом
function openLeaderboardModal() {
    const modal = document.getElementById('leaderboard-modal');
    modal.style.display = 'block';
    fetchLeaderboard(); // Получаем лидерборд при открытии модального окна
}

// Закрываем модальное окно при клике на кнопку закрытия
document.getElementsByClassName('close')[0].addEventListener('click', closeLeaderboardModal);

function closeLeaderboardModal() {
    const modal = document.getElementById('leaderboard-modal');
    modal.style.display = 'none';
}

// Получаем данные лидерборда
function fetchLeaderboard() {
    // Ваш код для получения данных о лидерборде
    // Например, можно отправить запрос на сервер и получить список лучших игроков
    // Здесь мы просто добавим фиктивные данные для демонстрации

    const leaderboardData = [
        { name: 'Игрок 1', score: 1000 },
        { name: 'Игрок 2', score: 950 },
        { name: 'Игрок 3', score: 900 },
        // Дополните список данными о других игроках
    ];

    // Отображаем данные лидерборда
    displayLeaderboard(leaderboardData);
}

// Отображаем данные лидерборда в модальном окне
function displayLeaderboard(leaderboardData) {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Очищаем список перед отображением новых данных

    leaderboardData.slice(0, 40).forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${player.name} - ${player.score}`;
        leaderboardList.appendChild(listItem);
    });
}

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
        saveProgress(); // Сохраняем прогресс после каждого действия
    } else {
        alert('Не хватает энергии!');
    }
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
        const distance = Math.random() * 50 + 50; // Random distance between 50 and 100
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;

        particle.style.setProperty('--x', `${translateX}px`);
        particle.style.setProperty('--y', `${translateY}px`);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

function upgradeClick() {
    if (coinCount >= upgradeCost) {
        coinCount -= upgradeCost;
        clickValue++;
        document.getElementById('coin-count').innerText = coinCount;
        document.getElementById('current-upgrade').innerText = `За клик ${clickValue}`;
        updateUpgradeCost(); // Обновляем цену улучшения
    } else {
        alert('Не хватает монет для улучшения!');
    }
}

function updateUpgradeCost() {
    upgradeCost *= 2; // Увеличиваем цену улучшения в 2 раза
    document.getElementById('upgrade-cost').innerText = upgradeCost;
}

// Initialize energy regeneration timer
setInterval(regenerateEnergy, 1000);
