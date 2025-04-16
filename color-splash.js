const colorPicker = document.getElementById('colorPicker');
let brushSize = 1;
let isRainbowMode = false;

// SVGs to choose from
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

// DOM setup
const pictureSelect = document.getElementById("pictureSelect");
const svgContainer = document.getElementById("svgContainer");

// Load SVG function
function loadSVG(name) {
  svgContainer.innerHTML = svgs[name];
  const newSVG = document.getElementById("coloringSVG");

  // Click-to-color logic
  newSVG.addEventListener("click", (e) => {
    if (e.target.tagName !== 'svg') {
      const color = isRainbowMode ? getRandomColor() : colorPicker.value;
      e.target.setAttribute('fill', color);
    }
  });
}

// Load default SVG
loadSVG("Shapes");

// Listen for dropdown changes
pictureSelect.addEventListener("change", (e) => {
  loadSVG(e.target.value);
});

// Brush size logic
function setBrushSize(size) {
  brushSize = size;
  const label = size === 1 ? "Small" : size === 3 ? "Medium" : "Large";
  document.getElementById('brushDisplay').innerText = `Current Brush Size: ${label}`;
}

// Rainbow mode toggle
function toggleRainbow() {
  isRainbowMode = !isRainbowMode;
  document.getElementById('rainbowStatus').innerText = `Rainbow Mode: ${isRainbowMode ? "ON" : "OFF"}`;
}

// Random color generator
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Download (to be improved for SVG)
function downloadArt() {
  html2canvas(svgContainer).then(canvas => {
    const link = document.createElement('a');
    link.download = 'color-splash-art.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
 
//Reset 
function resetGrid() {
    const svg = document.getElementById("coloringSVG");
    if (!svg) return;
  
    const colorableElements = svg.querySelectorAll("rect, circle, polygon, path");
  
    colorableElements.forEach(el => {
      el.setAttribute("fill", "white");
    });
  }
  