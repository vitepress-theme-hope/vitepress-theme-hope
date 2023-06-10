<script setup lang="ts">
import VPDocAsideOutline from "./VPDocAsideOutline.vue";
</script>

<template>
  <div class="VPDocAside">
    <slot name="aside-top" />

    <VPDocAsideOutline />

    <slot name="aside-outline-after" />

    <div class="spacer" />

    <slot name="aside-bottom" />
  </div>
</template>

<style scoped>
.VPDocAside {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.spacer {
  flex-grow: 1;
}
</style>
