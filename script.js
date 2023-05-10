'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNewGame = document.querySelector('.btn--new');


score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

function switchPlayers(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;   
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active'); //toggle adds the class, if its not there and remove the class, if it is there
    player1El.classList.toggle('player--active');
}

function resetGame() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
}

btnRoll.addEventListener('click', function() {
    if(playing){
        const dice = Math.floor(Math.random() * 6) + 1; //Number between 1 and 6
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if(dice != 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }   else {
            switchPlayers();
        }
    }   
})

btnHold.addEventListener('click', function() {
    if(playing){
        // 1. Add current score to active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        // 2. Check if player's score is >= 100
        if(scores[activePlayer] >= 20){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('active');
        }   else {
            //Switch to the next player
            switchPlayers();
            }
    }
})

btnNewGame.addEventListener('click', () => {
    
    if(player0El.classList.contains('player--winner')) {
        player0El.classList.remove('player--winner');
        if(!player0El.classList.contains('active')){
            player0El.classList.add('active')
        }
    } else {
        player1El.classList.remove('active');
        player1El.classList.remove('player--winner');
        player0El.classList.add('active')
    }
    resetGame();
})




