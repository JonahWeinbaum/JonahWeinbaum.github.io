const terminalText = document.getElementById('terminal-input');
const terminalContainer = document.querySelector('.gt');

function printOutput(text) {
  const output = document.getElementById('terminal-output');
  output.textContent = text + "\n"; // Replace content
  output.scrollTop = output.scrollHeight; // Scroll to bottom
}

function handleCommand(input) {
  const command = input.replace("[jonah@weinbaum ~]$", "").replace("_", "").trim(); // Remove prompt and cursor
  const commandLine = input.replace("_", ""); // Show command without cursor
  let outputText = ""; // Start with the command

  if (command === "clear") {
    const output = document.getElementById('terminal-output');
    output.textContent = ""; // Clear output
    terminalContainer.classList.remove('fullscreen'); // Collapse to compact
    return; // Exit early
  }

  // Enter full-screen mode for other commands
  terminalContainer.classList.add('fullscreen');

  if (command === "help") {
    outputText += "Available commands:\n- help\n- ls\n- cd [dir]\n- pwd\n- clear";
  } else if (command === "ls") {
      outputText += "home	blog";
  } else if (command === "pwd") {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === "index.html") {
      outputText += "/home/jonah";
    } else if (currentPage === "blog.html") {
      outputText += "/home/jonah/blog";
    } else {
      outputText += "/home/jonah/unknown";
    }
  } else if (command.startsWith("cd ")) {
    const dir = command.slice(3).trim(); // Extract directory after "cd "
    if (dir === "blog") {
      window.location.href = "blog.html"; // Navigate to blog.html
      return; // Exit to prevent output
    } else if (dir === "~" || dir === "/" || dir == "." || dir === ".." || dir === "home" || dir === "../") {
      window.location.href = "index.html"; // Navigate to main page
      return; // Exit to prevent output
    } else {
      outputText += "cd: no such file or directory: " + dir;
    }
  } else {
      outputText += "jsh: " + command + ": command not found ";
  }
  printOutput(outputText); // Print command and output
}

document.addEventListener('keydown', (event) => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let ttext = "[jonah@weinbaum ";

   if (currentPage === "index.html") {
     ttext += "~";
   } else if (currentPage === "blog.html") {
       ttext += "blog"
   } else {
       ttext += "?";
   }
    ttext += "]$ ";
  if (event.key.length === 1) {
    // Add typed character after prompt
    if (terminalText.textContent.length < 50) {
      terminalText.textContent = terminalText.textContent.replace("_", "") + event.key;
    }
  } else if (event.key === 'Backspace') {
    // Prevent deleting prompt
      if (terminalText.textContent.length > ttext.length) {
      terminalText.textContent = terminalText.textContent.slice(0, -1);
    }
    event.preventDefault();
  } else if (event.key === 'Enter') {
    const input = terminalText.textContent;
    handleCommand(input);
      terminalText.textContent = ttext; // Reset prompt
  }
});

// Prevent links from activating on Enter
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
});

// Prevent space from paging down
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && event.target === document.body) {
    event.preventDefault();
  }
});
