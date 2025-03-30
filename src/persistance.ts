let hasSolved = false
let hasWon = false;

export let solved = () => {
	return hasSolved;
}

export let setSovled = (b: boolean) => {
	hasSolved = b;
}

export let won = () => {
	return hasWon;
}

export let setWon = (b: boolean) => {
	hasWon = b;
}
