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
        if(data.drinks === null) {
            resultText.innerHTML = ``;
        } else {
            cocktailsEl.innerHTML = data.drinks.map(drink => `
            <div class="cocktails">
            <img src="${drink.strDrinkThumb}" />
            <div class="cocktails-info" drink-id="${drink.idDrink}">
            <p>${drink.strDrink}</p>
            <p>(${drink.strGlass})</p>
            </div>
            </div>
            `).join('');
        }
    });
    search.value = "";
} 
}
// fetch drink by ID
function getDrinkByID(drinkID) {
    fetch(` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
    .then(res => res.json())
    .then(data => {
      const drink = data.drinks[0];
      
      addDrinkToDOM(drink);
      
    });
}
// add drink to DOM 
function addDrinkToDOM(drink) {
    const ing = [];
    for(let i = 1; i < 10; i++) {
      if(drink[`strIngredient${i}`]) {
       ing.push(`${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`);
      } else {
        break;
      }
    }

    singleCocktail.innerHTML = `
    <div class="single-cocktail">
    <h2>${drink.strDrink}</h2>
    <p>${drink.strGlass} ~ ${drink.strCategory}</p>
    <img src="${drink.strDrinkThumb}" />
    <div class="main">
    <p>${drink.strInstructions}</p>
    <h3>Ingredients</h3>
    <ul>
    ${ing.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    </div>
    </div>
    `;
}

// EVENT LISTENERS

submit.addEventListener('submit', searchCocktail);

cocktailsEl.addEventListener('click', e => {
    const drinkInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('cocktails-info');
        } else {
            return false;
        }
    });
    if(drinkInfo) {
        const drinkId = drinkInfo.getAttribute('drink-id');
        getDrinkByID(drinkId);
    }
});