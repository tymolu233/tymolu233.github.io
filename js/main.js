document.addEventListener('DOMContentLoaded', () => {
    // --- Matrix Rain Effect ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    setInterval(drawMatrix, 30);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });


    // --- Terminal Logic ---
    const text = "When I wirting my code, only God and I know what it does. After a while, only God knows.";
    const typingElement = document.getElementById('typing-text');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const speed = 30;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Show input line after typing finishes
            document.querySelector('.input-line').style.display = 'flex';
            terminalInput.focus();
        }
    }

    // Hide input initially
    document.querySelector('.input-line').style.display = 'none';
    setTimeout(typeWriter, 1000);

    // --- Sound Effects (Web Audio API) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playSound(type) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'type') {
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.05);
        } else if (type === 'enter') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        }
    }

    // Command Handling
    terminalInput.addEventListener('keydown', function (e) {
        playSound('type');
        if (e.key === 'Enter') {
            playSound('enter');
            const command = this.value.trim().toLowerCase();
            const outputDiv = document.createElement('div');
            outputDiv.innerHTML = `<p><span class="prompt-sign">user@tymolu233:~$</span> ${this.value}</p>`;

            let response = '';
            switch (command) {
                case 'help':
                    response = `Available commands:
  <span style="color: #fff">about</span>    - Who am I?
  <span style="color: #fff">projects</span> - View my work
  <span style="color: #fff">contact</span>  - Get in touch
  <span style="color: #fff">clear</span>    - Clear terminal
  <span style="color: #fff">help</span>     - Show this menu`;
                    break;
                case 'about':
                    response = "I am a developer who loves coding in the dark. I build things that break, then fix them.";
                    break;
                case 'projects':
                    response = "Check out the projects section below. Or visit my GitHub: <a href='https://github.com/tymolu233' target='_blank' style='color: #00f3ff'>github.com/tymolu233</a>";
                    break;
                case 'contact':
                    response = "Signal lost... just kidding. Find me on GitHub.";
                    break;
                case 'clear':
                    // Remove all previous siblings of the input line
                    while (terminalOutput.firstChild && terminalOutput.firstChild !== document.querySelector('.input-line')) {
                        terminalOutput.removeChild(terminalOutput.firstChild);
                    }
                    this.value = '';
                    return; // Exit early
                case 'flag':
                    response = "Redirecting to restricted area...";
                    setTimeout(() => {
                        window.location.href = '/about';
                    }, 1000);
                    break;
                case '':
                    response = '';
                    break;
                default:
                    response = `Command not found: ${command}. Type 'help' for a list of commands.`;
            }

            if (response) {
                outputDiv.innerHTML += `<p style="color: #ccc; margin-bottom: 10px; white-space: pre-wrap;">${response}</p>`;
            }

            terminalOutput.insertBefore(outputDiv, document.querySelector('.input-line'));
            this.value = '';

            // Auto scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    // Keep focus on input
    document.querySelector('.terminal-window').addEventListener('click', () => {
        terminalInput.focus();
    });

    // Glitch Effect Randomization
    const glitchElement = document.querySelector('.glitch');
    setInterval(() => {
        const r1 = Math.random() * 10;
        const r2 = Math.random() * 10;
        glitchElement.style.setProperty('--r1', r1);
        glitchElement.style.setProperty('--r2', r2);
    }, 2000);
});
