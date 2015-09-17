function judge(result) {
  if (result) { document.body.classList.add("ok"); }
}
window.onload = function() {
  var text = [].slice.call(document.scripts)[1].textContent;
  var preNode = document.createElement("pre");
  preNode.className = "brush:js";
  var textNode = document.createTextNode(text);
  preNode.appendChild(textNode);
  document.body.appendChild(preNode);
/*
  document.body.onmouseover = function(event) {
      event.target.style.height = "35em";
  };
  document.body.onmouseleave = function(event) {
      event.target.style.height = "25em";
  };
 */
};

