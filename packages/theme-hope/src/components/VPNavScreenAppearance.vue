<script lang="ts" setup>
import VPSwitchAppearance from "./VPSwitchAppearance.vue";
import { useData } from "../composables/data.js";

const { site, theme } = useData();
</script>

<template>
  <div v-if="site.appearance" class="VPNavScreenAppearance">
    <p class="text">
      {{ theme.darkModeSwitchLabel || "Appearance" }}
    </p>

    <VPSwitchAppearance />
  </div>
</template>

<style scoped>
.VPNavScreenAppearance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px 14px 12px 16px;
  background-color: var(--vp-c-bg-soft);
}

.text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
