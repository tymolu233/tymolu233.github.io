document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Soft ambient particles keep the page alive without competing with the content.
    const canvas = document.getElementById('ambient-canvas');
    const context = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    const resizeCanvas = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        const particleCount = Math.min(42, Math.max(18, Math.floor(window.innerWidth / 32)));
        particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 1.4 + 0.35,
            speed: Math.random() * 0.16 + 0.04,
            alpha: Math.random() * 0.36 + 0.08
        }));
    };

    const drawAmbient = () => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particles.forEach((particle) => {
            particle.y -= particle.speed;
            if (particle.y < -5) particle.y = window.innerHeight + 5;

            context.beginPath();
            context.fillStyle = `rgba(165, 242, 107, ${particle.alpha})`;
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fill();
        });

        if (!prefersReducedMotion) animationFrame = requestAnimationFrame(drawAmbient);
    };

    resizeCanvas();
    drawAmbient();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Reveal sections as they enter the viewport.
    const revealItems = document.querySelectorAll('.reveal:not(.is-visible)');
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    // Small interactive terminal.
    const terminalOutput = document.getElementById('terminal-output');
    const terminalForm = document.getElementById('terminal-form');
    const terminalInput = document.getElementById('terminal-input');
    const terminalWindow = document.querySelector('.terminal-window');
    const typingElement = document.getElementById('typing-text');
    const welcomeText = 'Welcome, curious human. Type help for a map.';
    let typingIndex = 0;

    const typeWelcome = () => {
        if (typingIndex >= welcomeText.length) return;
        typingElement.textContent += welcomeText.charAt(typingIndex);
        typingIndex += 1;
        window.setTimeout(typeWelcome, prefersReducedMotion ? 0 : 32);
    };
    window.setTimeout(typeWelcome, prefersReducedMotion ? 0 : 450);

    const focusTerminal = () => terminalInput.focus();
    terminalWindow.addEventListener('click', focusTerminal);

    const commandResponses = {
        help: 'Available commands:\n  about     who is behind the keyboard\n  projects  open the selected work\n  contact   find me on GitHub\n  clear     clear the terminal',
        about: 'A developer turning repetitive work into small, reliable tools. Currently learning in public.',
        projects: 'Opening the project index below. Try the repository links for the source.',
        contact: 'Signal found: github.com/tymolu233',
        clear: ''
    };

    const addTerminalLine = (text, className = '') => {
        const line = document.createElement('p');
        line.className = `terminal-line ${className}`.trim();
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    const runCommand = (rawCommand) => {
        const command = rawCommand.trim().toLowerCase();
        if (!command) return;

        addTerminalLine(`guest@tymolu233:~$ ${rawCommand}`, 'terminal-muted');

        if (command === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        if (command === 'projects') {
            addTerminalLine(commandResponses.projects);
            window.setTimeout(() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }), 180);
            return;
        }

        if (command === 'contact') {
            addTerminalLine(commandResponses.contact);
            window.setTimeout(() => window.open('https://github.com/tymolu233', '_blank', 'noopener,noreferrer'), 320);
            return;
        }

        addTerminalLine(commandResponses[command] || `Command not found: ${command}. Type help for available commands.`,
            commandResponses[command] ? '' : 'terminal-muted');
    };

    terminalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        runCommand(terminalInput.value);
        terminalInput.value = '';
    });

    document.querySelectorAll('[data-command]').forEach((button) => {
        button.addEventListener('click', () => {
            runCommand(button.dataset.command);
            focusTerminal();
        });
    });

    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrame);
    });
});
