const storageKey = "greek-path-course-progress";
let completed = JSON.parse(localStorage.getItem(storageKey) || "[]");
let lessonIndex = 0;
let cardIndex = 0;
let voices = [];
const flatLessons = course.flatMap((unit, unitIndex) => unit.lessons.map(lesson => ({ ...lesson, unitIndex, unitTitle: unit.title })));
flatLessons.forEach((lesson, index) => { lesson.index = index; });

function loadVoices() { voices = window.speechSynthesis?.getVoices() || []; }
if ("speechSynthesis" in window) { loadVoices(); window.speechSynthesis.onvoiceschanged = loadVoices; }
function save() { localStorage.setItem(storageKey, JSON.stringify(completed)); }
function isUnlocked(index) { return index === 0 || completed.includes(index - 1); }
function speak(text) {
  const status = document.querySelector("#audio-status");
  if (!("speechSynthesis" in window)) { status.textContent = "Your browser does not support spoken pronunciation."; return; }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "el-GR"; utterance.rate = .68;
  const voice = voices.find(item => item.lang.toLowerCase().startsWith("el")); if (voice) utterance.voice = voice;
  utterance.onstart = () => { status.textContent = voice ? "Playing Greek pronunciation…" : "Playing with your device’s available voice…"; };
  utterance.onerror = () => { status.textContent = "Pronunciation could not play. Check that sound is enabled."; };
  window.speechSynthesis.speak(utterance);
}
function renderProgress() {
  document.querySelector("#progress-label").textContent = `${completed.length} of ${flatLessons.length} lessons`;
  const current = flatLessons.find(lesson => isUnlocked(lesson.index) && !completed.includes(lesson.index)) || flatLessons.at(-1);
  document.querySelector("#next-description").textContent = completed.length ? `Continue with ${current.title}. Hear the Greek first, then connect it to a familiar scene.` : "Begin with the alphabet. Hear a sound, say it back, then use it in context.";
  document.querySelector("#start-course").textContent = completed.length ? `Continue: ${current.title}` : "Start lesson 1";
}
function renderMap() {
  const list = document.querySelector("#unit-list");
  list.innerHTML = course.map((unit, unitIndex) => {
    const offset = course.slice(0, unitIndex).reduce((sum, item) => sum + item.lessons.length, 0);
    return `<article class="unit"><div class="unit-head"><span>Unit ${unitIndex + 1}</span><h3>${unit.title}</h3><p>${unit.description}</p></div><div class="lesson-list">${unit.lessons.map((lesson, lessonInUnit) => {
      const index = offset + lessonInUnit; const done = completed.includes(index); const unlocked = isUnlocked(index);
      return `<button class="lesson ${done ? "done" : ""}" data-index="${index}" ${unlocked ? "" : "disabled"} type="button"><b>${done ? "✓" : index + 1}</b><span>${lesson.title}<small>${done ? "Completed" : unlocked ? "Ready to learn" : "Complete the lesson before this"}</small></span><i>${unlocked ? "→" : "🔒"}</i></button>`;
    }).join("")}</div></article>`;
  }).join("");
  list.querySelectorAll("button[data-index]").forEach(button => button.addEventListener("click", () => startLesson(Number(button.dataset.index))));
}
function startLesson(index) { lessonIndex = index; cardIndex = 0; document.querySelector("#player").classList.remove("hidden"); document.querySelector("#player").scrollIntoView({ behavior:"smooth", block:"start" }); renderCard(); }
function renderCard() {
  const lesson = flatLessons[lessonIndex]; const card = lesson.cards[cardIndex];
  document.querySelector("#practice").classList.add("hidden"); document.querySelector("#scene-emoji").textContent = card.scene;
  document.querySelector("#unit-label").textContent = `Unit ${lesson.unitIndex + 1} · ${lesson.unitTitle}`;
  document.querySelector("#lesson-title").textContent = lesson.title;
  document.querySelector("#greek").textContent = card.greek;
  document.querySelector("#transliteration").textContent = card.say;
  document.querySelector("#translation").textContent = card.meaning;
  document.querySelector("#step-label").textContent = "Listen and repeat";
  document.querySelector("#step-count").textContent = `${cardIndex + 1} / ${lesson.cards.length}`;
  document.querySelector("#audio-status").textContent = "";
  document.querySelector("#back").disabled = cardIndex === 0;
  document.querySelector("#next").textContent = cardIndex === lesson.cards.length - 1 ? "Try a quick check" : "I heard it — next";
}
function showPractice() {
  const lesson = flatLessons[lessonIndex]; const card = lesson.cards[0]; const distractors = flatLessons.filter(item => item.index !== lessonIndex).map(item => item.cards[0].meaning).filter((item, index, array) => array.indexOf(item) === index);
  const options = [card.meaning, ...distractors.slice(lessonIndex % (distractors.length - 2), lessonIndex % (distractors.length - 2) + 2)].sort(() => Math.random() - .5);
  document.querySelector("#practice").classList.remove("hidden"); document.querySelector("#step-label").textContent = "A quick check"; document.querySelector("#step-count").textContent = "Done";
  document.querySelector("#practice-prompt").textContent = `What does “${card.greek}” mean?`;
  document.querySelector("#choices").innerHTML = options.map(option => `<button type="button" data-correct="${option === card.meaning}">${option}</button>`).join("");
  document.querySelector("#feedback").textContent = ""; document.querySelector("#next").classList.add("hidden");
  document.querySelectorAll("#choices button").forEach(button => button.addEventListener("click", () => answerPractice(button.dataset.correct === "true", card.meaning)));
}
function answerPractice(correct, answer) {
  document.querySelectorAll("#choices button").forEach(button => { button.disabled = true; if (button.dataset.correct === "true") button.classList.add("correct"); });
  const feedback = document.querySelector("#feedback"); feedback.textContent = correct ? `Yes — ${answer}. Lesson complete!` : `The answer is “${answer}”. You will see it again soon.`;
  if (!completed.includes(lessonIndex)) { completed.push(lessonIndex); completed.sort((a,b) => a-b); save(); }
  document.querySelector("#next").classList.remove("hidden"); document.querySelector("#next").textContent = lessonIndex === flatLessons.length - 1 ? "Back to course" : "Continue to the next lesson";
  renderProgress(); renderMap();
}
document.querySelector("#start-course").addEventListener("click", () => { const next = flatLessons.find(lesson => isUnlocked(lesson.index) && !completed.includes(lesson.index)); startLesson(next?.index ?? 0); });
document.querySelector("#listen").addEventListener("click", () => speak(flatLessons[lessonIndex].cards[cardIndex].greek));
document.querySelector("#next").addEventListener("click", () => { if (!document.querySelector("#practice").classList.contains("hidden")) return startLesson(Math.min(lessonIndex + 1, flatLessons.length - 1)); cardIndex += 1; if (cardIndex < flatLessons[lessonIndex].cards.length) renderCard(); else showPractice(); });
document.querySelector("#back").addEventListener("click", () => { if (cardIndex > 0) { cardIndex -= 1; renderCard(); } });
document.querySelector("#close-player").addEventListener("click", () => document.querySelector("#player").classList.add("hidden"));
document.querySelector("#reset").addEventListener("click", () => { if (confirm("Reset all local course progress?")) { completed = []; save(); renderProgress(); renderMap(); document.querySelector("#player").classList.add("hidden"); } });
renderProgress(); renderMap();
