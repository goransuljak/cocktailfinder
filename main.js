// DOM ELEMENTS THAT I NEED

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');

const cocktailsEl = document.getElementById('cocktails');
const resultText = document.getElementById('result-text');
const singleCocktail = document.getElementById('single-cocktail');

// FUNCTIONS
function searchCocktail(event) {
event.preventDefault();

// clear single cocktail div
singleCocktail.innerHTML = '';

// get search value
const term = search.value;

// check for word
if(term.trim()) {
    fetch(` https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        resultText.innerHTML = `<p>Results for <i>"${term}</i>"</p>`;
    })
} else {
    alert('Enter search value');
}
}

// EVENT LISTENERS

submit.addEventListener('submit', searchCocktail);