<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import { computed } from "vue";

import VPLink from "./VPLink.vue";
import VPIconChevronRight from "./icons/VPIconChevronRight.vue";
import { useSidebarControl } from "../composables/sidebar.js";

const props = defineProps<{
  item: DefaultTheme.SidebarItem;
  depth: number;
}>();

const {
  collapsed,
  collapsible,
  isLink,
  isActiveLink,
  hasActiveLink,
  hasChildren,
  toggle,
} = useSidebarControl(computed(() => props.item));

const sectionTag = computed(() => (hasChildren.value ? "section" : `div`));

const linkTag = computed(() => (isLink.value ? "a" : "div"));

const textTag = computed(() =>
  !hasChildren.value ? "p" : props.depth + 2 === 7 ? "p" : `h${props.depth + 2}`
);

const itemRole = computed(() => (isLink.value ? undefined : "button"));

const classes = computed(() => [
  [`level-${props.depth}`],
  { collapsible: collapsible.value },
  { collapsed: collapsed.value },
  { "is-link": isLink.value },
  { "is-active": isActiveLink.value },
  { "has-active": hasActiveLink.value },
]);

const onItemInteraction = (e: MouseEvent | Event): void => {
  if ("key" in e && e.key !== "Enter") return;
  if (!props.item.link) toggle();
};

const onCaretClick = (): void => {
  if (props.item.link) toggle();
};
</script>

<template>
  <component :is="sectionTag" class="VPSidebarItem" :class="classes">
    <div
      v-if="item.text"
      class="item"
      :role="itemRole"
      :tabindex="item.items && 0"
      v-on="
        item.items
          ? { click: onItemInteraction, keydown: onItemInteraction }
          : {}
      "
    >
      <div class="indicator" />

      <VPLink v-if="item.link" :tag="linkTag" class="link" :href="item.link">
        <component :is="textTag" class="text" v-html="item.text" />
      </VPLink>

      <component :is="textTag" v-else class="text" v-html="item.text" />

      <div
        v-if="item.collapsed != null"
        class="caret"
        role="button"
        aria-label="toggle section"
        tabindex="0"
        @click="onCaretClick"
        @keydown.enter="onCaretClick"
      >
        <VPIconChevronRight class="caret-icon" />
      </div>
    </div>

    <div v-if="item.items && item.items.length" class="items">
      <template v-if="depth < 5">
        <VPSidebarItem
          v-for="i in item.items"
          :key="i.text"
          :item="i"
          :depth="depth + 1"
        />
      </template>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.VPSidebarItem {
  &.level-0 {
    padding-bottom: 24px;

    &.collapsed {
      padding-bottom: 10px;
    }
  }

  &.collapsible > .item {
    cursor: pointer;
  }

  &.collapsed {
    .caret-icon {
      transform: rotate(0);
    }

    .items {
      display: none;
    }
  }

  &.level-2,
  &.level-3,
  &.level-4,
  &.level-5 {
    &.is-active > .item > .indicator {
      background-color: var(--vp-c-brand);
    }
  }

  &.level-0 {
    .text {
      font-weight: 700;
      color: var(--vp-c-text-1);
    }
  }

  &.level-1,
  &.level-2,
  &.level-3,
  &.level-4,
  &.level-5 {
    .text {
      font-weight: 500;
      color: var(--vp-c-text-2);
    }

    .items {
      border-left: 1px solid var(--vp-c-divider);
      padding-left: 16px;
    }
  }

  &.level-0,
  &.level-1,
  &.level-2,
  &.level-3,
  &.level-4,
  &.level-5 {
    &.is-link > .item > .link:hover .text {
      color: var(--vp-c-brand);
    }

    &.has-active > .item > .link > .text {
      color: var(--vp-c-text-1);
    }

    &.is-active > .item .link > .text {
      color: var(--vp-c-brand);
    }
  }
}

.item {
  position: relative;
  display: flex;
  width: 100%;
}

.indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: -17px;
  width: 1px;
  transition: background-color 0.25s;
}

.link {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.text {
  flex-grow: 1;
  padding: 4px 0;
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s;
}

.caret {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -7px;
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.25s;

  .item:hover & {
    color: var(--vp-c-text-2);

    &:hover {
      color: var(--vp-c-text-1);
    }
  }
}

.caret-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
  transform: rotate(90deg);
  transition: transform 0.25s;
}
</style>
