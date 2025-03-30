import config from "./config";

export const newCrown = () => {
	const crown = document.createElement("div");
	crown.classList.add("crown", "hidden");

	for (let i = 0; i < 5; i++) {
		const point = document.createElement("div");
		point.classList.add("point");
		crown.appendChild(point);
	}

	return crown;
}

export const newWordGrid = (size: number): [HTMLDivElement, HTMLDivElement[][]] => {
	const container = document.createElement("div");
	const letterCellRows: HTMLDivElement[][] = [];
	container.classList.add("letter-container");

	for (let i = 0; i < config.attempts; i++) {
		letterCellRows.push([]);
		const row = document.createElement("div");
		row.classList.add("letter-row");
		for (let j = 0; j < size; j++) {
			const letterDiv = document.createElement("div")
			letterDiv.classList.add("letter");
			letterCellRows[i].push(letterDiv);
			row.appendChild(letterDiv);
		}
		const hiddenCrownDiv = document.createElement("div");
		hiddenCrownDiv.classList.add("hidden", "letter", "crown-letter");
		letterCellRows[i].push(hiddenCrownDiv);
		row.appendChild(hiddenCrownDiv)
		const crown = newCrown();
		row.appendChild(crown);
		letterCellRows[i].push(crown)

		container.appendChild(row);
	}

	return [container, letterCellRows];
}
