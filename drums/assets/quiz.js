/* ============================================================
   Reusable self-check quiz component.
   Markup:
     <div class="quiz" data-answer="1">
       <p class="quiz-q">Question text?</p>
       <button>Option zero</button>
       <button>Option one</button>
       ...
       <p class="quiz-fb" data-ok="Nice reason." data-no="Not quite — reason."></p>
     </div>
   data-answer is the 0-based index of the correct button.
   Immediate feedback; retryable.
   ============================================================ */
(function () {
  function initQuiz(quiz) {
    var answer = parseInt(quiz.getAttribute("data-answer"), 10);
    var fb = quiz.querySelector(".quiz-fb");
    var buttons = Array.prototype.slice.call(quiz.querySelectorAll("button"));

    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("chosen"); });
        btn.classList.add("chosen");
        var correct = i === answer;
        quiz.classList.toggle("answered-ok", correct);
        quiz.classList.toggle("answered-no", !correct);
        if (fb) {
          fb.textContent = correct
            ? (fb.getAttribute("data-ok") || "Correct.")
            : (fb.getAttribute("data-no") || "Try again.");
          fb.style.color = correct ? "var(--good)" : "var(--bad)";
        }
      });
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quiz").forEach(initQuiz);
  });
})();
