<script setup>
import { VForm } from "vuetify/components/VForm";
import authV2RegisterIllustrationBorderedDark from "@images/pages/auth-v2-register-illustration-bordered-dark.png";
import authV2RegisterIllustrationBorderedLight from "@images/pages/auth-v2-register-illustration-bordered-light.png";
import authV2RegisterIllustrationDark from "@images/pages/auth-v2-register-illustration-dark.png";
import authV2RegisterIllustrationLight from "@images/pages/auth-v2-register-illustration-light.png";
import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { useAppAbility } from "@/plugins/casl/useAppAbility";
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import axios from "@axios";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import {
  emailValidator,
  requiredemailValidator,
  requiredenumberValidator,
  numberValidator,
  passwordValidator,
  requiredepasswordValidator,
  requiredecodeValidator,
  requirederuleValidator,
  requirederulesValidator,
} from "@validators";
import { regEmail,SendCodeMp,SendCodeEmail } from "@/api/index.js"
const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);
const refVForm = ref();
const codeimg = ref();
const creatway = ref("使用电子邮箱注册");
const creat = ref("手机号");
const successmessage = ref();
const errmessage = ref();
const number = ref("");
const getcoderule = ref("获取验证码");
const email = ref("");
const password = ref("");
const imgcode = ref("");
const privacyPolicies = ref(true);
const coderule = ref(true);
const useemail = ref(true);
const aaa = ref(1);
const errmessageemail = ref();
const errmessageenumber = ref();
// Router
const route = useRoute();
const router = useRouter();

// Ability
const ability = useAppAbility();

const getimg = () => {
  aaa.value = aaa.value + 1;
  console.log("xxx", aaa.value);
  codeimg.value = "https://www.uesg.cn/verify/index?id=" + aaa.value;
};
getimg();
// Form Errors
const errors = ref({
  email: undefined,
  password: undefined,
});

const register = async () => {
  errmessage.value = "";
  // axios
  //   .post("account/RegEmail", {
  //     vcode: number.value,
  //     email: email.value,
  //     password: password.value,
  //   })
  //   .then((r) => {
  //     // const { accessToken, userData, userAbilities } = r.data;
  //     const { code, message } = r.data;
  //     if (code == -1) {
  //       errmessage.value = message;
  //     } else if (code == 0) {
  //       console.log(code, message);
  //       // router.replace('/')
  //       successmessage.value = "注册成功";
  //     }
  //     // localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
  //     // ability.update(userAbilities);
  //     // localStorage.setItem("userData", JSON.stringify(userData));
  //     // localStorage.setItem("accessToken", JSON.stringify(accessToken));

  //     // Redirect to `to` query if exist or redirect to index route
  //     // router.replace(route.query.to ? String(route.query.to) : "/");

  //     // return null;
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });

  const { data:res } = await regEmail( number.value, email.value, password.value);
  console.log(res);
  if (res.code == -1) {
    errmessage.value = res.message;
  } else if (res.code == 0) {
    // console.log(res.code, res.message);
    // router.replace('/')
    successmessage.value = "注册成功";
  }
};

const imageVariant = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark,
  authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const isPasswordVisible = ref(false);

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) register();
  });
};
const onChange = () => {
  errmessage.value = "";
  errmessageemail.value = ""
  errmessageenumber.value = ""
  console.log("xxxxxxxxxxxx", errmessage.value);
};
const getcode = async () => {
  errmessage.value = "";
  console.log(coderule.value);
  if (useemail.value) {
    if (email.value && coderule.value && imgcode.value) {
      // axios
      //   .post("sms/SendCodeMp", {
      //     mp_num: email.value,
      //     vcode: imgcode.value,
      //   })
      //   .then((r) => {
      //     const { code, message } = r.data;
      //     console.log(r, code, message);
      //     if (code == 200) {
      //       coderule.value = false;

      //       var time = 60;
      //       let intervalID = setInterval(() => {
      //         time--;
      //         getcoderule.value = time;
      //         if (time == -1) {
      //           clearInterval(intervalID);
      //           getcoderule.value = "Get Code";
      //           coderule.value = true;
      //         }
      //       }, 1000);
      //     } else {
      //       errmessage.value = message;
      //     }
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //   });

      const { data:res } = await SendCodeMp(email.value, imgcode.value);
      if (res.code == 200) {
        coderule.value = false;

        var time = 60;
        let intervalID = setInterval(() => {
          time--;
          getcoderule.value = time;
          if (time == -1) {
            clearInterval(intervalID);
            getcoderule.value = "Get Code";
            coderule.value = true;
          }
        }, 1000);
      } else {
        errmessage.value = res.message;
      }
    } 
  } else {
    if (email.value && coderule.value) {
      // axios
      //   .post("account/SendCodeEmail", {
      //     email: email.value,
      //   })
      //   .then((r) => {
      //     const { code, message } = r.data;
      //     console.log(code, message);
      //     if (code == 200) {
      //       coderule.value = false;

      //       var time = 60;
      //       let intervalID = setInterval(() => {
      //         time--;
      //         getcoderule.value = time;
      //         if (time == -1) {
      //           clearInterval(intervalID);
      //           getcoderule.value = "Get Code";
      //           coderule.value = true;
      //         }
      //       }, 1000);
      //     } else {
      //       errmessage.value = message;
      //     }
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //   });

      const { data:res } = await SendCodeEmail(email.value);
      if (res.code == 200) {
        coderule.value = false;

        var time = 60;
        let intervalID = setInterval(() => {
          time--;
          getcoderule.value = time;
          if (time == -1) {
            clearInterval(intervalID);
            getcoderule.value = "Get Code";
            coderule.value = true;
          }
        }, 1000);
      } else {
        errmessage.value = res.message;
      }
    } 
  }
};
const content = (val) => {
  router.push('/login')
  console.log(val,'xxxxxxxxs')
};
const getway = () => {
  email.value = "";
  password.value = "";
  imgcode.value = "";
  number.value = "";
  errmessage.value = "";
  console.log(creatway.value);
  creatway.value =
    creatway.value == "使用手机号注册" ? "使用电子邮箱注册" : "使用手机号注册";
  if (creatway.value == "使用电子邮箱注册") {
    creat.value = "手机号";
    useemail.value = true;
  } else {
    creat.value = "电子邮箱";
    useemail.value = false;
  }
};

