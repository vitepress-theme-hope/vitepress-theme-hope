<script lang="ts" setup>
import VPSocialLinks from "./VPSocialLinks.vue";
import { useData } from "../composables/data.js";

const { theme } = useData();
</script>

<template>
  <VPSocialLinks
    v-if="theme.socialLinks"
    class="VPNavBarSocialLinks"
    :links="theme.socialLinks"
  />
</template>

<style scoped>
.VPNavBarSocialLinks {
  display: none;
}

@media (min-width: 1280px) {
  .VPNavBarSocialLinks {
    display: flex;
    align-items: center;
  }
}
</style>
