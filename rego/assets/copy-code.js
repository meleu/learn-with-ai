/* Adds a "copy" button to every <pre> block. Progressive enhancement. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var blocks = document.querySelectorAll('pre');
    Array.prototype.forEach.call(blocks, function (pre) {
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = 'copy';
      btn.addEventListener('click', function () {
        var code = pre.querySelector('code') || pre;
        var text = code.innerText.replace(/\n$/, '');
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'copied';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = 'copy';
            btn.classList.remove('copied');
          }, 1400);
        });
      });
      pre.appendChild(btn);
    });
  });
})();
