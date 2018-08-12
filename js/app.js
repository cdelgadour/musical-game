/*
 * Create a list that holds all of your cards
 */

// TODO:
// 3. Viewports!!

let startTime = new Date();
let timer = document.querySelector(".timer");
const reloadButton = document.querySelector(".fa.fa-repeat");
const shinyStars = [...document.querySelectorAll(".fa.fa-star")];
let starRating = "3 stars";
const moveDisplay = document.querySelector(".moves");
let moves = 0;
let correctPairs = 0;
let firstCard, secondCard;
let flippedCards = false;
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

shuffleNodeList(imgElements);

function setImagesToCards() {
  // Input: No Input
  // Output: No Output
  // Behaviour: Creates an array with all card containers elements, then a loop
  // is created to add ONE img element into each card container.
  const allCards = document.querySelectorAll(".card");


  for (let card of allCards) {
    card.innerHTML = imgElements.pop();
  }
}

// function flipCard(evt) {
//   let cardImage = evt.target;
//   if (evt.target.nodeName.toLowerCase() === "li") {
//     console.log(evt.target);
//     cardImage.classList.toggle("show", true);
//   }
// }

function updateMoveCounter() {
  moves += 1;
  moveDisplay.innerText = moves;
  // shinyStars[0].style.visibility("hidden");
  updateStarRating(moves);
  // timer.innerText = `Hello ${moves}`;
}

function updateTimer() {
  var time = new Date();
  var currentTime = Math.round((time-startTime)/1000)
  timer.innerText = `Timer: ${currentTime} second(s)`;
}

let myTimer = window.setInterval(updateTimer, 1000);

function updateStarRating(moveNumber) {
  if (moves == 20) {
    shinyStars[2].style.visibility = "hidden";
    starRating = "2 stars";
  }
  else if (moves == 30) {
    shinyStars[1].style.visibility = "hidden";
    starRating = "1 star";
  }
}

function flipCard(image) {
  image.classList.toggle("show",true);
  updateMoveCounter();
}

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

function createEndScreen() {

}

function checkForEndGame() {
  if (correctPairs === 7) {
    clearInterval(myTimer);
    const elapsedTime = Math.round((new Date() - startTime) / 1000);
    setTimeout( function (){if (confirm(`Congratulations! Your time was ${elapsedTime} seconds. You made ${moves} moves!
             You got ${starRating}!.
             Want to play again?`)) {
               location.reload();
             }}, 500);
    }
  else {
    correctPairs += 1;
  }
}

function checkForSameCard(pepe) {
  if (pepe.classList.contains("active-card")) {
    return false;
  }
  else return true;
}

setImagesToCards();

const cardDeck = document.querySelector(".deck");
// cardDeck.addEventListener("click", flipCard);

reloadButton.addEventListener("click", function(){
  location.reload();
})

cardDeck.addEventListener("click", function(evt){
  if (evt.target.nodeName.toLowerCase() === "li") {
  let activeCard = evt.target;
  flipCard(activeCard);
  if (flippedCards) {
    // alert(flippedCards);
      secondCard = activeCard;
      cardValidation(firstCard, secondCard);
      flippedCards = false;

    }
  else {
    // alert(flippedCards);
    firstCard = activeCard;
    flippedCards = true;
    // alert(flippedCards);
  }
}
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//
//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//
//     return array;
// }


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
