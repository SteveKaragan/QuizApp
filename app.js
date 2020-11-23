/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is the correct translation for “fish”?',
      answers: ['Ameixa', 'Cebola', 'Peixe', 'Milho'],
      correctAnswer: 'Peixe'
    },
    {
      question: 'How do you say “Good morning”?',
      answers: ['Boa tarde', 'Adeus', 'Bom dia', 'Boa noite'],
      correctAnswer: 'Bom dia'
    },
    {
      question: 'How do you say “Thank You”?',
      answers: ['Obrigado', 'Adeus', 'Direita', 'Cama'],
      correctAnswer: 'Obrigado'
    },
    {
      question: 'How do you say “beach”?',
      answers: ['Passaporte', 'Praia', 'Casa', 'Peixe'],
      correctAnswer: 'Praia'
    },
    {
      question: 'What is the correct translation for “glass”?',
      answers: ['Coca-cola', 'Tigela', 'Caneca', 'Copo'],
      correctAnswer: 'Copo'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function generateStart() {
  return `<div class="start">
  <img src="./images/brazil-flag-xs.png" alt="Brazilian Flag">
  <h2>This quiz tests your knowledge of common Brazilian Portuguese words.</h2>
  <button type="button" id="start">Start Quiz</button>
</div>`
}

function renderStartPage() {
  const startPage = generateStart();
  $('main').html(startPage)
}

function handleStartQuiz() {
  $('#start').click( function() {
    store.quizStarted = true
    renderPage();
  });
}

function generateQuestion() {
  const questionNum = store.questionNumber + 1
  const numQuestions = store.questions.length
  const score = store.score
  const incorrectScore = store.questionNumber - store.score
  const question = store.questions[store.questionNumber].question
  const answrs = store.questions[store.questionNumber].answers.map(arg => {
    return `
    <div id="option-container-0">
    <input type="radio" class='options' name="options" id="option1" value="${arg}" tabindex="1" required=""> 
    <label for="option1"> ${arg}</label>
    </div>
   `
  })
  return `
  <h3>
    Question ${questionNum} of ${numQuestions}
  </h3>
  <h3>
    Your score is ${score} correct and ${incorrectScore} incorrect.
  </h3>

  <div class='form'>
    <form class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${question}</legend>
        </div>
        <div class="answers">
          ${answrs.join(" ")}
        </div>
        <button type="submit" id="submit-question-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" class="hidden" tabindex="6"> Next &gt;&gt;</button>
      </fieldset>
    </form>
    <div #feedback></div>
  </div>`
}

function renderQuestionPage() {
  const quizPage = generateQuestion()
  $('main').html(quizPage) 
}

function handleAnswerSubmit() {
  $('.question-form').submit(function(event) {
  event.preventDefault();
  checkCorrectAnswer();
  })
}

function checkCorrectAnswer() {
  $('.options').prop('disabled', true);
  $( "#next-question-btn" ).toggleClass( "hidden");
  $( "#submit-question-btn" ).toggleClass( "hidden");
  const option = Array.from(document.getElementsByClassName('options')).filter((c) => c.checked);
  const answer = option[0].value
  let correctAnswer = store.questions[store.questionNumber].correctAnswer
  if (answer === correctAnswer) {
    store.score++
    renderCorrectAnswer(true)
  } else {
    renderCorrectAnswer(false)
  }
}

function renderCorrectAnswer(bool) {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer
  if (bool) {  
  $(".answers").append(`<h4>"${correctAnswer}" is the correct answer.  Good Job!</h4>`)
  } else {
    $(".answers").append(`<h4>"${correctAnswer}" is the correct answer.  Better luck next time!</h4>`)
    }
}

function handleNext() {
  $('#next-question-btn').click(function(){
    store.questionNumber++;
    renderPage()
  })
}

function generateResults() {
  return `
  <div class="start">
    <img src="./images/beach.jpg" alt="Ipenema" id="jpg">
    <h3>Your Score is: ${store.score}/5</h3>
    <button type="button" id="restart"> Restart Quiz </button>
  </div>`
}

function renderResultsPage() {
  const resultsPage = generateResults();
  $('main').html(resultsPage)
}

function handleRestart() {
  $('#restart').click(function(){
    store.quizStarted = false
    store.questionNumber = 0
    store.score = 0
    renderPage()
  })
}

function renderPage() {
  if (store.questionNumber === 5) {
    renderResultsPage()
    handleRestart()
    }
  
  if (!store.quizStarted) {  
    renderStartPage()
    handleStartQuiz()
  }

  if (store.quizStarted) {
    renderQuestionPage()
    handleAnswerSubmit()
    handleNext()
  }  
}

$(renderPage);