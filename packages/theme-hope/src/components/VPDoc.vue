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
  width: 100%;
  padding: 32px 24px 96px;

  @media (min-width: 768px) {
    padding: 48px 32px 128px;
  }

  @media (min-width: 960px) {
    padding: 32px 32px 0;
  }

  .container {
    @media (min-width: 1280px) {
      display: flex;
      justify-content: center;
    }
  }

  .aside {
    @media (min-width: 1280px) {
      display: block;
    }
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

  .VPDocOutlineDropdown {
    display: none;

    @media (min-width: 960px) and (max-width: 1280px) {
      display: block;
    }
  }
}

.container {
  width: 100%;
  margin: 0 auto;
}

.aside {
  position: relative;

  display: none;
  flex-grow: 1;
  order: 2;

  width: 100%;
  max-width: 256px;
  padding-left: 32px;
}

.left-aside {
  order: 1;
  padding-right: 32px;
  padding-left: unset;
}

.aside-container {
  position: fixed;
  top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  width: 224px;
  height: 100vh;
  padding-top: calc(
    var(--vp-nav-height) + var(--vp-layout-top-height, 0px) +
      var(--vp-doc-top-height, 0px) + 32px
  );

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
  width: 100%;
  margin: 0 auto;

  @media (min-width: 960px) {
    padding: 0 32px 128px;
  }

  @media (min-width: 1280px) {
    order: 1;
    min-width: 640px;
    margin: 0;
  }
}

.content-container {
  margin: 0 auto;

  .VPDoc.has-aside & {
    max-width: 688px;
  }
}
</style>
