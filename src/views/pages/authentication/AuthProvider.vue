<script setup>
import router from '@/router'
import { useTheme } from 'vuetify'

const { global } = useTheme()

const authProviders = [
  {
    icon: 'ic:baseline-wechat',
    color: '#00ac84',
    type:'wechat'
  },
  // {
  //   icon: 'bi:alipay',
  //   color: '#108ee9',
  //   type:'pay'
  // },
]

const isMobile = ref(false)

const handleClick = (type) => {
  if (isMobile.value) {
    // 在移动设备上执行的点击行为
    console.log('Mobile Click');
    window.location.href='https://www.uesg.cn/weixin/auth';
  } else {
    // 在非移动设备上执行的点击行为
    console.log('Desktop Click')
    window.location.href='https://www.uesg.cn/test.html';
  }
}

onMounted(() => {
  const mediaQuery = window.matchMedia('(max-width: 1280px)')
  isMobile.value = mediaQuery.matches

  const handleResize = () => {
    isMobile.value = mediaQuery.matches
  }

  window.addEventListener('resize', handleResize)
})

</script>

<template>
  <div class="d-flex justify-center flex-wrap gap-3">
    <VBtn
      v-for="link in authProviders"
      :key="link.icon"
      icon
      variant="tonal"
      size="38"
      :color="global.name.value === 'dark' ? link.colorInDark : link.color"
      class="rounded"
      @click="handleClick(link.type)"
    >
      <VIcon
        size="18"
        :icon="link.icon"
      />
    </VBtn>
  </div>
</template>