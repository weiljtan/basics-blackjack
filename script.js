/* Black Jack
1 Computer (dealer) & 1 player

1. Player receives 2 cards 
2. Dealer receives 2 cards
3. Player decides if they want to hit (draw) or stand (end their turn)
  - Player can continue to draw cards but will bust if exceeds 21
4. Dealer reveals their card:
  - if < 17, draws another card
  - if > 17, compare with player and winner is determined
5. Whoever is closer to 21 wins the game.

Helper functions required:
1. make deck
2. shuffle deck
3. draw cards for dealer & player
- if ace, rank can be 1 or 11
- if jack, queen or king, rank can be 10
4. player decides to hit or stand
- if draw, hit, stand or bust
- if stand, proceed
5. dealer decides to hit or stand based on </> 17
- if <17, hit
- if > 17, stand
6. decide winner

Game Steps:
1. Deck is shuffled.
2. User clicks Submit to deal cards.
3. The cards are analysed for game winning conditions, e.g. Blackjack.
4. The cards are displayed to the user.
5. The user decides whether to hit or stand, using the submit button to submit their choice.
6. The user's cards are analysed for winning or losing conditions.
7. The computer decides to hit or stand automatically based on game rules.
8. The game either ends or continues.

Game Outcomes:
(a) A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
(b) A Blackjack win. When either player or dealer draw Blackjack.
(c) A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.
*/
var gameMode = 0;
var userName = "";
var playerHand = [];
var dealerHand = [];
var playerOutcome = "";
var dealerOutcome = "";
var playerHighestSum = 0;
var playerLowestSum = 0;
var dealerHighestSum = 0;
var dealerLowestSum = 0;
var overallOutcome = 0;

/* var shuffledDeck = [
  {
    rank: 1,
    suit: "heart",
    name: "ace",
  },
  {
    rank: 11,
    suit: "heart",
    name: "jack",
  },
  {
    rank: 1,
    suit: "heart",
    name: "ace",
  },
  {
    rank: 1,
    suit: "heart",
    name: "ace",
  },
  {
    rank: 1,
    suit: "heart",
    name: "ace",
  },
  {
    rank: 1,
    suit: "heart",
    name: "ace",
  },
  {
    rank: 1,
    suit: "heart",
    name: "ace",
  },
  {
    rank: 1,
    suit: "heart",
    name: "ace",
  },
]; */

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(makeDeck());

// Game mode 0, helper function to get player's cards
var getPlayerHand = function () {
  playerHand.push(shuffledDeck.pop());
  console.log(playerHand[0].name, "Player hand 1");
  playerHand.push(shuffledDeck.pop());
  console.log(playerHand[1].name, "Player hand 2");
};

var checkPlayerJQK = function () {
  var playerIndex = 0;
  // if either cards have king, queen, jack, convert to 10.
  while (playerHand.length > playerIndex) {
    if (
      playerHand[playerIndex].name == "jack" ||
      playerHand[playerIndex].name == "queen" ||
      playerHand[playerIndex].name == "king"
    ) {
      playerHand[playerIndex].rank = 10;
    }
    playerIndex += 1;
    console.log("Special cards determination ------");
    console.log(playerHand[0].rank, "Player hand 1");
    console.log(playerHand[1].rank, "Player hand 2");
  }
};
// if either cards have ace, determine whether
// (a) black jack
// (b) only possible sum
// (c) highest/lowest possible sum.
var checkPlayerAce = function () {
  var playerIndex2 = 0;
  // if either cards have ace, convert to 11.
  while (playerHand.length > playerIndex2) {
    if (playerHand[playerIndex2].name == "ace") {
      playerHand[playerIndex2].rank = 11;
    }
    playerIndex2 += 1;
    console.log("Ace cards determination ------");
  }
  // Summation of cards
  var playerCounter = 0;
  playerHighestSum = 0;
  while (playerCounter < playerHand.length) {
    playerHighestSum = playerHighestSum + playerHand[playerCounter].rank;
    playerCounter += 1;
  }
  console.log(playerHighestSum, "Player Highest Sum =========");
  // Convert ace card if exceeds 21
  console.log("Ace cards conversion ------");
  var playerIndex3 = 0;
  while (playerIndex3 < playerHand.length) {
    if (playerHighestSum > 21) {
      if (playerHand[playerIndex3].name == "ace") {
        playerHighestSum = playerHighestSum - 10;
        console.log(playerHighestSum, playerIndex3);
      }
    } else if (playerHighestSum < 21) {
      console.log(playerHighestSum, "break========");
      break;
    }
    playerIndex3 += 1;
  }
  console.log("Ace cards conversion ------");
  console.log(playerHighestSum, "Player Highest Sum");
};

