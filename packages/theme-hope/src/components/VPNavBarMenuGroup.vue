<script lang="ts" setup>
import type { DefaultTheme } from "vitepress/theme";

import VPFlyout from "./VPFlyout.vue";
import { useData } from "../composables/data.js";
import { isActive } from "../shared.js";

defineProps<{
  item: DefaultTheme.NavItemWithChildren;
}>();

const { page } = useData();
</script>

<template>
  <VPFlyout
    class="VPNavBarMenuGroup"
    :class="{
      active: isActive(page.relativePath, item.activeMatch, !!item.activeMatch),
    }"
    :button="item.text"
    :items="item.items"
  />
</template>
