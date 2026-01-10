import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data";
import { pizzaPrice } from "@/common/helpers/pizza-price";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
  }),
  getters: {
    pizzasExtended: (state) => {
      const data = useDataStore();

      return state.pizzas.map((pizza) => {
        const pizzaIngredientsIds = pizza.ingredients.map(
          (i) => i.ingredientId,
        );

        return {
          name: pizza.name,
          quantity: pizza.quantity,
          dough: data.doughs.find((i) => i.id === pizza.doughId),
          size: data.sizes.find((i) => i.id === pizza.sizeId),
          sauce: data.sauces.find((i) => i.id === pizza.sauceId),
          ingredients: data.ingredients.filter((i) =>
            pizzaIngredientsIds.includes(i.id),
          ),
          price: pizzaPrice(pizza),
        };
      });
    },
    total: (state) => {
      return state.pizzasExtended
        .map((item) => item.quantity * item.price)
        .reduce((acc, val) => acc + val, 0);
    },
  },
});
