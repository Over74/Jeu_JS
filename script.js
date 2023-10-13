const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Vaisseau du joueur
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5,
};

// Tableau d'ennemis
const enemies = [
    { x: 100, y: 50, width: 50, height: 50 },
    { x: 250, y: 50, width: 50, height: 50 },
    { x: 400, y: 50, width: 50, height: 50 },
];

// Lasers du joueur
const playerLasers = [];

// Lasers ennemis
const enemyLasers = [];

// Gestion du déplacement du joueur
function movePlayer(direction) {
    if (direction === 'left' && player.x > 0) {
        player.x -= player.speed;
    } else if (direction === 'right' && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}

// Gestion du tir du joueur
function playerShoot() {
    const laser = {
        x: player.x + player.width / 2 - 2.5,
        y: player.y,
        width: 5,
        height: 20,
        speed: 5,
    };
    playerLasers.push(laser);
}

// Fonction pour dessiner le vaisseau
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Fonction pour dessiner les ennemis
function drawEnemies() {
    ctx.fillStyle = 'red';
    enemies.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Fonction pour dessiner les lasers
function drawLasers(lasers, color) {
    ctx.fillStyle = color;
    lasers.forEach((laser) => {
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
    });
}

// Gestion de la collision entre deux objets
function isColliding(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

// Fonction pour mettre à jour le jeu
function update() {
    // Déplacement des lasers du joueur
    playerLasers.forEach((laser) => {
        laser.y -= laser.speed;
    });

    // Déplacement des lasers ennemis
    enemyLasers.forEach((laser) => {
        laser.y += laser.speed;
    });

    // Gestion des collisions entre les lasers du joueur et les ennemis
    playerLasers.forEach((laser, laserIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (isColliding(laser, enemy)) {
                playerLasers.splice(laserIndex, 1);
                enemies.splice(enemyIndex, 1);
            }
        });
    });

    // Gestion des collisions entre les lasers ennemis et le joueur
    enemyLasers.forEach((laser, laserIndex) => {
        if (isColliding(laser, player)) {
            enemyLasers.splice(laserIndex, 1);
            alert("Game Over! Vous avez été touché par un laser ennemi.");
            document.location.reload();
        }
    });

    // Dessiner le jeu
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    drawLasers(playerLasers, 'blue');
    drawLasers(enemyLasers, 'red');

    // Appel de la fonction update à chaque rafraîchissement de la page
    requestAnimationFrame(update);
}

// Gestion des touches du clavier
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.key === 'ArrowRight') {
        movePlayer('right');
    } else if (event.key === ' ') {
        playerShoot();
    }
});

// Lancer le jeu
update();
