//How to read data

const listOfSymbols = [];
console.log("Etap 1: Pobieram listę symboli");
try {
    document
        .querySelectorAll("[data-automation-id='unnamed-symbol-name']")
        .forEach((elem, index) => {
            if (index < window.minIndex || index > window.maxIndex) {
                throw "Break";
            }
            const name = elem.innerText;
            console.log(index + 1 + "." + name);
            listOfSymbols.push(name);
            elem.click();
        });
} catch (e) {
    if (e !== "Break") throw e;
}

var index = 2;
var symbolsToCopy = [];

setTimeout(() => {
    symbolsToCopy = document.querySelectorAll("[data-depth='1']");
    window.addEventListener("paste", doPaste, true);
    prepareCopy();
}, 1000);

function prepareCopy() {
    console.log(index - 1 + "/" + listOfSymbols.length + "." + listOfSymbols[index - 2]);
    symbolsToCopy[index].click();
    document.execCommand("copy");

    if (index === listOfSymbols.length + 2) {
        clearInterval(i);
    }
}

function doPaste(e) {
    e.preventDefault();
    e.stopPropagation();

    const data = e.clipboardData.getData("application/json");
    const name = listOfSymbols[index - 1];

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://hook.eu1.make.com/vqm0i798jft3juwx1ytpr7abaz6f5r1n", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ name: name, code: data }));

    index++;
    prepareCopy();
}
