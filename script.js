var playerRed = "R"; /* Joueur rouge*/
var playerYellow = "Y"; /* Joueur Jaune */
var currPlayer = playerRed; /* Le joueur rouge joue en premier */

var gameOver = false; // Le jeu n'est pas encore terminé
var board; // Sert à stocker l'état du plateau de jeu

var rows = 6; // 6 lignes
var columns = 7; // 7 colones
var currColumns = []; // Garde une trace de la ligne à laquelle se trouve chaque colonne.

window.onload = function() { // Fonction permettant de remplir les cases du tableau
    setGame();
}

function setGame() { // Initalise le plateau de jeu en créant des cases vides
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() { 
    if (gameOver) {
        return;
    }

    // Obtenir les coordonnées de la case
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Actualise l'état du plateau en s'assurant que la case la plus basse soit occupé
    r = currColumns[c]; 

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer; // Met à jour le tableau pour alterner entre les rouges et les jaunes
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; // met à jour le tableau pour passer à ligne du dessus
    currColumns[c] = r; // met à jour le tableau

    checkWinner();
}

function checkWinner() {
     // Permet de détecter si 4 pions de même couleur sont alignés horizontalement et déclarer le vainqueur
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // Permet de détecter si 4 pions de même couleur sont alignés verticalement et déclarer le vainqueur
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Permet de détecter si 4 pions de même couleur sont alignés diagonalement de haut en bas et déclarer le vainqueur
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Permet de détecter si 4 pions de même couleur sont alignés diagonalement de bas en haut et déclarer le vainqueur
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) { // Affiche le message de victoire lorsque un joueur à gagné
    let winner = document.getElementById("Vainqueur");
    if (board[r][c] == playerRed) {
        winner.innerText = "Les rouges ont gagnés";             
    } else {
        winner.innerText = "Les jaunes ont gagnés";
    }
    gameOver = true;
}
