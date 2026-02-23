// Questions Data Array
const questions = [
  {
    question: "Which of the following is a core TechNova value?",
    options: ["Speed", "Sustainability", "Security", "Style"],
    correctAnswer: 2,
    explanation: "Security is a core value at TechNova due to our enterprise clients."
  },
  {
    question: "When does health insurance start for employees?",
    options: ["After 3 months", "From day one", "After 1 year", "Never"],
    correctAnswer: 1,
    explanation: "TechNova offers health insurance from day one."
  },
  {
    question: "Which practice helps keep company data safe?",
    options: ["Sharing passwords", "Using strong passwords", "Ignoring updates", "Using public Wi-Fi"],
    correctAnswer: 1,
    explanation: "Strong passwords help protect company systems."
  },
  {
    question: "What should you do if you receive a suspicious email?",
    options: ["Reply immediately", "Ignore it", "Report to IT team", "Forward to friends"],
    correctAnswer: 2,
    explanation: "Always report suspicious emails to the IT security team."
  },
  {
    question: "Which tool is recommended for internal communication?",
    options: ["Personal WhatsApp", "Slack", "Instagram", "Telegram"],
    correctAnswer: 1,
    explanation: "Slack is the official internal communication platform."
  }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const retakeBtn = document.getElementById("retakeBtn");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("scoreDisplay");

const resultText = document.getElementById("resultText");
const customMessage = document.getElementById("customMessage");

// Start Quiz
startBtn.addEventListener("click", startQuiz);
retakeBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

// Render Question
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  feedback.textContent = "";

  currentQuestion.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.setAttribute("onclick", `checkAnswer(${index})`);
    optionsContainer.appendChild(btn);
  });

  scoreDisplay.textContent = `Score: ${score}`;
}

// Check Answer
function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === currentQuestion.correctAnswer) {
    score++;
    buttons[selectedIndex].classList.add("correct");
    feedback.textContent = "Correct! " + currentQuestion.explanation;
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    feedback.textContent = "Incorrect! " + currentQuestion.explanation;
  }

  setTimeout(nextQuestion, 2000);
}

// Next Question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    endQuiz();
  }
}

// End Quiz
function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  resultText.textContent = `You scored ${score} out of ${questions.length}`;

  let message = score === 5
    ? "Excellent! You’re off to a great start."
    : score >= 3
    ? "Nice job! Review our documentation to improve."
    : "Don’t worry — visit our onboarding resources again.";

  customMessage.textContent = message;
}

// Restart Quiz  
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  resultScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
}
