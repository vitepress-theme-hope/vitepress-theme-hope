<script lang="ts" setup>
import type { DefaultTheme } from "vitepress/theme";

import VPLink from "./VPLink.vue";
import { useData } from "../composables/data.js";
import { isActive } from "../shared.js";

defineProps<{
  item: DefaultTheme.NavItemWithLink;
}>();

const { page } = useData();
</script>

<template>
  <VPLink
    class="VPNavBarMenuLink"
    :class="{
      active: isActive(
        page.relativePath,
        item.activeMatch || item.link,
        !!item.activeMatch
      ),
    }"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    tabindex="0"
  >
    {{ item.text }}
  </VPLink>
</template>

<style lang="scss" scoped>
.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;

  &.active {
    color: var(--vp-c-brand);
  }

  &:hover {
    color: var(--vp-c-brand);
  }
}
</style>
