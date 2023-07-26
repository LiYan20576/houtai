<script setup>
import { useLayouts } from '@layouts'
import { config } from '@layouts/config'
import { can } from '@layouts/plugins/casl'

const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})

const { isVerticalNavMini, dynamicI18nProps } = useLayouts()
const { width: windowWidth } = useWindowSize()
const shallRenderIcon = isVerticalNavMini(windowWidth)
</script>

<template>
  <li
    v-if="can(item.action, item.subject)"
    class="nav-section-title"
    style="margin-bottom: 23px;"
  >
    <div class="title-wrapper">
      <img src="https://www.uesg.org.cn/icon/0726/分割符.svg" style="width: 24px;height: 24px;margin-inline-start: 0.3rem;">
    </div>
  </li>
</template>
