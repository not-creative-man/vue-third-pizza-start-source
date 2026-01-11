<template>
  <main class="content">
    <form @submit.prevent="addToCart">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <dough-selector
            v-model="pizzaStore.doughId"
            :dough-sizes="dataStore.doughs"
            @update:model-value="pizzaStore.setDough"
          />
        </div>

        <div class="content__diameter">
          <diameter-selector
            v-model="pizzaStore.sizeId"
            :sizes="dataStore.sizes"
            @update:model-value="pizzaStore.setSize"
          />
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sause-selector
                v-model="pizzaStore.sauceId"
                :sauces="dataStore.sauces"
                @update:model-value="pizzaStore.setSauce"
              />

              <ingredients-selector
                v-model="pizzaStore.ingredientsExtended"
                :ingredients="dataStore.ingredients"
                @increment="pizzaStore.incrementIngredient"
                @decrement="pizzaStore.decrementIngredient"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizzaStore.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-constructor
            :ingredients="
              pizzaStore.ingredients.flatMap((i) => {
                const ingredient = dataStore.ingredients.find(
                  (ing) => ing.id === i.ingredientId,
                );
                return ingredient
                  ? Array(i.quantity).fill(ingredient.value)
                  : [];
              })
            "
            :sauce="pizzaStore.sauce"
            :dough="pizzaStore.dough"
            :size="pizzaStore.size"
            @update:ingredients="handleIngredientsUpdate"
          />

          <div class="content__result">
            <p>Итого: {{ pizzaStore.price }} ₽</p>
            <button
              type="submit"
              class="button"
              :disabled="pizzaStore.ingredients.length === 0"
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { usePizzaStore } from "@/stores/pizza";
import { useCartStore } from "@/stores/cart";
import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import DiameterSelector from "@/modules/constructor/DiameterSelector.vue";
import SauseSelector from "@/modules/constructor/SauseSelector.vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

// Обработчик обновления ингредиентов
const handleIngredientsUpdate = (ingredients) => {
  // Обновляем количество ингредиентов в хранилище
  const ingredientCounts = ingredients.reduce((acc, ingredient) => {
    const foundIngredient = dataStore.ingredients.find(
      (i) => i.value === ingredient,
    );
    if (foundIngredient) {
      const id = foundIngredient.id;
      acc[id] = (acc[id] || 0) + 1;
    }
    return acc;
  }, {});

  // Синхронизируем с хранилищем
  Object.entries(ingredientCounts).forEach(([id, quantity]) => {
    pizzaStore.updateIngredientQuantity(Number(id), quantity);
  });
};

// Добавление пиццы в корзину
const addToCart = (e) => {
  e.preventDefault();

  if (pizzaStore.ingredients.length === 0) {
    alert("Добавьте хотя бы один ингредиент");
    return;
  }

  if (!pizzaStore.name.trim()) {
    alert("Введите название пиццы");
    return;
  }

  const pizza = {
    name: pizzaStore.name.trim() || "Моя пицца",
    dough: pizzaStore.dough,
    size: pizzaStore.size,
    sauce: pizzaStore.sauce,
    ingredients: pizzaStore.ingredientsExtended,
    price: pizzaStore.price,
    quantity: 1,
  };

  cartStore.addPizza(pizza);
  pizzaStore.resetPizza();

  // Устанавливаем значения по умолчанию
  if (dataStore.doughs.length > 0) {
    pizzaStore.setDough(dataStore.doughs[0].id);
  }
  if (dataStore.sauces.length > 0) {
    pizzaStore.setSauce(dataStore.sauces[0].id);
  }
  if (dataStore.sizes.length > 0) {
    pizzaStore.setSize(dataStore.sizes[0].id);
  }
};
</script>
