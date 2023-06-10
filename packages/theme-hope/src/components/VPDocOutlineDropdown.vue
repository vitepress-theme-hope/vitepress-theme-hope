<script setup lang="ts">
import { onContentUpdated } from "vitepress";
import { ref, shallowRef } from "vue";

import VPDocOutlineItem from "./VPDocOutlineItem.vue";
import VPIconChevronRight from "./icons/VPIconChevronRight.vue";
import { useData } from "../composables/data.js";
import type { MenuItem } from "../composables/outline.js";
import { getHeaders, resolveTitle } from "../composables/outline.js";

const { frontmatter, theme } = useData();

const headers = shallowRef<MenuItem[]>([]);

const open = ref(false);

onContentUpdated(() => {
  open.value = false;
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
});
</script>

<template>
  <div v-if="headers.length > 0" class="VPDocOutlineDropdown">
    <button type="button" :class="{ open }" @click="open = !open">
      {{ resolveTitle(theme) }}
      <VPIconChevronRight class="icon" />
    </button>

    <div v-if="open" class="items">
      <VPDocOutlineItem :headers="headers" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.VPDocOutlineDropdown {
  margin-bottom: 42px;

  button {
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: var(--vp-c-text-2);
    transition: color 0.5s;
    border: 1px solid var(--vp-c-border);
    padding: 4px 12px;
    border-radius: 8px;

    &:hover {
      color: var(--vp-c-text-1);
      transition: color 0.25s;
    }

    &.open {
      color: var(--vp-c-text-1);
    }
  }
}

.icon {
  display: inline-block;
  vertical-align: middle;
  margin-left: 2px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

:deep(.outline-link) {
  font-size: 13px;
}

.open > .icon {
  transform: rotate(90deg);
}

.items {
  margin-top: 10px;
  border-left: 1px solid var(--vp-c-divider);
}
</style>
