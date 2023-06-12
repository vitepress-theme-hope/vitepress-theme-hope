<script lang="ts" setup>
import { useRoute } from "vitepress";
import { ref, watch } from "vue";

const route = useRoute();
const backToTop = ref<HTMLElement>();

const focusOnTargetAnchor = ({ target }: Event): void => {
  const el = document.querySelector<HTMLAnchorElement>(
    decodeURIComponent((target as HTMLAnchorElement).hash)
  );

  if (el) {
    const removeTabIndex = (): void => {
      el.removeAttribute("tabindex");
      el.removeEventListener("blur", removeTabIndex);
    };

    el.setAttribute("tabindex", "-1");
    el.addEventListener("blur", removeTabIndex);
    el.focus();
    window.scrollTo(0, 0);
  }
};

watch(
  () => route.path,
  () => backToTop.value!.focus()
);
</script>

<template>
  <span ref="backToTop" tabindex="-1" />

  <a
    href="#VPContent"
    class="VPSkipLink visually-hidden"
    @click="focusOnTargetAnchor"
  >
    Skip to content
  </a>
</template>

<style lang="scss" scoped>
.VPSkipLink {
  top: 8px;
  left: 8px;
  padding: 8px 16px;
  z-index: 999;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  color: var(--vp-c-brand);
  box-shadow: var(--vp-shadow-3);
  background-color: var(--vp-c-bg);

  @media (min-width: 1280px) {
    top: 14px;
    left: 16px;
  }

  &:focus {
    height: auto;
    width: auto;
    clip: auto;
    clip-path: none;
  }
}
</style>
