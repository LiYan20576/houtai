<script setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { VNodeRenderer } from "./VNodeRenderer";
import { injectionKeyIsVerticalNavHovered, useLayouts } from "@layouts";
import {
  VerticalNavGroup,
  VerticalNavLink,
  VerticalNavSectionTitle,
} from "@layouts/components";
import { config } from "@layouts/config";
const { y } = useWindowScroll()

const props = defineProps({
  tag: {
    type: [String, null],
    required: false,
    default: "aside",
  },
  navItems: {
    type: null,
    required: true,
  },
  isOverlayNavActive: {
    type: Boolean,
    required: true,
  },
  toggleIsOverlayNavActive: {
    type: Function,
    required: true,
  },
});

const refNav = ref();
const { width: windowWidth } = useWindowSize();
// const isHovered = useElementHover(refNav)

// provide(injectionKeyIsVerticalNavHovered, isHovered)

const {
  isVerticalNavCollapsed: isCollapsed,
  isLessThanOverlayNavBreakpoint,
  isVerticalNavMini,
  isAppRtl,
} = useLayouts();

// const hideTitleAndIcon = isVerticalNavMini(windowWidth, isHovered)

const resolveNavItemComponent = (item) => {
  if ("heading" in item) return VerticalNavSectionTitle;
  if ("children" in item) return VerticalNavGroup;

  return VerticalNavLink;
};

const route = useRoute();

watch(
  () => route.name,
  () => {
    props.toggleIsOverlayNavActive(false);
  }
);

const isVerticalNavScrolled = ref(false);
const updateIsVerticalNavScrolled = (val) =>
  (isVerticalNavScrolled.value = val);

const isNav = ref(false)
const nav = (a) => {
  if(a > 84) {
    return true
  } else {
    return false
  }
}

const handleNavScroll = (evt) => {
  isVerticalNavScrolled.value = evt.target.scrollTop > 0;
};
</script>

<template>
  <Component
    :is="props.tag"
    ref="refNav"
    class="layout-vertical-nav"
    :class="[
      {
        'tarn-nav': nav(y)
        // 'overlay-nav': isLessThanOverlayNavBreakpoint(windowWidth),
        // 'hovered': isHovered,
        // 'visible': isOverlayNavActive,
        // 'scrolled': isVerticalNavScrolled,
      },
    ]"
    style="display: flex; width: 100%; align-items: center;justify-content: center;position: fixed;height: 64px;"
  >
    <div style="max-width: 980px;display: flex;align-items: center;justify-content: center;width: 100%;position: relative;">
      <!-- 👉 Header -->
      <div class="nav-header" style="position: absolute;left: 24px;">
        <slot name="nav-header">
          <RouterLink
            to="/"
            class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
          >
            <VNodeRenderer
              :nodes="config.app.slogo"
              v-show="!hideTitleAndIcon"
            />

            <VNodeRenderer
              :nodes="config.app.slogo"
              v-show="hideTitleAndIcon"
            />
          </RouterLink>
          <!-- 👉 Vertical nav actions -->
          <!-- Show toggle collapsible in >md and close button in <md -->
        </slot>
      </div>
      <!-- <slot name="before-nav-items">
        <div class="vertical-nav-items-shadow" />
      </slot> -->
      <slot
        name="nav-items"
        :update-is-vertical-nav-scrolled="updateIsVerticalNavScrolled"
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
          "
        >
          <PerfectScrollbar
            :key="isAppRtl"
            tag="ul"
            class="nav-items"
            :options="{ wheelPropagation: false }"
            @ps-scroll-y="handleNavScroll"
            style="
              height: auto;
              display: flex;
              flex-direction: row;
              align-items: center;
            "
          >
            <Component
              :is="resolveNavItemComponent(item)"
              v-for="(item, index) in navItems"
              :key="index"
              :item="item"
            />
          </PerfectScrollbar>
        </div>
      </slot>
    </div>
  </Component>
</template>

<style>
.tarn-nav {
  -webkit-backdrop-filter: blur(10px) !important;
  backdrop-filter: blur(20px) !important;
  background-color: hsla(0,0%,100%,.8) !important;
}
</style>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/mixins";

// 👉 Vertical Nav
.layout-vertical-nav {
  // position: fixed;
  z-index: variables.$layout-vertical-nav-z-index;
  // display: flex;
  // flex-direction: column;
  // block-size: 100%;
  // inline-size: variables.$layout-vertical-nav-width;
  // inset-block-start: 0;
  // inset-inline-start: 0;
  transition: transform 0.25s ease-in-out, inline-size 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
  // will-change: transform, inline-size;

  .nav-header {
    display: flex;
    align-items: center;

    .header-action {
      cursor: pointer;
    }
  }

  .app-title-wrapper {
    margin-inline-end: auto;
  }

  .nav-items {
    block-size: 100%;

    // ℹ️ We no loner needs this overflow styles as perfect scrollbar applies it
    // overflow-x: hidden;

    // // ℹ️ We used `overflow-y` instead of `overflow` to mitigate overflow x. Revert back if any issue found.
    // overflow-y: auto;
  }

  .nav-item-title {
    display: none !important;
    overflow: hidden;
    margin-inline-end: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 👉 Collapsed
  .layout-vertical-nav-collapsed & {
    &:not(.hovered) {
      inline-size: variables.$layout-vertical-nav-collapsed-width;
    }
  }

  // 👉 Overlay nav
  &.overlay-nav {
    &:not(.visible) {
      transform: translateX(-#{variables.$layout-vertical-nav-width});

      @include mixins.rtl {
        transform: translateX(variables.$layout-vertical-nav-width);
      }
    }
  }
}


</style>
