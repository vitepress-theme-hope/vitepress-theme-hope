<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed } from "vue";

import VPDocAside from "./VPDocAside.vue";
import VPDocFooter from "./VPDocFooter.vue";
import VPDocOutlineDropdown from "./VPDocOutlineDropdown.vue";
import { useSidebar } from "../composables/sidebar.js";

const route = useRoute();
const { hasSidebar, hasAside, leftAside } = useSidebar();

const pageName = computed(() =>
  route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
);
</script>

<template>
  <div
    class="VPDoc"
    :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }"
  >
    <slot name="doc-top" />

    <div class="container">
      <div v-if="hasAside" class="aside" :class="{ 'left-aside': leftAside }">
        <div class="aside-curtain" />

        <div class="aside-container">
          <div class="aside-content">
            <VPDocAside>
              <template #aside-top>
                <slot name="aside-top" />
              </template>

              <template #aside-bottom>
                <slot name="aside-bottom" />
              </template>

              <template #aside-outline-after>
                <slot name="aside-outline-after" />
              </template>
            </VPDocAside>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="content-container">
          <slot name="doc-before" />

          <VPDocOutlineDropdown />

          <main class="main">
            <Content class="vp-doc" :class="pageName" />
          </main>

          <VPDocFooter>
            <template #doc-footer-before>
              <slot name="doc-footer-before" />
            </template>
          </VPDocFooter>

          <slot name="doc-after" />
        </div>
      </div>
    </div>

    <slot name="doc-bottom" />
  </div>
</template>

<style lang="scss" scoped>
.VPDoc {
  padding: 32px 24px 96px;
  width: 100%;

  @media (min-width: 768px) {
    padding: 48px 32px 128px;
  }
  @media (min-width: 960px) {
    padding: 32px 32px 0;
  }

  &:not(.has-sidebar) {
    .container {
      @media (min-width: 960px) {
        display: flex;
        justify-content: center;
        max-width: 992px;
      }

      @media (min-width: 1440px) {
        max-width: 1104px;
      }
    }

    .content {
      @media (min-width: 960px) {
        max-width: 752px;
      }

      @media (min-width: 1440px) {
        max-width: 784px;
      }
    }
  }

  @media (min-width: 1280px) {
    .container {
      display: flex;
      justify-content: center;
    }

    .aside {
      display: block;
    }
  }

  .VPDocOutlineDropdown {
    display: none;

    @media (min-width: 960px) and (max-width: 1280px) {
      display: block;
    }
  }
}

.container {
  margin: 0 auto;
  width: 100%;
}

.aside {
  position: relative;
  display: none;
  order: 2;
  flex-grow: 1;
  padding-left: 32px;
  width: 100%;
  max-width: 256px;
}

.left-aside {
  order: 1;
  padding-left: unset;
  padding-right: 32px;
}

.aside-container {
  position: fixed;
  top: 0;
  padding-top: calc(
    var(--vp-nav-height) + var(--vp-layout-top-height, 0px) +
      var(--vp-doc-top-height, 0px) + 32px
  );
  width: 224px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.aside-curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 224px;
  height: 32px;
  background: linear-gradient(transparent, var(--vp-c-bg) 70%);
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 32px)
  );
  padding-bottom: 32px;
}

.content {
  position: relative;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 960px) {
    padding: 0 32px 128px;
  }

  @media (min-width: 1280px) {
    order: 1;
    margin: 0;
    min-width: 640px;
  }
}

.content-container {
  margin: 0 auto;

  .VPDoc.has-aside & {
    max-width: 688px;
  }
}
</style>
