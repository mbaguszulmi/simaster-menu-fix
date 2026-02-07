window.addEventListener('load', function () {
    console.log("Content script loaded.");

    chrome.storage.sync.get(['fixOptions'], (result) => {
        if (result.fixOptions) {
            const fixOptions = result.fixOptions;
            console.log("Retrieved fixOptions:", fixOptions);

            const rightNav = document.querySelector("ul.navbar-right");

            if (rightNav) {
                if (fixOptions.hideName) {
                    const nameElement = rightNav.querySelector("span.hidden-md");
                    if (nameElement) {
                        nameElement.style.display = "none";
                        console.log("User name element hidden.");
                    } else {
                        console.log("User name element not found.");
                    }
                }

                if (fixOptions.hideGoogleTranslate) {
                    const gTranslateNav = rightNav.querySelector("div#google_translate_element");
                    if (gTranslateNav) {
                        gTranslateNav.parentElement.style.display = "none";
                        console.log("Google Translate in navbar hidden.");
                    } else {
                        console.log("Google Translate in navbar not found.");
                    }
                }
            }
        } else {
            console.log("No fixOptions found in storage.");
        }
    });
});
