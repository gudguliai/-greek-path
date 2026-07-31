const lessons = [
  { title: "Hello, Greece", subtitle: "Greetings and courtesy", questions: [
    ["How do you say ‘hello’ in Greek?", ["Γεια σου", "Ευχαριστώ", "Ναι"], 0, "Γεια σου (ya sou) is an informal hello."],
    ["What does ‘ευχαριστώ’ mean?", ["Please", "Thank you", "Goodbye"], 1, "Ευχαριστώ (efharistó) means thank you."],
    ["Choose the Greek word for ‘yes’.", ["Όχι", "Ναι", "Καλημέρα"], 1, "Ναι (ne) means yes."],
  ]},
  { title: "Coffee and food", subtitle: "Order with confidence", questions: [
    ["What would you ask for with ‘Έναν καφέ, παρακαλώ’;", ["A coffee, please", "The bill, please", "Water, please"], 0, "Έναν καφέ, παρακαλώ means a coffee, please."],
    ["‘Νερό’ is…", ["bread", "water", "wine"], 1, "Νερό (neró) means water."],
    ["What does ‘παρακαλώ’ add to a request?", ["Please", "Tomorrow", "Again"], 0, "Παρακαλώ (parakaló) is please / you’re welcome."],
  ]},
  { title: "Getting around", subtitle: "Simple travel phrases", questions: [
    ["‘Πού είναι η τουαλέτα;’ asks…", ["Where is the hotel?", "Where is the bathroom?", "Where is the station?"], 1, "Πού είναι η τουαλέτα; means Where is the bathroom?"],
    ["Which word means ‘where’?", ["Πού", "Τι", "Ναι"], 0, "Πού (pou) means where."],
    ["‘Δεν καταλαβαίνω’ means…", ["I don’t understand", "I am hungry", "I am ready"], 0, "Δεν καταλαβαίνω (den katalavéno) means I don’t understand."],
  ]},
];

const storageKey = "greek-path-progress";
let completed = JSON.parse(localStorage.getItem(storageKey) || "[]");
let activeLesson = 0;
let activeQuestion = 0;
const lessonList = document.querySelector("#lesson-list");
const practice = document.querySelector("#practice");

function save() { localStorage.setItem(storageKey, JSON.stringify(completed)); }
function renderProgress() {
  const count = completed.length;
  document.querySelector("#progress-text").textContent = `${count} / ${lessons.length}`;
  document.querySelector("#progress-bar").style.width = `${(count / lessons.length) * 100}%`;
  document.querySelector("#streak").textContent = count ? `${count} lesson${count === 1 ? "" : "s"} complete` : "Ready to begin";
}
function renderLessons() {
  lessonList.innerHTML = lessons.map((lesson, index) => {
    const done = completed.includes(index);
    return `<button class="lesson ${done ? "done" : ""}" type="button" data-lesson="${index}">
      <span class="lesson-number">${done ? "✓" : index + 1}</span><span class="lesson-copy"><strong>${lesson.title}</strong><span>${lesson.subtitle}</span></span><span class="lesson-status">${done ? "Complete" : "Practice →"}</span></button>`;
  }).join("");
  lessonList.querySelectorAll("button").forEach(button => button.addEventListener("click", () => startLesson(Number(button.dataset.lesson))));
}
function startLesson(index) { activeLesson = index; activeQuestion = 0; practice.classList.remove("hidden"); practice.scrollIntoView({ behavior: "smooth", block: "start" }); renderQuestion(); }
function renderQuestion() {
  const [prompt, answers, correct] = lessons[activeLesson].questions[activeQuestion];
  document.querySelector("#lesson-label").textContent = lessons[activeLesson].title;
  document.querySelector("#prompt").textContent = prompt;
  document.querySelector("#feedback").textContent = "";
  document.querySelector("#next-question").classList.add("hidden");
  document.querySelector("#answers").innerHTML = answers.map((answer, index) => `<button class="answer" type="button" data-answer="${index}">${answer}</button>`).join("");
  document.querySelectorAll(".answer").forEach(button => button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer), correct)));
}
function answerQuestion(answer, correct) {
  document.querySelectorAll(".answer").forEach(button => { button.disabled = true; if (Number(button.dataset.answer) === correct) button.classList.add("correct"); });
  if (answer !== correct) document.querySelector(`.answer[data-answer="${answer}"]`).classList.add("incorrect");
  const explanation = lessons[activeLesson].questions[activeQuestion][3];
  document.querySelector("#feedback").textContent = answer === correct ? `Correct — ${explanation}` : `Not quite — ${explanation}`;
  document.querySelector("#next-question").classList.remove("hidden");
}
document.querySelector("#next-question").addEventListener("click", () => {
  activeQuestion += 1;
  if (activeQuestion < lessons[activeLesson].questions.length) return renderQuestion();
  if (!completed.includes(activeLesson)) { completed.push(activeLesson); save(); }
  renderProgress(); renderLessons(); practice.classList.add("hidden");
});
document.querySelector("#reset-progress").addEventListener("click", () => { completed = []; save(); renderProgress(); renderLessons(); practice.classList.add("hidden"); });
renderProgress(); renderLessons();
