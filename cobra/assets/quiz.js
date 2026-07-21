/* Reusable quiz widget for the Rego course.
 *
 * Markup contract:
 *   <div class="quiz">
 *     <p class="q">Question?</p>
 *     <div class="opts">
 *       <button class="opt" data-correct>Right answer</button>
 *       <button class="opt">Wrong answer</button>
 *     </div>
 *     <div class="explain">Why the right answer is right.</div>
 *   </div>
 *
 * On first click: locks the quiz, marks chosen + correct options, reveals explanation.
 * Retrieval practice — one attempt, immediate feedback.
 */
(function () {
  function initQuiz(quiz, index) {
    var label = quiz.querySelector('.q');
    if (label && !quiz.querySelector('.qnum')) {
      var num = document.createElement('div');
      num.className = 'qnum';
      num.textContent = 'Check yourself — Q' + (index + 1);
      quiz.insertBefore(num, quiz.firstChild);
    }

    var opts = Array.prototype.slice.call(quiz.querySelectorAll('button.opt'));
    var explain = quiz.querySelector('.explain');

    opts.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (quiz.dataset.done) return;
        quiz.dataset.done = '1';

        var chosenCorrect = btn.hasAttribute('data-correct');
        opts.forEach(function (o) {
          o.disabled = true;
          if (o.hasAttribute('data-correct')) o.classList.add('correct');
        });
        if (!chosenCorrect) btn.classList.add('incorrect');

        if (explain) explain.classList.add('show');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var quizzes = document.querySelectorAll('.quiz');
    Array.prototype.forEach.call(quizzes, initQuiz);
  });
})();
