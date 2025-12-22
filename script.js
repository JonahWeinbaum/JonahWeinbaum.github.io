
const terminalText = document.getElementById('terminal-input');
const terminalContainer = document.querySelector('.gt');

abs_paths =
    {
	home:["~", "/home/jonah"],
	blog:["~/blog", "/home/jonah/blog"]
    };

blog_entries = ["galton.html"];

function printOutput(text) {
  const output = document.getElementById('terminal-output');
  output.textContent = text + "\n"; // Replace content
  output.scrollTop = output.scrollHeight; // Scroll to bottom
}

function ps1() {
   const currentPage = window.location.pathname.split('/').pop() || 'index.html';
   let ttext = "[jonah@weinbaum ";

   switch (currentPage) {
     case "index.html":
       ttext += "~";
       break;
     case "blog.html":
       ttext += "blog";
       break;
     default:
       ttext += "?";
   }
   ttext += "]$ ";
   return ttext;
}

function cd(dir) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // Handle absolute paths
    if (abs_paths.home.includes(dir)) {
	window.location.href = "/index.html"; // Navigate to blog.html
	return 0;
    } else if (abs_paths.blog.includes(dir)) {
	window.location.href = "/blog/blog.html"; // Navigate to blog.html
	return 0;
    }

    // Handle relative paths
    switch(currentPage) {
      case "index.html":
	switch(dir) {
            case ".":
            case "./":
                return 0;
	    case "..":
            case "../":
		return -1;
	    case "blog":
		window.location.href = "/blog/blog.html"; // Navigate to blog.html
	        return 0;
            default: 
                return 1;
	}
	break;
      case "blog.html":
	switch(dir) {
            case ".":
            case "./":
                return 0;
	    case "..":
            case "../":
		window.location.href = "/index.html"; // Navigate to blog.html
		return 0;
	    case "entries":
		window.location.href = "/blog/blog.html"; // Navigate to blog.html
	        return 0;
            default: 
                return 1;
	}
	break;
      default:
	return 1;
    }
}

function ls() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let lst = ""
    switch(currentPage) {
      case "index.html":
	  lst += "blog";
	  break;
      case "blog.html":
	  lst += "entries";
	  break;
      default:
	lst += "/unknown";
    }
    return lst;
}

function pwd() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let wd = "/home/jonah"
    switch(currentPage) {
      case "index.html":
	  wd += "";
	  break;
      case "blog.html":
	  wd += "/blog";
	  break;
      default:
	wd += "/unknown";
    }
    return wd;
}

function handleCommand(input) {
  const command = input.replace(/\[jonah@weinbaum .*?\]\$/g, "").replace("_", "").trim(); // Remove prompt and cursor
  const commandLine = input.replace("_", ""); // Show command without cursor

  let outputText = ""; // Start with the command

  console.log(command)

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
      outputText += ls();
  } else if (command === "pwd") {
      outputText += pwd();
  } else if (command.startsWith("cd ")) {
    const dir = command.slice(3).trim(); // Extract directory after "cd "
      let res = cd(dir);
      if (res) {
	  if (res === -1) {
	      outputText += "cd: invalid permissions:" + dir;
	  } else {
	      outputText += "cd: no such file or directory: " + dir;
          }
      }
  } else {
     outputText += "jsh: " + command + ": command not found ";
  }
  printOutput(outputText); // Print command and output
}

document.addEventListener('keydown', (event) => {
  
  let ttext = ps1();

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
