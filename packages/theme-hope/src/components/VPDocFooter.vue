<script setup lang="ts">
import { computed } from "vue";

import VPDocFooterLastUpdated from "./VPDocFooterLastUpdated.vue";
import VPLink from "./VPLink.vue";
import VPIconEdit from "./icons/VPIconEdit.vue";
import { useData } from "../composables/data.js";
import { useEditLink } from "../composables/edit-link.js";
import { usePrevNext } from "../composables/prev-next.js";
import { normalizeLink } from "../support/utils.js";

const { theme, page, frontmatter } = useData();

const editLink = useEditLink();
const control = usePrevNext();

const hasEditLink = computed(
  () => theme.value.editLink && frontmatter.value.editLink !== false
);
const hasLastUpdated = computed(
  () => page.value.lastUpdated && frontmatter.value.lastUpdated !== false
);

const showFooter = computed(
  () =>
    hasEditLink.value ||
    hasLastUpdated.value ||
    control.value.prev ||
    control.value.next
);
</script>

<template>
  <footer v-if="showFooter" class="VPDocFooter">
    <slot name="doc-footer-before" />

    <div v-if="hasEditLink || hasLastUpdated" class="edit-info">
      <div v-if="hasEditLink" class="edit-link">
        <VPLink class="edit-link-button" :href="editLink.url" no-icon>
          <VPIconEdit class="edit-link-icon" aria-label="edit icon" />
          {{ editLink.text }}
        </VPLink>
      </div>

      <div v-if="hasLastUpdated" class="last-updated">
        <VPDocFooterLastUpdated />
      </div>
    </div>

    <div v-if="control.prev?.link || control.next?.link" class="prev-next">
      <div class="pager">
        <a
          v-if="control.prev?.link"
          class="pager-link prev"
          :href="normalizeLink(control.prev.link)"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.prev || 'Previous page'"
          ></span>

          <span class="title" v-html="control.prev.text"></span>
        </a>
      </div>

      <div class="pager" :class="{ 'has-prev': control.prev?.link }">
        <a
          v-if="control.next?.link"
          class="pager-link next"
          :href="normalizeLink(control.next.link)"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.next || 'Next page'"
          ></span>

          <span class="title" v-html="control.next.text"></span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.VPDocFooter {
  margin-top: 64px;
}

.edit-info {
  padding-bottom: 18px;

  @media (min-width: 640px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: color 0.25s;

  &:hover {
    color: var(--vp-c-brand-dark);
  }
}

.edit-link-icon {
  margin-right: 8px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;

  @media (min-width: 640px) {
    display: flex;
  }
}

.pager {
  @media (min-width: 640px) {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 50%;
  }

  &.has-prev {
    padding-top: 8px;

    @media (min-width: 640px) {
      padding-top: 0;
      padding-left: 16px;
    }
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;

  &:hover {
    border-color: var(--vp-c-brand);
  }

  &.next {
    margin-left: auto;
    text-align: right;
  }
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: color 0.25s;
}
</style>
