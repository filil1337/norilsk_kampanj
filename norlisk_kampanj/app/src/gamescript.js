
/* Hide score container from the get-go */
$(function() {
  $('div.quiz-container, div.score-container').hide();
});

/* Questions array */

var quiz = [

  {
    question: 'Vad kallas det ryska alfabetet?',
    answers: ['Latinska', 'Devanagari', 'Krylliska', 'Futhark'],
    background: '#3F51B5',
    correct: 3
  },

  {
    question: 'Hur skrivs "Norilsk" ut på detta alfabet?',
    answers: ['Норильск', 'Москва', 'Иорюгзк', 'Екатеринбу́рг'],
    background: '#009688',
    correct: 1
  },

  {
    question: 'I vilken kraj ligger Norilsk?',
    answers: ['Karlsovy Vary kraj', 'Primorje', 'Krasnojarsk kraj', 'Stavropol kraj'],
    background: '#43A047',
    correct: 3
  },

  {
    question: 'Hur många bor permanent i Norilsk?',
    answers: ['175 000', '180 000', '150 000', '200 000'],
    background: '#8D6E63',
    correct: 1
  },

  {
    question: 'I hur många ungefär dagar täcks Norilsk av snö per år?',
    answers: ['350 - 365', '150 - 170', '250 - 270', '220 - 240'],
    background: '#78909C',
    correct: 3
  },

  {
    question: 'Vilken flod ligger öster om staden?',
    answers: ['Jenisej', 'Volga', 'Neva', 'Ural'],
    background: '#448AFF',
    correct: 1
  },

  {
    question: 'Vad är Norilsk bl.a. känd för?',
    answers: ['Eiffeltornet', 'Dynamiska betongarkitektur', 'Guldgruvor', 'Tropiska stränder'],
    background: '#EF5350',
    correct: 2
  },

  {
    question: 'Vad brukar Norilsk kallas för?',
    answers: ['Sibiriens Venedig', 'Sibiriens New York', 'Sibiriens London', 'Sibiriens Paris'],
    background: '#263238',
    correct: 4
  },

  {
    question: 'Vad heter stadens största arbetsgivare?',
    answers: ['Russian Iron Corp.', 'Vooruzjonnyje Sily Rossijskoj Federatsii', 'Argosy Minerals', 'Norilsk Nickel'],
    background: '#BA68C8',
    correct: 4
  },

  {
    question: 'När grundades Norilsk officiellt?',
    answers: ['1782', '1829', '1657', '1935'],
    background: '#00838F',
    correct: 3
  }
];

/* GENERAL VARIABLES */

/* Variables for running the quiz */
var currentQuestion = 0;

/* Variables for score */
var correctAnswer = 0;
var wrongAnswer = 0;


/* Variables for timing */
var seconds = 0;

/* GAME FUNCTIONS */

/* Function to load a question into the game */
function loadQuestion() {

  if (currentQuestion < quiz.length) { // Check to see if there are any remaining questions unasked

    console.log('current question is ' + currentQuestion);
    console.log('you have ' + correctAnswer + 'correct answers');
    console.log('you have ' + wrongAnswer + ' wrong answers');

    /* Ladda bakgrundsbild */
    $('.question-container, .answer-item').css('background-color', quiz[currentQuestion].background);

    /* Ladda fråga */
    $("div.question-item").html(quiz[currentQuestion].question);

    /* Ladda svarsalternativ */
    $("#answer-one").html(quiz[currentQuestion].answers[0]);
    $("#answer-two").html(quiz[currentQuestion].answers[1]);
    $("#answer-three").html(quiz[currentQuestion].answers[2]);
    $("#answer-four").html(quiz[currentQuestion].answers[3]);

  } else { // if there is no more questions, call to function which ends the game
    endGame();
  }
};

/* Function to start game */
function startGame() {
  $('div.start-container').hide();
  $('div.quiz-container').show();
  startTimer();
  loadQuestion();
};

/* Function to end the game */
function endGame() {
  var scorePercent = (correctAnswer / quiz.length) * 100; // Score in percentage
  $(".quiz-container").hide();

  if (scorePercent > 49) { // Win conditions: if the 50% or more answers are correct
    $(".score-item").prepend("<h2>Отличная работа!</h2> Det tog dig " + seconds + " sekunder att göra klart quizet");
    $('.score-container').css('background-color', 'green');
  } else { // Lose conditions: if correct answers are below 50%
    $(".score-item").prepend("<h2>Учись усердней!</h2> " + seconds + " sekunder att göra klart quizet");
    $('.score-container').css('background-color', '#CD5C5C')
  }

  $('div.question-container, div.answer-container').hide();
  $('div.score-container').show();
  $("span.correct").html(correctAnswer);
  $("span.wrong").html(wrongAnswer);
  $("span.percent").html(Math.floor(scorePercent) + '%');
}
/* Function to restart game */
function restartGame() {
  location.reload(); // Could be better
}

/* Function to check answer */
$('button').click(function() {
  var selectedAnswer = parseInt(this.name); // "this" is the element clicked
  console.log('selected answer ' + selectedAnswer);
  console.log("correct is " + quiz[currentQuestion].correct);

  if (selectedAnswer === quiz[currentQuestion].correct) {
    correctAnswer++;
    /* step up one question */
    currentQuestion++;
    loadQuestion();
  } else {
    wrongAnswer++;
    /* step up one question */
    currentQuestion++;
    loadQuestion();
  }
});

/* Function to time game in seconds */

function updateTime() {
  seconds++;
}

function startTimer() {
  window.setInterval(updateTime, 1000)
}
