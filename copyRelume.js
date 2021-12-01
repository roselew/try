function wfJsonCopy(e) {
    if (e && e.clipboardData) {
        e.clipboardData.setData("application/json", window.wfCopyJsonData);
        e.preventDefault();
        window.iqwerty.toast.toast("Copied to clipboard!", {
            settings: { duration: 2000 },
            style: {
                main: {
                    "max-width": "40rem",
                    "margin-right": "auto",
                    "margin-left": "auto",
                    padding: "0.65rem 2rem",
                    "border-radius": "12px",
                    background: undefined,
                    "background-color": "#161616",
                    "background-image":
                        'url("https://assets.website-files.com/6177739448baa66404ce1d9c/618cb82618a62f827fa47272_checkmark_circle_outlined.svg")',
                    "background-position": "16px 50%",
                    "background-size": "auto",
                    "background-repeat": "no-repeat",
                    "box-shadow": "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
                    color: "#fff",
                    "font-weight": 500,
                    "text-align": "center",
                },
            },
        });
    }
    window.removeEventListener("copy", wfJsonCopy);
}

document.addEventListener("DOMContentLoaded", function () {
    jQuery(document).on("click", ".component_copy-button", function (event) {
        event.target.classList.add("loading");
        event.target.classList.add("component_loading-button");
        event.target.classList.remove("component_copy-button");
        event.target.textContent = "Copying...";
        fetch("https://d67ceuxvao51w.cloudfront.net/" + event.target.id + ".json")
            .then((response) => {
                if (!response.ok) return new Promise((resolve, reject) => reject(response.text()));
                return response.text();
            })
            .then((data) => {
                window.addEventListener("copy", wfJsonCopy);
                window.wfCopyJsonData = data;
                document.execCommand("copy");
            })
            .catch((error) => {
                console.error(typeof error == "object" ? error.message : error);
                window.iqwerty.toast.toast(
                    "Oops. Something went wrong. Try refreshing the page and trying again.",
                    {
                        style: {
                            main: {
                                "max-width": "40rem",
                                "margin-right": "auto",
                                "margin-left": "auto",
                                padding: "0.65rem 2rem",
                                "border-radius": "12px",
                                background: undefined,
                                "background-color": "#ff4848",
                                "box-shadow": "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
                                color: "#fff",
                                "font-weight": 500,
                                "text-align": "center",
                            },
                        },
                    }
                );
            })
            .finally(() => {
                event.target.classList.remove("loading");
                event.target.classList.remove("component_loading-button");
                event.target.classList.add("component_copy-button");
                event.target.textContent = "Copy";
            });
    });
});
