// Liste mit zufälligen Texten
const randomTexts = [
    "Hello, World!",
    "Button clicked!",
    "Random log entry",
    "Action performed",
    "Another message",
    "Something happened!",
    "Keep clicking!",
    "You pressed a button!"
];

// Funktion, die einen zufälligen Text ausgibt
function logRandomText() {
    const consoleElement = document.getElementById('console1'); // Das zweite Card-Element
    const newLog = document.createElement('div'); // Neues Log-Element erstellen
    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)]; // Zufälligen Text auswählen
    newLog.textContent = randomText; // Text für das Log
    consoleElement.appendChild(newLog); // Log-Element zur Konsole hinzufügen
    
    // Automatisch nach unten scrollen
    consoleElement.scrollTop = consoleElement.scrollHeight;
}


document.addEventListener('DOMContentLoaded', () => {
    // Nur Buttons mit der ID "color-button" auswählen
    const colorButtons = document.querySelectorAll('button[id="color-button"]');
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            logRandomText();
            this.style.backgroundColor = getRandomColor();
        });
        // Dauerhafte Farb-Animation nur für Buttons mit color-button ID
        setInterval(() => {
            button.style.backgroundColor = getRandomColor();
        }, 700 + Math.random() * 1300);
    });

    // Switch-Button Funktionalität
    const switchButtons = document.querySelectorAll('button.switchbtn');
    
    console.log('Switch buttons found:', switchButtons.length);
    
    for(let i = 0; i < switchButtons.length; i++) {
      switchButtons[i].addEventListener('click', () => {
        switchButtons[i].classList.toggle('active');
      })
    }
});

