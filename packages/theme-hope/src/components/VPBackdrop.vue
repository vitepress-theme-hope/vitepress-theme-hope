<script lang="ts" setup>
defineProps<{
  /** Whether show backdrop */
  show: boolean;
}>();
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="VPBackdrop" />
  </transition>
</template>

<style lang="scss" scoped>
.VPBackdrop {
  position: fixed;
  top: 0;

  /*rtl:ignore*/
  right: 0;
  bottom: 0;

  /*rtl:ignore*/
  left: 0;
  z-index: var(--vp-z-index-backdrop);

  background: var(--vp-backdrop-bg-color);

  transition: opacity 0.5s;

  @media (min-width: 1280px) {
    display: none;
  }

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
  }

  &.fade-leave-active {
    transition-duration: 0.25s;
  }
}
</style>
