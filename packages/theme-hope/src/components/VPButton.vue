<script setup lang="ts">
import { computed } from "vue";

import { EXTERNAL_URL_RE } from "../shared.js";
import { normalizeLink } from "../support/utils.js";

const props = defineProps<{
  /** tag of the button */
  tag?: string;
  /** size of the button */
  size?: "medium" | "big";
  // TODO: Remove sponsor
  /** theme of the button */
  theme?: "brand" | "alt" | "sponsor";
  /** button text */
  text: string;
  /** button link */
  href?: string;
}>();

const component = computed(() => (props.tag ?? props.href ? "a" : "button"));

const classes = computed(() => [
  props.size ?? "medium",
  props.theme ?? "brand",
]);

const isExternal = computed(
  () => props.href && EXTERNAL_URL_RE.test(props.href)
);
</script>

<template>
  <component
    :is="component"
    class="VPButton"
    :class="classes"
    :href="href ? normalizeLink(href) : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noreferrer' : undefined"
  >
    {{ text }}
  </component>
</template>

<style lang="scss" scoped>
.VPButton {
  display: inline-block;

  border: 1px solid transparent;

  font-weight: 600;
  text-align: center;
  white-space: nowrap;

  transition: color 0.25s, border-color 0.25s, background-color 0.25s;

  &:active {
    transition: color 0.1s, border-color 0.1s, background-color 0.1s;
  }

  &.medium {
    padding: 0 20px;
    border-radius: 20px;
    font-size: 14px;
    line-height: 38px;
  }

  &.big {
    padding: 0 24px;
    border-radius: 24px;
    font-size: 16px;
    line-height: 46px;
  }

  &.brand {
    border-color: var(--vp-button-brand-border);
    background-color: var(--vp-button-brand-bg);
    color: var(--vp-button-brand-text);

    &:hover {
      border-color: var(--vp-button-brand-hover-border);
      background-color: var(--vp-button-brand-hover-bg);
      color: var(--vp-button-brand-hover-text);
    }

    &:active {
      border-color: var(--vp-button-brand-active-border);
      background-color: var(--vp-button-brand-active-bg);
      color: var(--vp-button-brand-active-text);
    }
  }

  &.alt {
    border-color: var(--vp-button-alt-border);
    background-color: var(--vp-button-alt-bg);
    color: var(--vp-button-alt-text);

    &:hover {
      border-color: var(--vp-button-alt-hover-border);
      background-color: var(--vp-button-alt-hover-bg);
      color: var(--vp-button-alt-hover-text);
    }

    &:active {
      border-color: var(--vp-button-alt-active-border);
      background-color: var(--vp-button-alt-active-bg);
      color: var(--vp-button-alt-active-text);
    }
  }
}

// TODO: Remove
.VPButton.sponsor {
  border-color: var(--vp-button-sponsor-border);
  background-color: var(--vp-button-sponsor-bg);
  color: var(--vp-button-sponsor-text);
}

.VPButton.sponsor:hover {
  border-color: var(--vp-button-sponsor-hover-border);
  background-color: var(--vp-button-sponsor-hover-bg);
  color: var(--vp-button-sponsor-hover-text);
}

.VPButton.sponsor:active {
  border-color: var(--vp-button-sponsor-active-border);
  background-color: var(--vp-button-sponsor-active-bg);
  color: var(--vp-button-sponsor-active-text);
}
</style>
