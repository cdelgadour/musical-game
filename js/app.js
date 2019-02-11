let startTime = new Date();
let timer = document.querySelector(".timer");
const reloadButton = document.querySelector(".fa.fa-repeat");
const shinyStars = [...document.querySelectorAll(".fa.fa-star")];
let starRating = "3 stars";
const moveDisplay = document.querySelector(".moves");
let moves = 0;
let correctPairs = 0;
let myTimer = window.setInterval(updateTimer, 1000);
let firstCard, secondCard;
let flippedCards = false;
const cardDeck = document.querySelector(".deck");
const imgElements = ["<img src=\"img/accordion.jpg\" alt=\"accordion\" class=\"accordion card-image\"></img>",
                   "<img src=\"img/accordion.jpg\" alt=\"accordion\" class=\"accordion card-image\"></img>",
                   "<img src=\"img/bongo.jpg\" alt=\"bongo\" class=\"bongo card-image\"></img>",
                   "<img src=\"img/bongo.jpg\" alt=\"bongo\" class=\"bongo card-image\"></img>",
                   "<img src=\"img/doublebass.jpg\" alt=\"double-bass\" class=\"doublebass card-image\"></img>",
                   "<img src=\"img/doublebass.jpg\" alt=\"double-bass\" class=\"doublebass card-image\"></img>",
                   "<img src=\"img/guitar.jpg\" alt=\"guitar\" class=\"guitar card-image\"></img>",
                   "<img src=\"img/guitar.jpg\" alt=\"guitar\" class=\"guitar card-image\"></img>",
                   "<img src=\"img/harp.jpg\" alt=\"harp\" class=\"harp card-image\"></img>",
                   "<img src=\"img/harp.jpg\" alt=\"harp\" class=\"harp card-image\"></img>",
                   "<img src=\"img/mic.jpg\" alt=\"mic\" class=\"mic card-image\"></img>",
                   "<img src=\"img/mic.jpg\" alt=\"mic\" class=\"mic card-image\"></img>",
                   "<img src=\"img/piano.jpg\" alt=\"piano\" class=\"piano card-image\"></img>",
                   "<img src=\"img/piano.jpg\" alt=\"piano\" class=\"piano card-image\"></img>",
                   "<img src=\"img/trumpet.jpg\" alt=\"trumpet\" class=\"trumpet card-image\"></img>",
                   "<img src=\"img/trumpet.jpg\" alt=\"trumpet\" class=\"trumpet card-image\"></img>"];

function shuffleNodeList(array) {
 /*Durstenfeld Shuffle
 Credits to Scott and Lauren Holst from StackOverflow.com
 https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
 for (let i = array.length - 1; i > 0; i--) {
     let j = Math.floor(Math.random() * (i + 1));
     let temp = array[i];
     array[i] = array[j];
     array[j] = temp;
 }
}

// @description Appends an img element to an element with .card class
function setImagesToCards() {
  const allCards = document.querySelectorAll(".card");
  for (let card of allCards) {
    card.innerHTML = imgElements.pop();
  }
}

function updateMoveCounter() {
  moves += 1;
  moveDisplay.innerText = moves;
  updateStarRating(moves);
}

function updateTimer() {
  var time = new Date();
  var currentTime = Math.round((time-startTime)/1000)
  timer.innerText = `Timer: ${currentTime} second(s)`;
}
/**
*@description updates the Star rating of the user each time a move is made
*@param {number} moveNumber - Counter for the number of moves made.
*/
function updateStarRating(moveNumber) {
  // This function is called each time a move is made. The variable moves keeps the counter.
  // If it exceeds a certain number, one of the stars is hidden and the starRating decreases
  if (moves == 20) {
    shinyStars[2].style.visibility = "hidden";
    starRating = "2 stars";
  }
  else if (moves == 30) {
    shinyStars[1].style.visibility = "hidden";
    starRating = "1 star";
  }
}
/**
@description Toggles the .show class to make a card visible
@param {object} image - card container element
*/
function flipCard(image) {
  image.classList.toggle("show",true);
  updateMoveCounter();
}
/**
@description Validates if the two cards are the same.
@param {object} cardOne
@param {object} cardTwo
*/
function cardValidation(cardOne, cardTwo){
  let cardOneClass = cardOne.querySelector("img");
  let cardTwoClass = cardTwo.querySelector("img");
  if (cardOneClass.className != cardTwoClass.className) {
    setTimeout(function() {cardOne.classList.toggle("show", false);}, 1000);
    setTimeout(function() {cardTwo.classList.toggle("show", false);}, 1000);
  }
  else {
    cardOne.classList.toggle("match", true);
    cardTwo.classList.toggle("match", true);
    checkForEndGame();
  }
}

function checkForEndGame() {
  // correctPairs keeps the counter of pair of cards found. Once it reaches 7, the game is over.
  if (correctPairs === 7) {
    clearInterval(myTimer);
    const elapsedTime = Math.round((new Date() - startTime) / 1000);
    setTimeout( function (){if (confirm(`Congratulations! Your time was ${elapsedTime} seconds. You made ${moves} moves!
             You got ${starRating}!
             Want to play again?`)) {
               location.reload();
             }}, 500);
    }

  // If the correctPairs is less than 7, 1 is added to the variable.
  else {
    correctPairs += 1;
  }
}

shuffleNodeList(imgElements);

setImagesToCards();

reloadButton.addEventListener("click", function(){
  location.reload();
})

cardDeck.addEventListener("click", function(evt){
  // Verifies if the target element is a li element
  if (evt.target.nodeName.toLowerCase() === "li") {
  let activeCard = evt.target;
  flipCard(activeCard);
  // flippedCards is a boolean. It is true if a card is currently flipped, otherwise it is false.
  if (flippedCards) {
      // Assigns the activeCard to a variable secondCard for validation
      secondCard = activeCard;
      cardValidation(firstCard, secondCard);
      // After two cards are validated, flippedCards returns to false
      flippedCards = false;
  }
  else {
    firstCard = activeCard;
    flippedCards = true;
      }
  }
});
