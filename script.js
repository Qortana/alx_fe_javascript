// Initialize quotes array
let quotes = [];

const  storedQuotes = localStorage.getItem('qoutes');
if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
}

// Load quotes from local storage on page load
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Example: Add a new quote
function addQuote(newQuote) {
    if (!newQuote) return;
    quotes.push(newQuote);
    saveQuotes(); // Save after adding
    displayQuotes();
}

// Display quotes in HTML
function displayQuotes() {
    const list = document.getElementById('quotesList');
    list.innerHTML = '';
    quotes.forEach((quote, index) => {
        const li = document.createElement('li');
        li.textContent = quote;
        list.appendChild(li);
    });
}

// Initialize app
window.onload = () => {
    loadQuotes();
    displayQuotes();
};

function setLastViewedQuote(quote) {
    sessionStorage.setItem('lastQuote', quote);
}

function getLastViewedQuote() {
    return sessionStorage.getItem('lastQuote');
}

function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}


