<script setup lang="ts">
import VPDoc from "./VPDoc.vue";
import VPHome from "./VPHome.vue";
import VPPage from "./VPPage.vue";
import NotFound from "../NotFound.vue";
import { useData } from "../composables/data.js";
import { useSidebar } from "../composables/sidebar.js";

const { page, frontmatter } = useData();
const { hasSidebar } = useSidebar();
</script>

<template>
  <div
    id="VPContent"
    class="VPContent"
    :class="{
      'has-sidebar': hasSidebar,
      'is-home': frontmatter.layout === 'home',
    }"
  >
    <slot v-if="page.isNotFound" name="not-found"><NotFound /></slot>

    <VPPage v-else-if="frontmatter.layout === 'page'">
      <template #page-top>
        <slot name="page-top" />
      </template>

      <template #page-bottom>
        <slot name="page-bottom" />
      </template>
    </VPPage>

    <VPHome v-else-if="frontmatter.layout === 'home'">
      <template #home-hero-before>
        <slot name="home-hero-before" />
      </template>

      <template #home-hero-info>
        <slot name="home-hero-info" />
      </template>

      <template #home-hero-image>
        <slot name="home-hero-image" />
      </template>

      <template #home-hero-after>
        <slot name="home-hero-after" />
      </template>

      <template #home-features-before>
        <slot name="home-features-before" />
      </template>

      <template #home-features-after>
        <slot name="home-features-after" />
      </template>
    </VPHome>

    <VPDoc v-else>
      <template #doc-top>
        <slot name="doc-top" />
      </template>

      <template #doc-bottom>
        <slot name="doc-bottom" />
      </template>

      <template #doc-footer-before>
        <slot name="doc-footer-before" />
      </template>

      <template #doc-before>
        <slot name="doc-before" />
      </template>

      <template #doc-after>
        <slot name="doc-after" />
      </template>

      <template #aside-top>
        <slot name="aside-top" />
      </template>

      <template #aside-outline-after>
        <slot name="aside-outline-after" />
      </template>

      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
    </VPDoc>
  </div>
</template>

<style lang="scss" scoped>
.VPContent {
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  margin: var(--vp-layout-top-height, 0) auto 0;

  @media (min-width: 960px) {
    padding-top: var(--vp-nav-height);
  }

  &.is-home {
    width: 100%;
    max-width: 100%;
  }

  &.has-sidebar {
    margin: 0;

    @media (min-width: 960px) {
      margin: var(--vp-layout-top-height, 0) 0 0;
      padding-left: var(--vp-sidebar-width);
    }

    @media (min-width: 1440px) {
      padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
      padding-left: calc(
        (100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)
      );
    }
  }
}
</style>
