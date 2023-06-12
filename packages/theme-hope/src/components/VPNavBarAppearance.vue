<script lang="ts" setup>
import VPSwitchAppearance from "./VPSwitchAppearance.vue";
import { useData } from "../composables/data.js";

const { site } = useData();
</script>

<template>
  <div v-if="site.appearance" class="VPNavBarAppearance">
    <VPSwitchAppearance />
  </div>
</template>

<style lang="scss" scoped>
.VPNavBarAppearance {
  display: none;

  @media (min-width: 1280px) {
    display: flex;
    align-items: center;
  }
}
</style>
