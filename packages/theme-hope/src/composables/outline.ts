import { useEventListener } from "@vueuse/core";
import type { Header } from "vitepress/client";
import type { DefaultTheme } from "vitepress/theme";
import type { ShallowRef } from "vue";
import { onMounted, onUpdated } from "vue";

import { useAside } from "./aside.js";
import { throttleAndDebounce } from "../support/utils.js";

// magic number to avoid repeated retrieval
const PAGE_OFFSET = 71;

export type MenuItem = Omit<Header, "slug" | "children"> & {
  children?: MenuItem[];
};

export const resolveTitle = (theme: DefaultTheme.Config): string =>
  (typeof theme.outline === "object" &&
    !Array.isArray(theme.outline) &&
    theme.outline.label) ||
  theme.outlineTitle ||
  "On this page";

const serializeHeader = (h: Element): string => {
  let ret = "";

  for (const node of h.childNodes)
    if (node.nodeType === 1) {
      if (
        (node as Element).classList.contains("VPBadge") ||
        (node as Element).classList.contains("header-anchor")
      )
        continue;

      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }

  return ret.trim();
};

export const getHeaders = (
  range: DefaultTheme.Config["outline"]
): MenuItem[] => {
  const headers = [...document.querySelectorAll(".VPDoc h2,h3,h4,h5,h6")]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1]);

      return {
        title: serializeHeader(el),
        link: "#" + el.id,
        level,
      };
    });

  return resolveHeaders(headers, range);
};

export const resolveHeaders = (
  headers: MenuItem[],
  range?: DefaultTheme.Config["outline"]
): MenuItem[] => {
  if (range === false) return [];

  const levelsRange =
    (typeof range === "object" && !Array.isArray(range)
      ? range.level
      : range) || 2;

  const [high, low]: [number, number] =
    typeof levelsRange === "number"
      ? [levelsRange, levelsRange]
      : levelsRange === "deep"
      ? [2, 6]
      : levelsRange;

  headers = headers.filter((h) => h.level >= high && h.level <= low);

  const ret: MenuItem[] = [];

  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i];

    if (i === 0) {
      ret.push(cur);
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j];

        if (prev.level < cur.level) {
          (prev.children || (prev.children = [])).push(cur);
          continue outer;
        }
      }
      ret.push(cur);
    }
  }

  return ret;
};

const getAnchorTop = (anchor: HTMLAnchorElement): number =>
  anchor.parentElement!.offsetTop - PAGE_OFFSET;

const isAnchorActive = (
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement | undefined
): [boolean] | [boolean, string] => {
  const scrollTop = window.scrollY;

  if (index === 0 && scrollTop === 0) return [true];

  if (scrollTop < getAnchorTop(anchor)) return [false];

  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor))
    return [true, anchor.hash];

  return [false];
};

export const useActiveAnchor = (
  container: ShallowRef<HTMLElement | undefined>,
  marker: ShallowRef<HTMLElement | undefined>
): void => {
  const { isAsideEnabled } = useAside();

  let prevActiveLink: HTMLAnchorElement | null = null;

  const setActiveLink = (): void => {
    if (!isAsideEnabled.value) return;

    const links = [].slice.call(
      container.value!.querySelectorAll(".outline-link")
    ) as HTMLAnchorElement[];

    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".content .header-anchor")
    ).filter((anchor: HTMLAnchorElement) =>
      links.some(
        (link) => link.hash === anchor.hash && anchor.offsetParent !== null
      )
    );

    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;

    // page bottom - highlight last one
    if (anchors.length && isBottom) {
      activateLink(anchors[anchors.length - 1].hash);

      return;
    }

    for (let index = 0; index < anchors.length; index++) {
      const anchor = anchors[index];
      const nextAnchor = anchors[index + 1];

      const [isActive, hash = null] = isAnchorActive(index, anchor, nextAnchor);

      if (isActive) {
        activateLink(hash);

        return;
      }
    }
  };

  const onScroll = throttleAndDebounce(setActiveLink, 100);

  const activateLink = (hash: string | null): void => {
    if (prevActiveLink) prevActiveLink.classList.remove("active");

    if (hash !== null)
      prevActiveLink = container.value!.querySelector(
        `a[href="${decodeURIComponent(hash)}"]`
      );

    const activeLink = prevActiveLink;

    if (activeLink) {
      activeLink.classList.add("active");
      marker.value!.style.top = `${activeLink.offsetTop + 33}px`;
      marker.value!.style.opacity = "1";
    } else {
      marker.value!.style.top = "33px";
      marker.value!.style.opacity = "0";
    }
  };

  useEventListener("scroll", onScroll);

  onMounted(() => {
    requestAnimationFrame(setActiveLink);
  });

  onUpdated(() => {
    // sidebar update means a route change
    activateLink(location.hash);
  });
};
