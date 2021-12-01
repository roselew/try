//How to read data
(() => {
    window.addEventListener(
        "paste",
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.pasteData = e.clipboardData.getData("application/json");

            const data = window.pasteData;
            const type = "text/json";
            const filename = `${JSON.parse(window.pasteData).payload.nodes[0].data.attr.id}.json`;

            var file = new Blob([data], { type: type });
            if (window.navigator.msSaveOrOpenBlob)
                // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else {
                // Others
                var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        },
        true
    );
})();
