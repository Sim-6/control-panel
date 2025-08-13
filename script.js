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
});