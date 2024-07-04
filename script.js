document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector('.searchBox');
    const searchBtn = document.querySelector('.searchBtn');
    const recipeContainer = document.querySelector('.recipe-container');

    // Function to get recipes
    const fetchRecipes = async (query) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            displayRecipes(data.meals);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    // Function to display recipes
    const displayRecipes = (meals) => {
        recipeContainer.innerHTML = ''; // Clear previous results
        if (meals) {
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.classList.add('meal');

                mealDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p>${meal.strInstructions.substring(0, 100)}...</p>
                    <button class="details-btn" data-id="${meal.idMeal}">View Details</button>
                `;

                recipeContainer.appendChild(mealDiv);
            });

            const detailButtons = document.querySelectorAll('.details-btn');
            detailButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const mealId = e.target.getAttribute('data-id');
                    openRecipeDetails(mealId);
                });
            });
        } else {
            recipeContainer.innerHTML = '<p>No recipes found. Try another search.</p>';
        }
    };

    // Function to open recipe details in a new tab
    const openRecipeDetails = (mealId) => {
        window.open(`recipe-details.html?id=${mealId}`, '_blank');
    };

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = searchBox.value.trim();
        if (query) {
            fetchRecipes(query);
        }
    });
});




