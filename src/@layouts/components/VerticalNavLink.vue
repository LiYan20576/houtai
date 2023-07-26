<script setup>
import { useLayouts } from '@layouts'
import { config } from '@layouts/config'
import { can } from '@layouts/plugins/casl'
import {
  getComputedNavLinkToProp,
  isNavLinkActive,
} from '@layouts/utils'

const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})

const { width: windowWidth } = useWindowSize()
const { isVerticalNavMini, dynamicI18nProps } = useLayouts()
const hideTitleAndBadge = isVerticalNavMini(windowWidth)

const isHovering = ref(false)

const handleMouseOver = () => {
  isHovering.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
}
// const avatarUrl = ref("");

// onMounted(async () => {
  
//   avatarUrl.value = JSON.parse(localStorage.getItem('userData')).avatar;
//   console.log(avatarUrl.value)
// });

</script>

<template>
  <li
    v-if="can(item.action, item.subject)"
    class="nav-link"
    :class="{ disabled: item.disable }"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <Component
      :is="item.to ? 'RouterLink' : 'a'"
      v-bind="getComputedNavLinkToProp(item)"
      :class="{ 'router-link-active router-link-exact-active-new': isNavLinkActive(item, $router) }"
      @click="handleNavLinkClick"
    >
      <!-- <Component
        :is="config.app.iconRenderer || 'div'"
        v-bind="item.icon || config.verticalNav.defaultNavItemIconProps"
        class="nav-item-icon"
      /> -->

      <!-- :src="item.icon.url" -->
      <!-- v-if="!item.type||!avatarUrl" -->
      <img  class="nav-item-icon" :src="isNavLinkActive(item, $router) ? item.hoverIcon.url : item.icon.url" style="width:24px;height:24px;padding: 0;margin: 0 auto;">
      
      <!-- <img v-else class="nav-item-icon" :src="avatarUrl" style="width:19px;height:19px;"> -->
      

      <TransitionGroup name="transition-slide-x">
        <!-- 👉 Title -->
        <Component
          :is="config.app.enableI18n ? 'i18n-t' : 'span'"
          v-show="!hideTitleAndBadge"
          key="title"
          class="nav-item-title"
          v-bind="dynamicI18nProps(item.title, 'span')"
        >
          {{ item.title }}
        </Component>

        <!-- 👉 Badge -->
        <Component
          :is="config.app.enableI18n ? 'i18n-t' : 'span'"
          v-if="item.badgeContent"
          v-show="!hideTitleAndBadge"
          key="badge"
          class="nav-item-badge"
          :class="item.badgeClass"
          v-bind="dynamicI18nProps(item.badgeContent, 'span')"
        >
          {{ item.badgeContent }}
        </Component>
      </TransitionGroup>
    </Component>

  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
  }
}
</style>
