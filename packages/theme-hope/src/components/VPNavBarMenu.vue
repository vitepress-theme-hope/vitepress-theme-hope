<script lang="ts" setup>
import VPNavBarMenuGroup from "./VPNavBarMenuGroup.vue";
import VPNavBarMenuLink from "./VPNavBarMenuLink.vue";
import { useData } from "../composables/data.js";

const { theme } = useData();
</script>

<template>
  <nav
    v-if="theme.nav"
    aria-labelledby="main-nav-aria-label"
    class="VPNavBarMenu"
  >
    <span id="main-nav-aria-label" class="visually-hidden"
      >Main Navigation</span
    >

    <template v-for="item in theme.nav" :key="item.text">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />

      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>

<style scoped>
.VPNavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
