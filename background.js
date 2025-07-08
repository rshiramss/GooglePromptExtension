chrome.runtime.onInstalled.addListener(function() {
    console.log('Prompt Enhancement Extension installed');
});

chrome.action.onClicked.addListener(function(tab) {
    console.log('Extension icon clicked');
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener(function(command) {
    if (command === 'trigger-google-search') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'keyboardShortcut'});
        });
    }
});