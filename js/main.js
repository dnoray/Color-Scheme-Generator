let colorPool;
const defaultColor = "#F55A5A";
const BASE_URL = 'https://www.thecolorapi.com/';
const colorBtn = document.getElementById("color-btn__inner");
const schemeBtn = document.getElementById("schemeBtn");

// Once page is loaded, load event handler (startup()) is called
window.addEventListener("load", startup, false);
  
  
/* Gets a reference to the color <input> element in a variable colorPool
   then sets the color input's value to the value in defaultColor. */
function startup() {
    colorPool = document.querySelector("#color-pool");
    colorPool.value = defaultColor;
}
  



schemeBtn.addEventListener("click", () => {
    // get user scheme choice
    const userScheme = document.getElementById("scheme-choice").value;
    // get user seed color choice
    colorPool = document.querySelector("#color-pool").value;
    // remove # from hexcode for url
    colorPool = colorPool.slice(1)
    // fetch color scheme from color api
    fetch(`${BASE_URL}scheme?hex=${colorPool}&mode=${userScheme}&count=5`)
        .then(res => res.json())
        .then(data => {
            document.querySelector(".col-1").style.backgroundColor = data.colors[0].hex.value;
            document.querySelector(".hexcode1").innerHTML = data.colors[0].hex.value;
            document.querySelector(".col-2").style.backgroundColor = data.colors[1].hex.value;
            document.querySelector(".hexcode2").innerHTML = data.colors[1].hex.value;
            document.querySelector(".col-3").style.backgroundColor = data.colors[2].hex.value;
            document.querySelector(".hexcode3").innerHTML = data.colors[2].hex.value;
            document.querySelector(".col-4").style.backgroundColor = data.colors[3].hex.value;
            document.querySelector(".hexcode4").innerHTML = data.colors[3].hex.value;
            document.querySelector(".col-5").style.backgroundColor = data.colors[4].hex.value;
            document.querySelector(".hexcode5").innerHTML = data.colors[4].hex.value;
        })
})