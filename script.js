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
    const toggleEarnButton = document.getElementById('toggle-earn');
    const boostsSection = document.getElementById('boosts-section');
    const leaderboardSection = document.getElementById('leaderboard-section');
    const earnSection = document.getElementById('earn-section');
    const checkSubscriptionButtons = document.querySelectorAll('.check-subscription');

    let coins = 0;
    let boostMultiplier = 1;
    let autoTapInterval;
    let currentLevel = 1
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
            earnSection.style.display = 'none';
        } else {
            boostsSection.style.display = 'none';
        }
    });

    toggleLeaderboardButton.addEventListener('click', () => {
        if (leaderboardSection.style.display === 'none' || leaderboardSection.style.display === '') {
            leaderboardSection.style.display = 'block';
            boostsSection.style.display = 'none';
            earnSection.style.display = 'none';
        } else {
            leaderboardSection.style.display = 'none';
        }
    });

    toggleEarnButton.addEventListener('click', () => {
        if (earnSection.style.display === 'none' || earnSection.style.display === '') {
            earnSection.style.display = 'block';
            boostsSection.style.display = 'none';
            leaderboardSection.style.display = 'none';
        } else {
            earnSection.style.display = 'none';
        }
    });

    // Обработчики для проверки подписки
    checkSubscriptionButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const channel = button.getAttribute('data-channel');
            const isSubscribed = await checkSubscription(channel);
            if (isSubscribed) {
                updateCoins(50); // Пример: 50 монет за подписку
                button.disabled = true;
                button.textContent = 'Подписка проверена';
            } else {
                alert('Вы не подписаны на этот канал.');
            }
        });
    });

    // Пример функции проверки подписки (не работает без серверной части)
    async function checkSubscription(channel) {
        // Здесь должна быть проверка подписки на сервере
        // Например, с использованием API Telegram и серверной валидации
        // Возвращает true, если подписан, иначе false

        // Пример статической проверки (замените на реальную проверку)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true); // Предполагаем, что пользователь подписан
            }, 1000);
        });
    }
});