// Planet Scanner Animation
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('planetCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let rotation = 0;
    
    function drawPlanet() {
        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = '#003300';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Draw planet
        const planetRadius = 60;
        
        // Planet shadow/base
        ctx.beginPath();
        ctx.arc(centerX, centerY, planetRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff4400';
        ctx.fill();
        
        // Planet surface details
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        
        // Surface patterns
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            const x1 = Math.cos(angle) * 20;
            const y1 = Math.sin(angle) * 20;
            const x2 = Math.cos(angle) * 50;
            const y2 = Math.sin(angle) * 50;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        
        // Rings
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, 80, 15, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.ellipse(0, 0, 90, 18, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.restore();
        
        // Scanning effect
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, planetRadius + 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Update rotation
        rotation += 0.01;
        
        requestAnimationFrame(drawPlanet);
    }
    
    drawPlanet();
});

// Radar Animation
document.addEventListener('DOMContentLoaded', () => {
    const radarCanvas = document.getElementById('radarCanvas');
    if (!radarCanvas) return;
    
    const ctx = radarCanvas.getContext('2d');
    let sweepAngle = 0;
    const centerX = radarCanvas.width / 2;
    const centerY = radarCanvas.height / 2;
    const radius = Math.min(radarCanvas.width, radarCanvas.height) / 2 - 20;
    
    // Static contacts
    const contacts = [
        { x: centerX + 60, y: centerY - 40, strength: 0.8 },
        { x: centerX - 80, y: centerY + 30, strength: 0.6 },
        { x: centerX + 20, y: centerY + 70, strength: 0.9 }
    ];
    
    function drawRadar() {
        // Clear canvas
        ctx.fillStyle = '#000811';
        ctx.fillRect(0, 0, radarCanvas.width, radarCanvas.height);
        
        // Draw grid circles
        ctx.strokeStyle = '#004466';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 4) * i, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Draw grid lines
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
            ctx.stroke();
        }
        
        // Draw contacts
        contacts.forEach(contact => {
            ctx.fillStyle = `rgba(0, 170, 255, ${contact.strength})`;
            ctx.beginPath();
            ctx.arc(contact.x, contact.y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Contact rings
            ctx.strokeStyle = `rgba(0, 170, 255, ${contact.strength * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(contact.x, contact.y, 8, 0, 2 * Math.PI);
            ctx.stroke();
        });
        
        // Draw sweep
        const gradient = ctx.createConicGradient(sweepAngle, centerX, centerY);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.02, 'rgba(0, 170, 255, 0.8)');
        gradient.addColorStop(0.05, 'rgba(0, 170, 255, 0.4)');
        gradient.addColorStop(0.1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Sweep line
        ctx.strokeStyle = '#00aaff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(sweepAngle) * radius,
            centerY + Math.sin(sweepAngle) * radius
        );
        ctx.stroke();
        
        sweepAngle += 0.03;
        requestAnimationFrame(drawRadar);
    }
    
    drawRadar();
});

// Matrix Animation with Server Integration
document.addEventListener('DOMContentLoaded', () => {
    const matrixCanvas = document.getElementById('matrixCanvas');
    const serverInfo = document.getElementById('serverInfo');
    const serverStats = document.querySelector('.server-stats');
    if (!matrixCanvas || !serverInfo) return;
    
    const ctx = matrixCanvas.getContext('2d');
    const gridSize = 40; // Größere Nodes für bessere Klickbarkeit
    const cols = Math.floor(matrixCanvas.width / gridSize);
    const rows = Math.floor(matrixCanvas.height / gridSize);
    let matrix = [];
    let servers = [];
    
    // Generate server data
    const serverNames = ['WEB-01', 'DB-02', 'API-03', 'CACHE-04', 'MAIL-05', 'FILE-06', 'BACKUP-07', 'MONITOR-08'];
    const locations = ['US-EAST', 'EU-WEST', 'ASIA-PAC', 'US-WEST', 'EU-CENTRAL'];
    
    // Initialize matrix and servers
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            const isActive = Math.random() > 0.8;
            matrix[i][j] = isActive;
            
            if (isActive) {
                servers.push({
                    row: i,
                    col: j,
                    name: serverNames[Math.floor(Math.random() * serverNames.length)],
                    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                    location: locations[Math.floor(Math.random() * locations.length)],
                    cpu: Math.floor(Math.random() * 100),
                    memory: Math.floor(Math.random() * 16000),
                    uptime: Math.floor(Math.random() * 365),
                    status: Math.random() > 0.1 ? 'ONLINE' : 'WARNING'
                });
            }
        }
    }
    
    // Click handler for matrix canvas
    matrixCanvas.addEventListener('click', (e) => {
        const rect = matrixCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const col = Math.floor(x / gridSize);
        const row = Math.floor(y / gridSize);
        
        if (row >= 0 && row < rows && col >= 0 && col < cols && matrix[row][col]) {
            const server = servers.find(s => s.row === row && s.col === col);
            if (server) {
                displayServerInfo(server);
            }
        }
    });
    
    function displayServerInfo(server) {
        serverInfo.innerHTML = `
            <div class="server-line">━━━ SERVER DETAILS ━━━</div>
            <div class="server-line">NAME: ${server.name}</div>
            <div class="server-line">IP: ${server.ip}</div>
            <div class="server-line">LOCATION: ${server.location}</div>
            <div class="server-line">STATUS: ${server.status}</div>
            <div class="server-line">UPTIME: ${server.uptime} days</div>
            <div class="server-line">━━━ PROCESSES ━━━</div>
            <div class="server-line">apache2: RUNNING</div>
            <div class="server-line">mysql: RUNNING</div>
            <div class="server-line">nginx: RUNNING</div>
            <div class="server-line">ssh: ACTIVE</div>
            <div class="server-line">━━━ CONNECTIONS ━━━</div>
            <div class="server-line">TCP: ${Math.floor(Math.random() * 500)}</div>
            <div class="server-line">UDP: ${Math.floor(Math.random() * 100)}</div>
            <div class="server-line">HTTP: ${Math.floor(Math.random() * 1000)}</div>
        `;
        
        // Update stats
        const statLines = serverStats.querySelectorAll('.info-line');
        statLines[0].textContent = `SELECTED: ${server.name}`;
        statLines[1].textContent = `CPU: ${server.cpu}%`;
        statLines[2].textContent = `MEMORY: ${server.memory}MB`;
    }
    
    function drawMatrix() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#003300';
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= matrixCanvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, matrixCanvas.height);
            ctx.stroke();
        }
        for (let y = 0; y <= matrixCanvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(matrixCanvas.width, y);
            ctx.stroke();
        }
        
        // Draw active cells
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (matrix[i][j]) {
                    ctx.fillStyle = '#00ff41';
                    ctx.fillRect(j * gridSize + 2, i * gridSize + 2, gridSize - 4, gridSize - 4);
                    
                    // Glow effect
                    ctx.shadowColor = '#00ff41';
                    ctx.shadowBlur = 10;
                    ctx.fillRect(j * gridSize + 2, i * gridSize + 2, gridSize - 4, gridSize - 4);
                    ctx.shadowBlur = 0;
                }
            }
        }
        
        // Update matrix randomly
        if (Math.random() > 0.7) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            matrix[row][col] = !matrix[row][col];
            
            // Update server list when matrix changes
            if (matrix[row][col] && !servers.find(s => s.row === row && s.col === col)) {
                servers.push({
                    row: row,
                    col: col,
                    name: serverNames[Math.floor(Math.random() * serverNames.length)],
                    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                    location: locations[Math.floor(Math.random() * locations.length)],
                    cpu: Math.floor(Math.random() * 100),
                    memory: Math.floor(Math.random() * 16000),
                    uptime: Math.floor(Math.random() * 365),
                    status: Math.random() > 0.1 ? 'ONLINE' : 'WARNING'
                });
            } else if (!matrix[row][col]) {
                servers = servers.filter(s => !(s.row === row && s.col === col));
            }
        }
        
        setTimeout(() => requestAnimationFrame(drawMatrix), 150);
    }
    
    drawMatrix();
});

// Waveform Animation
document.addEventListener('DOMContentLoaded', () => {
    const waveCanvas = document.getElementById('waveCanvas');
    if (!waveCanvas) return;
    
    const ctx = waveCanvas.getContext('2d');
    let phase = 0;
    
    function drawWaveform() {
        ctx.fillStyle = '#110011';
        ctx.fillRect(0, 0, waveCanvas.width, waveCanvas.height);
        
        // Grid
        ctx.strokeStyle = '#330033';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < waveCanvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, waveCanvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < waveCanvas.height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(waveCanvas.width, y);
            ctx.stroke();
        }
        
        // Waveforms
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x < waveCanvas.width; x++) {
            const y = waveCanvas.height / 2 + 
                     Math.sin((x * 0.02) + phase) * 60 + 
                     Math.sin((x * 0.05) + phase * 2) * 30;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        
        ctx.stroke();
        
        phase += 0.1;
        requestAnimationFrame(drawWaveform);
    }
    
    drawWaveform();
});

// HUD Animation
document.addEventListener('DOMContentLoaded', () => {
    const hudCanvas = document.getElementById('hudCanvas');
    if (!hudCanvas) return;
    
    const ctx = hudCanvas.getContext('2d');
    let pulsePhase = 0;
    
    function drawHUD() {
        ctx.fillStyle = '#001122';
        ctx.fillRect(0, 0, hudCanvas.width, hudCanvas.height);
        
        const centerX = hudCanvas.width / 2;
        const centerY = hudCanvas.height / 2;
        
        // Crosshair
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 2;
        
        // Center dot
        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Crosshair lines
        ctx.beginPath();
        ctx.moveTo(centerX - 30, centerY);
        ctx.lineTo(centerX + 30, centerY);
        ctx.moveTo(centerX, centerY - 30);
        ctx.lineTo(centerX, centerY + 30);
        ctx.stroke();
        
        // Pulsing rings
        const pulse = Math.sin(pulsePhase) * 0.3 + 0.7;
        ctx.strokeStyle = `rgba(255, 170, 0, ${pulse})`;
        ctx.lineWidth = 1;
        
        for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, 40 * i, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Grid overlay
        ctx.strokeStyle = 'rgba(255, 170, 0, 0.2)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < hudCanvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, hudCanvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < hudCanvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(hudCanvas.width, y);
            ctx.stroke();
        }
        
        pulsePhase += 0.05;
        requestAnimationFrame(drawHUD);
    }
    
    drawHUD();
});

// Data Stream Animation
document.addEventListener('DOMContentLoaded', () => {
    const dataStream = document.getElementById('dataStream');
    if (!dataStream) return;
    
    const dataTypes = [
        'INIT_SEQUENCE', 'STATUS_OK', 'DATA_RECV', 'ERROR_404', 'CONN_EST',
        'HANDSHAKE', 'AUTH_OK', 'PAYLOAD_RCV', 'CRC_VALID', 'SYNC_LOST',
        'BUFFER_FULL', 'ACK_SENT', 'TIMEOUT', 'RETRY', 'SUCCESS'
    ];
    
    // Clear existing static content first
    dataStream.innerHTML = '';
    
    function addDataLine() {
        const addr = '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
        const type = dataTypes[Math.floor(Math.random() * dataTypes.length)];
        const timestamp = new Date().toLocaleTimeString();
        
        const line = document.createElement('div');
        line.className = 'data-line';
        line.textContent = `[${timestamp}] ${addr}: ${type}`;
        
        // Add to bottom and scroll down
        dataStream.appendChild(line);
        
        // Keep only last 20 messages
        while (dataStream.children.length > 20) {
            dataStream.removeChild(dataStream.firstChild);
        }
        
        // Always scroll to show newest message
        dataStream.scrollTop = dataStream.scrollHeight;
        
        // Continue adding messages
        setTimeout(addDataLine, Math.random() * 3000 + 2000);
    }
    
    // Start immediately
    addDataLine();
});

// Hologram Animation
document.addEventListener('DOMContentLoaded', () => {
    const holoCanvas = document.getElementById('hologramCanvas');
    if (!holoCanvas) return;
    
    const ctx = holoCanvas.getContext('2d');
    let rotation = 0;
    
    function drawHologram() {
        ctx.fillStyle = '#001a1a';
        ctx.fillRect(0, 0, holoCanvas.width, holoCanvas.height);
        
        const centerX = holoCanvas.width / 2;
        const centerY = holoCanvas.height / 2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        
        // Wireframe cube
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1;
        
        const size = 80;
        const depth = 40;
        
        // Front face
        ctx.strokeRect(-size/2, -size/2, size, size);
        // Back face
        ctx.strokeRect(-size/2 + depth, -size/2 + depth, size, size);
        
        // Connect corners
        ctx.beginPath();
        ctx.moveTo(-size/2, -size/2);
        ctx.lineTo(-size/2 + depth, -size/2 + depth);
        ctx.moveTo(size/2, -size/2);
        ctx.lineTo(size/2 + depth, -size/2 + depth);
        ctx.moveTo(-size/2, size/2);
        ctx.lineTo(-size/2 + depth, size/2 + depth);
        ctx.moveTo(size/2, size/2);
        ctx.lineTo(size/2 + depth, size/2 + depth);
        ctx.stroke();
        
        // Glow effect
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 5;
        ctx.strokeRect(-size/2, -size/2, size, size);
        ctx.shadowBlur = 0;
        
        ctx.restore();
        
        rotation += 0.02;
        requestAnimationFrame(drawHologram);
    }
    
    drawHologram();
});
