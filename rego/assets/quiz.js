// Shared quiz widget. Markup contract:
// <div class="quiz" data-answer="2">        <- 0-based index of correct option
//   <p class="q">Question?</p>
//   <button class="opt">A</button>
//   <button class="opt">B</button>
//   <button class="opt">C</button>
//   <div class="feedback">Explanation shown after answering.</div>
// </div>
document.querySelectorAll('.quiz').forEach(function (quiz) {
  var answer = parseInt(quiz.dataset.answer, 10);
  var opts = quiz.querySelectorAll('button.opt');
  var feedback = quiz.querySelector('.feedback');
  opts.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      if (quiz.dataset.done) return;           // one attempt: retrieval, not trial-and-error
      quiz.dataset.done = '1';
      btn.classList.add(i === answer ? 'correct' : 'wrong');
      if (i !== answer) opts[answer].classList.add('correct');
      if (feedback) feedback.classList.add('show');
    });
  });
});
