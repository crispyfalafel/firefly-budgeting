
myFunction = function() {
    alert('hai claire')
  }


var sliders = document.getElementsByClassName("slider")
var outputs = document.getElementsByClassName("")

for (let i = 0; i < sliders.length; i++) {
  sliders[i].addEventListener("input", function(event) {
    event.target.nextElementSibling.textContent = this.value

  })
}


