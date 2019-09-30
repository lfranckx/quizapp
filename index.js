// store questions
const STORE = [
    {
        question: 'How old is the oldest drum discovered?',
        answer: [
            '1400 AD',
            '300 BC',
            '5500 BC',
            '500 AD'
        ],
        correctAnswer: '5500 BC'
    },
    {
        question: 'What is the longest recorded drum session/marathon done by an individual?',
        answer: [
            '15 hours',
            '72 hours',
            '28 hours',
            '122 hours'
        ],  
        correctAnswer: '122 hours'
    },
    {
        question: 'When was the first kick drum pedal invented?',
        answer: [
            '1920s',
            '1930s',
            '1940s',
            '1880s'
        ],
        correctAnswer: '1930s'
    },
    {
        question: "What is the world's largest drum kit?",
        answer: [
            '228 pieces',
            '678 pieces',
            '323 pieces',
            '813 pieces'
        ],
        correctAnswer: '813 pieces'
    },
    {
        question: "When were electronic drums first introduced?",
        answer: [
            '1970s',
            '1980s',
            '1990s',
            '2000s'
        ],
        correctAnswer: '1980s'
    }

];

// variables to store score and question number
let score = 0;
let questionNum = 0;

// increments the score variable by 1 
// updates the "score" number text in the quiz view
function updateScore() {
    score++;
    $('.score').text(score);
}

// increments the questionNum variable by 1
// updates the questionNum variable by 1
function updateQuestionNum() {
    questionNum++;
    $('.questionNum').text(questionNum + 1);
}

// resets the text value for the score and questionNum variables
function resetStats() {
    score = 0;
    questionNum = 0;
    $('.score').text(0);
    $('.questionNum').text(0);
}

// begin quiz
function startQuiz() {
    $('.startQuiz').on('click', '.start', function (event) {
        $('.startQuiz').hide();
        $('.questionNum').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(createQuestion());
    });
}

// template for generating questions
function createQuestion() {
    if (questionNum < STORE.length) {
        return createPage(questionNum);
        } else {
            $('.questionBox').hide();
            finalScore();
            $('.questionNum').text(5);
        }
}

// creates HTML for question
function createPage(questionIndex) {
    let formMaker = $(`<form>
        <fieldset class="questionForm">
            <legend class="questionText">${STORE[questionIndex].question}</legend>
        </fieldset>
    </form>`);

    let fieldSelector = $(formMaker).find('fieldset');

    STORE[questionIndex].answer.forEach(function (answerValue, answerIndex) {
        $(`<label class="answerIndex" for="${answerIndex}">
            <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
            <span class="answerOptions">${answerValue}</span>
          </label>`).appendTo(fieldSelector);
        });
        $(`<button type="submit" class="submitAnswer button">Submit</button> `).appendTo(fieldSelector);
        return formMaker;
}

// submits selected answer and checks it against the correct answer.
// runs correct or wrong answer functions accordingly.
function submitAnswer() {
    $('.container').on('click', '.submitAnswer', function(event) {
        event.preventDefault();
        $('.altBox').hide();
        $('.response').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNum].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}

// correct answer response
// increments score variable by 1
function correctAnswer() {
    $('.response').html(
        `<h3>Correct answer!</h3>
        <img src="images/rockhand.jpg" alt="rockon-hand">
        <p>Keep on rockin!</p>
        <button class="nextButton button" type="submit">Next</button>`
    );
    updateScore();
}

// wrong answer response
function wrongAnswer() {
    $('.response').html(
        `<h3>Wrong answer.</h3>
        <img src="images/brokendrum.jpg" alt="broken drum" class="broken-drum-pic"><br>
        <p>The correct answer is:</p>
        <p>${STORE[questionNum].correctAnswer}</p>
        <button class="nextButton button" type="submit">Next</button>`
    );
}

// generates the next question
function nextQuestion() {
    $('.container').on('click', '.nextButton', function(event) {
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionNum();
        $('.questionBox form').replaceWith(createQuestion());
    });
}

// calculate final score and give feedback at end of quiz
function finalScore() {
    $('.final').show();

    const pass = [
        'Congratulations, you rock!',
        'images/ludwig.jpg',
        'ludwig drum banner',
        'You are a drum aficionado!'
    ]

    const fail = [
        "Don't be a dumb drummer.  Keep practicing.",
        'images/whiplashmad.jpg',
        'whiplash scene',
        'Try again.'
    ]

    if (score > 3) {
        array = pass;
    } else {
        array = fail;
    }

    return $('.final').html(
        `<h3>${array[0]}</h3><br>
        <img src="${array[1]}" alt="${array[2]}" class="finalPic">
        <p>${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`

    );
}

// restarts quiz
function restartQuiz() {
    $('.container').on('click', '.restartButton', function(event) {
        event.preventDefault();
        resetStats();
        $('.altBox').hide();
        $('.startQuiz').show();
    });
}

// runs the functions 
startQuiz();
createQuestion();
submitAnswer();
nextQuestion();
restartQuiz();