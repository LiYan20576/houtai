<script setup>
import { useRouter } from 'vue-router'
import {getIndexData} from '@/api/index'
import { useAppAbility } from "@/plugins/casl/useAppAbility";

const router = useRouter();
const ability = useAppAbility();
const avatars = ref("");

const isCardDetailsVisible = ref(false)

const length = ref("");

const getData = async () => {
  const { data:res } = await getIndexData();
  avatars.value = res;
  avatars.value.reverse();
  length.value = avatars.value.length;
};

const info = (index) => {
  router.push("/inner/"+index);
}

onMounted(() => {
  // 在页面加载时执行的方法
  getData();

  const userAbilities = [
    {
      action: "manage",
      subject: "all",
    },
  ];
  localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
  ability.update(userAbilities);
  // localStorage.setItem("info_islogin", true);

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
      <VCard @click="info(length-index)">
        <VImg :src="item.cover" />

        <VCardItem>
          <VCardTitle>{{ item.title }}</VCardTitle>
        </VCardItem>

        <VCardActions>
          <VBtn @click="info(length-index)">
            详情
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
