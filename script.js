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

// Prevent links from activating on enter
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
});

// Prevent space from paging down
window.addEventListener("keydown", function(e) {
    if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
    }
});
