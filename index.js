var Word = require("./word.js");
var inquirer = require("inquirer");

// create an arrry for letters
var letterArray = "abcdefghijklmnopqrstuvwxyz";

// create list of words to choose from
var months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "novemver",
  "december",

];

// Pick Random index from months array
var randomIndex = Math.floor(Math.random() * months.length);
var randomWord = months[randomIndex];

// Pass random word through Word constructor
var computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function theLogic() {
  // Generates new word for Word constructor if true
  if (requireNewWord) {
    // Selects random months array
    var randomIndex = Math.floor(Math.random() * months.length);
    var randomWord = months[randomIndex];

    // Pass random word through the Word constructor
    computerWord = new Word(randomWord);

    requireNewWord = false;
  }

  // Test if a letter guessed is correct
  var wordComplete = [];
  computerWord.objArray.forEach(completeCheck);

  // letters remaining to be guessed
  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter between A-Z!",
          name: "userinput"
        }
      ])
      .then(function (input) {
        if (
          !letterArray.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\nWrong letter, guess again!\n");
          theLogic();
        }
        else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log("\nPreviously guessed letter\n");
            theLogic();
          }
          else {
            // Checks if guess is correct
            var wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            // Checks if guess is correct
            computerWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\nIncorrect\n");

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            }
            else {
              console.log("\nCorrect!\n");

              correctLetters.push(input.userinput);
            }

            computerWord.log();

            // Print guesses left
            console.log("Guesses Left: " + guessesLeft + "\n");

            // Print letters guessed already
            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );

            // Guesses left
            if (guessesLeft > 0) {
              // Call function
              theLogic();
            }
            else {
              console.log("Loser!\n");

              restartGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  }
  else {
    console.log("YOU WIN!\n");

    restartGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would like to do next?:",
        choices: ["Play Again", "Exit"],
        name: "restart"
      }
    ])
    .then(function (input) {
      if (input.restart === "Play Again") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        theLogic();
      }
      else {
        return;
      }
    });
}

theLogic();