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
  <p>This quiz tests your knowledge of common Brazilian Portuguese words.</p>
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
  const answr1 = store.questions[store.questionNumber].answers[0]
  const answr2 = store.questions[store.questionNumber].answers[1]
  const answr3 = store.questions[store.questionNumber].answers[2]
  const answr4 = store.questions[store.questionNumber].answers[3]

  return `<ul class="question-and-score">
  <li id="question-number">
    Question ${questionNum} of ${numQuestions}
  </li>
  <li id="score">
    Your score is ${score} correct and ${incorrectScore} incorrect.
  </li>
</ul>
<form id="question-form" class="question-form">
  <fieldset>
    <div class="question">
      <legend> ${question}</legend>
    </div>
    <div class="options2">
      <div class="answers">
        
  <div id="option-container-0">
    <input type="radio" class='options' name="options" id="option1" value="${answr1}" tabindex="1" required=""> 
    <label for="option1"> ${answr1}</label>
  </div>

  <div id="option-container-1">
    <input type="radio" class='options' name="options" id="option2" value="${answr2}" tabindex="2" required=""> 
    <label for="option2"> ${answr2}</label>
  </div>

  <div id="option-container-2">
    <input type="radio" class='options' name="options" id="option3" value="${answr3}" tabindex="3" required=""> 
    <label for="option3"> ${answr3}</label>
  </div>

  <div id="option-container-3">
    <input type="radio" class='options' name="options" id="option4" value="${answr4}" tabindex="4" required=""> 
    <label for="option4"> ${answr4}</label>
  </div>

      </div>
    </div>
    <button type="submit" id="submit-question-btn" class="" tabindex="5">Submit</button>
    <button type="button" id="next-question-btn" class="hidden" tabindex="6"> Next &gt;&gt;</button>
  </fieldset>
</form>
<div #feedback></div>`
}


function renderQuestionPage() {
  const quizPage = generateQuestion()
  $('main').html(quizPage) 
}

function handleAnswerSubmit() {
  $('.question-form').submit(function(event) {
    event.preventDefault();
    $('.options').prop('disabled', true);
    const option = Array.from(document.getElementsByClassName('options')).filter((c) => c.checked);
    const answer = option[0].value
    let correctAnswer = store.questions[store.questionNumber].correctAnswer
    if (answer === correctAnswer) {
      store.score++
      $(".answers").append(`<h3>${correctAnswer} is the correct answer.  Good Job!</h3>`)
    } else {
      $(".answers").append(`<h3>${correctAnswer} is the correct answer.  Better luck next time!</h3>`)
    }
    //$('#feedback').html('Hello World'); 
    //why doesn't the above line of code work? 
    $( "#next-question-btn" ).toggleClass( "hidden");
    $( "#submit-question-btn" ).toggleClass( "hidden");
  });
}

function handleNext() {
  $('#next-question-btn').click(function(){
    store.questionNumber++;
    renderPage()
  })
}

function generateResults() {
  return `<div class="results">
  <form id="js-restart-quiz">
    <fieldset>
      <div class="row">
        <div class="col-12">
          <legend>Your Score is: ${store.score}/5</legend>
        </div>
      </div>
    
      <div class="row">
        <div class="col-12">
          <button type="button" id="restart"> Restart Quiz </button>
        </div>
      </div>
    </fieldset>
  </form>
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