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
import { emailValidator, requiredValidator } from "@validators";

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

const login = () => {
  axios
    .post("/account/EmailLogin", {
      email: email.value,
      password: password.value,
    })
    .then((r) => {
      const userAbilities = [
        {
          action: "manage",
          subject: "all",
        },
      ];
      const { code, message } = r.data;
      localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
      ability.update(userAbilities);
      localStorage.setItem("userData", code);
      // localStorage.setItem('accessToken', JSON.stringify(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.fhc3wykrAnRpcKApKhXiahxaOe8PSHatad31NuIZ0Zg))
      console.log(code);
      // Redirect to `to` query if exist or redirect to index route
      router.replace("/");
      if (code == -1) {
        errmessage.value = message;
      }
    })
    .catch((e) => {
      // const { errors: formErrors } = e.response.data

      // errors.value = formErrors
      console.error(e);
    });

  
  // const userAbilities = [
  //   {
  //     action: "manage",
  //     subject: "all",
  //   },
  // ];
  // localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
  // localStorage.setItem("userData", 200);
  // router.replace("/");
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

const handleAuthProviderSelected = (type) => {
  console.log('Received auth provider:', type);
  if( !showQR.value && type === 'wechat') {
    showQR.value = true;
  } else {
    showQR.value = false;
  }
}


// 微信登录
const wechatLogin = () => {
  axios
    .get('XXX')
    .then((res) => {
      if(res.code !== 200) return
      let state = parseInt(new Date().getTime() / 1000)
      let obj = new WxLogin({
        self_redirect: false,
        id: 'login_container',
        appid: data.appid,
        scope: 'snsapi_login',
        redirect_uri: data.redirect_url, // 这里跳的是扫码成功后,账户操作的地址
        state: state,
        style: 'black',
        href: '',
      })
      // 自己封装的sessionStorage方法
      sessionStorage.setItem('beforeLogin', window.location.href) // 记录当前操作页面,以备后面跳转
      sessionStorage.setItem('QRcode', 'login') // 记录当前扫码是注册还是登录
      state.loginType = 'QRcode'
    })
    .catch((err) => {

    });
}

</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative w-100">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="750"
            :src="authThemeImg"
            class="auth-illustration rounded-lg"
          />
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
              <VCol cols="12" v-if="!showQR">
                <AppTextField
                  v-model="email"
                  label="电子邮箱"
                  type="email"
                  autofocus
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                  v-on:input="onChange"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12" v-if="!showQR">
                <AppTextField
                  v-model="password"
                  label="密码"
                  :rules="[requiredValidator]"
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
              <Vcol cols="12" v-if="showQR">
                <img src="https://lovemedicine.cn/public/uesg/520/img/qr.png" style="width: 300px;height: 300px;">
              </Vcol>

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
              <VCol cols="12" class="text-center" v-if="!showQR">
                <AuthProvider @type="handleAuthProviderSelected" @click="wechatLogin"/>
              </VCol>
              <VCol cols="12" class="text-center text-base" v-else>
                <button type="button" class="text-primary ms-2" @click="handleAuthProviderSelected">
                  返回手机/邮箱登录
                </button>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    <div style="margin: auto;padding: 12px;">
      <a
        href="http://beian.miit.gocn/"
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
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
