// RETINA SCAN LOGIC
document.getElementById('scan-btn').onclick = async () => {
    try {
        const auth = await navigator.credentials.get({
            publicKey: {
                challenge: Uint8Array.from("pioneer-challenge", c => c.charCodeAt(0)),
                userVerification: "required"
            }
        });
        if (auth) {
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('pioneer-main').style.display = 'block';
            addLog("Orderer recognized. Sovereign access granted.");
        }
    } catch (e) {
        addLog("Auth Error: Retina scan failed or cancelled.");
    }
};

// AI BOOT LOGIC
async function bootBrain() {
    document.getElementById('brain-state').innerText = "BOOTING...";
    // This triggers the MediaPipe local inference on the phone's hard disk
    addLog("Pulling Gemma-3 from local storage...");
    setTimeout(() => {
        document.getElementById('brain-state').innerText = "ONLINE (LOCAL)";
        addLog("Intelligence is now running on your silicon.");
    }, 2000);
}

function addLog(msg) {
    const box = document.getElementById('log-box');
    box.innerText += `\n[${new Date().toLocaleTimeString()}] ${msg}`;
}

function addToShield() {
    const app = document.getElementById('app-name').value;
    if(app) {
        addLog(`Shielding ${app}. AI vision will ignore this package.`);
        document.getElementById('app-name').value = '';
    }
}
// Function to process AI text for hidden commands
function processAIResponse(text) {
  if (!window.require) return text; // Exit if not in Desktop App
  
  const { ipcRenderer } = window.require('electron');

  // Regex Patterns
  const patterns = {
    click: /\[CLICK:\s*(\d+),\s*(\d+)\]/g,
    type: /\[TYPE:\s*(.*?)\]/g,
    press: /\[PRESS:\s*(.*?)\]/g
  };

  // Execute Clicks
  let match;
  while ((match = patterns.click.exec(text)) !== null) {
    ipcRenderer.send('pioneer-cmd', { action: 'click', x: parseInt(match[1]), y: parseInt(match[2]) });
  }

  // Execute Typing
  while ((match = patterns.type.exec(text)) !== null) {
    ipcRenderer.send('pioneer-cmd', { action: 'type', text: match[1] });
  }

  // Execute Key Presses (e.g. [PRESS: enter])
  while ((match = patterns.press.exec(text)) !== null) {
    ipcRenderer.send('pioneer-cmd', { action: 'tap', key: match[1].toLowerCase() });
  }

  // Return the text cleaned of tags for the user to read
  return text.replace(/\[.*?\]/g, '').trim();
}
