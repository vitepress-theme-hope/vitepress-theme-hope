<script setup lang="ts">
import VPHomeFeatures from "./VPHomeFeatures.vue";
import VPHomeHero from "./VPHomeHero.vue";
</script>

<template>
  <div class="VPHome">
    <slot name="home-hero-before" />

    <VPHomeHero>
      <template #home-hero-info><slot name="home-hero-info" /></template>

      <template #home-hero-image><slot name="home-hero-image" /></template>
    </VPHomeHero>

    <slot name="home-hero-after" />

    <slot name="home-features-before" />

    <VPHomeFeatures />

    <slot name="home-features-after" />

    <Content />
  </div>
</template>

<style lang="scss" scoped>
.VPHome {
  padding-bottom: 96px;

  @media (min-width: 768px) {
    padding-bottom: 128px;
  }

  // TODO: Remove
  :deep(.VPHomeSponsors) {
    margin-top: 112px;
    margin-bottom: -128px;
  }
}
</style>
