<script setup lang="ts">
import { onContentUpdated } from "vitepress";
import { shallowRef } from "vue";

import VPDocOutlineItem from "./VPDocOutlineItem.vue";
import { useData } from "../composables/data.js";
import type { MenuItem } from "../composables/outline.js";
import {
  getHeaders,
  resolveTitle,
  useActiveAnchor,
} from "../composables/outline.js";

const { frontmatter, theme } = useData();

const container = shallowRef<HTMLElement>();
const headers = shallowRef<MenuItem[]>([]);
const marker = shallowRef<HTMLElement>();

useActiveAnchor(container, marker);

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
});
</script>

<template>
  <div
    ref="container"
    class="VPDocAsideOutline"
    :class="{ 'has-outline': headers.length > 0 }"
  >
    <div class="content">
      <div ref="marker" class="outline-marker" />

      <div class="outline-title">{{ resolveTitle(theme) }}</div>

      <nav aria-labelledby="doc-outline-aria-label">
        <span id="doc-outline-aria-label" class="visually-hidden">
          Table of Contents for current page
        </span>

        <VPDocOutlineItem :headers="headers" root />
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.VPDocAsideOutline {
  display: none;

  &.has-outline {
    display: block;
  }
}

.content {
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 1px;
  height: 18px;
  background-color: var(--vp-c-brand);
  transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  letter-spacing: 0.4px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 600;
}
</style>
