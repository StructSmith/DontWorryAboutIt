let directionIndex = 0;
const glazeStrings = [
	"DADDYYY",
	"LeBonBon!",
	"LePookie"
];

const setRandomFlyDirection = (flyer: HTMLDivElement) => {
	directionIndex = (directionIndex + 1) % 4;
	switch (directionIndex) {
		case 0: {
			const boundingRect = flyer.getBoundingClientRect();
			flyer.classList.add("horizontal");
			flyer.style.left = -boundingRect.width / 2 + "px";
			flyer.style.top = (window.innerHeight / 2 - boundingRect.height / 2) + "px";
			break;
		}
		case 1: {
			flyer.style.fontSize = "15vw"
			flyer.classList.add("vertical");
			const boundingRect = flyer.getBoundingClientRect();
			flyer.style.left = (window.innerWidth / 2 - boundingRect.width / 2) + "px";
			flyer.style.top = -boundingRect.height + "px";
			break;
		}
		case 2: {
			const boundingRect = flyer.getBoundingClientRect();
			flyer.classList.add("diagonal1");
			flyer.style.left = -boundingRect.width / 2 + "px";
			flyer.style.top = -boundingRect.height / 2 + "px";
			break;
		}
		default: {
			const boundingRect = flyer.getBoundingClientRect();
			flyer.classList.add("diagonal2");
			flyer.style.left = window.innerWidth / 2 + "px";
			flyer.style.top = -boundingRect.height / 2 + "px";
			break;
		}
	}
}

export default (parent: HTMLElement) => {

	const flyingDiv = document.createElement("div");
	parent.appendChild(flyingDiv);
	flyingDiv.classList.add("flying-text");
	flyingDiv.innerHTML = glazeStrings[Math.round((Math.random() * glazeStrings.length)) % glazeStrings.length];
	flyingDiv.style.zIndex = "1000";
	setRandomFlyDirection(flyingDiv);
	return flyingDiv;
}
