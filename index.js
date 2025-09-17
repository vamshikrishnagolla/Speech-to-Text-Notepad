// Setup Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

const noteArea = document.getElementById("noteArea");
const notesList = document.getElementById("notesList");
const startBtn = document.getElementById("startBtn");

// Speech result event
recognition.onresult = (event) => {
  let transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  noteArea.value = transcript;
};


startBtn.addEventListener("click", () => {
  if (startBtn.classList.contains("glow")) {
    startBtn.classList.remove("glow");
    startBtn.textContent = "Start"; // stop glow
    recognition.stop();
  } else {
    startBtn.classList.add("glow");
    startBtn.textContent = "Stop"; // start glow
    recognition.start();
  }
});

document.getElementById("deleteAllBtn").onclick = () => {
  if (confirm("Delete all notes?")) {
    localStorage.removeItem("notes");
    notesList.innerHTML = "";
  }
};



// Save Note
document.getElementById("saveBtn").onclick = () => {
  const text = noteArea.value.trim();
  if (text) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(text);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
    noteArea.value = "";
  }
};

// Clear current note
document.getElementById("clearBtn").onclick = () => noteArea.value = "";

// Load saved notes
function loadNotes() {
  notesList.innerHTML = "";
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });
}
loadNotes();
