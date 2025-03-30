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
}

// Alle Buttons auswählen und Event-Listener hinzufügen
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', logRandomText);
});