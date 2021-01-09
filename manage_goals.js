
myFunction = function() {
    alert('hai claire')
  }

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.textContent = slider.value;

slider.onchange = function() {
  console.log(slider.value)
  output.textContent = this.value;
}