<script setup>
import { useRouter } from 'vue-router'
import {getIndexData} from '@/api/index'
import { useAppAbility } from "@/plugins/casl/useAppAbility";
// import { onBeforeRouteLeave } from 'vue'

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

const url = ref("https://www.gjtool.cn/pdfh5/test.pdf");
</script>



<template>
  <VRow>
    <VCol cols="12">
      <VCard
        style="
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px 64px;
          margin-bottom: 32px;
        "
      >
        <div
          style="
            font-family: 'DINMedium';
            font-size: 13px;
            line-height: 18px;
            color: #1d1d1f;
            position: absolute;
            left: 50px;
          "
        >
          我的证书
        </div>
        <div style="font-size: 13px; color: #1d1d1f; line-height: 18px">
          您还未取得任何证书。
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>


<style>
.layout-content-wrapper {
  background-color: #FDFCFDFF !important;
}
/* .page-content-container {
  background-color: #FFFFFFFF !important;
  box-shadow: 0px 5px 10px 0px #F0EFF2 !important;
  border-radius: 12px !important;
  margin-bottom: 30px;
  margin-top: 10px;
} */
</style>
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
