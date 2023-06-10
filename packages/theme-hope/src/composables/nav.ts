import { useRoute } from "vitepress";
import type { Ref } from "vue";
import { ref, watch } from "vue";

export interface NavRef {
  isScreenOpen: Ref<boolean>;
  openScreen: () => void;
  closeScreen: () => void;
  toggleScreen: () => void;
}

export const useNav = (): NavRef => {
  const isScreenOpen = ref(false);

  const openScreen = (): void => {
    isScreenOpen.value = true;
    window.addEventListener("resize", closeScreenOnTabletWindow);
  };

  const closeScreen = (): void => {
    isScreenOpen.value = false;
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  };

  const toggleScreen = (): void => {
    isScreenOpen.value ? closeScreen() : openScreen();
  };

  /**
   * Close screen when the user resizes the window wider than tablet size.
   */
  const closeScreenOnTabletWindow = (): void => {
    if (window.outerWidth >= 768) closeScreen();
  };

  const route = useRoute();

  watch(() => route.path, closeScreen);

  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen,
  };
};
