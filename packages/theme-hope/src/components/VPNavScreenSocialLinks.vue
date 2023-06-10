<script lang="ts" setup>
import VPSocialLinks from "./VPSocialLinks.vue";
import { useData } from "../composables/data.js";

const { theme } = useData();
</script>

<template>
  <VPSocialLinks
    v-if="theme.socialLinks"
    class="VPNavScreenSocialLinks"
    :links="theme.socialLinks"
  />
</template>
