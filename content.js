// content.js

let promptEnhancerButton = null;
let customButtonText = 'Google Search';

function findPromptTextarea() {
    // This selector remains the same and is effective.
    const selectors = [
        'textarea[aria-label="Enter a prompt here"]',
        'textarea[placeholder*="prompt"]',
        'textarea[placeholder*="Ask"]',
        'textarea[placeholder*="message"]',
        'div[contenteditable="true"]',
        'input[type="text"][placeholder*="prompt"]'
    ];

    for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
            return element;
        }
    }
    return null;
}

function createPromptEnhancerButton() {
    const button = document.createElement('button');
    button.className = 'prompt-enhancer-button';
    button.innerHTML = `
        <svg class="prompt-enhancer-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <span class="prompt-enhancer-label">${customButtonText}</span>
    `;

    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click from triggering other actions
        appendTextToPrompt();
    });

    return button;
}

function appendTextToPrompt() {
    const promptTextarea = findPromptTextarea();
    if (!promptTextarea) {
        console.log('No prompt textarea found');
        return;
    }

    try {
        chrome.storage.sync.get(['promptText'], function(result) {
            if (chrome.runtime.lastError) {
                console.error('Extension context invalidated or storage error:', chrome.runtime.lastError);
                return;
            }
            const textToAdd = result.promptText || 'Conduct a thorough Google search on the topic provided. Present a clear and concise summary of the most relevant and up-to-date information, using numbered citations [1], [2], etc. to reference sources. Highlight key findings in the main text. At the bottom, include a "Sources" section that lists all references with their full URLs. Format the response to be well-structured and suitable for a professional audience.';
            let currentValue = '';

            // Handle both textarea/input and contenteditable divs
            if (promptTextarea.tagName.toLowerCase() === 'textarea' || promptTextarea.tagName.toLowerCase() === 'input') {
                currentValue = promptTextarea.value;
            } else {
                currentValue = promptTextarea.textContent;
            }

            const separator = currentValue && !/\s$/.test(currentValue) ? ' ' : '';
            const finalText = currentValue + separator + textToAdd + ' ';

            if (promptTextarea.tagName.toLowerCase() === 'textarea' || promptTextarea.tagName.toLowerCase() === 'input') {
                promptTextarea.value = finalText;
            } else {
                 // For contenteditable divs, we need to insert the text more carefully
                const p = promptTextarea.querySelector('p');
                if (p) {
                    p.innerHTML = finalText.replace(/\s/g, '&nbsp;'); // Use non-breaking spaces
                } else {
                     promptTextarea.textContent = finalText;
                }
            }

            // Trigger input event to let the website know the content has changed
            promptTextarea.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            showFeedback();
            promptTextarea.focus();
        });
    } catch (e) {
        console.error('Extension context invalidated:', e);
    }
}


function injectButton() {
    if (document.querySelector('.prompt-enhancer-button')) {
        return; // Button already exists
    }

    // Target the container of the text input field
    const targetContainer = document.querySelector('.text-input-field');

    if (targetContainer) {
        const button = createPromptEnhancerButton();
        // Insert it within the input-buttons-wrapper-bottom, which holds the send/mic buttons
        const trailingActions = targetContainer.querySelector('.trailing-actions-wrapper');
        if (trailingActions) {
            const inputButtonsWrapper = trailingActions.querySelector('.input-buttons-wrapper-bottom');
            if (inputButtonsWrapper) {
                inputButtonsWrapper.appendChild(button); // Appends the button inside this container
                promptEnhancerButton = button;
                console.log('Button inserted into the prompt bar');
            } else {
                console.log('Could not find .input-buttons-wrapper-bottom within .trailing-actions-wrapper');
            }
        } else {
            console.log('Could not find .trailing-actions-wrapper');
        }
    }
}

function initializeExtension() {
    const observer = new MutationObserver((mutations, obs) => {
        if (document.querySelector('.text-input-field') && !document.querySelector('.prompt-enhancer-button')) {
            injectButton();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'buttonClicked' || request.action === 'keyboardShortcut') {
        appendTextToPrompt();
    } else if (request.action === 'updateButtonText') {
        customButtonText = request.text;
        if (promptEnhancerButton) {
            const label = promptEnhancerButton.querySelector('.prompt-enhancer-label');
            if (label) {
                label.textContent = customButtonText;
            }
        }
    }
});


function showFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'prompt-enhancer-feedback';
    feedback.textContent = 'Text added to prompt!';
    document.body.appendChild(feedback);

    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

// Start the extension
initializeExtension();