document.addEventListener('DOMContentLoaded', () => {
    const tapButton = document.getElementById('tap-button');
    const coinCount = document.getElementById('coin-count');
    const progressBar = document.getElementById('progress-bar');
    const levelInfo = document.getElementById('level-info');
    const energyBoost = document.getElementById('energy-boost');
    const speedBoost = document.getElementById('speed-boost');
    const multitapBoost = document.getElementById('multitap-boost');
    const autoTapBoost = document.getElementById('auto-tap-boost');
    const toggleBoostsButton = document.getElementById('toggle-boosts');
    const toggleLeaderboardButton = document.getElementById('toggle-leaderboard');
    const boostsSection = document.getElementById('boosts-section');
    const leaderboardSection = document.getElementById('leaderboard-section');
    let coins = 0;
    let boostMultiplier = 1;
    let autoTapInterval;
    let currentLevel = 1;
    let maxCoinsForLevel = 1000; // Количество монет для достижения нового уровня

    // Функция для обновления монет и прогресс бара
    function updateCoins(amount) {
        coins += amount * boostMultiplier;
        coinCount.textContent = coins;
        updateProgressBar();
    }

    // Функция для обновления прогресс бара и уровня
    function updateProgressBar() {
        const currentProgress = (coins / maxCoinsForLevel) * 100;
        progressBar.value = currentProgress;

        if (coins >= maxCoinsForLevel) {
            handleLevelUp();
        }
    }

    // Функция для увеличения уровня
    function handleLevelUp() {
        currentLevel++;
        levelInfo.textContent = `Level ${currentLevel}`;
        coins = 0;
        coinCount.textContent = coins;
        maxCoinsForLevel *= 2; // Пример: удвоение требования для следующего уровня
        progressBar.value = 0; // Сброс прогресса
    }

    // Обработчик нажатия на кнопку
    tapButton.addEventListener('click', () => {
        updateCoins(1);
    });

    // Обработчики для улучшений
    energyBoost.addEventListener('click', () => {
        boostMultiplier *= 2;
        energyBoost.disabled = true;
    });

    speedBoost.addEventListener('click', () => {
        tapButton.style.animation = 'shake 0.1s infinite';
        speedBoost.disabled = true;
    });

    multitapBoost.addEventListener('click', () => {
        tapButton.addEventListener('click', multitapFunction);
        multitapBoost.disabled = true;
    });

    autoTapBoost.addEventListener('click', () => {
        autoTapInterval = setInterval(() => {
            updateCoins(1);
        }, 1000);
        autoTapBoost.disabled = true;
    });

    function multitapFunction() {
        updateCoins(1);
    }

    // Обработчики для навигации
    toggleBoostsButton.addEventListener('click', () => {
        if (boostsSection.style.display === 'none' || boostsSection.style.display === '') {
            boostsSection.style.display = 'block';
            leaderboardSection.style.display = 'none';
        } else {
            boostsSection.style.display = 'none';
        }
    });

    toggleLeaderboardButton.addEventListener('click', () => {
        if (leaderboardSection.style.display === 'none' || leaderboardSection.style.display === '') {
            leaderboardSection.style.display = 'block';
            boostsSection.style.display = 'none';
        } else {
            leaderboardSection.style.display = 'none';
        }
    });
});
