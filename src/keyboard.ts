const keysRows = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["Z", "X", "C", "V", "B", "N", "M"],
];

export const createKeyboard = (
	letterPress: (key: string) => void,
	submitPress: () => void,
	backspacePress: () => void
) => {
	const keyboardContainer = document.createElement("div");
	for (let i = 0; i < keysRows.length; i++) {
		const row = document.createElement("div");
		row.classList.add("keyboard-row");
		keyboardContainer.appendChild(row);
		const keyStrings = keysRows[i];
		for (let j = 0, l = keyStrings.length; j < l; j++) {
			const key = document.createElement("button");
			key.innerHTML = keyStrings[j];
			key.classList.add("keyboard-key");
			key.onclick = () => letterPress(keyStrings[j]);
			row.appendChild(key);
		}
	}

	const lastKeyRow = keyboardContainer.lastChild!;

	const enterButton = document.createElement("button");
	enterButton.classList.add("keyboard-key", "enter");
	enterButton.innerHTML = "ENTER";
	enterButton.onclick = () => submitPress();

	const backspaceButton = document.createElement("button");
	backspaceButton.classList.add("keyboard-key", "backspace");
	backspaceButton.innerHTML = "BACK";
	backspaceButton.onclick = () => backspacePress();

	lastKeyRow.insertBefore(enterButton, lastKeyRow.firstChild!)
	lastKeyRow.appendChild(backspaceButton);

	return keyboardContainer;
}
