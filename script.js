document.addEventListener("DOMContentLoaded", () => {
  const goalSelect = document.getElementById('goal');
  const mealList = document.getElementById('meal-list');
  const workoutList = document.getElementById('workout-list');

  const mealsData = {
    Cutting: ["Chicken Salad", "Protein Shake", "Oatmeal"],
    Bulking: ["Rice & Chicken", "Beef Steak", "Protein Shake"],
    Maintenance: ["Grilled Fish", "Quinoa Salad", "Smoothie"]
  };

  goalSelect.addEventListener('change', () => {
    const selectedGoal = goalSelect.value;
    if (!selectedGoal) return;

    // Display meals
    displayMeals(selectedGoal);
    // Fetch and display workouts
    fetchWorkouts();
  });

  function displayMeals(goal) {
    mealList.innerHTML = '';
    mealsData[goal].forEach(meal => {
      const li = document.createElement('li');
      li.textContent = meal;
      mealList.appendChild(li);
    });
  }

  // Fetch workouts from ExerciseDB API
  function fetchWorkouts() {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        const exercises = JSON.parse(this.responseText);
        displayWorkouts(exercises);
      }
    });

    xhr.open('GET', 'https://exercisedb.p.rapidapi.com/exercises/targetList');
    xhr.setRequestHeader('x-rapidapi-key', 'a0fb4564ecmshf41983148fdf95fp18d619jsnc6eec06bde14');
    xhr.setRequestHeader('x-rapidapi-host', 'exercisedb.p.rapidapi.com');

    xhr.send(data);
  }

  // Display workouts in the list
  function displayWorkouts(exercises) {
    workoutList.innerHTML = '';
    exercises.slice(0, 10).forEach(exercise => { // Limit to first 10 exercises
      const li = document.createElement('li');
      li.textContent = exercise;
      workoutList.appendChild(li);
    });
  }

  function fetchMeals() {
    fetch('https://api.spoonacular.com/recipes/random?number=3&apiKey=81d1a0bf4f8f42b8acfc7b7a157eaa82')
      .then(res => res.json())
      .then(data => {
        mealList.innerHTML = '';
        data.recipes.forEach(recipe => {
          const li = document.createElement('li');
          li.textContent = recipe.title;
          mealList.appendChild(li);
        });
      })
      .catch(err => console.error(err));
  }

  goalSelect.addEventListener("focus", function() {
    const firstOption = goalSelect.querySelector("option[value='']");
    if (firstOption) {
      firstOption.remove();
    }
  });

});
