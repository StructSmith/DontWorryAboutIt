import config from './config';
import { createKeyboard } from './keyboard';
import loserStrings from './loserStrings';
import winningWords from './winningWords';
import { newWordGrid } from './wordGrid';
const body = document.getElementsByTagName("body")[0]!;
const resultDisplay = document.getElementById("result-display")!;
const wordGrid = document.getElementById("word-grid")!;
const keyboard = document.getElementById("keyboard-keys")!;
const wordAnswer = "LEBRON";
import './style.css'
import './crown.css'
import glazeFlyers from './glazeFlyers';
import { setSovled, setWon, solved, won } from './persistance';
let letterElementRows: HTMLDivElement[][] | undefined = undefined;
let attempt = 0;
let word: string[] = [];

const handleHints = () => {
  const wordLenth = word.length;
  for (let i = 0; i < wordLenth; i++) {
    const letter = word[i];
    const indexOfLetter = wordAnswer.indexOf(letter);
    if (indexOfLetter != -1) {
      if (indexOfLetter == i) {
        letterElementRows![attempt][i].classList.add("result-correct");
      } else {
        letterElementRows![attempt][i].classList.add("result-partial");
      }
    } else {
      letterElementRows![attempt][i].classList.add("result-incorrect");
    }
  }
}

const onWin = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const flyer = glazeFlyers(body);
      setTimeout(() => body.removeChild(flyer), 1500);
    }, i * 400);
  }
  for (let i = 0, l = word.length; i < l; i++) {
    letterElementRows![attempt][i].classList.remove("result-partial");
    letterElementRows![attempt][i].classList.remove("result-incorrect");
    letterElementRows![attempt][i].classList.add("result-correct");
  }
  setWon(true);
  if (!solved()) {
    setSovled(true);
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
  if (won()) return;
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
  if (won()) return;
  const wordString = word.join("");
  if (wordString == wordAnswer || (solved() && winningWords.has(wordString))) {
    handleHints();
    const winningSentences = winningWords.get(wordString)!;
    resultDisplay.innerHTML = winningSentences[Math.round(Math.random() * winningSentences.length) % winningSentences.length];
    onWin();
  } else if (attempt === config.attempts - 1) {
    resultDisplay.innerHTML = loserStrings[Math.round(Math.random() * loserStrings.length) % loserStrings.length];
  } else {
    handleHints();
    removeCrown();
    attempt++;
    word = [];
  }
}

const onBackspace = () => {
  if (won()) return;
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
