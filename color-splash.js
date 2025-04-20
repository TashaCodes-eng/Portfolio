const colorPicker = document.getElementById('colorPicker');
const svgContainer = document.getElementById("svgContainer");
const eraserBtn = document.getElementById("eraserButton");
const canvas = document.getElementById("drawingCanvas");
const pen = canvas.getContext("2d");
const picture = document.getElementById("pictureSelectContainer")

let isDrawing = false;
let brushSize = 1;
let isRainbowMode = false;
let currentMode = "color";  
let isErasing = false;     

// Toggle drawing or coloring
function setMode(mode) {
    currentMode = (mode === 'erase') ? 'draw' : mode;
    isErasing = (mode === 'erase');
  
    svgContainer.style.display = currentMode === "color" ? "block" : "none";
    canvas.style.display = currentMode === "draw" ? "block" : "none";
    eraserBtn.style.display = currentMode === "draw" ? "inline-block" : "none";
    picture.style.display = currentMode === "color" ? "block" : "none";
  
    document.getElementById("modeStatus").innerText =
      `Current Mode: ${isErasing ? "Erase (Draw)" : capitalize(currentMode)}`;
  
    canvas.style.pointerEvents = (currentMode === "draw") ? "auto" : "none";
  }  

// Helper to capitalize
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// SVGs
const svgs = {
  "Shapes": `
    <svg id="coloringSVG" width="400" height="400" viewBox="0 0 200 200">
      <rect x="10" y="10" width="80" height="80" fill="white" stroke="black" stroke-width="2"/>
      <circle cx="150" cy="50" r="40" fill="white" stroke="black" stroke-width="2"/>
      <polygon points="100,150 120,190 80,190" fill="white" stroke="black" stroke-width="2"/>
    </svg>
  `,
  "Sunshine": `
    <svg id="coloringSVG" width="400" height="400" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="40" fill="white" stroke="orange" stroke-width="3"/>
      <line x1="100" y1="10" x2="100" y2="40" stroke="orange" stroke-width="4"/>
      <line x1="100" y1="160" x2="100" y2="190" stroke="orange" stroke-width="4"/>
      <line x1="10" y1="100" x2="40" y2="100" stroke="orange" stroke-width="4"/>
      <line x1="160" y1="100" x2="190" y2="100" stroke="orange" stroke-width="4"/>
    </svg>
  `,
  "House": `
    <svg id="coloringSVG" width="400" height="400" viewBox="0 0 200 200">
      <rect x="50" y="80" width="100" height="80" fill="white" stroke="black" stroke-width="2"/>
      <polygon points="50,80 100,30 150,80" fill="white" stroke="black" stroke-width="2"/>
      <rect x="85" y="110" width="30" height="50" fill="white" stroke="black" stroke-width="2"/>
    </svg>
  `
};

const pictureSelect = document.getElementById("pictureSelect");

// Load selected SVG
function loadSVG(name) {
  svgContainer.innerHTML = svgs[name];
  const newSVG = document.getElementById("coloringSVG");

  newSVG.addEventListener("click", (e) => {
    if (e.target.tagName !== 'svg') {
      const color = isRainbowMode ? getRandomColor() : colorPicker.value;
      e.target.setAttribute('fill', color);
    }
  });
}

// Load default
loadSVG("Shapes");

// Dropdown listener
pictureSelect.addEventListener("change", (e) => {
  loadSVG(e.target.value);
});

// Brush size
function setBrushSize(size) {
  brushSize = size;
  const label = size === 1 ? "Small" : size === 3 ? "Medium" : "Large";
  document.getElementById('brushDisplay').innerText = `Current Brush Size: ${label}`;
}

// Rainbow mode
function toggleRainbow() {
  isRainbowMode = !isRainbowMode;
  document.getElementById('rainbowStatus').innerText = `Rainbow Mode: ${isRainbowMode ? "ON" : "OFF"}`;
}

// Random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Save art
function downloadArt() {
  html2canvas(svgContainer).then(canvas => {
    const link = document.createElement('a');
    link.download = 'color-splash-art.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Reset SVG fill
function resetGrid() {
  const svg = document.getElementById("coloringSVG");
  if (!svg) return;

  const colorableElements = svg.querySelectorAll("rect, circle, polygon, path");

  colorableElements.forEach(el => {
    el.setAttribute("fill", "white");
  });

  // Also clear canvas if in draw mode
  if (canvas && pen) {
    pen.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Drawing events
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  draw(e);
});

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  pen.beginPath();
});

canvas.addEventListener("mouseout", () => {
  isDrawing = false;
  pen.beginPath();
});

// Drawing function
function draw(e) {
  if (!isDrawing || currentMode !== "draw") return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  pen.lineWidth = brushSize;
  pen.lineCap = "round";
  pen.strokeStyle = isErasing ? "#ffffff" : (isRainbowMode ? getRandomColor() : colorPicker.value);

  pen.lineTo(x, y);
  pen.stroke();
  pen.beginPath();
  pen.moveTo(x, y);
}

// Touch support for mobile drawing
canvas.addEventListener("touchstart", (e) => {
  if (currentMode !== "draw") return;
  isDrawing = true;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  pen.beginPath();
  pen.moveTo(x, y);
  e.preventDefault();
});

canvas.addEventListener("touchmove", (e) => {
  if (!isDrawing || currentMode !== "draw") return;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  pen.lineWidth = brushSize;
  pen.lineCap = "round";
  pen.strokeStyle = isErasing ? "#ffffff" : (isRainbowMode ? getRandomColor() : colorPicker.value);

  pen.lineTo(x, y);
  pen.stroke();
  pen.beginPath();
  pen.moveTo(x, y);
  e.preventDefault();
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
  pen.beginPath();
});

