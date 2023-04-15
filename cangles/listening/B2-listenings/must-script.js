function generateQuiz(questions, quizContainer, resultsContainer, submitButton, Quest){

  function showQuestions(questions, quizContainer){
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for(var i=0; i<questions.length; i++){
      
      // first reset the list of answers
      answers = [];

      // for each available answer...
      for(letter in questions[i].answers){

        // ...add an html radio button
        answers.push(
          '<div class="ans ml-2"><label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + ' '+ letter + ')  '
            + questions[i].answers[letter]
          + '</label></div>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div style="padding:7px;" class="question bg-white p-3"><div class="d-flex flex-row align-items-center question-title"><h3 class="text-primary">' + i + '.</h3><h5 class="mt-1 ml-2"><div class="question">' + questions[i].question + '</h5></div></div>'
        + '<div style="padding:4px;" class="answers">' + answers.join('') + '<hr></div></div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML += output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer,iq){
    
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    
    // for each question...
    for(var i=0; i<questions.length; i++){

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      // if answer is correct
      if(userAnswer===(String.fromCharCode(questions[i].correctAnswer - iq[1] + iq[4] - iq[3]))){
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }
  //document.getElementById("top").innerHTML = '<div class="container mt-5"><div class="d-flex justify-content-center row"><div class="col-md-10 col-lg-10"><div class="border"><div class="question bg-white p-3 border-bottom"><div class="d-flex flex-row justify-content-between align-items-center mcq"><h4></h4><span>following country</span></div></div>';
  //quizContainer.innerHTML += '<div class="container mt-5"><div class="d-flex justify-content-center row"><div class="col-md-10 col-lg-10"><div class="border"><div class="question bg-white p-3 border-bottom"><div class="d-flex flex-row justify-content-between align-items-center mcq"><h4></h4><span>fo0llowing country</span></div></div>';
  // show questions right away
  showQuestions(questions, quizContainer);
  //document.getElementById("bottom").innerHTML = '</div></div></div></div>';
  //quizContainer.innerHTML += '<p>Powered by ****</p></div></div></div></div>'; 
  // on submit, show results
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer,Quest);
  }

}



