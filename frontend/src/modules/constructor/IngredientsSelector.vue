<script setup lang="ts">
import { defineProps } from "vue";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";

const props = defineProps({
  modelValue: {
    type: Array<string>,
    required: true,
  },
  ingredients: {
    type: Array<string>,
    required: true,
  },
  ingredientsMap: {
    type: Object,
    required: true,
  },
});

console.log(props.ingredients);
console.log(props.ingredientsMap);

const emit = defineEmits(['update:modelValue']);

const ingredientCount = (ingredient: string) => {
  return props.modelValue.filter(item => item === ingredient).length;
};

const incrementIngredient = (ingredient: string) => {
  const newIngredients = [...props.modelValue, ingredient];
  emit('update:modelValue', newIngredients);
};

const decrementIngredient = (ingredient: string) => {
  const index = props.modelValue.indexOf(ingredient);
  if (index > -1) {
    const newIngredients = [...props.modelValue];
    newIngredients.splice(index, 1);
    emit('update:modelValue', newIngredients);
  }
};
</script>

<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient"
        class="ingredients__item"
      >
        <app-drag :transfer-data="{'ingredientType': ingredient, 'ingredientName': ingredientsMap[ingredient]}" :draggable="true">
          <span :class="'filling filling--' + ingredient">{{
            ingredientsMap[ingredient]
          }}</span>
        </app-drag>
        <app-counter :count="ingredientCount(ingredient)" @increment="incrementIngredient(ingredient)" @decrement="decrementIngredient(ingredient)" />
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
