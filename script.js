const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constantes du jeu
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const PLAYER_SIZE = 50;

// Vaisseau du joueur
const player = {
    x: GAME_WIDTH / 2 - PLAYER_SIZE / 2,
    y: GAME_HEIGHT - PLAYER_SIZE,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    speed: 5,
};

// Informations du jeu
let currentLevel = 1;
let currentStage = 1;
let score = 0;

// Tableau d'ennemis
const enemies = [];
const MAX_ENEMIES = 5; // Max d'ennemis à l'écran
const ENEMY_SIZE = 50;
let enemySpeed = 1;

// Durée d'un stage
const STAGE_DURATION = 5000; // 5 secondes

// Durée pour monter d'un niveau
const LEVEL_UP_DURATION = 15000; // 15 secondes

// Gestion du déplacement du joueur
function movePlayer(direction) {
    if (direction === 'left' && player.x > 0) {
        player.x -= player.speed;
    } else if (direction === 'right' && player.x + player.width < GAME_WIDTH) {
        player.x += player.speed;
    }
}

// Fonction pour dessiner le vaisseau
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Fonction pour générer des ennemis
function spawnEnemies() {
    if (enemies.length < MAX_ENEMIES) {
        const enemy = {
            x: Math.random() * (GAME_WIDTH - ENEMY_SIZE),
            y: 0,
            width: ENEMY_SIZE,
            height: ENEMY_SIZE,
            speed: enemySpeed,
            health: 3, // Nombre de coups pour tuer l'ennemi
        };
        enemies.push(enemy);
    }
}

// Fonction pour dessiner les ennemis
function drawEnemies() {
    ctx.fillStyle = 'red';
    enemies.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Fonction pour mettre à jour le jeu
function update() {
    // Gestion du temps écoulé
    const currentTime = Date.now();
    if (currentTime >= LEVEL_UP_DURATION * currentLevel) {
        // Niveau supérieur
        currentLevel++;
        currentStage = 1;
        enemySpeed += 0.5;
        score += 10;
    } else if (currentTime >= STAGE_DURATION * currentStage) {
        // Nouveau stage
        currentStage++;
        score += 5;
    }

    // Déplacement des ennemis
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.y > GAME_HEIGHT) {
            enemies.splice(index, 1);
        }
    });

    // Dessiner le jeu
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    drawPlayer();
    drawEnemies();
    document.getElementById('levelInfo').textContent = `Niveau ${currentLevel}, Stage ${currentStage}`;
    document.getElementById('scoreInfo').textContent = `Points: ${score}`;

    // Appel de la fonction update à chaque rafraîchissement de la page
    requestAnimationFrame(update);
}

// Gestion des touches du clavier
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.key === 'ArrowRight') {
        movePlayer('right');
    }
});

// Lancer le jeu
setInterval(spawnEnemies, 1000);
update();
