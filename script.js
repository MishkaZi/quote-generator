const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
var errorCounter = 0;
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;
  //If there is no author
  if (!quote.author) {
    authorText.innerText = 'Unknown';
  } else {
    authorText.innerText = quote.author;
  }
  //Reduce font size in case of long quotes
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
}

//Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();

    removeLoadingSpinner();
  } catch (error) {
    if (errorCounter < 10) {
      getQuote();
      errorCounter++;
    } else throw new Error('Still error after 10 tries.');
  }
}

//Tween quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load

getQuote();