var getDealerHand = function () {
  dealerHand.push(shuffledDeck.pop());
  console.log(dealerHand[0].name, "Dealer hand 1");
  dealerHand.push(shuffledDeck.pop());
  console.log(dealerHand[1].name, "Dealer hand 2");
};
var checkDealerJQK = function () {
  var dealerIndex = 0;
  // if either cards have king, queen, jack, convert to 10.
  while (dealerHand.length > dealerIndex) {
    if (
      dealerHand[dealerIndex].name == "jack" ||
      dealerHand[dealerIndex].name == "queen" ||
      dealerHand[dealerIndex].name == "king"
    ) {
      dealerHand[dealerIndex].rank = 10;
    }
    dealerIndex += 1;
    console.log("Special cards determination ------");
    console.log(dealerHand[0].rank, "Dealer hand 1");
    console.log(dealerHand[1].rank, "Dealer hand 2");
  }
  dealerHighestSum = dealerHand[0].rank + dealerHand[1].rank;
  console.log(`Dealer <br><br> Total Sum = ${dealerHighestSum}`);
};
// if either cards have ace, determine whether
// (a) black jack
// (b) only possible sum
// (c) highest/lowest possible sum.
var checkDealerAce = function () {
  var dealerIndex2 = 0;
  // if either cards have ace, convert to 11.
  while (dealerHand.length > dealerIndex2) {
    if (dealerHand[dealerIndex2].name == "ace") {
      dealerHand[dealerIndex2].rank = 11;
    }
    dealerIndex2 += 1;
    console.log("Ace cards determination ------");
  }
  // Summation of cards
  var dealerCounter = 0;
  dealerHighestSum = 0;
  while (dealerCounter < dealerHand.length) {
    dealerHighestSum = dealerHighestSum + dealerHand[dealerCounter].rank;
    dealerCounter += 1;
  }
  console.log(dealerHighestSum, "Dealer Highest Sum =========");
  // Convert ace card if exceeds 21
  console.log("Ace cards conversion ------");
  var dealerIndex3 = 0;
  while (dealerIndex3 < dealerHand.length) {
    if (dealerHighestSum > 21) {
      if (dealerHand[dealerIndex3].name == "ace") {
        dealerHighestSum = dealerHighestSum - 10;
        console.log(dealerHighestSum, dealerIndex3);
      }
    } else if (dealerHighestSum < 21) {
      console.log(dealerHighestSum, "break========");
      break;
    }
    dealerIndex3 += 1;
  }
  console.log("Ace cards conversion ------");
  console.log(dealerHighestSum, "Dealer Highest Sum");
};

