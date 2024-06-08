// script.js
let coinCount = 0;

document.getElementById('coin-img').addEventListener('click', mineCoin);

function mineCoin(event) {
    coinCount++;
    document.getElementById('coin-count').innerText = coinCount;
    animateCoin(event);
}

function animateCoin(event) {
    const coinImg = document.getElementById('coin-img');
    const rect = coinImg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;

    coinImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    setTimeout(() => {
        coinImg.style.transform = '';
    }, 300);
}
