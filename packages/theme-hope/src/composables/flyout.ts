import type { Ref } from "vue";
import { onUnmounted, readonly, ref, watch } from "vue";

import { inBrowser } from "../shared.js";

interface UseFlyoutOptions {
  el: Ref<HTMLElement | undefined>;
  onFocus?(): void;
  onBlur?(): void;
}

export const focusedElement = ref<HTMLElement>();

let active = false;
let listeners = 0;

const handleFocusIn = (): void => {
  focusedElement.value = document.activeElement as HTMLElement;
};

const activateFocusTracking = (): void => {
  document.addEventListener("focusin", handleFocusIn);
  active = true;
  focusedElement.value = document.activeElement as HTMLElement;
};

const deactivateFocusTracking = (): void => {
  document.removeEventListener("focusin", handleFocusIn);
};

export type IsFocusedRef = Readonly<Ref<boolean>>;

export const useFlyout = (options: UseFlyoutOptions): IsFocusedRef => {
  const focus = ref(false);

  if (inBrowser) {
    !active && activateFocusTracking();

    listeners++;

    const unwatch = watch(focusedElement, (el) => {
      if (el === options.el.value || options.el.value?.contains(el!)) {
        focus.value = true;
        options.onFocus?.();
      } else {
        focus.value = false;
        options.onBlur?.();
      }
    });

    onUnmounted(() => {
      unwatch();

      listeners--;

      if (!listeners) deactivateFocusTracking();
    });
  }

  return readonly(focus);
};