var playerHit = function () {
  // Player draws extra card
  playerHand.push(shuffledDeck.pop());
  console.log("Player additional card ");
  checkPlayerJQK(playerHand);
  checkPlayerAce(playerHand);
  console.log(playerHighestSum, "Player Total Sum After Ace");
};
var dealerHit = function () {
  // Dealer draws extra card if < 17
  dealerHand.push(shuffledDeck.pop());
  console.log("Dealer additional card ");
  checkDealerJQK(dealerHand);
  checkDealerAce(dealerHand);
  console.log(dealerHighestSum, "Dealer Total Sum After Ace");
};
var getGameOutcome = function (input) {
  // Determine blackjack wins, or bust
  if (gameMode == 0 || gameMode == 1) {
    if (playerHighestSum == 21) {
      overallOutcome = `GAME OVER! 🛑 <br> You win 🎉 <br><br> Congrats you have a Blackjack win! Your total is ${playerHighestSum} and the dealer's total is ${dealerHighestSum}!`;
    } else if (dealerHighestSum == 21) {
      overallOutcome = `GAME OVER! 🛑 <br> You lost 👎🏻 <br><br> Oh no you have lost! The dealer drew a black jack win! Your total is ${playerHighestSum} and the dealer's total is ${dealerHighestSum}!`;
    } else if (playerHighestSum > 21) {
      overallOutcome = `GAME OVER! 🛑 <br> You lost! 👎🏻 <br><br> Oh no you have lost! You have exceeded 21! <br><br> Your total is ${playerHighestSum} and the dealer's total is ${dealerHighestSum}!`;
    } else if (playerHighestSum < 21) {
      overallOutcome = `HIT OR STAND! 🧐 <br><br> Your current total is ${playerHighestSum}. <br><br> Key in "hit" or "stand" to continue the game.`;
    }
  }
  // If player enters stand mode
  if (gameMode == 2) {
    if (playerHighestSum == dealerHighestSum) {
      overallOutcome = `GAME OVER! 🛑 <br> It is a tie! 🎀 <br><br> your total is ${playerHighestSum} and the dealer's total is ${dealerHighestSum}!`;
    } else if (playerHighestSum > 21) {
      `GAME OVER! 🛑 <br> You lost! 👎🏻 <br><br> You have exceeded 21! <br><br> Your total is ${playerHighestSum} and the dealer's total is ${dealerHighestSum}!`;
    } else if (playerHighestSum > dealerHighestSum) {
      overallOutcome = `GAME OVER! 🛑 <br> You win! 🎉 <br><br> Your total is ${playerHighestSum} and the dealer's total is ${dealerHighestSum}!`;
    } else if (playerHighestSum < dealerHighestSum) {
      overallOutcome = `GAME OVER! 🛑 <br> You lost! 👎🏻 <br><br> Your total is ${playerHighestSum} and the dealer's total is ${dealerHighestSum}!`;
    }
  }
};

var main = function (input) {
  // Game mode 0, insert username & deal cards.
  if (gameMode == 0) {
    userName = input;
    getPlayerHand(shuffledDeck);
    getDealerHand(shuffledDeck);
    checkPlayerJQK(playerHand);
    checkPlayerAce(playerHand);
    checkDealerJQK(dealerHand);
    checkDealerAce(dealerHand);
    getGameOutcome(playerHand, dealerHand);
    console.log(getGameOutcome(playerHand, dealerHand), "Round 1 results");
    gameMode = gameMode + 1;
    console.log(gameMode, "===== Current Game Mode =======");
    return `Hi ${userName}!<br><br> ${overallOutcome} <br><br> You have drawn: <br><br> ${playerHand[0].name} of ${playerHand[0].suit}. <br><br> ${playerHand[1].name} of ${playerHand[1].suit}.`;
  } else if (gameMode == 1) {
    var hitCount = 1;
    getGameOutcome(playerHand, dealerHand);
    if (input == "hit") {
      gameMode = 1;
      playerHit(input);
      console.log("===== Hit successful =====");
      if (dealerHighestSum < 17) {
        dealerHit(dealerHand);
      }
      getGameOutcome(playerHand, dealerHand);
      console.log(gameMode, "===== Current Game Mode =======");
      hitCount += 1;
      return `Hi ${userName}!<br><br> ${overallOutcome} <br><br> The last card you drew was: <br><br> ${playerHand[hitCount].name} of ${playerHand[hitCount].suit}.`;
    } else if (input == "stand") {
      gameMode = 2;
      getGameOutcome(playerHand, dealerHand);
      console.log(gameMode, "===== Current Game Mode =======");
      return `Hi ${userName}!<br><br> ${overallOutcome} <br><br> The last card you drew was: <br><br> ${playerHand[hitCount].name} of ${playerHand[hitCount].suit}.`;
    }
  }
};
