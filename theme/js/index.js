
/**
 * Code highlighting.
 */

(function () {

  var pres = document.querySelectorAll('.article-body pre')
  var array = Array.prototype.slice.call(pres)

  array.forEach(function (pre) {
    var language = pre.getAttribute('data-language')
    var grammar = Prism.languages[language]
    if (!language || !grammar) return

    var code = pre.querySelector('code')
    var string = code.textContent
    var html = Prism.highlight(string, grammar)
    code.innerHTML = html
  })

})()
