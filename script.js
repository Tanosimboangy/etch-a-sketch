// select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shake = document.querySelector('.shake');
const moveButtons = document.querySelectorAll('.command');
const MOVE_AMOUNT = 20;
// setup our canvas for drawing
const { width, height } = canvas; // object destructuring (ES6)
// random x and y between 0 and width / height
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;

ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
// write a draw function
// ES6 parameter destructuring
const draw = ({ key }) => {
    hue = hue + 10;
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`
	console.log(key);
	ctx.beginPath();
	ctx.moveTo(x, y);
	// change x and y
	switch (key) {
		case 'ArrowUp':
			y -= MOVE_AMOUNT;
			break;
		case 'ArrowDown':
			y += MOVE_AMOUNT;
			break;
		case 'ArrowLeft':
			x -= MOVE_AMOUNT;
			break;
		case 'ArrowRight':
			x += MOVE_AMOUNT;
			break;
		default:
			break;
	}
	ctx.lineTo(x, y);
	ctx.stroke();
};
// write a handler for the keys (switch statement)
const handleKey = e => {
	if (e.key.includes('Arrow')) {
		console.log('HELLO ');
		draw({ key: e.key });
	}
};
// clear / shake function
const clearCanvas = () => {
    canvas.classList.add('shake');

    ctx.clearRect(0, 0, width, height);

    canvas.addEventListener('animation', () => {
        canvas.classList.remove('shake');
    }, { once: true });
};

const handleMoveButtons = event => {
	draw({ key: event.target.dataset.command })
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shake.addEventListener(('click'), clearCanvas);
moveButtons.forEach(button => button.addEventListener('click', handleMoveButtons));
