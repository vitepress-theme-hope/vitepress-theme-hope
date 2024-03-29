<script setup lang="ts">
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { ref } from "vue";

import VPNavScreenAppearance from "./VPNavScreenAppearance.vue";
import VPNavScreenMenu from "./VPNavScreenMenu.vue";
import VPNavScreenSocialLinks from "./VPNavScreenSocialLinks.vue";
import VPNavScreenTranslations from "./VPNavScreenTranslations.vue";

defineProps<{
  open: boolean;
}>();

const screen = ref<HTMLElement | null>(null);

function lockBodyScroll() {
  disableBodyScroll(screen.value!, { reserveScrollBarGap: true });
}

function unlockBodyScroll() {
  clearAllBodyScrollLocks();
}
</script>

<template>
  <transition
    name="fade"
    @enter="lockBodyScroll"
    @after-leave="unlockBodyScroll"
  >
    <div v-if="open" ref="screen" class="VPNavScreen">
      <div class="container">
        <slot name="nav-screen-content-before" />

        <VPNavScreenMenu class="menu" />

        <VPNavScreenTranslations class="translations" />

        <VPNavScreenAppearance class="appearance" />

        <VPNavScreenSocialLinks class="social-links" />

        <slot name="nav-screen-content-after" />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.VPNavScreen {
  position: fixed;
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px);
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  padding: 0 32px;
  width: 100%;
  background-color: var(--vp-nav-screen-bg-color);
  overflow-y: auto;
  transition: background-color 0.5s;
  pointer-events: auto;

  @media (min-width: 768px) {
    display: none;
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 0.25s;

    .container {
      transition: transform 0.25s ease;
    }
  }

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;

    .container {
      transform: translateY(-8px);
    }
  }
}

.container {
  margin: 0 auto;
  padding: 24px 0 96px;
  max-width: 288px;
}

.menu + .translations,
.menu + .appearance,
.translations + .appearance {
  margin-top: 24px;
}

.menu + .social-links {
  margin-top: 16px;
}

.appearance + .social-links {
  margin-top: 16px;
}
</style>
