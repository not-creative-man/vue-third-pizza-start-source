<script setup lang="ts">
import { defineProps } from 'vue';

interface Sizes {
  id: number;
  image: string;
  multiplier: number;
  name: string;
  type: string;
}

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array<Sizes>,
    required: true,
  },
});
</script>
<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          :class="'diameter__input diameter__input-' + size.type"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.id"
            class="visually-hidden"
            :checked="size.type === 'normal'"
            @change="$emit('update:modelValue', $event.target.value)"
          />
          <span>{{
            size.type === "small" ? "23 см" : size.type === "normal" ? "32 см" : "45 см"
          }}</span>
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

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>