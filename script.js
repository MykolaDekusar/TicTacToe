'use strict';

const x_class = 'x';
const o_class = 'o';
let turnoX;
const winningComb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const victoryScreen = document.querySelector('.restart');
const celleSelezionate = document.querySelectorAll('.cell');
const punteggioX = document.getElementById('xScore');
const punteggioO = document.getElementById('oScore');
let winScreen = document.getElementById('gameResult');
let board = document.getElementById('board');
let xCounter = 0;
let oCounter = 0;
iniziaGioco();
function iniziaGioco() {
    celleSelezionate.forEach(cell => {
        cell.addEventListener("click", controllaClick, { once: true });
        cell.classList.remove('x');
        cell.classList.remove('o');
    })
    victoryScreen.classList.remove('show');
    board.classList.remove('o');
    board.classList.add('x');
}

function controllaClick(e) {
    const cella = e.target;
    const classeCorrente = turnoX ? o_class : x_class;
    inserisciMarchio(cella, classeCorrente);
    cambiaTurno();
    hoverClass();
    if (checkWin(classeCorrente)) {
        console.log('hai vinto');
        winScreen.innerHTML = `${turnoX ? "X's" : "O's"} Wins!`;
        victoryScreen.classList.add('show');
        if (classeCorrente == 'x') {
            xCounter++;
            punteggioX.innerText = xCounter;
            console.log(xCounter);
            cambiaTurno();
        } else {
            oCounter++;
            punteggioO.innerText = oCounter;
            console.log(oCounter);
        }
    } else if (isDraw()) {
        winScreen.innerHTML = `Draw!`;
        victoryScreen.classList.add('show');
        cambiaTurno();
    }
}

function isDraw() {
    return [...celleSelezionate].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    })
}

function inserisciMarchio(cella, classeCorrente) {
    cella.classList.add(classeCorrente);
}

function cambiaTurno() {
    turnoX = !turnoX;
}

function hoverClass() {
    if (board.classList == 'container x') {
        board.classList.remove;
        board.classList = 'container o';
    } else {
        board.classList.remove;
        board.classList = 'container x';
    }
}

function checkWin(classeCorrente) {
    return winningComb.some(combo => {
        return combo.every(index => {
            return celleSelezionate[index].classList.contains(classeCorrente);
        })
    })
}
