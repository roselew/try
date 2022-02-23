//How to read data

const listOfSymbols = [];
console.log("Etap 1: Pobieram listę symboli");
try {
    document
        .querySelectorAll("[data-automation-id='unnamed-symbol-name']")
        .forEach((elem, index) => {
            if (index >= 5) {
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

window.addEventListener(
    "paste",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.clipboardData.getData("application/json"));
        window.pasteData = e.clipboardData.getData("application/json");

        const data = window.pasteData;
        const name = window.copiedElemName;

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://hook.eu1.make.com/vqm0i798jft3juwx1ytpr7abaz6f5r1n", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ name: name, code: data }));
    },
    true
);

document.querySelector("[data-depth='0']").addEventListener("click", (event) => {
    console.log(event.clipboardData.getData("application/json"));
});

setTimeout(() => {
    console.log("Etap 2: Kopiuje symbole");
    const symbolsToCopy = document.querySelectorAll("[data-depth='1']");

    var index = 2;
    var i = setInterval(function () {
        console.log(index - 1 + "." + listOfSymbols[index - 2]);
        window.copiedElemName = listOfSymbols[index - 1];
        symbolsToCopy[index].click();
        document.execCommand("copy");

        setTimeout(() => {
            document.querySelector("[data-depth='0']").click();
        }, 500);
        index++;
        if (index === listOfSymbols.length + 2) {
            clearInterval(i);
        }
    }, 1000);
}, 1000);
