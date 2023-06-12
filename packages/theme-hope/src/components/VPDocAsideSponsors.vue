<script setup lang="ts">
import type { Sponsors } from "./VPSponsors.vue";
import VPSponsors from "./VPSponsors.vue";
import type { Sponsor } from "./VPSponsorsGrid.vue";

defineProps<{
  tier?: string;
  size?: "xmini" | "mini" | "small";
  data: Sponsors[] | Sponsor[];
}>();
</script>

<template>
  <div class="VPDocAsideSponsors">
    <VPSponsors mode="aside" :tier="tier" :size="size" :data="data" />
  </div>
</template>

<style lang="scss">
.VPDocAside {
  .spacer + .VPDocAsideSponsors,
  .spacer + .VPDocAsideCarbonAds {
    margin-top: 24px;
  }

  .VPDocAsideSponsors + .VPDocAsideCarbonAds {
    margin-top: 16px;
  }
}
</style>
