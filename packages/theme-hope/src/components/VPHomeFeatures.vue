<script setup lang="ts">
import VPFeatures from "./VPFeatures.vue";
import { useData } from "../composables/data.js";

const { frontmatter: fm } = useData();
</script>

<template>
  <VPFeatures
    v-if="fm.features"
    class="VPHomeFeatures"
    :features="fm.features"
  />
</template>
