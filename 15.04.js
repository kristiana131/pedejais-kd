let basket = document.getElementById('basket');
let container = document.getElementById('game-container');
let score = 0;
let timeLeft = 30;
let timerInterval;
let eggInterval;

document.addEventListener('keydown', function (e) {
  const step = 20;
  let basketLeft = parseInt(window.getComputedStyle(basket).left);

  if (e.key === 'ArrowLeft' && basketLeft > 0) {
    basket.style.left = basketLeft - step + 'px';
  } else if (e.key === 'ArrowRight' && basketLeft < container.offsetWidth - basket.offsetWidth) {
    basket.style.left = basketLeft + step + 'px';
  }
});

function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById('score').textContent = score;
  document.getElementById('timer').textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(eggInterval);
      alert("Spēle beigusies! Tu noķēri " + score + " olas!");
    }
  }, 1000);

  eggInterval = setInterval(createEgg, 800);
}

function createEgg() {
  const egg = document.createElement('div');
  egg.classList.add('egg');
  egg.style.left = Math.floor(Math.random() * (container.offsetWidth - 30)) + 'px';
  container.appendChild(egg);

  let fallInterval = setInterval(() => {
    let top = parseInt(window.getComputedStyle(egg).top) || 0;
    if (top >= container.offsetHeight - 50) {
      let eggLeft = parseInt(egg.style.left);
      let basketLeft = parseInt(basket.style.left);
      if (eggLeft > basketLeft - 20 && eggLeft < basketLeft + 80) {
        score++;
        document.getElementById('score').textContent = score;
      }
      egg.remove();
      clearInterval(fallInterval);
    } else {
      egg.style.top = top + 5 + 'px';
    }
  }, 50);
}