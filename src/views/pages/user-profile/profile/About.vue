<script setup>
const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const userData = ref("");

onMounted(async () => {
  
  // const userInfo = JSON.parse(localStorage.getItem("userData"));
  // console.log(userInfo,'xxxxxxxxxxxxxxxxxxxxxxx');

  userData.value = [
    { property: '姓名', value: props.data.nickname, icon: 'tabler-user' },
    { property: '状态', value: '已注册', icon: 'tabler-check' },
    { property: '身份', value: '普通用户', icon: 'tabler-star' },
    { property: '语言', value: '中文', icon: 'tabler-language' },
  ]
  
});

</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <p class="text-xs" style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">
        用户信息
      </p>

      <VList class="card-list text-medium-emphasis">
        <VListItem
          v-for="item in userData"
          :key="item.property"
        >
          <template #prepend>
            <VIcon
              :icon="item.icon"
              size="20"
              class="me-2"
            />
          </template>
          <VListItemTitle>
            <span class="font-weight-medium me-1" style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">{{ item.property }}:</span>
            <span style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">{{ item.value }}</span>
          </VListItemTitle>
        </VListItem>
      </VList>

      <p class="text-xs mt-5" style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">
        联系方式
      </p>

      <VList class="card-list text-medium-emphasis">
        <VListItem
          v-for="item in props.data.contacts"
          :key="item.property"
        >
          <template #prepend>
            <VIcon
              :icon="item.icon"
              size="20"
              class="me-2"
            />
          </template>
          <VListItemTitle>
            <span class="font-weight-medium me-1" style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">{{ item.property }}:</span>
            <span style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">{{ item.value }}</span>
          </VListItemTitle>
        </VListItem>
      </VList>

      <p class="text-xs mt-5" style="color: #000000FF;font-weight: 500;font-size: 17px;line-height: 24px;">
       修改信息
      </p>
      <VBtn >
            修改
          </VBtn>
      <!-- <VList class="card-list text-medium-emphasis">
        <VListItem
          v-for="item in props.data.teams"
          :key="item.property"
        >
          <template #prepend>
            <VIcon
              :icon="item.icon"
              size="20"
              :color="item.color"
              class="me-2"
            />
          </template>
          <VListItemTitle>
            <span class="font-weight-medium me-1">{{ item.property }}:</span>
            <span>{{ item.value }}</span>
          </VListItemTitle>
        </VListItem>
      </VList> -->
    </VCardText>
  </VCard>

  <!-- <VCard>
    <VCardText>
      <p class="text-xs">
        OVERVIEW
      </p>

      <VList class="card-list text-medium-emphasis">
        <VListItem
          v-for="item in props.data.overview"
          :key="item.property"
        >
          <template #prepend>
            <VIcon
              :icon="item.icon"
              size="20"
              class="me-2"
            />
          </template>
          <VListItemTitle>
            <span class="font-weight-medium me-1">{{ item.property }}:</span>
            <span>{{ item.value }}</span>
          </VListItemTitle>
        </VListItem>
      </VList>
    </VCardText>
  </VCard> -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}
</style>
