chrome.storage.sync.get(['fixOptions'], (result) => {
    if (result.fixOptions) {
        const fixOptions = result.fixOptions;
        document.getElementById('option-1').checked = fixOptions.hideGoogleTranslate || false;
        document.getElementById('option-2').checked = fixOptions.hideName || false;
    }
});

// Save settings when button is clicked
document.getElementById('saveBtn').addEventListener('click', () => {
    const fixOptions = {
        hideGoogleTranslate: document.getElementById('option-1').checked,
        hideName: document.getElementById('option-2').checked
    };

    chrome.storage.sync.set({ fixOptions }, () => {
        console.log('Settings saved', fixOptions);
        
        const shouldReload = confirm("Settings saved. Reload the page to apply changes?");
        if (shouldReload) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.reload(tabs[0].id);
            });
        }

        window.close();
    });
});