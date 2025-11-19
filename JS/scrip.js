const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,3,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,1,
  1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,0,0,1,
  1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1
];

const width = 28;
const height = 13;

const grid = document.getElementById('grid');
const pacman = document.getElementById('pacman');
const squares = [];

function createGrid() {
  for(let i=0; i<layout.length; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    if(layout[i] === 1) square.classList.add('wall');
    else if(layout[i] === 0) square.classList.add('dot');
    else if(layout[i] === 3) square.classList.add('power-pellet');
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

let pacmanCurrentIndex = 28 * 10 + 1;

function setPacmanPosition() {
  const row = Math.floor(pacmanCurrentIndex / width);
  const col = pacmanCurrentIndex % width;
  pacman.style.top = (row * 21) + 'px';
  pacman.style.left = (col * 21) + 'px';
}

setPacmanPosition();

window.addEventListener('keydown', function(e) {
  let nextIndex = pacmanCurrentIndex;
  if(e.key === 'ArrowUp') nextIndex -= width;
  else if(e.key === 'ArrowDown') nextIndex += width;
  else if(e.key === 'ArrowLeft') nextIndex -= 1;
  else if(e.key === 'ArrowRight') nextIndex += 1;

  if(layout[nextIndex] !== 1) {
    pacmanCurrentIndex = nextIndex;
    setPacmanPosition();
    eatDot();
  }
});

function eatDot() {
  if(layout[pacmanCurrentIndex] === 0) {
    layout[pacmanCurrentIndex] = 4;
    squares[pacmanCurrentIndex].classList.remove('dot');
  }
}

const ghosts = [
  { currentIndex: 28 * 3 + 3, element: null, color: 'red' },
  { currentIndex: 28 * 3 + 4, element: null, color: 'pink' },
  { currentIndex: 28 * 3 + 5, element: null, color: 'blue' },
  { currentIndex: 28 * 3 + 6, element: null, color: 'orange' }
];

function createGhosts() {
  ghosts.forEach(ghost => {
    const ghostEl = document.createElement('div');
    ghostEl.classList.add('ghost', ghost.color);
    grid.appendChild(ghostEl);
    ghost.element = ghostEl;
    moveGhost(ghost);
  });
}

function moveGhost(ghost) {
  setInterval(() => {
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    let nextIndex = ghost.currentIndex + direction;

    if(layout[nextIndex] !== 1 && nextIndex >= 0 && nextIndex < layout.length) {
      ghost.currentIndex = nextIndex;
    }

    const row = Math.floor(ghost.currentIndex / width);
    const col = ghost.currentIndex % width;
    ghost.element.style.top = (row * 21) + 'px';
    ghost.element.style.left = (col * 21) + 'px';

    if(ghost.currentIndex === pacmanCurrentIndex){
      alert('¡Perdiste! Un enemigo te atrapó.');
      window.location.reload();
    }
  }, 500);
}

createGhosts();
