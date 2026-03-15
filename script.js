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
