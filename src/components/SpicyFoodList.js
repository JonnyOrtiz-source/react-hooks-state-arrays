import React, { useState } from 'react';
import { spicyFoods, getNewSpicyFood } from '../data';

function SpicyFoodList() {
   const [foods, setFoods] = useState(spicyFoods);
   const [filterBy, setFilterBy] = useState('All');

   function handleAddFood() {
      const newFood = getNewSpicyFood();
      // console.log(newFood);
      setFoods((foods) => [...foods, newFood]); // my solution
      /* Canvas solution
     const newFoodArray = [...foods, newFood];
     setFoods(newFoodArray);
     */
   }

   function deleteFood(foodId) {
      setFoods(foods.filter((food) => food.id !== foodId));
   }

   function handleFood(foodId, heat) {
      const updatedFoods = foods.map((food) =>
         food.id === foodId ? { ...food, heatLevel: heat + 1 } : food
      );
      setFoods(updatedFoods);
   }

   const filteredFoods = foods.filter((food) =>
      filterBy === 'All' ? true : food.cuisine === filterBy
   );

   function handleFoodType(e) {
      setFilterBy(e.target.value);
   }

   const foodList = filteredFoods.map((food) => (
      <li key={food.id}>
         <span onClick={() => handleFood(food.id, food.heatLevel)}>
            {' '}
            {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}{' '}
         </span>
         &nbsp;
         <span onClick={() => deleteFood(food.id)}>🚫</span>
      </li>
   ));

   return (
      <div>
         <button onClick={handleAddFood}>Add New Food</button> &nbsp; &nbsp;
         <select name="filter" onChange={(e) => handleFoodType(e)}>
            <option value="All">All</option>
            <option value="American">American</option>
            <option value="Sichuan">Sichuan</option>
            <option value="Thai">Thai</option>
            <option value="Mexican">Mexican</option>
         </select>
         <ul>{foodList}</ul>
      </div>
   );
}

export default SpicyFoodList;
