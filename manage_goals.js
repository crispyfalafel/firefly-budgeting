
myFunction = function() {
    alert('hai claire')
  }

<<<<<<< HEAD
// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");

// slider.oninput = function() {
//   console.log(slider.value)
//   output.textContent = this.value;
// }

var sliders = document.getElementsByClassName("slider")
=======

var sliders = document.getElementsByClassName("slider")
var outputs = document.getElementsByClassName("")
>>>>>>> 7bdca549683f24f6064cb343676658ae0b0e4688

for (let i = 0; i < sliders.length; i++) {
  sliders[i].addEventListener("input", function(event) {
    event.target.nextElementSibling.textContent = this.value
<<<<<<< HEAD
    
  })
}
=======

  })
}


>>>>>>> 7bdca549683f24f6064cb343676658ae0b0e4688
