# Google Search Button for Gemini

A Chrome extension that adds a customizable "Google Search" button to AI prompt interfaces, making it easy to enhance your prompts with professional research instructions.

## Features

- **One-Click Prompt Enhancement**: Adds a Google Search button directly to prompt input fields
- **Customizable Button Text**: Change the button label to suit your preferences
- **Customizable Prompt Text**: Modify the research instruction text that gets added to your prompts
- **Keyboard Shortcut**: Use `Ctrl+Shift+G` (or `Cmd+Shift+G` on Mac) for quick access
- **Universal Compatibility**: Works on any website with prompt input fields
- **Professional Research Format**: Default prompt encourages comprehensive research with proper citations

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon will appear in your browser toolbar

## Usage

### Basic Usage
1. Navigate to any AI chat interface (Gemini, ChatGPT, etc.)
2. Look for the Google Search button next to the prompt input field
3. Click the button to automatically add research instructions to your prompt
4. Submit your enhanced prompt

### Customization
1. Click the extension icon in your browser toolbar
2. Modify the "Button Label" to change what appears on the button
3. Edit "Text to Add" to customize the research instructions
4. Click "Save Settings" to apply your changes
5. Use "Add to Prompt" to test the functionality

### Keyboard Shortcut
Press `Ctrl+Shift+G` (Windows/Linux) or `Cmd+Shift+G` (Mac) to instantly add the research text to the current prompt field.

## Default Prompt Text

The extension comes with a professional research prompt:

> "Conduct a thorough Google search on the topic provided. Present a clear and concise summary of the most relevant and up-to-date information, using numbered citations [1], [2], etc. to reference sources. Highlight key findings in the main text. At the bottom, include a "Sources" section that lists all references with their full URLs. Format the response to be well-structured and suitable for a professional audience."

## Technical Details

### Files Structure
- `manifest.json` - Extension configuration and permissions
- `content.js` - Main script that injects the button into web pages
- `background.js` - Service worker for handling extension events
- `popup.html` - Settings interface
- `popup.js` - Settings functionality
- `styles.css` - Button and feedback styling

### Permissions
- `activeTab` - Access to the current tab for button injection
- `storage` - Save user preferences for button text and prompt text

### Browser Compatibility
- Chrome (Manifest V3)
- Edge (Chromium-based)

## Development

### Local Development
1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon for the extension to reload changes

### Building
No build process required - the extension runs directly from source files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. See the repository for license details.

## Author

Created by rshiramss

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/rshiramss/GooglePromptExtension).