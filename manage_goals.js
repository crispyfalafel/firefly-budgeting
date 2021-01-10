
myFunction = function() {
    alert('hai claire')
  }

// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");

// slider.oninput = function() {
//   console.log(slider.value)
//   output.textContent = this.value;
// }

var sliders = document.getElementsByClassName("slider")

for (let i = 0; i < sliders.length; i++) {
  sliders[i].addEventListener("input", function(event) {
    event.target.nextElementSibling.textContent = this.value
    
  })
}
