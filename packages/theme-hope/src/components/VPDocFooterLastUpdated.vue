<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";

import { useData } from "../composables/data.js";

const { theme, page, lang } = useData();

const date = computed(() => new Date(page.value.lastUpdated!));
const isoDatetime = computed(() => date.value.toISOString());
const datetime = ref("");

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    datetime.value = date.value.toLocaleString(lang.value);
  });
});
</script>

<template>
  <p class="VPLastUpdated">
    {{ theme.lastUpdatedText || "Last updated" }}:
    <time :datetime="isoDatetime">{{ datetime }}</time>
  </p>
</template>

<style lang="scss" scoped>
.VPLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);

  @media (min-width: 640px) {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
