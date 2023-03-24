let colorPool;
const defaultColor = "#F55A5A";
const BASE_URL = 'https://www.thecolorapi.com/';
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
    // create an array to hold the scheme colors returned
    const hexValues = [];
    // get user seed color choice
    colorPool = document.querySelector("#color-pool").value;
    // remove # from hexcode for url
    colorPool = colorPool.slice(1);
    // get user scheme choice
    const userScheme = document.getElementById("scheme-choice").value;
    // fetch color scheme from color api
    fetch(`${BASE_URL}scheme?hex=${colorPool}&mode=${userScheme}&count=5`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(element => {
                // Add returned values to hexValue array
                hexValues.push(element.hex.value)
            })

            const colValues = [...hexValues]; 
            const cols = document.querySelectorAll(".col");
            const hexNames = document.querySelectorAll(".hex");
            // Add returned values to columns background
            cols.forEach((col) => {
                col.style.backgroundColor = colValues.shift();
            });
            // Add returned values to footer
            hexNames.forEach((hexName) => {
                hexName.innerHTML = `<div class="tooltip" onclick="hexCopy(this)">${hexValues.shift()}
                <span class="tooltiptext">Copy to Clipboard</span></div>`;
            });
    });

});
 
// Copy text to clipboard
function hexCopy(element) {
    let copyText = element.innerHTML;
  
    copyText = copyText.substr(0, 7);
    navigator.clipboard.writeText(copyText)
    .then(() => { 
        element.lastChild.textContent = "Copied: " + copyText;
     })
    .catch((error) => { 
        element.lastChild.textContent =`Copy failed! ${error}`; 
    });
}
