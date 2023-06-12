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
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 10px;

  font-weight: 600;
  font-size: 12px;
  line-height: 18px;

  transform: translateY(-2px);

  &.info {
    border-color: var(--vp-badge-info-border);
    background-color: var(--vp-badge-info-bg);
    color: var(--vp-badge-info-text);
  }

  &.tip {
    border-color: var(--vp-badge-tip-border);
    background-color: var(--vp-badge-tip-bg);
    color: var(--vp-badge-tip-text);
  }

  &.warning {
    border-color: var(--vp-badge-warning-border);
    background-color: var(--vp-badge-warning-bg);
    color: var(--vp-badge-warning-text);
  }

  &.danger {
    border-color: var(--vp-badge-danger-border);
    background-color: var(--vp-badge-danger-bg);
    color: var(--vp-badge-danger-text);
  }

  h1 &,
  h2 &,
  h3 &,
  h4 &,
  h5 &,
  h6 & {
    vertical-align: top;
  }

  h2 & {
    border-radius: 11px;
    line-height: 20px;
  }
}
</style>
