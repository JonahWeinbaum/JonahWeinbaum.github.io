const terminalText = document.getElementById('terminal-input');

document.addEventListener('keydown', (event) => {
    if (event.key.length === 1) {
	// Add typed character to the terminal text
	if (terminalText.textContent.length < 20) {
	    terminalText.textContent += event.key;
	}
    } else if (event.key === 'Backspace') {
	// Prevent deleting beyond the prompt
	if (terminalText.textContent.length > 1) {
            terminalText.textContent = terminalText.textContent.slice(0, -1);
	}
	// Prevent default Backspace behavior
	event.preventDefault();
    } else if (event.key === 'Enter') {
	
	terminalText.textContent = " ";
    }
});
