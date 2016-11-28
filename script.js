// DOM
var game = document.getElementById("game");
var intro = document.getElementById("intro");
var btn = document.getElementById("btn");
var feed = document.getElementById("feed");
var scoreBoardPc = document.getElementById("number-score-pc");
var scoreBoardHuman = document.getElementById("number-score-human");

// Main array
var main = [
  [false, false, false],
  [false, false, false],
  [false, false, false]
];
// Global Variables
var humanLetter = "x";
var pcLetter = "o"
var turn = 0;
var userName = "";
var scorePc = 0;
var scoreHuman = 0;
var gameOver = false;


// gets values from intro and start game
btn.addEventListener("click", function() {
  var input = document.getElementsByTagName("input");
  var ScoreBoardName = document.getElementById("user-name");
  if(input[0].value != "") {
    userName = input[0].value;
    ScoreBoardName.innerHTML = '<p>' + userName + '</p>';
  }
  //gets letter option (x or o) from intro screen
  var e = document.getElementById("menu1");
  var value = e.options[e.selectedIndex].value;
  selectUserLetter(value);
  // intro disapires
  intro.className = "animate-out popup";
});

//set player letter
var selectUserLetter = function (letter) {
  if(letter !== humanLetter) {
    humanLetter = "o";
    pcLetter = "x"
  }
}
//check if spot is empty
var checkIfEmpty = function(rowNum, colNum) {
  return (main[rowNum][colNum] === false);
}
var randomNum = function(maxNum) {
   var num = Math.floor((Math.random() * maxNum));
   return num
}
// player updates board and array
var updateBoard = function(e) {
  // takes row and colum numer
  var row = e.target.parentNode.id.slice(-1);
  var num = e.target.getAttribute("class");
  // convert class/id data to number
  row = parseFloat(row);
  num = parseFloat(num);
  // if the spot is empty
  if (checkIfEmpty(row, num)) {
    // inster x in div and updates array
    e.target.innerHTML = humanLetter;
    main[row][num] = humanLetter;
    turn++
    gameWinner(humanLetter);
    pcTurn();
  }
}

game.addEventListener("click", updateBoard);

//pc update board and array
var pcUpdateBoard = function(x, y) {
  var pc = document.getElementById("row" + x);
  pc.children[y].innerHTML = pcLetter;
  main[x][y] = pcLetter;
  turn++
}

var pcTurn = function() {
  if(!gameOver) {
  smartPlay();
  gameWinner(pcLetter);
  }
}

