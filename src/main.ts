import config from './config';
import { createKeyboard } from './keyboard';
import loserStrings from './loserStrings';
import winningWords from './winningWords';
import { newWordGrid } from './wordGrid';
const body = document.getElementsByTagName("body")[0]!;
const resultDisplay = document.getElementById("result-display")!;
const wordGrid = document.getElementById("word-grid")!;
const keyboard = document.getElementById("keyboard-keys")!;
import './style.css'
import './crown.css'
import glazeFlyers from './glazeFlyers';
let letterElementRows: HTMLDivElement[][] | undefined = undefined;
let attempt = 0;
let word: string[] = [];

const onWin = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const flyer = glazeFlyers(body);
      setTimeout(() => body.removeChild(flyer), 1200);
    }, i * 400);
  }
}

const addCrown = () => {
  letterElementRows![attempt][5].classList.remove("hidden");
  letterElementRows![attempt][6].classList.remove("hidden");
  wordGrid.classList.add("make-room-for-the-goat");
}
const removeCrown = () => {
  letterElementRows![attempt][5].classList.add("hidden");
  letterElementRows![attempt][6].classList.add("hidden");
  wordGrid.classList.remove("make-room-for-the-goat");
}

const onKeyPress = (letter: string) => {
  if (word.length < config.wordSize || (letter == "N" && word.join("") == "LEBRO")) {
    letterElementRows![attempt][word.length].innerHTML = letter;
    word.push(letter);
  }
  const joinedWord = word.join("");
  if (joinedWord == "LEBRO" || joinedWord == "LEBRON") {
    addCrown();
  } else {
    removeCrown();
  }
}

const onSubmit = () => {
  const wordString = word.join("");
  if (winningWords.has(wordString)) {
    resultDisplay.innerHTML = winningWords.get(wordString)!;
    onWin();
  } else if (attempt === config.attempts - 1) {
    resultDisplay.innerHTML = loserStrings[Math.round(Math.random() * loserStrings.length) % loserStrings.length];
  } else {
    removeCrown();
    attempt++;
    word = [];
  }
}

const onBackspace = () => {
  if (word.length > 0) {
    word.pop();
    letterElementRows![attempt][word.length].innerHTML = "";
  }
  removeCrown();
}

body.onload = () => {
  let [wordGridContainer, letterCellRows] = newWordGrid(config.wordSize);
  letterElementRows = letterCellRows;
  wordGrid.appendChild(wordGridContainer);
  const keyboardContainer = createKeyboard(onKeyPress, onSubmit, onBackspace);
  keyboard.appendChild(keyboardContainer);
  window.addEventListener("keydown", ({ key }: KeyboardEvent) => {
    if (key == "Backspace") {
      onBackspace();
    } else if (key == "Enter") {
      onSubmit();
    } else if (key.length == 1 && key.charAt(0).match(/[a-z]/i)) {
      onKeyPress(key.charAt(0).toUpperCase());
    }
  })
}
