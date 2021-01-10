
var sliders = document.getElementsByClassName("slider")

for (let i = 0; i < sliders.length; i++) {
  sliders[i].addEventListener("input", function(event) {
    event.target.nextElementSibling.textContent = this.value
  })
}

