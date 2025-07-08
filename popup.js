document.addEventListener('DOMContentLoaded', function() {
    const buttonTextInput = document.getElementById('buttonText');
    const promptTextInput = document.getElementById('promptText');
    const saveButton = document.getElementById('saveButton');
    const triggerButton = document.getElementById('triggerButton');
    const status = document.getElementById('status');

    // Load saved settings
    chrome.storage.sync.get(['buttonText', 'promptText'], function(result) {
        buttonTextInput.value = result.buttonText || 'Google Search';
        promptTextInput.value = result.promptText || 'Conduct a thorough Google search on the topic provided, summarize the most relevant and up-to-date information from reputable sources, cite all sources with links, highlight key findings, and present the information in a clear, concise, and well-structured format suitable for a professional audience.';
    });

    // Save settings
    saveButton.addEventListener('click', function() {
        const buttonText = buttonTextInput.value.trim() || 'Google Search';
        const promptText = promptTextInput.value.trim() || 'Conduct a thorough Google search on the topic provided, summarize the most relevant and up-to-date information from reputable sources, cite all sources with links, highlight key findings, and present the information in a clear, concise, and well-structured format suitable for a professional audience.';
        
        chrome.storage.sync.set({
            buttonText: buttonText,
            promptText: promptText
        }, function() {
            // Update button text in content script
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'updateButtonText',
                    text: buttonText
                });
            });
            
            // Show success message
            status.textContent = 'Settings saved successfully!';
            status.className = 'status success';
            status.style.display = 'block';
            
            setTimeout(function() {
                status.style.display = 'none';
            }, 2000);
        });
    });

    // Trigger prompt enhancement
    triggerButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'buttonClicked'});
        });
    });
});