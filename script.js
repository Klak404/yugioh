let lp1 = 8000;
let lp2 = 8000;
let seconds = 0;
let timerInterval;
const counters = [0, 0, 0, 0];

function playSound() {
  const sound = document.getElementById("clickSound");
  sound.currentTime = 0;
  sound.play();
}

function animateLP(id) {
  const el = document.getElementById(id);
  el.classList.add("animate");
  setTimeout(() => el.classList.remove("animate"), 300);
}

function updateLPColor(id, val) {
  const el = document.getElementById(id);
  if (val <= 2000) {
    el.style.color = "#ff4d4d";
  } else if (val <= 4000) {
    el.style.color = "#ffb84d";
  } else {
    el.style.color = "#00eaff";
  }
}

function changeLP(player, isAdd) {
  const input = document.getElementById(`amount${player}`);
  const value = parseInt(input.value) || 0;
  const change = isAdd ? value : -value;
  if (player === 1) {
    lp1 = Math.max(0, lp1 + change);
    document.getElementById("lp1").textContent = lp1;
    updateLPColor("lp1", lp1);
    animateLP("lp1");
  } else {
    lp2 = Math.max(0, lp2 + change);
    document.getElementById("lp2").textContent = lp2;
    updateLPColor("lp2", lp2);
    animateLP("lp2");
  }
  playSound();
  saveState();
}

function resetLP(player) {
  if (player === 1) {
    lp1 = 8000;
    document.getElementById("lp1").textContent = lp1;
    updateLPColor("lp1", lp1);
    animateLP("lp1");
  } else {
    lp2 = 8000;
    document.getElementById("lp2").textContent = lp2;
    updateLPColor("lp2", lp2);
    animateLP("lp2");
  }
  playSound();
  saveState();
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
    saveState();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  seconds = 0;
  updateTimerDisplay();
  saveState();
}

function updateTimerDisplay() {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  document.getElementById("timer").textContent = `${mins}:${secs}`;
}

function updateCounter(i, delta) {
  counters[i] += delta;
  if (counters[i] < 0) counters[i] = 0;
  document.getElementById(`counter${i}`).textContent = counters[i];
  playSound();
  saveState();
}

function rollDice() {
  document.getElementById("rollResult").textContent = `Rolled: ${Math.floor(Math.random() * 6) + 1}`;
  playSound();
}

function flipCoin() {
  document.getElementById("rollResult").textContent = `Coin: ${Math.random() < 0.5 ? 'Heads' : 'Tails'}`;
  playSound();
}

function toggleTools() {
  const panel = document.getElementById("toolsPanel");
  panel.style.display = panel.style.display === "flex" ? "none" : "flex";
}

function hideTools() {
  document.getElementById("toolsPanel").style.display = "none";
}

function saveState() {
  localStorage.setItem("ygolpState", JSON.stringify({ lp1, lp2, seconds, counters }));
}

function loadState() {
  const state = JSON.parse(localStorage.getItem("ygolpState"));
  if (!state) return;
  lp1 = state.lp1 ?? 8000;
  lp2 = state.lp2 ?? 8000;
  seconds = state.seconds ?? 0;
  for (let i = 0; i < counters.length; i++) {
    counters[i] = state.counters?.[i] ?? 0;
    document.getElementById(`counter${i}`).textContent = counters[i];
  }
  document.getElementById("lp1").textContent = lp1;
  document.getElementById("lp2").textContent = lp2;
  updateLPColor("lp1", lp1);
  updateLPColor("lp2", lp2);
  updateTimerDisplay();
}

window.onload = loadState;