// AI?
var smartPlay = function() {
    //first move

    if(turn === 1 && checkIfEmpty(1,1)) {
      pcUpdateBoard(1,1);
      return;
    } else if(turn === 1 && !checkIfEmpty(1,1)) {
      var arrPosition = [0, 2];
      var row = randomNum(arrPosition.length);
      var col = randomNum(arrPosition.length);
      pcUpdateBoard(arrPosition[row],arrPosition[col]);
      return;
    }

    // checks for a WINNER move in ROWS
    for(var i = 0; i < 3; i++) {
        if(main[i][0] === pcLetter && main[i][1] === pcLetter && checkIfEmpty(i,2)) {
          pcUpdateBoard(i,2);
          return;
        } else if(main[i][0] === pcLetter && main[i][2] === pcLetter && checkIfEmpty(i,1)) {
          pcUpdateBoard(i,1);
          return;
        } else if(main[i][1] === pcLetter && main[i][2] === pcLetter && checkIfEmpty(i,0)) {
          pcUpdateBoard(i,0);
          return;
        }
    }
    // checks for a WINNER move in COLUMS
    for(var i = 0; i < 3; i++) {
        if(main[0][i] === pcLetter && main[1][i] === pcLetter && checkIfEmpty(2,i)) {
          pcUpdateBoard(2,i);
          return;
        } else if(main[0][i] === pcLetter && main[2][i] === pcLetter && checkIfEmpty(1,i)) {
          pcUpdateBoard(1,i);
          return;
        } else if(main[1][i] === pcLetter && main[2][i] === pcLetter && checkIfEmpty(0,i)) {
          pcUpdateBoard(0,i);
          return;
        }
    }
    // checks for a WINNER move diagonal, first from top left to bottom right
    if(main[0][0] === pcLetter && main[1][1] === pcLetter && checkIfEmpty(2,2)) {
      pcUpdateBoard(2,2);
      return;
    } else if(main[0][0] === pcLetter && main[2][2] === pcLetter && checkIfEmpty(1,1)) {
      pcUpdateBoard(1,1);
      return;
    } else if(main[1][1] === pcLetter && main[2][2] === pcLetter && checkIfEmpty(0,0)) {
      pcUpdateBoard(0,0);
      return; // from top right to bottom left
    } else if(main[0][2] === pcLetter && main[1][1] === pcLetter && checkIfEmpty(2,0)) {
      pcUpdateBoard(2,0);
      return;
    } else if(main[0][2] === pcLetter && main[2][0] === pcLetter && checkIfEmpty(1,1)) {
      pcUpdateBoard(1,1);
      return;
    } else if(main[1][1] === pcLetter && main[2][0] === pcLetter && checkIfEmpty(0,2)) {
      pcUpdateBoard(0,2);
      return;
    }
    //checks for a diangonal play from human
    if (main[0][0] === humanLetter && main[1][1] === humanLetter && checkIfEmpty(2,2)) {
      pcUpdateBoard(2,2);
      return;
    } else if (main[0][0] === humanLetter && main[2][2] === humanLetter && checkIfEmpty(1,1)) {
      pcUpdateBoard(1,1);
      return;
    } else if (main[1][1] === humanLetter && main[2][2] === humanLetter && checkIfEmpty(0,0)) {
      pcUpdateBoard(0,0);
      return;
    } else if (main[0][2] === humanLetter && main[1][1] === humanLetter && checkIfEmpty(2,0)) {
      pcUpdateBoard(2,0);
      return;
    } else if (main[0][2] === humanLetter && main[2][0] === humanLetter && checkIfEmpty(1,1)) {
      pcUpdateBoard(1,1);
      return;
    } else if (main[1][1] === humanLetter && main[2][0] === humanLetter && checkIfEmpty(0,2)) {
      pcUpdateBoard(0,2);
      return;
    }
    //checks for a column play from human
    for(var i = 0; i < 3; i++) {
      if (main[0][i] === humanLetter && main[1][i] === humanLetter && checkIfEmpty(2,i)) {
        pcUpdateBoard(2,i);
        return;
      } else if (main[0][i] === humanLetter && main[2][i] === humanLetter && checkIfEmpty(1,i)) {
        pcUpdateBoard(1,i);
        return;
      } else if (main[1][i] === humanLetter && main[2][i] === humanLetter && checkIfEmpty(0,i)) {
        pcUpdateBoard(0,i);
        return;
      }
    }
    //checks for a row play from human
    for(var i = 0; i < 3; i++) {
      if (main[i][0] === humanLetter && main[i][1] === humanLetter && checkIfEmpty(i,2)) {
        pcUpdateBoard(i,2);
        return;
      } else if (main[i][0] === humanLetter && main[i][2] === humanLetter && checkIfEmpty(i,1)) {
        pcUpdateBoard(i,1);
        return;
      } else if (main[i][1] === humanLetter && main[i][2] === humanLetter && checkIfEmpty(i,0)) {
        pcUpdateBoard(i,0);
        return;
      }
    }
    // computer has center, if human did not play a good move.
    if(main[1][1] === pcLetter) {
      if (main[0][2] === humanLetter && main[2][0] === humanLetter&& checkIfEmpty(2,2)) {
        pcUpdateBoard(2,1);
        return;
      } else if (checkIfEmpty(0,0) && checkIfEmpty(2,2)) {
        pcUpdateBoard(0,0);
        return;
      } else if (checkIfEmpty(0,1) && checkIfEmpty(2,1)) {
        pcUpdateBoard(0,1);
        return;
      } else if (checkIfEmpty(0,2) && checkIfEmpty(2,0)) {
        pcUpdateBoard(0,2);
        return;
      }
    }
    // looks for empty space a makes a play as a last option
      for (var i = 0; i < main.length; i++) {
        for (var j = 0; j < main[i].length; j++) {
          if(main[i][j] === false) {
              pcUpdateBoard(i, j);
              return;
          }
        }
      }

} //<----- end of smartPlay function


// calls feedback and restart the game
var winnerFeedBack = function (player) {
  if (player === pcLetter) {
    displayFeedback("Computer");
    scorePc++;
    scoreBoardPc.innerHTML = scorePc;
  } else {
    displayFeedback(userName);
    scoreHuman++;
    scoreBoardHuman.innerHTML = scoreHuman;
    gameOver = true;
  }
}
// display feedback
var displayFeedback = function(playerName) {
  feed.className = "animate-in popup";
  feed.innerHTML = '<h2>' + playerName + ' Wins!</h2><button id="btnReplay">Play Again</button>';
  btnReset();
}
// button to play again
var btnReset = function() {
  var btnReplay = document.getElementById("btnReplay");
  btnReplay.addEventListener("click", function() {
    feed.className = "animate-out popup";
    resetGame();
  });
}
var resetGame = function() {
  gameOver = false;
  turn = 0;
  main = [[false, false, false],[false, false, false],[false, false, false]];
  for (var i = 0; i < main.length; i++) {
    for (var j = 0; j < main[i].length; j++) {
      main[i][j] === false;
      clearBoard(i,j);
    }
  }
}
//clear board
var clearBoard = function(x, y) {
  var row = document.getElementById("row" + x);
  row.children[y].innerHTML = "";
}
//////////----check for winner move----//////////
var gameWinner = function(playerLetter) {
  checkRows(playerLetter);
  checkCol(playerLetter);
  checkDiagonal(playerLetter);
  if(turn === 9) {
    displayFeedback("Nobody");
  }
}
var checkCol = function (input) {
  if(main[0][0] === input && main[1][0] === input && main[2][0] === input) {
     winnerFeedBack(input);
  } else if (main[0][1] === input && main[1][1] === input && main[2][1] === input) {
     winnerFeedBack(input);
  } else if (main[0][2] === input && main[1][2] === input && main[2][2] === input) {
     winnerFeedBack(input);
  }
}
var checkDiagonal = function (input) {
  if(main[0][0] === input && main[1][1] === input && main[2][2] === input) {
     winnerFeedBack(input);
  } else if (main[2][0] === input && main[1][1] === input && main[0][2] === input) {
     winnerFeedBack(input);
  }
}
var checkRows = function (input) {
var count = 0;
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      if(main[i][j] === input) {
        count++
      }
    }
    if(count === 3) {
      winnerFeedBack(input);
      return;
    } else {
      count = 0;
    }
  }
}
