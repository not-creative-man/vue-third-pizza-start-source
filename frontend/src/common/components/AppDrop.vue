<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

const emit = defineEmits(["drop"]);

const onDrop = (event) => {
  if (!event.dataTransfer) return;

  const payload = event.dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
  if (payload) {
    try {
      const data = JSON.parse(payload);
      emit("drop", data);
    } catch (e) {
      console.error("Error parsing drop data:", e);
    }
  }
};
</script>