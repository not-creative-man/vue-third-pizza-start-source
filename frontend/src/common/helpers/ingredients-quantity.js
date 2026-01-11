export const ingredientsQuantity = (pizza) => {
  const result = {};
  
  if (!pizza.ingredients) {
    return result;
  }
  
  pizza.ingredients.forEach((ingredient) => {
    result[ingredient.ingredientId] = (result[ingredient.ingredientId] || 0) + (ingredient.quantity || 0);
  });
  
  return result;
};
