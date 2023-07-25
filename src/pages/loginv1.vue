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


</script>



<template>
  <VRow style=" height: 100vh;margin: 0;background-color: #FFFFFFFF !important;box-shadow: 0px 5px 10px 0px #F0EFF2 !important;border-radius: 12px !important;">


    <!-- 👉 Popular Uses Of The Internet -->
    <!-- <div style="width: 100%;display: flex;justify-content: center;align-items: center;">
      <img src="https://www.uesg.org.cn/img/Logo-04.svg" style="width: 103px;height: 144px;margin-top: 60px;" >
    </div>

    <div style="width: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 30px;">
      <div style="font-size: 30px;line-height: 37px;color: #5C5A68;font-weight: bold;margin-bottom: 10px;">
      Certification Center
      </div>
      <div style="font-size: 24px;line-height: 33px;color: #5C5A68;font-weight: 500;margin-bottom: 60px;">
        国际通用ESG标准认证中心
      </div>
      <div style="font-size: 35px;font-weight: 500;color: #5C5A68;line-height: 49px;margin-bottom: 30px;">
        微信扫码登录
      </div>
      <div style="margin-bottom: 30px;width: 210px;height: 210px;border-radius: 12px;border: 2px solid #A7A6AE;display: flex;align-items: center;justify-content: center;">
        <div style="width: 170px;height: 170px;background-color: #D8D8D8;">

        </div>
      </div>
      <div style="font-size: 17px;line-height: 24px;color: #5C5A68;margin-bottom: 110px;">
        微信扫码关注公众号进行登录
      </div>
    </div> -->


    <div style="width: 100%;height: 100%;scale: 0.8;display: flex;align-items: center;justify-content: center;">
      <div style="width: 500px;height: 641px;background-image: url(https://www.uesg.org.cn/img/loginv1.jpg);background-size: 100% 100%;">
        
      </div>
      <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 500px;height: 641px;background-image: url(https://www.uesg.org.cn/img/loginbg.jpg);background-size: 100% 100%;">
        <div style="font-size: 35px;line-height: 50px;color: #5C5A68;font-weight: 500;margin-bottom: 30px;">
          微信扫码登录
        </div>
        <div style="width: 210px;height: 210px;border-radius: 12px;border: 4px solid #E6E6E6;margin-bottom: 30px;">

        </div>
        <div style="font-size: 17px;line-height: 50px;color: #5C5A68;">
          微信扫码关注公众号进行登录
        </div>
      </div>
    </div>
   
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
