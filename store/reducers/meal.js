import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTER } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const exisitingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      const newFavoriteMeals = [...state.favoriteMeals];
      if (exisitingIndex >= 0) {
        newFavoriteMeals.splice(exisitingIndex, 1);
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        newFavoriteMeals.push(meal);
      }
      return {
        ...state,
        favoriteMeals: newFavoriteMeals,
      };
    case SET_FILTER:
      const appliedFilter = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        if (appliedFilter.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilter.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilter.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilter.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredMeals,
      };
    default:
      return state;
  }
};

export default mealReducer;
