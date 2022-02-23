//How to read data
var listOfSymbols = [];

console.log("Etap 1: Pobieram listę symboli");

document.querySelectorAll("[data-automation-id='unnamed-symbol-name']").forEach((elem, i) => {
    if (i >= window.minIndex && i <= window.maxIndex) {
        const name = elem.innerText;
        console.log(i + 1 + "." + name);
        listOfSymbols.push(name);
        elem.click();
    }
});

var index = 0;
var symbolsToCopy = [];

setTimeout(() => {
    symbolsToCopy = document.querySelectorAll("[data-depth='1']");
    prepareCopy();
    window.addEventListener("paste", doPaste, true);
}, 10000);

function prepareCopy() {
    console.log(index + 1 + "/" + listOfSymbols.length + "." + listOfSymbols[index]);
    symbolsToCopy[index + 2].click();
    setTimeout(() => {
        document.execCommand("copy");
    }, 500);
}

function removeItem(elem) {
    elem.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 46, view: window, bubbles: true }));
    elem.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 46, view: window, bubbles: true }));
    setTimeout(deleteItem, 500);
}

function deleteItem() {
    const item = document.querySelectorAll("[data-depth='1']")[3];
    if (item) {
        item.addEventListener(
            "click",
            () => {
                removeItem(item);
            },
            true
        );
        item.click();
    }
}

function doPaste(e) {
    e.preventDefault();
    e.stopPropagation();

    const data = e.clipboardData.getData("application/json");
    const name = listOfSymbols[index];

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://hook.eu1.make.com/vqm0i798jft3juwx1ytpr7abaz6f5r1n", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ name: name, code: data }));

    index++;
    if (index == listOfSymbols.length) {
        console.log("KONIEC");
        window.removeEventListener("paste", doPaste, true);
        deleteItem();
    } else {
        prepareCopy();
    }
}