const handleClick = () => {
  location.reload();
};
</script>

<template>
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

    <VCol cols="12" lg="4" class="d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />
          <h5 class="text-h5 mb-1">Adventure starts here 🚀</h5>
          <p class="mb-0">Make your app management easy and fun!</p>
        </VCardText>

        <VCardText>
          <!-- 手机号注册 -->
          <VForm ref="refVForm" @submit.prevent="onSubmit" v-if="useemail">
            <VRow>
              <!-- email -->
              <VCol cols="12" >
                <AppTextField
                  v-model="email"
                  :label="creat"
                  type="email"
                  :rules="[numberValidator,requiredenumberValidator]"
                  v-on:input="onChange"
                />
              </VCol>
              
              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :rules="[requiredepasswordValidator, passwordValidator]"
                  label="密码"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- 图形验证码 -->
              <VCol cols="7">
                <AppTextField
                  v-model="imgcode"
                  :rules="[requirederulesValidator]"
                  label="图形验证码"
                />
              </VCol>
              <VCol
                cols="5"
                style="margin-top: 26px; padding-left: 0"
              >
                <img
                  :src="codeimg"
                  @click="getimg"
                  style="width: 100%; height: 40px"
                />
              </VCol>

              <!-- code -->
              <VCol cols="12" style="position: relative">
                <AppTextField
                  v-model="number"
                  label="验证码"
                  type="text"
                  :rules="[requiredecodeValidator]"
                  v-on:input="onChange"
                />

                <div style="position: absolute; right: 20px; top: 45px">
                  <button type="button" @click="getcode">
                    {{ getcoderule }}
                  </button>
                </div>
                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requirederuleValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        我同意
                        <a href="javascript:void(0)" class="text-primary"
                          >隐私政策和条款</a
                        >
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn block type="submit">注册</VBtn>
                <div
                  style="
                    text-align: center;
                    color: rgb(var(--v-theme-error));
                    font-size: 12px;
                    margin-top: 20px;
                  "
                >
                  {{ errmessage }}
                </div>
                <div
                  style="
                    text-align: center;
                    color: rgb(37, 183, 67);
                    margin-top: 20px;
                  "
                >
                  {{ successmessage }}
                </div>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center text-base">
                <button type="button" class="text-primary ms-2" @click="getway">
                  {{ creatway }}
                </button>
              </VCol>
              <VCol cols="12" class="text-center text-base">
                <span>已经有账户?</span>
                <RouterLink class="text-primary" :to="{ name: 'login' }">
                  去登陆
                </RouterLink>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider @type="content"/>
              </VCol>
            </VRow>
          </VForm>

          <!-- 邮箱注册 -->
          <VForm ref="refVForm" @submit.prevent="onSubmit" v-else>
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :label="creat"
                  :rules="[emailValidator,requiredemailValidator ]"
                  type="email"
                  v-on:input="onChange"
                />
              </VCol>
              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :rules="[requiredepasswordValidator, passwordValidator]"
                  label="密码"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>
              <!-- code -->
              <VCol cols="12" style="position: relative">
                <AppTextField
                  v-model="number"
                  label="验证码"
                  type="text"
                  :rules="[requiredecodeValidator]"
                  v-on:input="onChange"
                />

                <div style="position: absolute; right: 20px; top: 45px">
                  <button type="button" @click="getcode">
                    {{ getcoderule }}
                  </button>
                </div>
                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requirederuleValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        我同意
                        <a href="javascript:void(0)" class="text-primary"
                          >隐私政策和条款</a
                        >
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn block type="submit">注册</VBtn>
                <div
                  style="
                    text-align: center;
                    color: rgb(var(--v-theme-error));
                    font-size: 12px;
                    margin-top: 20px;
                  "
                >
                  {{ errmessage }}
                </div>
                <div
                  style="
                    text-align: center;
                    color: rgb(37, 183, 67);
                    margin-top: 20px;
                  "
                >
                  {{ successmessage }}
                </div>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center text-base">
                <button type="button" class="text-primary ms-2" @click="getway">
                  {{ creatway }}
                </button>
              </VCol>
              <VCol cols="12" class="text-center text-base">
                <span>已经有账户?</span>
                <RouterLink class="text-primary" :to="{ name: 'login' }">
                  去登陆
                </RouterLink>
              </VCol>
              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>
              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider @type="content"/>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    <div style="margin: auto; padding: 12px">
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
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
