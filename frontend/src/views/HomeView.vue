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

<style lang="scss">
@use "@/assets/scss/ds-system/ds-typography" as *;
@use "@/assets/scss/ds-system/ds-colors" as *;
@use "@/assets/scss/ds-system/ds-shadows" as *;
@use "@/assets/scss/mixins/mixins" as *;

.content {
  //display: flex;
  //align-items: center;
  //flex-direction: column;
  //
  //width: 600px;
  //margin: 0 auto;
  padding-top: 20px;
  //
  //background-color: $white;
  //box-shadow: $shadow-light;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}



.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: $black;

    &:hover:not(:active):not(:disabled) {
      color: $red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: $white;
    color: $green-500;
  }
}

</style>