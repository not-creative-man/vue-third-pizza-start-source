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
  actions: {
    addPizza(pizza) {
      const existingPizzaIndex = this.pizzas.findIndex(p => 
        p.name === pizza.name &&
        p.doughId === pizza.doughId &&
        p.sizeId === pizza.sizeId &&
        p.sauceId === pizza.sauceId &&
        JSON.stringify(p.ingredients) === JSON.stringify(pizza.ingredients)
      );

      if (existingPizzaIndex !== -1) {
        this.pizzas[existingPizzaIndex].quantity += pizza.quantity;
      } else {
        this.pizzas.push({
          ...pizza,
          id: Date.now().toString(),
        });
      }
    },

    removePizza(pizzaId) {
      this.pizzas = this.pizzas.filter(pizza => pizza.id !== pizzaId);
    },

    updatePizzaQuantity(pizzaId, newQuantity) {
      const pizza = this.pizzas.find(p => p.id === pizzaId);
      if (pizza) {
        if (newQuantity > 0) {
          pizza.quantity = newQuantity;
        } else {
          this.removePizza(pizzaId);
        }
      }
    },

    incrementPizzaQuantity(pizzaId) {
      const pizza = this.pizzas.find(p => p.id === pizzaId);
      if (pizza) {
        this.updatePizzaQuantity(pizzaId, pizza.quantity + 1);
      }
    },

    decrementPizzaQuantity(pizzaId) {
      const pizza = this.pizzas.find(p => p.id === pizzaId);
      if (pizza) {
        this.updatePizzaQuantity(pizzaId, pizza.quantity - 1);
      }
    },

    clearCart() {
      this.pizzas = [];
      this.phone = '';
      this.address = {
        street: '',
        building: '',
        flat: '',
        comment: ''
      };
    },

    updateContactInfo(phone) {
      this.phone = phone;
    },

    updateDeliveryAddress(address) {
      this.address = {
        ...this.address,
        ...address
      };
    },

    updateComment(comment) {
      this.address.comment = comment;
    }
  },
});
