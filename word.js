var Letter = require("./letter.js");

function Word(answer) {
  //create an arrary for letter object
  this.objArray = [];

  for (var i = 0; i < answer.length; i++) {
    var letter = new Letter(answer[i]);
    this.objArray.push(letter);
  }
  // create a log function for answerLog
  this.log = function () {
    answerLog = "";
    for (var i = 0; i < this.objArray.length; i++) {
      answerLog += this.objArray[i] + " ";
    }
    console.log(answerLog + "\n========================\n");
  };
  // check guess
  this.userGuess = function (input) {
    for (var i = 0; i < this.objArray.length; i++) {
      this.objArray[i].guess(input);
    }
  };
}
// export to the word function
module.exports = Word;