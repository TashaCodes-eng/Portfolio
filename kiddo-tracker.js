// === SCHEDULE SECTION ===

function openSchedule() {
    document.querySelector(".card-container").style.display = "none";
  
    const storedTasks = JSON.parse(localStorage.getItem("scheduleTasks")) || [
      "🛏️ Wake up",
      "🍽️ Breakfast",
      "📚 Learning time",
      "🕹️ Play time",
      "🍎 Snack",
      "🛁 Bath",
      "🌙 Bedtime"
    ];
  
    let listItems = storedTasks
      .map(task => `<li class="task-card"><input type="checkbox"> ${task} <button onclick="removeTask(this)">❌</button></li>`)
      .join("");
  
    document.getElementById("interactive-area").innerHTML = `
      <h3>Today's Schedule</h3>
      <ul id="scheduleList">${listItems}</ul>
      <input type="text" id="newTaskInput" placeholder="Add a new task..." />
      <button id="addTaskBtn">Add</button>
      <br><br>
      <button onclick="goBack()">Back</button>
    `;
  
    setTimeout(() => {
      document.getElementById("addTaskBtn").addEventListener("click", addTask);
      new Sortable(document.getElementById("scheduleList"), {
        animation: 150,
        ghostClass: "dragging",
        onEnd: saveTasks
      });
    }, 0);
  }
  
  function addTask() {
    const input = document.getElementById("newTaskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;
  
    const li = document.createElement("li");
    li.className = "task-card";
    li.innerHTML = `<input type="checkbox"> ${taskText} <button onclick="removeTask(this)">❌</button>`;
    document.getElementById("scheduleList").appendChild(li);
  
    input.value = "";
    saveTasks();
  }
  
  function removeTask(btn) {
    const li = btn.parentElement;
    li.remove();
    saveTasks();
  }
  
  function saveTasks() {
    const taskElements = document.querySelectorAll("#scheduleList li");
    const tasks = Array.from(taskElements).map(li => li.textContent.replace("❌", "").trim());
    localStorage.setItem("scheduleTasks", JSON.stringify(tasks));
  }
  
  // === WANTS SECTION ===
  
  function openWants() {
    document.querySelector(".card-container").style.display = "none";
  
    const defaultWants = ["Snack", "Play", "Story", "Rest", "Talk"];
    const savedWants = JSON.parse(localStorage.getItem("wants")) || [];
  
    // Merge defaults with saved wants (remove duplicates)
    const allWants = [...new Set([...defaultWants, ...savedWants])];
  
    const cardsHTML = allWants.map(want =>
      `<div class="card want-card" onclick="showWant('${want}')">${getEmoji(want)} ${want}</div>`
    ).join("");
  
    document.getElementById("interactive-area").innerHTML = `
      <h3>What Do You Want?</h3>
      <div class="card-grid" id="want-cards">${cardsHTML}</div>
      <div class="input-container" style="text-align:center; margin-top: 1rem;">
        <input type="text" id="new-want-input" placeholder="Type your want here..." />
        <button onclick="addWantCard()">Add</button>
      </div>
      <br>
      <button onclick="goBack()">Back</button>
    `;
  }
  
  
  function addWantCard() {
    const input = document.getElementById("new-want-input");
    const wantText = input.value.trim();
    if (wantText === "") return;
  
    const newCard = document.createElement("div");
    newCard.className = "card want-card";
    newCard.textContent = `${getEmoji(wantText)} ${wantText}`;
    newCard.onclick = () => showWant(wantText);
  
    document.getElementById("want-cards").appendChild(newCard);
    input.value = "";
  
    // Save to localStorage
    const storedWants = JSON.parse(localStorage.getItem("wants")) || [];
    storedWants.push(wantText);
    localStorage.setItem("wants", JSON.stringify(storedWants));
  }
  
  function showWant(wantText) {
    const message = `I want ${wantText}!`;
    document.getElementById("interactive-area").innerHTML = `
      <div class="card response-card" style="margin: 0 auto;">
        <h2>${wantText}</h2>
        <p>${message}</p>
        <button onclick="goBack()">Back</button>
      </div>
    `;
  
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'en-US';
    speechSynthesis.speak(speech);
  }
  
  function getEmoji(text) {
    const map = {
      Snack: "🍎", Play: "🎮", Story: "📖", Rest: "💤", Talk: "👩‍👩‍👧"
    };
    return map[text] || "⭐️";
  }
  
  // === BACK BUTTON ===
  
  function goBack() {
    document.querySelector(".card-container").style.display = "flex";
    document.getElementById("interactive-area").innerHTML = "";
  }
  