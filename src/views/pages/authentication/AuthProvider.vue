<script setup>
import { useTheme } from 'vuetify'

const { global } = useTheme()

const emits = defineEmits(['type'])

const getway = (type) => {
  console.log(type, 'xxxxxxxxx')
  emits('type', type)
}

const authProviders = [
  {
    icon: 'ic:baseline-wechat',
    color: '#00ac84',
    type:'wechat'
  },
  {
    icon: 'bi:alipay',
    color: '#108ee9',
    type:'pay'
  },
]
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
      @click="getway(link.type)"
    >
      <VIcon
        size="18"
        :icon="link.icon"
      />
    </VBtn>
  </div>
</template>