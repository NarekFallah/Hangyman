var words = ['banana', 'apple', 'orange', 'strawberry', 'grape', 'raspberry', 'blueberry', 'kiwi', 'pineapple', 'mango', 'able', 'account', 'across', 'against', 'about', 'crack', 'bridge', 'attack', 'butter', 'button', 'destruction', 'mango', 'distribution', 'direction', 'event', 'expansion', 'edge', 'food', 'guide', 'hair', 'grass', 'heat', 'horse', 'hour', 'I', 'increase', 'humour', 'important', 'leaf', 'late', 'leather', 'match', 'measure', 'mine', 'office', 'opposite', 'paper'];
var word = '';
var guesses = [];
var wrongGuesses = 0;
var maxWrongGuesses = 6;
var hangmanImages = [
  'hangman1.png', 'hangman2.png', 'hangman3.png', 'hangman4.png', 'hangman5.png', 'hangman6.png', 'hangman7.png'
]

function pickWord() {
  word = words[Math.floor(Math.random() * words.length)];
}

// Start the game once the page is fully loaded
window.onload = function() {
  pickWord();
  displayWord();
}

function displayWord() {
  var wordElement = document.getElementById('word');
  var displayWord = '';

  for (var i = 0; i < word.length; i++) {
    if (guesses.indexOf(word[i]) === -1) {
      displayWord += '_ ';
    } else {
      displayWord += word[i] + ' ';
    }
  }

  wordElement.textContent = displayWord;
}

function resetGame() {
  word = '';
  guesses = [];
  wrongGuesses = 0;
  document.getElementById('hangmanpic').src = 'hangman1.png';
  document.getElementById('guessedLetters').textContent = '';  // Clear the guessed letters list
  document.getElementById('status').textContent = '';  // Clear the status message
  pickWord();
  displayWord();
}


function guessWholeWord() {
  var guessWordInput = document.getElementById('guessWord');
  var guess = guessWordInput.value;
  guessWordInput.value = ''; // Clear the input field

  if (guess === word) {
    alert('Congratulations! You guessed the word.');
    resetGame();
  } else {
    alert('Sorry, that was not the correct word. Keep guessing!');
  }
}
function guessSingleLetter() {
  var guessLetterInput = document.getElementById('guessLetter');
  var guess = guessLetterInput.value;
  guessLetterInput.value = ''; // Clear the input field

  if (guesses.includes(guess)) {
    alert('You already guessed that letter!');
    return;
  }

  guesses.push(guess);

  var guessedLettersElement = document.getElementById('guessedLetters');
  guessedLettersElement.textContent = 'Guessed Letters: ' + guesses.join(', ');

  if (word.includes(guess)) {
    displayWord();
    if (!document.getElementById('word').textContent.includes('_')) {
      alert('Congratulations! You guessed the word.');
      // No need to reset the game here. It will reset when the "Reset Game" button is clicked
    }
  } else {
    wrongGuesses++;
    displayHangmanImage();
    if (wrongGuesses === maxWrongGuesses) {
      document.getElementById('status').textContent = 'You Lost!';
      // No need to reset the game here. It will reset when the "Reset Game" button is clicked
    } else {
      alert('Sorry, that letter is not in the word. Keep guessing!');
    }
  }
}

function displayHangmanImage() {
  var hangmanImageElement = document.getElementById('hangmanpic');
  hangmanImageElement.src = hangmanImages[wrongGuesses];
}
