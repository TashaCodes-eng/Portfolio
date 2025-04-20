let currentSound = null;
let currentAnswer = '';
let currentGuessSound = null;

// 1. Sound Map
const animalSounds = {
    elephant: new Howl({ src: ['sounds/elephant.mp3'] }),
    monkey: new Howl({ src: ['sounds/monkey.wav'] }),
    bird: new Howl({ src: ['sounds/birds.wav'] }),
    drum: new Howl({ src: ['sounds/drums.mp3'] }),
    tiger: new Howl({ src: ['sounds/tiger.mp3'] }),
    lion: new Howl({ src: ['sounds/lion.wav'] }),
    frog: new Howl({ src: ['sounds/frogs.mp3'] }),
    snake: new Howl({ src: ['sounds/rattlesnake.mp3'] })
  };
  
  // 2. Play Function
  function playSound(animal) {
    if (currentSound && currentSound.playing()) {
      currentSound.stop();
    }
    currentSound = animalSounds[animal];
    currentSound.play();
  }
  
  // 3. Jungle Jam Section
  function startJungleJam() {
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
    <div class="jungle-jam-container">
    <h2 class="jungle-jam-title">🎶 Jungle Jam!</h2>
    <div class="jungle-buttons">
      <button onclick="playSound('elephant')">🐘 Elephant</button>
      <button onclick="playSound('monkey')">🐒 Monkey</button>
      <button onclick="playSound('bird')">🐦 Bird</button>
      <button onclick="playSound('drum')">🥁 Drum</button>
      <button onclick="playSound('tiger')">🐯 Tiger</button>
      <button onclick="playSound('lion')">🦁 Lion</button>
      <button onclick="playSound('frog')">🐸 Frog</button>
      <button onclick="playSound('snake')">🐍 Snake</button>
    </div>
  </div>
  
      <br>
      <button onclick="goBack()">🔙 Back</button>
    `;
  }
  
  // 4. Go Back to Menu
  function goBack() {
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
      <div class="menu">
      <button onclick="startJungleJam()">
      <div class="menu-content">
        Jungle Jam
        <img src="images/monkey.png" alt="monkey" />
      </div>
      </button>
      <button onclick="startGuessSound()">
      <div class="menu-content">
         Guess the Sound
        <img src="images/guess.png" alt="guess" />
      </div>
       </button>
      <button onclick="startMakeSoundtrack()">
      <div class="menu-content">
         Make a Soundtrack
        <img src="images/drum.png" alt="drum" />
      </div>
      </div>
    
  
    `;
  }
  
  function startGuessSound() {
    document.getElementById('game-area').innerHTML = `
      <div class="guess-sound-container">
        <h2 class="guess-title">🔊 Guess the Sound!</h2>
        <button onclick="playCurrentSound()">▶️ Play Sound</button>
        <div class="guess-options" id="guessOptions"></div>
        <div class="guess-result" id="guessResult"></div>
        <div class="guess-nav-buttons">
          <button onclick="nextGuess()">➡️ Next</button>
          <button onclick="goBack()">🔙 Back</button>
        </div>
      </div>
    `;
    nextGuess(); 
  }
  
  
  function nextGuess() {
    const animals = Object.keys(animalSounds);
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    currentAnswer = randomAnimal;
    currentGuessSound = animalSounds[randomAnimal];
  
    currentGuessSound.play();
    showGuessOptions();
  }
  
  const animalEmojis = {
    elephant: "🐘",
    monkey: "🐒",
    bird: "🐦",
    drum: "🥁",
    tiger: "🐯",
    lion: "🦁",
    frog: "🐸",
    snake: "🐍"
  };
  
  function showGuessOptions() {
    const options = Object.keys(animalSounds)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  
    // Ensure correct answer is included
    if (!options.includes(currentAnswer)) {
      options[Math.floor(Math.random() * 4)] = currentAnswer;
    }
  
    const container = document.getElementById('guessOptions');
    container.innerHTML = options
      .map(animal => `
        <button onclick="checkGuess('${animal}')">
          ${animalEmojis[animal]} ${animal.charAt(0).toUpperCase() + animal.slice(1)}
        </button>
      `)
      .join('');
  }  
  
  function checkGuess(guess) {
    const result = document.getElementById('guessResult');
    if (guess === currentAnswer) {
      result.textContent = '✅ Correct!';
      result.style.color = 'green';
    } else {
      result.textContent = '❌ Try Again!';
      result.style.color = 'red';
    }
  }
  
  let soundtrack = [];

  function startMakeSoundtrack() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
      <div class="make-soundtrack-container">
        <h2 class="make-title">🎼 Make a Soundtrack!</h2>
        <p class="make-instructions">Tap animals to build your own sound mix!</p>
        <div class="soundtrack-buttons">
          <button onclick="addToSoundtrack('elephant')">🐘 Elephant</button>
          <button onclick="addToSoundtrack('monkey')">🐒 Monkey</button>
          <button onclick="addToSoundtrack('bird')">🐦 Bird</button>
          <button onclick="addToSoundtrack('drum')">🥁 Drums</button>
          <button onclick="addToSoundtrack('tiger')">🐯 Tiger</button>
          <button onclick="addToSoundtrack('lion')">🦁 Lion</button>
          <button onclick="addToSoundtrack('frog')">🐸 Frog</button>
          <button onclick="addToSoundtrack('snake')">🐍 Snake</button>
        </div>
        
        <div id="soundtrackDisplay" class="soundtrack-display"></div>
  
        <div class="soundtrack-controls">
          <button onclick="playSoundtrack()">▶️ Play My Soundtrack</button>
          <button onclick="clearSoundtrack()">🧹 Clear</button>
          <button onclick="goBack()">🔙 Back</button>
        </div>
      </div>
    `;
  }
  

function addToSoundtrack(animal) {
    soundtrack.push(animal);
    updateSoundtrackDisplay();
  }  

  function updateSoundtrackDisplay() {
    const displayDiv = document.getElementById('soundtrackDisplay');
    displayDiv.innerHTML = soundtrack.map(animal => {
      switch (animal) {
        case 'elephant': return '🐘';
        case 'monkey': return '🐒';
        case 'bird': return '🐦';
        case 'drum': return '🥁';
        case 'tiger': return '🐯';
        case 'lion': return '🦁';
        case 'frog': return '🐸';
        case 'snake': return '🐍';
        default: return animal;
      }
    }).join(' ');
  }
  
function playSoundtrack() {
  if (soundtrack.length === 0) return;

  let index = 0;
  const playNext = () => {
    if (index < soundtrack.length) {
      playSound(soundtrack[index]);
      index++;
      setTimeout(playNext, 1200); 
    }
  };
  playNext();
}

function clearSoundtrack() {
    soundtrack = [];
    updateSoundtrackDisplay();
  }
  

  