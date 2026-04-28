let playerName = "";
let currentLevel = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

function startGame() {
  const input = document.getElementById("playerName").value;

  if (input === "") {
    alert("Escribe tu nombre 😅");
    return;
  }

  playerName = input;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  document.getElementById("welcome").innerText = "Jugador: " + playerName;

  loadLevel();
}

const levels = [
  { question: "¿Qué es una onda?", answers: ["Objeto sólido", "Perturbación", "Energía estática"], correct: 1 },
  { question: "¿Frecuencia aumenta?", answers: ["Separación", "Más repeticiones", "Menos energía"], correct: 1 },
  { question: "¿Amplitud?", answers: ["Altura", "Velocidad", "Dirección"], correct: 0 },
  { question: "¿Sonido es?", answers: ["Transversal", "Longitudinal", "Electromagnética"], correct: 1 },
  { question: "¿Transportan?", answers: ["Materia", "Energía", "Objetos"], correct: 1 },
  { question: "¿Luz es?", answers: ["Mecánica", "Electromagnética", "Longitudinal"], correct: 1 },
  { question: "¿Frecuencia mide?", answers: ["Altura", "Repeticiones", "Velocidad"], correct: 1 },
  { question: "¿Longitud de onda?", answers: ["Altura", "Distancia crestas", "Tiempo"], correct: 1 },
  { question: "¿Necesitan medio?", answers: ["Siempre", "Nunca", "Depende"], correct: 2 },
  { question: "¿Cuerda vibrando?", answers: ["Transversal", "Longitudinal", "Electromagnética"], correct: 0 }
];

function loadLevel() {
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const resultEl = document.getElementById("result");
  const levelEl = document.getElementById("level");
  const nextBtn = document.getElementById("nextBtn");

  levelEl.innerText = "Nivel " + (currentLevel + 1);
  questionEl.innerText = levels[currentLevel].question;
  answersEl.innerHTML = "";
  resultEl.innerText = "";
  nextBtn.style.display = "none";

  // 🔀 Crear copia con bandera de correcta
  let answers = levels[currentLevel].answers.map((ans, i) => ({
    text: ans,
    isCorrect: i === levels[currentLevel].correct
  }));

  // 🔀 Mezclar respuestas (Fisher-Yates)
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }

  // 🎮 Renderizar botones
  answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;

    btn.onclick = () => {
      document.querySelectorAll("#answers button").forEach(b => b.disabled = true);

      if (answer.isCorrect) {
        resultEl.innerText = "✅ Correcto";
        correctAnswers++;
      } else {
        resultEl.innerText = "❌ Incorrecto";
        wrongAnswers++;
      }

      nextBtn.style.display = "block";
    };

    answersEl.appendChild(btn);
  });
}

document.getElementById("nextBtn").onclick = function () {
  currentLevel++;

  if (currentLevel < levels.length) {
    loadLevel();
  } else {
    showFinal();
  }
};

function showFinal() {
  const game = document.getElementById("gameScreen");

  game.innerHTML = `
    <h1>🏆 Resultado final, ${playerName}</h1>
    <p>✅ Correctas: ${correctAnswers}</p>
    <p>❌ Incorrectas: ${wrongAnswers}</p>
    <h2>${getMessage()}</h2>

    <h3>📘 Lo que aprendiste:</h3>
    <p>${getLearningMessage()}</p>

    <button onclick="location.reload()">Jugar otra vez</button>
  `;
}

function getMessage() {
  const total = correctAnswers + wrongAnswers;
  const score = (correctAnswers / total) * 100;

  if (score === 100) return "🔥 Perfecto";
  if (score >= 70) return "💪 Muy bien";
  if (score >= 50) return "🙂 Bien";
  return "📚 Debes mejorar";
}

function getLearningMessage() {
  const total = correctAnswers + wrongAnswers;
  const score = (correctAnswers / total) * 100;

  if (score >= 80) {
    return "¡Excelente trabajo! 🎉 Has demostrado una comprensión sólida del movimiento ondulatorio. Comprendes frecuencia, amplitud y tipos de ondas 💪.";
  } 
  else if (score >= 50) {
    return "¡Buen esfuerzo! 🙂 Vas bien, pero puedes reforzar algunos conceptos clave 🚀.";
  } 
  else {
    return "Sigue practicando 📚. Repasa frecuencia, amplitud y longitud de onda 💪.";
  }
}
