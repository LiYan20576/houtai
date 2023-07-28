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
  >
    <div class="title-wrapper">
      <img src="https://www.uesg.org.cn/icon/0727/%E5%88%86%E5%89%B2%E7%AC%A6.svg" style="width: 24px;height: 24px;margin-inline-start: 0.3rem;">
    </div>
  </li>
</template>
