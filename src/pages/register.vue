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
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import {
  alphaDashValidator,
  emailValidator,
  requiredValidator,
} from "@validators";

const refVForm = ref();
const successmessage = ref();
const errmessage = ref();
const number = ref("");
const message = ref("Get Code");
const email = ref("");
const password = ref("");
const privacyPolicies = ref(true);
const code = ref(true);

// Router
const route = useRoute();
const router = useRouter();

// Ability
const ability = useAppAbility();

// Form Errors
const errors = ref({
  email: undefined,
  password: undefined,
});

const register = () => {
  errmessage.value = "";
  axios
    .post("account/RegEmail", {
      vcode: number.value,
      email: email.value,
      password: password.value,
    })
    .then((r) => {
      // const { accessToken, userData, userAbilities } = r.data;
      const { code, message } = r.data;
      if (code == -1) {
        errmessage.value = message;
      } else if (code == 0) {
        console.log(code, message);
        // router.replace('/')
        successmessage.value = '注册成功'
      }
      // localStorage.setItem("userAbilities", JSON.stringify(userAbilities));
      // ability.update(userAbilities);
      // localStorage.setItem("userData", JSON.stringify(userData));
      // localStorage.setItem("accessToken", JSON.stringify(accessToken));

      // Redirect to `to` query if exist or redirect to index route
      // router.replace(route.query.to ? String(route.query.to) : "/");

      // return null;
    })
    .catch((e) => {
      console.error(e);
    });
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
  // console.log('xxxxxxxxxxxx')
  errmessage.value = "";
};
const getcode = () => {
  errmessage.value = "";
  console.log(code.value);
  if (email.value && code.value) {
    axios
      .post("account/SendCodeEmail", {
        email: email.value,
      })
      .then((r) => {
        code.value = false;
        console.log(r);
        var time = 60;
        let intervalID = setInterval(() => {
          time--;
          message.value = time;
          if (time == -1) {
            clearInterval(intervalID);
            message.value = "Get Code";
            code.value = true;
          }
        }, 1000);
      })
      .catch((e) => {
        console.error(e);
      });
  }
};
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="441"
            :src="imageVariant"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg class="auth-footer-mask" :src="authThemeMask" />
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
          <VForm ref="refVForm" @submit.prevent="false">
            <VRow>
              <!-- Username -->
              <!-- <VCol cols="12">
                <AppTextField
                  v-model="username"
                  autofocus
                  :rules="[requiredValidator, alphaDashValidator]"
                  label="Username"
                />
              </VCol> -->

              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                  v-on:input="onChange"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :rules="[requiredValidator]"
                  label="Password"
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
                  label="Code"
                  type="text"
                  :rules="[requiredValidator]"
                  v-on:input="onChange"
                />

                <div style="position: absolute; right: 20px; top: 45px">
                  <button @click="getcode">{{ message }}</button>
                </div>
                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requiredValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        I agree to
                        <a href="javascript:void(0)" class="text-primary"
                          >privacy policy & terms</a
                        >
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn block type="submit" @click="onSubmit"> Sign up </VBtn>
                <div
                  style="
                    text-align: center;
                    color: rgb(234, 84, 85);
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
                <span>Already have an account?</span>
                <RouterLink class="text-primary ms-2" :to="{ name: 'login' }">
                  Sign in instead
                </RouterLink>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
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
