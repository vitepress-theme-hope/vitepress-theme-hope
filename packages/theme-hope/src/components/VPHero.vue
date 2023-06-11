<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import type { Ref } from "vue";
import { inject } from "vue";

import VPButton from "./VPButton.vue";
import VPImage from "./VPImage.vue";

export interface HeroAction {
  theme?: "brand" | "alt";
  text: string;
  link: string;
}

defineProps<{
  name?: string;
  text?: string;
  tagline?: string;
  image?: DefaultTheme.ThemeableImage;
  actions?: HeroAction[];
}>();

const heroImageSlotExists = inject("hero-image-slot-exists") as Ref<boolean>;
</script>

<template>
  <div class="VPHero" :class="{ 'has-image': image || heroImageSlotExists }">
    <div class="container">
      <div class="main">
        <slot name="home-hero-info">
          <h1 v-if="name" class="name">
            <span class="clip">{{ name }}</span>
          </h1>

          <p v-if="text" class="text">{{ text }}</p>

          <p v-if="tagline" class="tagline">{{ tagline }}</p>
        </slot>

        <div v-if="actions" class="actions">
          <div v-for="action in actions" :key="action.link" class="action">
            <VPButton
              tag="a"
              size="medium"
              :theme="action.theme"
              :text="action.text"
              :href="action.link"
            />
          </div>
        </div>
      </div>

      <div v-if="image || heroImageSlotExists" class="image">
        <div class="image-container">
          <div class="image-bg" />

          <slot name="home-hero-image">
            <VPImage v-if="image" class="image-src" :image="image" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.VPHero {
  margin-top: calc(
    (var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1
  );
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px)
    24px 48px;

  @media (min-width: 640px) {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
      )
      48px 64px;
  }

  @media (min-width: 960px) {
    padding: calc(
        var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px
      )
      64px 64px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;

  @media (min-width: 960px) {
    flex-direction: row;
  }

  .VPHero.has-image & {
    text-align: center;

    @media (min-width: 960px) {
      text-align: left;
    }
  }
}

.main {
  position: relative;
  z-index: 10;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;

  @media (min-width: 960px) {
    order: 1;
    width: calc((100% / 3) * 2);
  }

  .VPHero.has-image & {
    @media (min-width: 960px) {
      max-width: 592px;
    }
  }
}

.name,
.text {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;

  @media (min-width: 640px) {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }

  @media (min-width: 960px) {
    line-height: 64px;
    font-size: 56px;
  }

  .VPHero.has-image & {
    margin: 0 auto;

    @media (min-width: 960px) {
      margin: 0;
    }
  }
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);

  @media (min-width: 640px) {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }

  @media (min-width: 960px) {
    line-height: 36px;
    font-size: 24px;
  }

  .VPHero.has-image & {
    margin: 0 auto;

    @media (min-width: 960px) {
      margin: 0;
    }
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  padding-top: 24px;
  @media (min-width: 640px) {
    padding-top: 32px;
  }

  .VPHero.has-image & {
    justify-content: center;
  }

  @media (min-width: 960px) {
    justify-content: flex-start;
  }
}

.action {
  flex-shrink: 0;
  padding: 6px;
}

.image {
  order: 1;
  margin: -76px -24px -48px;

  @media (min-width: 640px) {
    margin: -108px -24px -48px;
  }

  @media (min-width: 960px) {
    flex-grow: 1;
    order: 2;
    margin: 0;
    min-height: 100%;
  }
}

.image-container {
  position: relative;
  margin: 0 auto;
  width: 320px;
  height: 320px;

  @media (min-width: 640px) {
    width: 392px;
    height: 392px;
  }

  @media (min-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /*rtl:ignore*/
    transform: translate(-32px, -32px);
  }
}

.image-bg {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  /*rtl:ignore*/
  transform: translate(-50%, -50%);

  @media (min-width: 640px) {
    width: 256px;
    height: 256px;
  }

  @media (min-width: 960px) {
    width: 320px;
    height: 320px;
  }
}

:deep(.image-src) {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  max-width: 192px;
  max-height: 192px;
  /*rtl:ignore*/
  transform: translate(-50%, -50%);

  @media (min-width: 640px) {
    max-width: 256px;
    max-height: 256px;
  }

  @media (min-width: 960px) {
    max-width: 320px;
    max-height: 320px;
  }
}
</style>
