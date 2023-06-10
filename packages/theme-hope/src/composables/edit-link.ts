import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useData } from "./data.js";

export interface EditLink {
  url: string;
  text: string;
}

export const useEditLink = (): ComputedRef<EditLink> => {
  const { theme, page } = useData();

  return computed(() => {
    const { text = "Edit this page", pattern = "" } =
      theme.value.editLink || {};
    let url: string;

    if (typeof pattern === "function") url = pattern(page.value);
    else url = pattern.replace(/:path/g, page.value.filePath);

    return { url, text };
  });
};
