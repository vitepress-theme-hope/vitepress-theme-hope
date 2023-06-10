import { useEventListener, useMediaQuery, useToggle } from "@vueuse/core";
import { useRoute } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";
import type { ComputedRef, Ref } from "vue";
import { computed, ref, watchEffect } from "vue";

import { useData } from "./data.js";
import { isActive } from "../shared.js";
import {
  hasActiveLink as containsActiveLink,
  getSidebar,
  getSidebarGroups,
} from "../support/sidebar.js";

export interface SidebarControl {
  collapsed: Ref<boolean>;
  collapsible: ComputedRef<boolean>;
  isLink: ComputedRef<boolean>;
  isActiveLink: ComputedRef<boolean>;
  hasActiveLink: ComputedRef<boolean>;
  hasChildren: ComputedRef<boolean>;
  toggle(): void;
}

export interface SidebarRef {
  isOpen: Ref<boolean>;
  sidebar: ComputedRef<DefaultTheme.SidebarItem[]>;
  sidebarGroups: ComputedRef<DefaultTheme.SidebarItem[]>;
  hasSidebar: ComputedRef<boolean>;
  hasAside: ComputedRef<boolean>;
  leftAside: ComputedRef<boolean>;
  isSidebarEnabled: ComputedRef<boolean>;
  toggle: (value?: boolean | undefined) => boolean;
}

export const useSidebar = (): SidebarRef => {
  const route = useRoute();
  const { theme, frontmatter } = useData();
  const is960 = useMediaQuery("(min-width: 960px)");

  const [isOpen, toggle] = useToggle(false);

  const sidebar = computed(() => {
    const sidebarConfig = theme.value.sidebar;
    const relativePath = route.data.relativePath;

    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });

  const hasSidebar = computed(() => {
    return (
      frontmatter.value.sidebar !== false &&
      sidebar.value.length > 0 &&
      frontmatter.value.layout !== "home"
    );
  });

  const leftAside = computed(() => {
    if (hasAside.value)
      return frontmatter.value.aside == null
        ? theme.value.aside === "left"
        : frontmatter.value.aside === "left";

    return false;
  });

  const hasAside = computed(() => {
    if (frontmatter.value.layout === "home") return false;
    if (frontmatter.value.aside != null) return !!frontmatter.value.aside;

    return theme.value.aside !== false;
  });

  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);

  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });

  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    toggle,
  };
};

/**
 * a11y: cache the element that opened the Sidebar (the menu button) then
 * focus that button again when Menu is closed with Escape key.
 */
export const useCloseSidebarOnEscape = (
  isOpen: Ref<boolean>,
  close: () => void
): void => {
  let triggerElement: HTMLButtonElement | undefined;

  const onEscape = ({ key }: KeyboardEvent): void => {
    if (key === "Escape" && isOpen.value) {
      close();
      triggerElement?.focus();
    }
  };

  watchEffect(() => {
    triggerElement = isOpen.value
      ? (document.activeElement as HTMLButtonElement)
      : undefined;
  });

  useEventListener("keyup", onEscape);
};

export function useSidebarControl(
  item: ComputedRef<DefaultTheme.SidebarItem>
): SidebarControl {
  const { page } = useData();

  const collapsed = ref(false);

  const collapsible = computed(() => item.value.collapsed != null);

  const isLink = computed(() => Boolean(item.value.link));

  const isActiveLink = computed(() =>
    isActive(page.value.relativePath, item.value.link)
  );

  const hasActiveLink = computed(() => {
    if (isActiveLink.value) return true;

    return item.value.items
      ? containsActiveLink(page.value.relativePath, item.value.items)
      : false;
  });

  const hasChildren = computed(() =>
    Boolean(item.value.items && item.value.items.length)
  );

  const toggle = (): void => {
    if (collapsible.value) collapsed.value = !collapsed.value;
  };

  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });

  watchEffect(() => {
    (isActiveLink.value || hasActiveLink.value) && (collapsed.value = false);
  });

  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink,
    hasChildren,
    toggle,
  };
}
