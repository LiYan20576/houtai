<!-- eslint-disable import/extensions -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { VForm } from "vuetify/components/VForm";
import { useAppAbility } from "@/plugins/casl/useAppAbility";
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import axios from "@axios";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import { emailValidator, requirednumberoremaliValidator ,numberoremaliValidator,passwordValidator,requiredepasswordValidator} from "@validators";
import { watch } from "vue";
import { reqEmailLogin, regNumberLogin, isWechat } from "@/api/index.js"

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const isPasswordVisible = ref(false);
const route = useRoute();
const router = useRouter();
const ability = useAppAbility();

const errors = ref({
  email: undefined,
  password: undefined,
});

const refVForm = ref();
const email = ref("");
const password = ref("");
const errmessage = ref();
const rememberMe = ref(false);
const showQR = ref(false);
const isLoading = ref(false);

const isEmail = (input) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(input);
};

const isPhoneNumber = (input) => {
  const phoneRegex = /^1[3|4|5|7|8|9][0-9]{9}$/;
  return phoneRegex.test(input);
};

const login = async() => {
  // axios
  //   .post("/account/EmailLogin", {
  //     email: email.value,
  //     password: password.value,
  //   })
  //   .then((r) => {
  //     const userAbilities = [
  //       {
  //         action: "manage",
  //         subject: "all",
  //       },
  //     ];
  //     const { code, message } = r.data;
  //     localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
  //     ability.update(userAbilities);
  //     localStorage.setItem("userData", code);
  //     // localStorage.setItem('accessToken', JSON.stringify(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.fhc3wykrAnRpcKApKhXiahxaOe8PSHatad31NuIZ0Zg))
  //     console.log(code);
  //     // Redirect to `to` query if exist or redirect to index route
  //     router.replace("/");
  //     if (code == -1) {
  //       errmessage.value = message;
  //     }
  //   })
  //   .catch((e) => {
  //     // const { errors: formErrors } = e.response.data

  //     // errors.value = formErrors
  //     console.error(e);
  //   });
  isLoading.value=true;
  if(isEmail(email.value)){
    console.log("邮箱登录");

    const {data:res} = await reqEmailLogin(email.value, password.value);
    if(res.code === 200) {
      const userAbilities = [
        {
          action: "manage",
          subject: "all",
        },
      ];
      const code = res.code;
      localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
      ability.update(userAbilities);
      localStorage.setItem("userData", code);
      // localStorage.setItem('accessToken', JSON.stringify(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.fhc3wykrAnRpcKApKhXiahxaOe8PSHatad31NuIZ0Zg))
      router.replace("/");
      isLoading.value=false;
    } else if (res.code === -1) {
      isLoading.value=false;
      errmessage.value = res.message;
    }
  } else if(isPhoneNumber(email.value)){
    console.log("电话登录");
    isLoading.value=false;

    const { data:res } = await regNumberLogin(email.value, password.value);

    if(res.code === 200) {
      const userAbilities = [
        {
          action: "manage",
          subject: "all",
        },
      ];
      const code = res.code;
      localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
      ability.update(userAbilities);
      localStorage.setItem("userData", code);
      // localStorage.setItem('accessToken', JSON.stringify(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.fhc3wykrAnRpcKApKhXiahxaOe8PSHatad31NuIZ0Zg))
      router.replace("/");
      isLoading.value=false;
    } else if (res.code === -1) {
      isLoading.value=false;
      errmessage.value = res.message;
    }
  }
};
const onChange = () => {
  // console.log('xxxxxxxxxxxx')
  errmessage.value = "";
};
const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login();
  });
};

const queryParams = ref('');
const is_wxlogin = async () => {
  // 获取URL查询参数
  const searchParams = window.location.search
  queryParams.value = searchParams.substring(1)

  const filteredString = queryParams.value.replace(/=/g, '');
  console.log(filteredString)
  if(queryParams.value) {
    
    const { data:res } = await isWechat(filteredString);
    if(res){
      const userAbilities = [
        {
          action: "manage",
          subject: "all",
        },
      ];
      localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
      ability.update(userAbilities);
      localStorage.setItem("userData", 200);
      router.replace("/");
    }

  }
  
};
onMounted(() => {
  // 在页面加载时执行的方法
  is_wxlogin()
  console.log("xxx");
});
</script>

<template>
  <!-- 遮罩层 -->
  <div class="loading-overlay" v-if="isLoading">
    <VProgressCircular :size="60" color="primary" indeterminate />
  </div>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative w-100">
        <div class="d-flex align-baseline justify-center w-100 h-100">
          <!-- <VImg
            max-width="750"
            :src="authThemeImg"
            class="auth-illustration rounded-lg"
          /> -->
          <img :src="authThemeImg" class="auth-illustration rounded-lg" style="width: 100%;" alt="">
        </div>
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />

          <h5 class="text-h5 mb-1">
            欢迎来到
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>!
            👋🏻
          </h5>
          <p class="mb-0">登录到您的帐户以开始在线课程</p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  label="手机号/电子邮箱"
                  type="email"
                  autofocus
                  :rules="[requirednumberoremaliValidator, numberoremaliValidator]"
                  :error-messages="errors.email"
                  v-on:input="onChange"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  label="密码"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  v-on:input="onChange"
                />

                <div
                  class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4"
                >
                  <VCheckbox v-model="rememberMe" label="记住我" />
                  <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    忘记密码?
                  </RouterLink>
                </div>

                <VBtn block type="submit"> 登录 </VBtn>
                <div
                  style="
                    text-align: center;
                    color: rgb(234, 84, 85);
                    margin-top: 20px;
                  "
                >
                  {{ errmessage }}
                </div>
              </VCol>

              <!-- QR code -->
              <!-- <Vcol cols="12" v-if="showQR">
                <img src="https://www.uesg.cn/test.html" style="width: 300px;height: 300px;">
              </Vcol> -->

              <!-- create account -->
              <VCol cols="12" class="text-center">
                <span>刚接触 UESG?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'register' }"
                >
                  创建一个帐户
                </RouterLink>
              </VCol>
              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider/>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    <div style="margin: auto;padding: 12px;">
      <a
        href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=2023016690"
        rel="noopener noreferrer"
        color="primary"
        target="_blank"
        >沪ICP备2023016690号</a
      >
    </div>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
