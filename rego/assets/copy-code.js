// Adds a copy button to every <pre> code block.
document.querySelectorAll('pre').forEach(function (pre) {
  var btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.type = 'button';
  btn.textContent = 'copy';
  btn.addEventListener('click', function () {
    var code = pre.querySelector('code') || pre;
    navigator.clipboard.writeText(code.innerText).then(function () {
      btn.textContent = 'copied!';
      btn.classList.add('done');
      setTimeout(function () {
        btn.textContent = 'copy';
        btn.classList.remove('done');
      }, 1500);
    });
  });
  pre.appendChild(btn);
});
