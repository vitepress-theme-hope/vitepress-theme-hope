<script setup lang="ts">
import type { MenuItem } from "../composables/outline.js";

defineProps<{
  headers: MenuItem[];
  root?: boolean;
}>();

const onClick = ({ target: el }: Event) => {
  const id = "#" + (el as HTMLAnchorElement).href.split("#")[1];
  const heading = document.querySelector<HTMLAnchorElement>(
    decodeURIComponent(id)
  );

  heading?.focus();
};
</script>

<template>
  <ul :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers" :key="link">
      <a class="outline-link" :href="link" :title="title" @click="onClick">{{
        title
      }}</a>

      <template v-if="children?.length">
        <VPDocOutlineItem :headers="children" />
      </template>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 13px;
}

.outline-link {
  display: block;
  line-height: 28px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  font-weight: 500;

  &:hover,
  &.active {
    color: var(--vp-c-text-1);
    transition: color 0.25s;
  }

  &.nested {
    padding-left: 13px;
  }
}
</style>
