const screen = document.getElementById('screen');

// Criar 30x30 = 900 pixels
for (let i = 0; i < 900; i++) {
  const pixel = document.createElement('div');
  pixel.classList.add('dot-pixel');
  screen.appendChild(pixel);
}

const config = {
  width: 30,
  height: 30,
  updateInterval: 2000 // 2 segundos
};

// Estado do Tamagotchi
let tamagotchi = {
  age: 0,
  stage: 'egg', // egg -> baby -> child -> adult -> old
  hunger: 50,
  happiness: 50,
  energy: 50,
  cleanliness: 50,
  isAlive: true,
  isSleeping: false,
  pixels: Array(900).fill(false) // Representação linear dos pixels (30x30)
};

// Elementos de controle
const feedBtn = document.getElementById('feed');
const playBtn = document.getElementById('play');
const cleanBtn = document.getElementById('clean');
const leftBtn = document.getElementById('left-button');
const rightBtn = document.getElementById('right-button');

// Padrões de sprites (simplificados para 30x30)
const sprites = {
  egg: generateEggSprite(),
  baby: generateBabySprite(),
  child: generateChildSprite(),
  adult: generateAdultSprite(),
  old: generateOldSprite(),
  dead: generateDeadSprite()
};

// Inicialização
function init() {
  // Criar pixels na tela
  for (let i = 0; i < 900; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('dot-pixel');
    pixel.id = `pixel-${i}`;
    screen.appendChild(pixel);
  }
  
  // Configurar eventos
  feedBtn.addEventListener('click', feed);
  playBtn.addEventListener('click', play);
  cleanBtn.addEventListener('click', clean);
  leftBtn.addEventListener('click', toggleSleep);
  rightBtn.addEventListener('click', doNothing); // Pode ser implementado depois
  
  // Iniciar loop do jogo
  updateSprite();
  setInterval(updateGame, config.updateInterval);
}

// Atualiza o estado do jogo
function updateGame() {
  if (!tamagotchi.isAlive) return;
  
  tamagotchi.age++;
  
  // Evolução por estágios
  if (tamagotchi.age === 5) tamagotchi.stage = 'baby';
  if (tamagotchi.age === 15) tamagotchi.stage = 'child';
  if (tamagotchi.age === 30) tamagotchi.stage = 'adult';
  if (tamagotchi.age === 50) tamagotchi.stage = 'old';
  
  // Atualizar atributos
  if (!tamagotchi.isSleeping) {
    tamagotchi.hunger = Math.max(0, tamagotchi.hunger - 5);
    tamagotchi.happiness = Math.max(0, tamagotchi.happiness - 3);
    tamagotchi.energy = Math.max(0, tamagotchi.energy - 2);
  } else {
    tamagotchi.energy = Math.min(100, tamagotchi.energy + 10);
  }
  
  tamagotchi.cleanliness = Math.max(0, tamagotchi.cleanliness - 1);
  
  // Verificar morte
  if (tamagotchi.hunger <= 0 || tamagotchi.happiness <= 0 || tamagotchi.cleanliness <= 0) {
    tamagotchi.isAlive = false;
    tamagotchi.stage = 'dead';
  }
  
  updateSprite();
  logStatus();
}

// Atualiza os pixels na tela
function updateSprite() {
  const spritePattern = sprites[tamagotchi.stage];
  
  for (let i = 0; i < 900; i++) {
    const pixel = document.getElementById(`pixel-${i}`);
    if (spritePattern[i]) {
      pixel.classList.add('on');
    } else {
      pixel.classList.remove('on');
    }
  }
}

// Ações do Tamagotchi
function feed() {
  if (tamagotchi.isAlive && !tamagotchi.isSleeping) {
    tamagotchi.hunger = Math.min(100, tamagotchi.hunger + 20);
    tamagotchi.cleanliness = Math.max(0, tamagotchi.cleanliness - 5);
    logStatus();
  }
}

function play() {
  if (tamagotchi.isAlive && !tamagotchi.isSleeping) {
    tamagotchi.happiness = Math.min(100, tamagotchi.happiness + 15);
    tamagotchi.energy = Math.max(0, tamagotchi.energy - 10);
    logStatus();
  }
}

function clean() {
  if (tamagotchi.isAlive) {
    tamagotchi.cleanliness = Math.min(100, tamagotchi.cleanliness + 30);
    logStatus();
  }
}

function toggleSleep() {
  if (tamagotchi.isAlive) {
    tamagotchi.isSleeping = !tamagotchi.isSleeping;
    console.log(tamagotchi.isSleeping ? 'Dormindo...' : 'Acordou!');
  }
}

function doNothing() {
  // Pode ser implementado para navegação de menus
}

// Funções auxiliares para gerar sprites
function generateEggSprite() {
  const sprite = Array(900).fill(false);
  // Implementar padrão do ovo
  return sprite;
}

function generateBabySprite() {
  const sprite = Array(900).fill(false);
  // Implementar padrão do bebê
  return sprite;
}

// ... outras funções generateSprite()

function logStatus() {
  console.log(`Estágio: ${tamagotchi.stage} | Idade: ${tamagotchi.age}`);
  console.log(`Fome: ${tamagotchi.hunger} | Felicidade: ${tamagotchi.happiness}`);
  console.log(`Energia: ${tamagotchi.energy} | Limpeza: ${tamagotchi.cleanliness}`);
}

// Iniciar o jogo
init();