'use strict';

// declarartions 
const player0 = document.querySelector('.player--0'); 
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const rolledNum = document.querySelector('.dice');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
let currentScore = 0;
let activePlayer = 0;
let scores = [0,0];
let playing = true;

// intial conditions
const init = function(){
    playing = true;
    score0.textContent = 0;
    score1.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    rolledNum.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    scores= [0 , 0];
}

// initializing

init();

// toggling the players after hold 

const togglePlayer = function () {
        currentScore = 0;
        activePlayer = (activePlayer === 0 ? 1 : 0 ) ;
        console.log('activePlayer changed');
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
}

// rolling the dice 

rollBtn.addEventListener('click', function(){
    if(playing){
    const rollNum = Math.trunc(Math.random() * 6)+1;
    console.log (rollNum);
    rolledNum.classList.remove('hidden');
    rolledNum.src = `dice-${rollNum}.png`;

// check if rolled number is 1, if yes then toggle the player
    if(rollNum !== 1){   
        currentScore += rollNum;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else{
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        togglePlayer();
    }
}
})

// hold button functionality to hold rolled scores

holdBtn.addEventListener('click', function(){
    if(playing){
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    console.log(scores);
    
    // if score is equal or greater than 100, declare the active player as winner

    if( scores[activePlayer] >= 100){
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        rolledNum.classList.add('hidden');
    }
    else{
        togglePlayer();
    }
}
})

// restart the game
newBtn.addEventListener('click', init )

