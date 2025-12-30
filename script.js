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



// Load quotes and last selected category from localStorage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }

    // Restore last selected category filter
    const lastFilter = localStorage.getItem('lastCategory') || 'all';
    document.getElementById('categoryFilter').value = lastFilter;
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function populateCategories() {
    const categorySet = new Set(quotes.map(q => q.category)); // Unique categories
    const filter = document.getElementById('categoryFilter');

    // Remove existing options except "All Categories"
    filter.innerHTML = '<option value="all">All Categories</option>';

    categorySet.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });
}

function addQuote() {
    const quoteText = document.getElementById('quoteInput').value.trim();
    const categoryText = document.getElementById('categoryInput').value.trim();

    if (!quoteText || !categoryText) return;

    quotes.push({ text: quoteText, category: categoryText });
    saveQuotes();
    populateCategories();   // Update dropdown
    filterQuotes();         // Refresh display

    // Clear inputs
    document.getElementById('quoteInput').value = '';
    document.getElementById('categoryInput').value = '';
}

function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastCategory', selectedCategory); // Persist filter

    const list = document.getElementById('quotesList');
    list.innerHTML = '';

    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(q => q.category === selectedCategory);

    filteredQuotes.forEach(q => {
        const li = document.createElement('li');
        li.textContent = `${q.text} [${q.category}]`;
        list.appendChild(li);
    });
}

window.onload = () => {
    loadQuotes();
    populateCategories();
    filterQuotes();
};
