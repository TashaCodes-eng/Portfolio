const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorPicker');
let brushSize = 1;
let isRainbowMode = false;



// Create the grid
function setBrushSize(){
    brushSize = size
}

for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', () => {
    paintCellsAround(i, brushSize)
  });
  grid.appendChild(cell);
}

function resetGrid() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.style.backgroundColor = '#ffffff');
}

function paintCellsAround(index, size) {
    const cells = document.querySelectorAll('.cell');
    const gridSize = 10; // 10x10 grid
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const half = Math.floor(size / 2);
  
    for (let r = row - half; r <= row + half; r++) {
      for (let c = col - half; c <= col + half; c++) {
        const neighborIndex = r * gridSize + c;
        if (r >= 0 && r < gridSize && c >= 0 && c < gridSize && cells[neighborIndex]) {
            const color = isRainbowMode ? getRandomColor() : colorPicker.value;
            cells[neighborIndex].style.backgroundColor = color;
            
            cells[neighborIndex].classList.add('flash');
             setTimeout(() => {
             cells[neighborIndex].classList.remove('flash');
            }, 300);
        }
      }
    }
  }
  // Add Brush Sizes
  function setBrushSize(size) {
    brushSize = size;
    const label = size === 1 ? "Small" : size === 3 ? "Medium" : "Large";
    document.getElementById('brushDisplay').innerText = `Current Brush Size: ${label}`;
  }

// Add rainbow feature
  function toggleRainbow() {
    isRainbowMode = !isRainbowMode;
    document.getElementById('rainbowStatus').innerText = `Rainbow Mode: ${isRainbowMode ? "ON" : "OFF"}`;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  
  

