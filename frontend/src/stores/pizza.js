import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data";
import { pizzaPrice } from "@/common/helpers/pizza-price";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    ingredients: [],
  }),
  getters: {
    sauce: (state) => {
      const data = useDataStore();
      return data.sauces.find((i) => i.id === state.sauceId) ?? data.sauces[0];
    },
    dough: (state) => {
      const data = useDataStore();
      return data.doughs.find((i) => i.id === state.doughId) ?? data.doughs[0];
    },
    size: (state) => {
      const data = useDataStore();
      return data.sizes.find((i) => i.id === state.sizeId) ?? data.sizes[0];
    },
    ingredientsExtended: (state) => {
      const data = useDataStore();
      const pizzaIngredientsIds = state.ingredients.map((i) => i.ingredientId);
      return data.ingredients
        .filter((i) => pizzaIngredientsIds.includes(i.id))
        .map((i) => {
          return {
            ...i,
            quantity:
              state.ingredients.find((item) => item.ingredientId === i.id)
                ?.quantity ?? 0,
          };
        });
    },
    price: (state) => {
      return pizzaPrice(state);
    },
  },
  actions: {
    updateIngredientQuantity(ingredientId, newQuantity) {
      const existingIngredient = this.ingredients.find(
        (i) => i.ingredientId === ingredientId
      );

      if (existingIngredient) {
        if (newQuantity > 0) {
          existingIngredient.quantity = newQuantity;
        } else {
          this.ingredients = this.ingredients.filter(
            (i) => i.ingredientId !== ingredientId
          );
        }
      } else if (newQuantity > 0) {
        this.ingredients.push({
          ingredientId,
          quantity: newQuantity,
        });
      }
    },

    incrementIngredient(ingredientId) {
      const existingIngredient = this.ingredients.find(
        (i) => i.ingredientId === ingredientId
      );
      const newQuantity = existingIngredient ? existingIngredient.quantity + 1 : 1;
      this.updateIngredientQuantity(ingredientId, newQuantity);
    },

    decrementIngredient(ingredientId) {
      const existingIngredient = this.ingredients.find(
        (i) => i.ingredientId === ingredientId
      );
      if (existingIngredient) {
        this.updateIngredientQuantity(ingredientId, existingIngredient.quantity - 1);
      }
    },

    setDough(doughId) {
      this.doughId = doughId;
    },

    setSize(sizeId) {
      this.sizeId = sizeId;
    },

    setSauce(sauceId) {
      this.sauceId = sauceId;
    },

    resetPizza() {
      this.name = '';
      this.sauceId = 0;
      this.doughId = 0;
      this.sizeId = 0;
      this.ingredients = [];
    }
  },
});
