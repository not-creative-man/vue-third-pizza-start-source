<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDragStart"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

const props = defineProps({
  draggable: {
    type: Boolean,
    default: false,
  },
  transferData: {
    type: Object,
    required: true,
  },
});

const onDragStart = (event) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.dropEffect = 'copy';
    const data = JSON.stringify(props.transferData);
    event.dataTransfer.setData(DATA_TRANSFER_PAYLOAD, data);
  }
};
</script>
