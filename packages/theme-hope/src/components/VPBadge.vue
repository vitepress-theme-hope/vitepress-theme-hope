<script setup lang="ts">
export interface BadgeProps {
  /**
   * Badge type
   *
   * 徽章类型
   *
   * @default "info"
   */
  type?: string;
  /**
   * Badge text
   *
   * 徽章文字
   *
   * @default ""
   */
  text?: string;

  /**
   * Badge vertical align
   *
   * 徽章垂直对齐方式
   */
  vertical?: "top" | "middle" | "baseline" | "bottom";

  /**
   * Badge color
   *
   * 徽章颜色
   */
  color?: string;
}

defineProps<BadgeProps>();
</script>

<template>
  <span
    class="VPBadge"
    :class="[{ custom: color }, type ?? 'info']"
    :style="{
      ...(vertical ? { verticalAlign: vertical } : {}),
      ...(color ? { backgroundColor: color } : {}),
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<style lang="scss" scoped>
.VPBadge {
  display: inline-block;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 8px;
  line-height: 18px;
  font-size: 12px;
  font-weight: 600;
  transform: translateY(-2px);

  &.info {
    border-color: var(--vp-badge-info-border);
    color: var(--vp-badge-info-text);
    background-color: var(--vp-badge-info-bg);
  }

  &.tip {
    border-color: var(--vp-badge-tip-border);
    color: var(--vp-badge-tip-text);
    background-color: var(--vp-badge-tip-bg);
  }

  &.warning {
    border-color: var(--vp-badge-warning-border);
    color: var(--vp-badge-warning-text);
    background-color: var(--vp-badge-warning-bg);
  }

  &.danger {
    border-color: var(--vp-badge-danger-border);
    color: var(--vp-badge-danger-text);
    background-color: var(--vp-badge-danger-bg);
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  .VPBadge {
    vertical-align: top;
  }
}

h2 .VPBadge {
  border-radius: 11px;
  line-height: 20px;
}
</style>
