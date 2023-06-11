<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { onContentUpdated } from "vitepress";
import { nextTick, ref, shallowRef } from "vue";

import VPDocOutlineItem from "./VPDocOutlineItem.vue";
import VPIconChevronRight from "./icons/VPIconChevronRight.vue";
import { useData } from "../composables/data.js";
import type { MenuItem } from "../composables/outline.js";
import { resolveTitle } from "../composables/outline.js";

defineProps<{
  headers: MenuItem[];
}>();

const { theme } = useData();
const [open, toggleOpen] = useToggle(false);
const vh = ref(0);
const items = shallowRef<HTMLDivElement>();

const toggleMenu = (): void => {
  toggleOpen();
  vh.value = window.innerHeight + Math.min(window.scrollY - 64, 0);
};

const onItemClick = (event: Event): void => {
  if ((event.target as HTMLElement).classList.contains("outline-link")) {
    // disable animation on hash navigation when page jumps
    if (items.value) items.value.style.transition = "none";

    void nextTick(() => {
      toggleOpen(false);
    });
  }
};

const scrollToTop = (): void => {
  toggleOpen(false);
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

onContentUpdated(() => {
  toggleOpen(false);
});
</script>

<template>
  <div class="VPLocalNavOutlineDropdown" :style="{ '--vp-vh': vh + 'px' }">
    <button
      v-if="headers.length > 0"
      type="button"
      :class="{ open }"
      @click="toggleMenu"
    >
      {{ resolveTitle(theme) }}
      <VPIconChevronRight class="icon" />
    </button>

    <button v-else type="button" @click="scrollToTop">
      {{ theme.returnToTopLabel || "Return to top" }}
    </button>

    <Transition name="flyout">
      <div v-if="open" ref="items" class="items" @click="onItemClick">
        <a class="top-link" href="#" @click="scrollToTop">
          {{ theme.returnToTopLabel || "Return to top" }}
        </a>

        <VPDocOutlineItem :headers="headers" />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.VPLocalNavOutlineDropdown {
  padding: 12px 20px 11px;

  button {
    display: block;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    color: var(--vp-c-text-2);
    transition: color 0.5s;
    position: relative;

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
  font-size: 14px;
  padding: 2px 0;
}

.open > .icon {
  transform: rotate(90deg);
}

.items {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 64px;
  background-color: var(--vp-local-nav-bg-color);
  padding: 4px 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  max-height: calc(var(--vp-vh, 100vh) - 86px);
  overflow: hidden auto;
  box-shadow: var(--vp-shadow-3);
}

.top-link {
  display: block;
  color: var(--vp-c-brand);
  font-size: 13px;
  font-weight: 500;
  padding: 6px 0;
  margin: 0 13px 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.flyout-enter-active {
  transition: all 0.2s ease-out;
}

.flyout-leave-active {
  transition: all 0.15s ease-in;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
