<script lang="ts" setup>
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { ref, watchPostEffect } from "vue";

import VPSidebarItem from "./VPSidebarItem.vue";
import { useSidebar } from "../composables/sidebar.js";

const props = defineProps<{
  open: boolean;
}>();

const { sidebarGroups, hasSidebar } = useSidebar();

// a11y: focus Nav element when menu has opened
let navEl = ref<HTMLElement | null>(null);

function lockBodyScroll() {
  disableBodyScroll(navEl.value!, { reserveScrollBarGap: true });
}

function unlockBodyScroll() {
  clearAllBodyScrollLocks();
}

watchPostEffect(() => {
  if (props.open) {
    lockBodyScroll();
    navEl.value?.focus();
  } else {
    unlockBodyScroll();
  }
});
</script>

<template>
  <aside
    v-if="hasSidebar"
    ref="navEl"
    class="VPSidebar"
    :class="{ open }"
    @click.stop
  >
    <div class="curtain" />

    <nav
      id="VPSidebarNav"
      class="nav"
      aria-labelledby="sidebar-aria-label"
      tabindex="-1"
    >
      <span id="sidebar-aria-label" class="visually-hidden">
        Sidebar Navigation
      </span>

      <slot name="sidebar-nav-before" />

      <div v-for="item in sidebarGroups" :key="item.text" class="group">
        <VPSidebarItem :item="item" :depth="0" />
      </div>

      <slot name="sidebar-nav-after" />
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.VPSidebar {
  position: fixed;
  top: var(--vp-layout-top-height, 0px);
  bottom: 0;
  left: 0;
  z-index: var(--vp-z-index-sidebar);
  padding: 32px 32px 96px;
  width: calc(100vw - 64px);
  max-width: 320px;
  background-color: var(--vp-sidebar-bg-color);
  opacity: 0;
  box-shadow: var(--vp-c-shadow-3);
  overflow-x: hidden;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: opacity 0.5s, transform 0.25s ease;
  overscroll-behavior: contain;

  @media (min-width: 960px) {
    z-index: 1;
    padding-top: var(--vp-nav-height);
    padding-bottom: 128px;
    width: var(--vp-sidebar-width);
    max-width: 100%;
    background-color: var(--vp-sidebar-bg-color);
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    transform: translateX(0);
  }

  @media (min-width: 1440px) {
    padding-left: max(
      32px,
      calc((100% - (var(--vp-layout-max-width) - 64px)) / 2)
    );
    width: calc(
      (100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) -
        32px
    );
  }

  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    transition: opacity 0.25s, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .dark & {
    box-shadow: var(--vp-shadow-1);
  }
}

.curtain {
  @media (min-width: 960px) {
    position: sticky;
    top: -64px;
    left: 0;
    z-index: 1;
    margin-top: calc(var(--vp-nav-height) * -1);
    margin-right: -32px;
    margin-left: -32px;
    height: var(--vp-nav-height);
    background-color: var(--vp-sidebar-bg-color);
  }
}

.nav {
  outline: 0;
}

.group {
  @media (min-width: 960px) {
    padding-top: 10px;
    width: calc(var(--vp-sidebar-width) - 64px);
  }

  + & {
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 10px;
  }
}
</style>
