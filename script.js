import { quizData } from './data.js';
const segData = quizData;

let qIn = 0;
let totalScore = 0;
const totalQuestions = segData.length;
let scoreUpdate = false;
function updateScore() {
        totalScore +=1;
}

function renderQuiz() {
        let currentSeg = segData[qIn];
        const question = currentSeg.question;
        const questionContainer = document.createElement("div");
        const questionElement = document.createElement("p");
        questionContainer.setAttribute("class", "question-para");
        questionElement.textContent = question;
        const optionContainer = document.createElement("div");
        optionContainer.setAttribute("class", "option-section");
        const optionList = document.createElement("ul");
        optionList.setAttribute("id","option-list");
        optionList.innerHTML=`<li><button type="button" class="option-btn">${currentSeg.a}</button></li>
        <li><button type="button" class="option-btn">${currentSeg.b}</button></li>
        <li><button type="button" class="option-btn">${currentSeg.c}</button></li>
        <li><button type="button" class="option-btn">${currentSeg.d}</button></li>`
        const nextBtnSection = document.createElement("div");
        const forwardBtn = document.createElement("button");
        nextBtnSection.setAttribute("class", "next-btn-sc");
        forwardBtn.setAttribute("class", "next-btn");
        forwardBtn.setAttribute("type", "button");
        forwardBtn.innerHTML = "Next";
        questionContainer.appendChild(questionElement);
        optionContainer.appendChild(optionList);
        nextBtnSection.appendChild(forwardBtn);
        const quizCard = document.getElementById("quiz-card");
        quizCard.appendChild(questionContainer);
        quizCard.appendChild(optionContainer);
        quizCard.appendChild(nextBtnSection);
        const optionButtons = document.querySelectorAll(".option-btn");
        let previousButton = null;
        optionButtons.forEach((button) => {
                button.addEventListener("click", ()=> {
                        button.removeEventListener;

                        if(previousButton && previousButton !== button) {
                                previousButton.style.backgroundColor = "";
                                previousButton.style.color = "";
                        }
                        button.style.backgroundColor = "#E2DFD2";
                        button.style.color = "#F4A460";
                        const optionChose = button.textContent;
                        const correctOption = currentSeg.correct;
                        const correctAnswer = currentSeg[correctOption];
                        if(optionChose === correctAnswer) {
                                scoreUpdate = true;
                        }
                        else {
                                scoreUpdate = false;
                        }

                        previousButton = button;
                        return scoreUpdate;
                });
        });
        forwardBtn.addEventListener("click", () => {
                if(scoreUpdate === true) {
                        updateScore();
                }
                qIn+=1;
                if(qIn < segData.length) {
                        quizCard.innerHTML = "";
                        renderQuiz();
                }
                else {
                        quizCard.innerHTML = "";
                        quizCard.style.display = "flex";
                        quizCard.style.justifyContent = "center";
                        const scoreCard = document.createElement("div");
                        scoreCard.setAttribute("class", "result-card");
                        const scoreEl = document.createElement("p");
                        scoreEl.textContent = `Great job completing the quiz, you have answered ${totalScore} questions correct out of ${totalQuestions} Questions.`
                        scoreCard.appendChild(scoreEl);
                        quizCard.appendChild(scoreCard);
                }
        });

};

const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", () => {
        const quizCard = document.getElementById("quiz-card");
        quizCard.innerHTML = "";
        quizCard.style.display = "inline-block";
        renderQuiz();
});
