<script setup lang="ts">
import { ref } from "vue";

import type { GridSize } from "../composables/sponsor-grid.js";
import { useSponsorsGrid } from "../composables/sponsor-grid.js";

export interface Sponsor {
  name: string;
  img: string;
  url: string;
}

const props = defineProps<{
  size?: GridSize;
  data: Sponsor[];
}>();

const el = ref(null);

useSponsorsGrid({ el, size: props.size });
</script>

<template>
  <div
    ref="el"
    class="VPSponsorsGrid vp-sponsor-grid"
    :class="[props.size ?? 'medium']"
  >
    <div
      v-for="sponsor in data"
      :key="sponsor.name"
      class="vp-sponsor-grid-item"
    >
      <a
        class="vp-sponsor-grid-link"
        :href="sponsor.url"
        target="_blank"
        rel="sponsored noopener"
      >
        <article class="vp-sponsor-grid-box">
          <h4 class="visually-hidden">{{ sponsor.name }}</h4>

          <img
            class="vp-sponsor-grid-image"
            :src="sponsor.img"
            :alt="sponsor.name"
          />
        </article>
      </a>
    </div>
  </div>
</template>
