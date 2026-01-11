<script setup lang="ts">
import { defineProps } from "vue";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

interface Ingredient {
  id: number;
  name: string;
  value: string;
  price: number;
  image: string;
}

interface PizzaIngredient {
  ingredientId: number;
  quantity: number;
}

const props = defineProps<{
  modelValue: PizzaIngredient[];
  ingredients: Ingredient[];
}>();

console.log(props.modelValue)

const emit = defineEmits<{
  (e: 'update:modelValue', value: PizzaIngredient[]): void;
  (e: 'increment', ingredientId: number): void;
  (e: 'decrement', ingredientId: number): void;
}>();

const getIngredientCount = (ingredientId: number): number => {
  const ingredient = props.modelValue.find(item =>
      item.ingredientId == ingredientId
  );
  console.log(ingredientId)
  console.log(ingredient)
  return ingredient ? ingredient.quantity : 0;
};

const incrementIngredient = (ingredientId: number) => {
  emit('increment', ingredientId);
};

const decrementIngredient = (ingredientId: number) => {
  emit('decrement', ingredientId);
};

const onDrop = (event) => {
  const data = event.dataTransfer?.getData(DATA_TRANSFER_PAYLOAD);
  if (data) {
    const { ingredientName } = JSON.parse(data);
    const ingredient = props.ingredients.find(i => i.name === ingredientName);
    if (ingredient) {
      incrementIngredient(ingredient.id);
    }
  }
};
</script>

<template>
  <div
      class="ingredients__filling"
      @drop="onDrop"
      @dragover.prevent
      @dragenter.prevent
  >
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <app-drag
          :transfer-data="{
            ingredientType: ingredient.value,
            ingredientName: ingredient.name
          }"
          :draggable="true"
        >
          <span :class="'filling filling--' + ingredient.value">
            {{ ingredient.name }}
          </span>
        </app-drag>
        <app-counter
          :count="getIngredientCount(ingredient.id)"
          @increment="incrementIngredient(ingredient.id)"
          @decrement="decrementIngredient(ingredient.id)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/ds-system/ds" as *;
@use "@/assets/scss/ds-system/ds-typography" as *;
@use "@/assets/scss/ds-system/ds-colors" as *;
@use "@/assets/scss/ds-system/ds-shadows" as *;
@use "@/assets/scss/mixins/mixins" as *;

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;

  }

  &--tomatoes::before {
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("@/assets/img/filling/salmon.svg");
  }
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
