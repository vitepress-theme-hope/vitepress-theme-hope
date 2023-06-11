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
  <div class="VPMenuLink">
    <VPLink
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
    >
      {{ item.text }}
    </VPLink>
  </div>
</template>

<style lang="scss" scoped>
.VPMenuGroup + .VPMenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 12px 12px 0;
}

.link {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition: background-color 0.25s, color 0.25s;

  &:hover {
    color: var(--vp-c-brand);
    background-color: var(--vp-c-bg-elv-mute);
  }

  &.active {
    color: var(--vp-c-brand);
  }
}
</style>
