<script setup>
import { useRouter } from 'vue-router'
import {lessons} from '@/api/index'

const router = useRouter();

const avatars = ref("");

const isCardDetailsVisible = ref(false)

const getData = async () => {
  const { data:res } = await lessons();
  avatars.value = res.lessons;
};

const pay = () => {
  router.push("/pay/")
}

onMounted(() => {
  // 在页面加载时执行的方法
  getData()
});
</script>

<template>
  <VRow>


    <!-- 👉 Popular Uses Of The Internet -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      v-for="(item,index) in avatars" :key="index"
    >
      <VCard>
        <VImg :src="item.cover" />

        <VCardItem>
          <VCardTitle>{{ item.name }}</VCardTitle>
        </VCardItem>

        <VCardText>{{ item.desc }}</VCardText>

        <VCardText>￥{{ item.price }}</VCardText>

        <VCardActions>
          <VBtn @click="pay">
            购买
          </VBtn>
        </VCardActions>

      </VCard>
    </VCol>

   
  </VRow>
</template>

<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}

// membership pricing
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}

.membership-pricing {
  sup {
    inset-block-start: 9px;
  }
}

.v-btn {
  transform: none;
}
</style>
