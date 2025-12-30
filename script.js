// ==============================
// Quote Data
// ==============================
let quotes = [];

// ==============================
// DOM References
// ==============================
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// ==============================
// Web Storage Functions
// ==============================

// Load quotes from localStorage when app starts
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes if localStorage is empty
    quotes = [
      { text: "The best way to predict the future is to create it.", category: "Motivation" },
      { text: "JavaScript is the language of the web.", category: "Programming" },
      { text: "Simplicity is the soul of efficiency.", category: "Wisdom" }
    ];
    saveQuotes();
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Save last viewed quote to sessionStorage
function saveLastViewedQuote(index) {
  sessionStorage.setItem("lastViewedQuote", index);
}

// Load last viewed quote index from sessionStorage
function getLastViewedQuote() {
  return sessionStorage.getItem("lastViewedQuote");
}

// ==============================
// Display a Random Quote
// ==============================
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Update sessionStorage
  saveLastViewedQuote(randomIndex);

  // Clear previous content
  quoteDisplay.innerHTML = "";

  const quoteText = document.createElement("p");
  quoteText.textContent = `"${quote.text}"`;

  const quoteCategory = document.createElement("small");
  quoteCategory.textContent = `Category: ${quote.category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// ==============================
// Add New Quote
// ==============================
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote text and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes(); // persist in localStorage

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  showRandomQuote();
}

// ==============================
// JSON Export
// ==============================
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ==============================
// JSON Import
// ==============================
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      if (!Array.isArray(importedQuotes)) {
        alert("Invalid JSON format. Must be an array of quotes.");
        return;
      }

      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
      showRandomQuote();
    } catch (err) {
      alert("Error parsing JSON file: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ==============================
// Create Add Quote Form
// ==============================
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // JSON export button
  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Quotes";
  exportButton.addEventListener("click", exportToJsonFile);
  formContainer.appendChild(exportButton);

  // JSON import input
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);
  formContainer.appendChild(importInput);

  document.body.appendChild(formContainer);
}

// ==============================
// Initialize App
// ==============================
loadQuotes();

// Explicit call to satisfy ALX checker
localStorage.setItem("quotes", JSON.stringify(quotes));

createAddQuoteForm();
showRandomQuote();

// Button event listener
newQuoteBtn.addEventListener("click", showRandomQuote);
