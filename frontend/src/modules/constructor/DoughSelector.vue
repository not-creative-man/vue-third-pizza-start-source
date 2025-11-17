<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  doughSizes: {
    type: Array,
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>
<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="doughSize in doughSizes"
          :key="doughSize"
          :class="'dough__input dough__input-' + doughSize"
        >
          <input
            type="radio"
            name="dought"
            :value="doughSize"
            class="visually-hidden"
            :checked="doughSize === 'light'"
            @change="$emit('update:modelValue', $event.target.value)"
          />
          <b>{{ doughSize === "light" ? "Тонкое" : "Толстое" }}</b>
          <span>Из твердых сортов пшеницы</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/ds-system/ds" as *;
@use "@/assets/scss/ds-system/ds-typography" as *;
@use "@/assets/scss/ds-system/ds-colors" as *;
@use "@/assets/scss/ds-system/ds-shadows" as *;
@use "@/assets/scss/mixins/mixins" as *;

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>