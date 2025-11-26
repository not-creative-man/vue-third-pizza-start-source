<template>
  <main class="content">
    <form action="#" method="post">

      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selector v-model="pizzaParams.dough" :dough-sizes="doughSizes" />

        <diameter-selector v-model="pizzaParams.size" :sizes="sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <sause-selector v-model="pizzaParams.sauce" :sauces="sauces" />

              <ingredients-selector v-model="pizzaParams.ingredients" :ingredients="ingredients" :ingredients-map="ingredientsMap" />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input type="text" name="pizza_name" placeholder="Введите название пиццы">
          </label>

          <pizza-constructor
            v-model:ingredients="pizzaParams.ingredients"
            :dough="pizzaParams.dough"
            :size="pizzaParams.size"
            :sauce="pizzaParams.sauce"
          />

          <div class="content__result">
            <p>Итого: {{totalPrice}} ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>

<script setup>
import doughSizes from "@/common/data/doughSizes";
import ingredients from "@/common/data/ingredients";
import sauces from "@/common/data/sauces";
import sizes from "@/common/data/sizes";
import ingredientsMap from "@/common/enums/ingredients";
import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import DiameterSelector from "@/modules/constructor/DiameterSelector.vue";
import SauseSelector from "@/modules/constructor/SauseSelector.vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import {ref, watch} from "vue";

const pizzaParams = ref({
  sauce: "tomato",
  dough: "big",
  ingredients: [],
  size: "normal",
});

// Watch for changes to pizza parameters
watch(() => pizzaParams.value.dough, (newDough) => {
  console.log('Selected dough changed to:', newDough);  
});

watch(() => pizzaParams.value.size, (newSize) => {
  console.log('Selected size changed to:', newSize);
});

watch(() => pizzaParams.value.sauce, (newSauce) => {
  console.log('Selected sauce changed to:', newSauce);
});

// Watch for changes to ingredients
watch(() => pizzaParams.value.ingredients, (newIngredients) => {
  console.log('Ingredients updated:', newIngredients);
}, { deep: true });
</script>