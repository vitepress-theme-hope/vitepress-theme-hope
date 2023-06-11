<script lang="ts" setup>
import { useToggle } from "@vueuse/core";
import { ref } from "vue";

import VPMenu from "./VPMenu.vue";
import VPIconChevronDown from "./icons/VPIconChevronDown.vue";
import VPIconMoreHorizontal from "./icons/VPIconMoreHorizontal.vue";
import { useFlyout } from "../composables/flyout.js";

defineProps<{
  icon?: any;
  button?: string;
  label?: string;
  items?: any[];
}>();

const [open, toggle] = useToggle(false);
const el = ref<HTMLElement>();

useFlyout({
  el,
  onBlur: () => toggle(false),
});
</script>

<template>
  <div
    ref="el"
    class="VPFlyout"
    @mouseenter="toggle(true)"
    @mouseleave="toggle(false)"
  >
    <button
      type="button"
      class="button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="toggle()"
    >
      <span v-if="button || icon" class="text">
        <component :is="icon" v-if="icon" class="option-icon" />
        {{ button }}
        <VPIconChevronDown class="text-icon" />
      </span>

      <VPIconMoreHorizontal v-else class="icon" />
    </button>

    <div class="menu">
      <VPMenu :items="items">
        <slot />
      </VPMenu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.VPFlyout {
  position: relative;

  &:hover {
    color: var(--vp-c-brand);
    transition: color 0.25s;

    .text {
      color: var(--vp-c-text-2);
    }

    .icon {
      fill: var(--vp-c-text-2);
    }
  }

  &.active {
    .text {
      color: var(--vp-c-brand);
    }

    &:hover .text {
      color: var(--vp-c-brand-dark);
    }
  }
}

.VPFlyout:hover .menu,
.button[aria-expanded="true"] + .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: var(--vp-nav-height);
  color: var(--vp-c-text-1);
  transition: color 0.5s;
}

.text {
  display: flex;
  align-items: center;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.option-icon {
  margin-right: 0px;
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.text-icon {
  margin-left: 4px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: fill 0.25s;
}

.menu {
  position: absolute;
  top: calc(var(--vp-nav-height) / 2 + 20px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
}
</style>
