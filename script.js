const question = document.getElementById("questions");
const options = document.getElementById("options");
const button = document.getElementById("nextbtn");
const scoreElement = document.getElementById("score");

let questions = [];
let currentquestion = 0;
let score = 0;
let selectedAns = null;

async function getQuestions() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=18&type=multiple",
  );

  const data = await response.json();

  questions = data.results;

  showQuestion();
}

getQuestions();

function showQuestion() {
  const q = questions[currentquestion];

  question.innerText = q.question;

  const answers = [q.correct_answer, ...q.incorrect_answers];

  options.innerHTML = "";

  answers.forEach((answer) => {
    const nbutton = document.createElement("button");

    nbutton.innerText = answer;

    nbutton.addEventListener("click", () => {
      selectedAns = answer;
      options
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.remove("selected"));
      nbutton.classList.add("selected");
    });

    options.appendChild(nbutton);
  });
}

button.addEventListener("click", () => {
  const correct = questions[currentquestion].correct_answer;

  if (selectedAns === correct) {
    score++;
  }

  currentquestion++;

  if (currentquestion < questions.length) {
    showQuestion();
  } else {
    question.innerText = "Quiz Finished";
    options.innerHTML = "";
    scoreElement.innerText = `Your score is : ${score}/${questions.length}`;
    currentquestion = 0;
    getQuestions();
  }
});
