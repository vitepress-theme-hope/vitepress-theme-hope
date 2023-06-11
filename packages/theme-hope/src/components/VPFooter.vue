<script setup lang="ts">
import { useData } from "../composables/data.js";
import { useSidebar } from "../composables/sidebar.js";

const { theme } = useData();
const { hasSidebar } = useSidebar();
</script>

<template>
  <footer
    v-if="theme.footer"
    class="VPFooter"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <div class="container">
      <p
        v-if="theme.footer.message"
        class="message"
        v-html="theme.footer.message"
      />

      <p
        v-if="theme.footer.copyright"
        class="copyright"
        v-html="theme.footer.copyright"
      />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);

  @media (min-width: 768px) {
    padding: 32px;
  }

  &.has-sidebar {
    display: none;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
